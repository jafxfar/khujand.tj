/**
 * Download images referenced in the DB (Joomla stored only paths) into public/.
 * Source: live khujand.tj, fallback: Wayback Machine. Idempotent — existing files are skipped.
 *
 * Usage: npm run images:sync [-- --all] [--limit N] [--dry-run] [--concurrency N]
 *   --all   also include <img> inside article bodies (not rendered on the site yet)
 */
import fs from 'node:fs'
import { mkdir, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const ORIGIN = 'https://khujand.tj'
const WAYBACK = 'https://web.archive.org/web/2id_/'
const PUBLIC_DIR = path.join(process.cwd(), 'public')
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images')
const REPORT_PATH = path.join(process.cwd(), 'dumps', 'missing-images.txt')
const MAX_BYTES = 15 * 1024 * 1024
const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp'])

const args = process.argv.slice(2)
const hasFlag = (name: string) => args.includes(name)
const flagValue = (name: string, fallback: number) => {
  const index = args.indexOf(name)
  const value = index >= 0 ? Number(args[index + 1]) : NaN
  return Number.isFinite(value) && value > 0 ? value : fallback
}

const includeBodies = hasFlag('--all')
const dryRun = hasFlag('--dry-run')
const limit = flagValue('--limit', Infinity)
const concurrency = flagValue('--concurrency', 3)

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const safeDecode = (value: string) => {
  try {
    return decodeURI(value)
  } catch {
    return value
  }
}

const normalizeRef = (raw: string): string | null => {
  const ref = safeDecode(
    raw
      .trim()
      .replace(/&amp;/g, '&')
      .replace(/^https?:\/\/(www\.)?khujand\.tj/i, '')
      .split(/[?#]/)[0]
  )
  if (!ref || /^[a-z]+:/i.test(ref) || ref.startsWith('//')) return null

  const urlPath = '/' + ref.replace(/^\/+/, '')
  if (!urlPath.toLowerCase().startsWith('/images/')) return null
  if (!ALLOWED_EXT.has(path.extname(urlPath).toLowerCase())) return null

  const diskPath = path.resolve(PUBLIC_DIR, '.' + urlPath)
  if (!diskPath.startsWith(IMAGES_DIR + path.sep)) return null

  return urlPath
}

const isImageBuffer = (buffer: Buffer) => {
  if (buffer.length < 12) return false
  const jpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
  const png = buffer.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))
  const gif = buffer.subarray(0, 3).toString('ascii') === 'GIF'
  const webp =
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  return jpeg || png || gif || webp
}

type FetchResult = { buffer: Buffer } | { buffer: null; retryable: boolean }

const fetchOnce = async (url: string): Promise<FetchResult> => {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KhujandImageSync/1.0)' },
      signal: AbortSignal.timeout(30_000),
    })
    if (!res.ok) {
      return { buffer: null, retryable: res.status === 429 || res.status >= 500 }
    }
    const length = Number(res.headers.get('content-length') ?? 0)
    if (length > MAX_BYTES) return { buffer: null, retryable: false }
    const buffer = Buffer.from(await res.arrayBuffer())
    if (buffer.length > MAX_BYTES || !isImageBuffer(buffer)) {
      return { buffer: null, retryable: false }
    }
    return { buffer }
  } catch {
    return { buffer: null, retryable: true }
  }
}

const fetchImage = async (url: string, attempts = 4): Promise<Buffer | null> => {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const result = await fetchOnce(url)
    if (result.buffer) return result.buffer
    if (!result.retryable) return null
    await sleep(1000 * 2 ** attempt)
  }
  return null
}

type Outcome = 'origin' | 'wayback' | 'missing'

const downloadOne = async (urlPath: string): Promise<Outcome> => {
  const encoded = encodeURI(urlPath)
  const fromOrigin = await fetchImage(ORIGIN + encoded)
  const buffer = fromOrigin ?? (await fetchImage(WAYBACK + ORIGIN + encoded, 1))
  if (!buffer) return 'missing'

  const diskPath = path.resolve(PUBLIC_DIR, '.' + urlPath)
  await mkdir(path.dirname(diskPath), { recursive: true })
  const tmpPath = `${diskPath}.part`
  await writeFile(tmpPath, buffer)
  await rename(tmpPath, diskPath)
  return fromOrigin ? 'origin' : 'wayback'
}

const collectRefs = async (): Promise<string[]> => {
  const raw: string[] = []

  const articles = await prisma.article.findMany({ select: { image: true, thumb: true } })
  for (const article of articles) {
    if (article.image) raw.push(article.image)
    if (article.thumb) raw.push(article.thumb)
  }

  const settings = await prisma.siteSetting.findMany({ select: { value: true } })
  for (const setting of settings) raw.push(setting.value)

  if (includeBodies) {
    const translations = await prisma.articleTranslation.findMany({
      select: { bodyHtml: true },
    })
    const srcRe = /src=["']([^"']+)["']/gi
    for (const translation of translations) {
      for (const match of translation.bodyHtml.matchAll(srcRe)) raw.push(match[1])
    }
  }

  const refs = new Set<string>()
  for (const value of raw) {
    const ref = normalizeRef(value)
    if (ref) refs.add(ref)
  }
  return [...refs]
}

const main = async () => {
  const refs = await collectRefs()
  const missing = refs.filter((ref) => !fs.existsSync(path.resolve(PUBLIC_DIR, '.' + ref)))
  const queue = missing.slice(0, limit)

  console.log(
    `refs: ${refs.length}, missing locally: ${missing.length}, to process: ${queue.length}${dryRun ? ' (dry run)' : ''}`
  )
  if (dryRun || !queue.length) return

  const stats = { origin: 0, wayback: 0, missing: 0 }
  const notFound: string[] = []
  let cursor = 0
  let done = 0

  const worker = async () => {
    while (cursor < queue.length) {
      const urlPath = queue[cursor++]
      const outcome = await downloadOne(urlPath)
      stats[outcome]++
      if (outcome === 'missing') notFound.push(urlPath)
      done++
      if (done % 100 === 0 || done === queue.length) {
        console.log(
          `${done}/${queue.length}  origin=${stats.origin} wayback=${stats.wayback} missing=${stats.missing}`
        )
      }
      await sleep(50)
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker))

  if (notFound.length) {
    await mkdir(path.dirname(REPORT_PATH), { recursive: true })
    await writeFile(REPORT_PATH, notFound.sort().join('\n') + '\n')
    console.log(`not found anywhere: ${notFound.length} → ${path.relative(process.cwd(), REPORT_PATH)}`)
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
