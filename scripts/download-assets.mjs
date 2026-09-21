import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { dirname, join, extname } from 'node:path'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(import.meta.url), '../..')
const PUBLIC = join(ROOT, 'public')
const BASE = 'https://khujand.tj'

const CSS_FILES = [
  '/templates/yoo_flux/css/reset.css',
  '/templates/yoo_flux/css/layout.css',
  '/templates/yoo_flux/css/typography.css',
  '/templates/yoo_flux/css/menus.css',
  '/templates/yoo_flux/css/modules.css',
  '/templates/yoo_flux/css/joomla.css',
  '/templates/yoo_flux/css/extensions.css',
  '/templates/yoo_flux/css/custom.css',
  '/templates/yoo_flux/css/template.css',
  '/modules/mod_icetabs/themes/candy/assets/style.css',
  '/modules/mod_lofarticlesscroller/assets/style.css',
  '/modules/mod_news_pro_gk4/interface/css/style.css',
  '/modules/mod_jflanguageselection/tmpl/mod_jflanguageselection.css',
  '/plugins/content/mavikthumbnails/slimbox-mt1.1/css/slimbox.css',
  '/plugins/system/yoo_effects/lightbox/shadowbox.css',
  '/components/com_jcomments/tpl/default/style.css',
]

const EXTRA_PATHS = [
  '/images/tj.png',
  '/images/ru.png',
  '/images/stories/banners/banner -110.jpg',
  '/images/stories/banners/search.png',
  '/images/stories/banners/sites.png',
  '/images/stories/banners/email.png',
  '/images/stories/banners/javonon.png',
  '/images/stories/banners/maorif.png',
  '/images/stories/fsharifzoda3.jpg',
  '/images/stories/4150.jpg',
  '/images/stories/4485.jpg',
  '/images/stories/4486.jpg',
  '/images/stories/4487.jpg',
  '/images/stories/4488.jpg',
  '/images/stories/4489.jpg',
  '/images/stories/4490.jpg',
  '/templates/yoo_flux/favicon.ico',
  '/templates/yoo_flux/apple_touch_icon.png',
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const toLocalPath = (urlPath) => {
  const clean = urlPath.split('?')[0]
  return join(PUBLIC, clean.replace(/^\//, ''))
}

const fetchBuffer = async (url) => {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; KhujandClone/1.0)',
      Accept: '*/*',
    },
  })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

const download = async (urlPath) => {
  const local = toLocalPath(urlPath)
  if (existsSync(local)) return local
  await mkdir(dirname(local), { recursive: true })
  const url = urlPath.startsWith('http') ? urlPath : `${BASE}${urlPath}`
  try {
    const buf = await fetchBuffer(url)
    await writeFile(local, buf)
    console.log('OK', urlPath)
    return local
  } catch (err) {
    console.warn('FAIL', urlPath, err.message)
    return null
  }
}

const extractUrls = (css, baseDir) => {
  const urls = []
  const re = /url\(\s*['"]?([^'")]+)['"]?\s*\)/gi
  let m
  while ((m = re.exec(css))) {
    let u = m[1].trim()
    if (u.startsWith('data:') || u.startsWith('#')) continue
    if (u.startsWith('http://') || u.startsWith('https://')) {
      if (u.includes('khujand.tj')) {
        urls.push(u.replace(/^https?:\/\/khujand\.tj/, ''))
      }
      continue
    }
    // resolve relative to css file directory
    const base = baseDir.replace(/\\/g, '/')
    if (u.startsWith('/')) {
      urls.push(u.split('?')[0])
    } else {
      const parts = `${base}/${u}`.split('/')
      const resolved = []
      for (const p of parts) {
        if (!p || p === '.') continue
        if (p === '..') resolved.pop()
        else resolved.push(p.split('?')[0])
      }
      urls.push('/' + resolved.join('/'))
    }
  }
  return urls
}

const extractHtmlAssets = async () => {
  const html = await readFile(join(ROOT, 'source/index.html'), 'utf8')
  const paths = new Set()
  const re = /(?:src|href)=["']([^"']+)["']/gi
  let m
  while ((m = re.exec(html))) {
    let u = m[1]
    if (u.startsWith('data:') || u.startsWith('#') || u.startsWith('mailto:')) continue
    if (u.includes('youtube') || u.includes('gismeteo')) continue
    if (u.startsWith('https://khujand.tj')) u = u.replace('https://khujand.tj', '')
    if (u.startsWith('http://khujand.tj')) u = u.replace('http://khujand.tj', '')
    if (u.startsWith('http://www.khujand.tj')) u = u.replace('http://www.khujand.tj', '')
    if (u.startsWith('/') && !u.startsWith('//') && !u.includes('.php') && !u.includes('index.php')) {
      const ext = extname(u.split('?')[0]).toLowerCase()
      if (['.jpg', '.jpeg', '.png', '.gif', '.ico', '.cur', '.css', '.swf', '.webp'].includes(ext)) {
        paths.add(u.split('?')[0])
      }
    }
  }
  // also plain paths that look like images in content
  const imgRe = /\/images\/[^"' \s>]+\.(?:jpg|jpeg|png|gif)/gi
  while ((m = imgRe.exec(html))) {
    paths.add(m[0].replace(/&amp;/g, '&').split('?')[0])
  }
  return [...paths]
}

const main = async () => {
  const queue = new Set([...CSS_FILES, ...EXTRA_PATHS])
  for (const p of await extractHtmlAssets()) queue.add(p)

  // download CSS first, then discover more urls
  for (const cssPath of CSS_FILES) {
    await download(cssPath)
    await sleep(80)
  }

  for (const cssPath of CSS_FILES) {
    const local = toLocalPath(cssPath)
    if (!existsSync(local)) continue
    let css = await readFile(local, 'utf8')
    const baseDir = dirname(cssPath)
    for (const u of extractUrls(css, baseDir)) queue.add(u)
    // localize absolute khujand urls in css
    css = css.replace(/https?:\/\/khujand\.tj/g, '')
    // localize @import remote
    css = css.replace(/@import\s+url\(\s*https?:\/\/khujand\.tj([^)]+)\)/gi, '@import url($1)')
    await writeFile(local, css)
  }

  // also process source styles.css snippets later

  for (const p of [...queue]) {
    if (p.endsWith('.css') && CSS_FILES.includes(p.split('?')[0])) continue
    await download(p.split('?')[0])
    await sleep(50)
  }

  // second pass: downloaded css from modules may have more urls
  // walk public for css and pull urls
  const { readdir } = await import('node:fs/promises')
  const walk = async (dir) => {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const e of entries) {
      const full = join(dir, e.name)
      if (e.isDirectory()) await walk(full)
      else if (e.name.endsWith('.css')) {
        let css = await readFile(full, 'utf8')
        const rel = '/' + full.replace(PUBLIC, '').replace(/\\/g, '/').replace(/^\//, '')
        const baseDir = dirname(rel)
        const urls = extractUrls(css, baseDir)
        for (const u of urls) {
          await download(u)
          await sleep(40)
        }
        css = css.replace(/https?:\/\/khujand\.tj/g, '')
        await writeFile(full, css)
      }
    }
  }
  await walk(PUBLIC)
  console.log('Done')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
