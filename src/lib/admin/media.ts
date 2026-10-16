import { mkdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { randomBytes } from 'node:crypto'
import { prisma } from '@/lib/db'
import { writeAudit } from '@/lib/admin/audit'
import { err, ok, type AdminResult } from '@/lib/admin/result'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const MAX_BYTES = 5 * 1024 * 1024

const ALLOWED_EXT = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.pdf',
])

const EXT_MIME: Record<string, string[]> = {
  '.jpg': ['image/jpeg'],
  '.jpeg': ['image/jpeg'],
  '.png': ['image/png'],
  '.webp': ['image/webp'],
  '.gif': ['image/gif'],
  '.pdf': ['application/pdf'],
}

const matchMagic = (buffer: Buffer, ext: string): boolean => {
  if (ext === '.jpg' || ext === '.jpeg') {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
  }
  if (ext === '.png') {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    )
  }
  if (ext === '.gif') {
    return buffer.subarray(0, 3).toString('ascii') === 'GIF'
  }
  if (ext === '.webp') {
    return (
      buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
      buffer.subarray(8, 12).toString('ascii') === 'WEBP'
    )
  }
  if (ext === '.pdf') {
    return buffer.subarray(0, 4).toString('ascii') === '%PDF'
  }
  return false
}

export const uploadMedia = async (
  file: File,
  alt: string,
  userId: string
): Promise<AdminResult<{ id: string; path: string }>> => {
  if (!(file instanceof File) || file.size === 0) {
    return err('Файл не выбран')
  }
  if (file.size > MAX_BYTES) {
    return err('Файл больше 5 МБ')
  }

  const ext = path.extname(file.name).toLowerCase() || ''
  if (!ALLOWED_EXT.has(ext)) {
    return err('Разрешены только jpg, png, webp, gif, pdf')
  }

  const allowedMimes = EXT_MIME[ext] ?? []
  if (file.type && allowedMimes.length && !allowedMimes.includes(file.type)) {
    return err('MIME-тип файла не соответствует расширению')
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  if (!matchMagic(buffer, ext)) {
    return err('Содержимое файла не прошло проверку')
  }

  const safeName = `${Date.now()}-${randomBytes(6).toString('hex')}${ext}`
  await mkdir(UPLOAD_DIR, { recursive: true })
  const diskPath = path.join(UPLOAD_DIR, safeName)
  await writeFile(diskPath, buffer)

  const publicPath = `/uploads/${safeName}`
  const row = await prisma.media.create({
    data: { path: publicPath, alt: alt.trim() },
  })

  await writeAudit({
    userId,
    action: 'create',
    entity: 'media',
    entityId: row.id,
    meta: { path: publicPath },
  })

  return ok({ id: row.id, path: publicPath })
}

export const deleteMedia = async (
  id: string,
  userId: string
): Promise<AdminResult> => {
  try {
    const row = await prisma.media.findUnique({ where: { id } })
    if (!row) return err('Файл не найден')

    await prisma.media.delete({ where: { id } })

    if (row.path.startsWith('/uploads/')) {
      const diskPath = path.join(process.cwd(), 'public', row.path.replace(/^\//, ''))
      try {
        await unlink(diskPath)
      } catch {
        // file may already be missing
      }
    }

    await writeAudit({
      userId,
      action: 'delete',
      entity: 'media',
      entityId: id,
      meta: { path: row.path },
    })

    return ok()
  } catch {
    return err('Не удалось удалить медиа')
  }
}
