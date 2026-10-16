import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'

const ROOT = join(fileURLToPath(import.meta.url), '../..')
const html = await readFile(join(ROOT, 'source/index.html'), 'utf8')

const text = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/Â/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const cleanHref = (href = '#') => {
  let h = href.replace(/&amp;/g, '&')
  if (h.startsWith('https://khujand.tj')) return h
  if (h.startsWith('http://khujand.tj') || h.startsWith('http://www.khujand.tj')) {
    return h.replace(/^https?:\/\/(www\.)?khujand\.tj/, 'https://khujand.tj')
  }
  const q = h.match(/(\?option=com_content[^"'#]*)/)
  if (q) return `https://khujand.tj/index.php${q[1]}`
  if (h.startsWith('/')) return `https://khujand.tj${h.split('#')[0]}` + (h.includes('#') ? h.slice(h.indexOf('#')) : '')
  return h || '#'
}

const saveDataUri = async (dataUri, prefix = 'img') => {
  if (!dataUri?.startsWith('data:')) return dataUri
  const m = dataUri.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/)
  if (!m) return dataUri
  const ext = m[1] === 'jpeg' ? 'jpg' : m[1].replace('+xml', '')
  const buf = Buffer.from(m[2], 'base64')
  const hash = createHash('md5').update(buf).digest('hex').slice(0, 12)
  const rel = `/images/extracted/${prefix}-${hash}.${ext}`
  const abs = join(ROOT, 'public', rel.slice(1))
  if (!existsSync(abs)) {
    await mkdir(dirname(abs), { recursive: true })
    await writeFile(abs, buf)
  }
  return rel
}

const decode = (s) => s.replace(/&amp;/g, '&')

// --- MENU ---
const menuBlock = html.match(/<ul class="menu menu-dropdown">([\s\S]*?)<\/ul>\s*<div class="fancy bg1">/)?.[1] || ''
const topItems = []
const topRe = /<li class="level1[^"]*"[^>]*>([\s\S]*?)(?=<li class="level1|$)/g
let tm
while ((tm = topRe.exec(menuBlock))) {
  const block = tm[1]
  const label = text(block.match(/<span class="bg\s*">([\s\S]*?)<\/span>/)?.[1] || '')
  const hrefMatch = block.match(/<a[^>]+href="([^"]+)"[^>]*class="level1/)
  const href = hrefMatch ? cleanHref(hrefMatch[1]) : '#'
  const children = []
  const childRe = /<a[^>]+href="([^"]+)"[^>]*class="level2[^"]*"[^>]*>[\s\S]*?<span class="bg\s*">([\s\S]*?)<\/span>/g
  let cm
  while ((cm = childRe.exec(block))) {
    children.push({ label: text(cm[2]), href: cleanHref(cm[1]) })
  }
  topItems.push({ label, href: children.length ? '#' : href, children: children.length ? children : undefined })
}

await writeFile(
  join(ROOT, 'src/data/menu.ts'),
  `export type MenuItem = {
  label: string
  href: string
  children?: MenuItem[]
}

export const mainMenu: MenuItem[] = ${JSON.stringify(topItems, null, 2)}
`
)

// --- SLIDES ---
const slides = []
const iceNav = html.match(/<ul class="ice-navigator"[\s\S]*?<\/ul>/)?.[0] || ''
const navThumbs = [...iceNav.matchAll(/<li[^>]*>[\s\S]*?<img\s+src="(data:image[^"]+|[^"]+)"[\s\S]*?<h4 class="ice-title">([\s\S]*?)<\/h4>/g)]

const iceMains = [...html.matchAll(/<div class="ice-main-item"[^>]*>[\s\S]*?<h3 class="ice-title">([\s\S]*?)<\/h3>([\s\S]*?)<a class="ice-readmore"[^>]*href="([^"]+)"/g)]

for (let i = 0; i < iceMains.length; i++) {
  const title = text(iceMains[i][1])
  const body = iceMains[i][2]
  const href = cleanHref(iceMains[i][3])
  const thumbData = navThumbs[i]?.[1]
  const mainImg = body.match(/href="(\/images\/[^"]+)"/)?.[1] || body.match(/mce_src="(\/images\/[^"]+)"/)?.[1]
  const excerptMatch = body.match(/<\/a>([\s\S]*?)<\/p>/)
  const excerpt = text(excerptMatch?.[1] || body).slice(0, 280)
  const thumb = thumbData ? await saveDataUri(thumbData, 'ice-thumb') : mainImg || ''
  slides.push({
    title,
    excerpt,
    href,
    image: mainImg || '/images/stories/4150.jpg',
    thumb,
  })
}

// --- NEWS ---
const contentStart = html.indexOf('id="content"')
const leftStart = html.indexOf('id="left"')
const content = html.slice(contentStart, leftStart)
const items = [...content.matchAll(/<div class="item\s*">([\s\S]*?)<div class="jcomments-links">([\s\S]*?)<\/div>/g)]
const newsItems = []
for (const item of items) {
  const block = item[1] + item[2]
  const titleA = block.match(/<h1 class="title">\s*<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/)
  const date = text(block.match(/<span class="created">([\s\S]*?)<\/span>/)?.[1] || '')
  const img = block.match(/mce_src="(\/images\/[^"]+)"/)?.[1] || block.match(/href="(\/images\/stories\/[^"]+\.jpg)"/)?.[1]
  const paras = [...block.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((p) => text(p[1])).filter((t) => t && !t.includes('articleinfo'))
  const excerpt = paras.filter((p) => !/^\d/.test(p)).join(' ').slice(0, 320)
  if (!titleA) continue
  newsItems.push({
    title: text(titleA[2]),
    href: cleanHref(titleA[1]),
    date,
    image: img || '',
    excerpt,
  })
}

// --- LOF ---
const extractLof = async (id, title) => {
  const re = new RegExp(`id="${id}"[\\s\\S]*?<div class="lof-main-wapper"[^>]*>([\\s\\S]*?)<\\/div>\\s*<div class="lof-navigator`, 'i')
  let block = html.match(re)?.[1]
  if (!block) {
    // fallback: between id and next module header or end of scroller
    const start = html.indexOf(`id="${id}"`)
    if (start < 0) return { title, items: [] }
    block = html.slice(start, start + 80000)
  }
  const entries = [...block.matchAll(/<div class="lof-inner">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g)]
  const itemsOut = []
  for (const e of entries) {
    const b = e[1]
    const titleText = text(b.match(/class="lof-title"[^>]*>([\s\S]*?)<\/a>/)?.[1] || '')
    const href = cleanHref(b.match(/class="lof-title"[^>]*href="([^"]+)"/)?.[1] || b.match(/href="([^"]+)"/)?.[1] || '#')
    const imgSrc = b.match(/<img[^>]+src="([^"]+)"/)?.[1]
    const image = imgSrc?.startsWith('data:') ? await saveDataUri(imgSrc, 'lof') : imgSrc || ''
    const desc = text(b.replace(/<a[\s\S]*?<\/a>/g, ' ')).replace(titleText, '').trim().slice(0, 200)
    if (titleText) itemsOut.push({ title: titleText, href, image, description: desc })
  }
  // dedupe by title
  const seen = new Set()
  return {
    title,
    items: itemsOut.filter((i) => {
      if (seen.has(i.title)) return false
      seen.add(i.title)
      return true
    }),
  }
}

const deputies = await extractLof('lofarticlessroller230', 'Муовинони Раиси шаҳр')
const leaders = await extractLof('lofarticlessroller224', 'Роҳбарони сохторҳо')

// --- NSP ---
const nspBlock = html.match(/id="nsp-nsp_228"[\s\S]*?<\/div>\s*<script/)?.[0] || html.match(/id="nsp-nsp_228"[\s\S]{0,15000}/)?.[0] || ''
const nspItems = []
const nspRe = /class="nsp_header[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g
let nm
while ((nm = nspRe.exec(nspBlock))) {
  nspItems.push({ title: text(nm[2]), href: cleanHref(nm[1]) })
}
// also try alternate
if (!nspItems.length) {
  const alt = [...html.matchAll(/class="nsp_header[^"]*"[^>]*href="([^"]+)"[^>]*title="([^"]+)"/g)]
  for (const a of alt) nspItems.push({ title: decode(a[2]), href: cleanHref(a[1]) })
}

// --- Gismeteo / YouTube ---
const youtubeEmbed = html.match(/https:\/\/www\.youtube\.com\/embed\/[^"']+/)?.[0] || 'https://www.youtube.com/embed/U96P8jb8TNs'
const gismeteoHtml = html.match(/<div[^>]*class="[^"]*gismeteo[^"]*"[\s\S]*?<\/div>/i)?.[0]
  || html.match(/gismeteo[\s\S]{0,2000}/)?.[0]
  || ''

const home = `/* Extracted from source/index.html woblo dump of khujand.tj homepage.
 * Found: ${slides.length} IceTabs slides, ${newsItems.length} news items,
 * LOF deputies ${deputies.items.length}, leaders ${leaders.items.length}, NSP ${nspItems.length}.
 */

export type Slide = {
  title: string
  excerpt: string
  href: string
  image: string
  thumb: string
}

export type NewsItem = {
  title: string
  href: string
  date: string
  image: string
  excerpt: string
}

export type LofItem = {
  title: string
  href: string
  image: string
  description: string
}

export type LofBlock = {
  title: string
  items: LofItem[]
}

export type LinkItem = {
  title: string
  href: string
}

export const slides: Slide[] = ${JSON.stringify(slides, null, 2)}

export const newsItems: NewsItem[] = ${JSON.stringify(newsItems, null, 2)}

export const mayor = {
  name: 'Фирдавс Шарифзода',
  image: '/images/stories/fsharifzoda3.jpg',
  href: 'https://khujand.tj/index.php?option=com_content&view=article&id=1998&Itemid=187&lang=tg',
}

export const deputies: LofBlock = ${JSON.stringify(deputies, null, 2)}

export const leaders: LofBlock = ${JSON.stringify(leaders, null, 2)}

export const decisions: LinkItem[] = ${JSON.stringify(nspItems, null, 2)}

export const banners = [
  { href: 'https://khujand.tj/', image: '/images/stories/banners/maorif.png', alt: 'Маориф' },
  { href: 'https://khujand.tj/', image: '/images/stories/banners/javonon.png', alt: 'Ҷавонон' },
]

export const youtubeEmbed = ${JSON.stringify(youtubeEmbed)}

export const gismeteoInformerHash = 'i1K481wLf8MI5G'

export const footer = {
  title: 'Робита:',
  lines: [
    'Ҷумҳурии Тоҷикистон, вилояти Суғд,',
    'шаҳри Хуҷанд, хиёбони Р.Набиев 39.',
    'Тел:/Факс: 992 3422 6-02-44, 992 3422 6-08-65',
  ],
  email: 'rais@khujand.tj',
  site: 'www.khujand.tj',
  siteHref: 'https://khujand.tj',
}
`

await mkdir(join(ROOT, 'src/data'), { recursive: true })
await writeFile(join(ROOT, 'src/data/home.ts'), home)
console.log({
  menu: topItems.length,
  slides: slides.length,
  news: newsItems.length,
  deputies: deputies.items.length,
  leaders: leaders.items.length,
  nsp: nspItems.length,
})
