/**
 * Import Joomla dump + seed clone content into Prisma.
 * Usage: npm run db:migrate:joomla [-- dumps/khujand_joomla.sql]
 */
import fs from 'node:fs'
import path from 'node:path'
import { PrismaClient } from '@prisma/client'
import { extractInsertBlocks, parseMysqlRows } from './sql-parse'

const prisma = new PrismaClient()

const dumpPath = path.resolve(
  process.argv[2] || path.join(process.cwd(), 'dumps', 'khujand_joomla.sql')
)

const LANG: Record<number, string> = { 1: 'en', 2: 'ru', 3: 'tg' }

const slugify = (s: string, fallback: string) => {
  const base = (s || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9\u0400-\u04FF]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return base || fallback
}

const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

const firstImg = (html: string): string | null => {
  const m = html.match(/src=["']([^"']+)["']/i)
  if (!m?.[1]) return null
  const src = m[1].replace(/^\/+/, '/')
  return src.startsWith('images/') ? `/${src}` : src.startsWith('/') ? src : `/${src}`
}

const typeForCat = (catid: number): { type: string; categoryKey: string } => {
  if (catid === 55) return { type: 'decision', categoryKey: 'decision' }
  if (catid === 36) return { type: 'news', categoryKey: 'news' }
  return { type: 'page', categoryKey: 'none' }
}

const importFromDump = async () => {
  if (!fs.existsSync(dumpPath)) {
    console.warn(`Dump not found: ${dumpPath} — skipping SQL import`)
    return { content: 0, jf: 0 }
  }

  console.log(`Reading ${dumpPath}...`)
  const sql = fs.readFileSync(dumpPath, 'utf8')

  // JF translations: reference_table=content, fields title/introtext/fulltext
  type JfKey = string
  const jf = new Map<JfKey, string>()
  for (const block of extractInsertBlocks(sql, 'jos_jf_content')) {
    for (const row of parseMysqlRows(block)) {
      // id, language_id, reference_id, reference_table, reference_field, value, ...
      const languageId = Number(row[1])
      const refId = Number(row[2])
      const table = row[3] || ''
      const field = row[4] || ''
      const value = row[5] || ''
      if (table !== 'content') continue
      const locale = LANG[languageId]
      if (!locale) continue
      jf.set(`${refId}:${locale}:${field}`, value)
    }
  }
  console.log(`JF content translations: ${jf.size}`)

  const contentBlocks = extractInsertBlocks(sql, 'jos_content')
  let imported = 0
  let skipped = 0

  for (const block of contentBlocks) {
    const rows = parseMysqlRows(block)
    for (const row of rows) {
      // id, title, alias, title_alias, introtext, fulltext, state, sectionid, mask, catid, created, ...
      const id = Number(row[0])
      const title = row[1] || ''
      const alias = row[2] || ''
      const introtext = row[4] || ''
      const fulltext = row[5] || ''
      const state = Number(row[6])
      const catid = Number(row[9])
      const created = row[10] || ''
      const ordering = Number(row[24] || 0)
      const hits = Number(row[28] || 0)

      if (!id || !title) {
        skipped++
        continue
      }

      // Import published news/decisions primarily; also published pages with real content
      const { type, categoryKey } = typeForCat(catid)
      if (type === 'page' && state !== 1) {
        skipped++
        continue
      }
      if ((type === 'news' || type === 'decision') && state !== 1 && state !== 0) {
        // still import unpublished as draft? skip trash (-2 etc)
        if (state < 0) {
          skipped++
          continue
        }
      }

      const slugBase = slugify(alias || title, `item-${id}`)
      const slug = `${slugBase}-${id}`
      const bodyTg = `${introtext}${fulltext}`
      const image = firstImg(bodyTg)
      const excerptTg = stripHtml(introtext).slice(0, 300)

      const titleRu = jf.get(`${id}:ru:title`) || title
      const titleEn = jf.get(`${id}:en:title`) || title
      const introRu = jf.get(`${id}:ru:introtext`) || introtext
      const introEn = jf.get(`${id}:en:introtext`) || introtext
      const fullRu = jf.get(`${id}:ru:fulltext`) || fulltext
      const fullEn = jf.get(`${id}:en:fulltext`) || fulltext

      const publishedAt =
        created && !created.startsWith('0000') ? new Date(created.replace(' ', 'T') + 'Z') : null

      const showOnHome = type === 'news' && state === 1 && hits > 5000
      const isSlide = false

      const translations = [
        {
          locale: 'tg',
          title,
          excerpt: excerptTg,
          bodyHtml: bodyTg,
          dateLabel: created?.slice(0, 10) || '',
        },
        {
          locale: 'ru',
          title: titleRu,
          excerpt: stripHtml(introRu).slice(0, 300),
          bodyHtml: `${introRu}${fullRu}`,
          dateLabel: created?.slice(0, 10) || '',
        },
        {
          locale: 'en',
          title: titleEn,
          excerpt: stripHtml(introEn).slice(0, 300),
          bodyHtml: `${introEn}${fullEn}`,
          dateLabel: created?.slice(0, 10) || '',
        },
      ]

      const baseData = {
        slug,
        type,
        categoryKey,
        image,
        published: state === 1,
        sortOrder: ordering,
        showOnHome,
        isSlide,
        publishedAt: publishedAt && !Number.isNaN(publishedAt.getTime()) ? publishedAt : null,
        legacyId: id,
      }

      const existing =
        (await prisma.article.findUnique({ where: { legacyId: id } })) ||
        (await prisma.article.findUnique({ where: { slug_type: { slug, type } } }))

      if (existing) {
        await prisma.article.update({
          where: { id: existing.id },
          data: {
            ...baseData,
            // keep home flags if already set by static seed
            showOnHome: existing.showOnHome || showOnHome,
            isSlide: existing.isSlide || isSlide,
            translations: { deleteMany: {}, create: translations },
          },
        })
      } else {
        await prisma.article.create({
          data: {
            ...baseData,
            translations: { create: translations },
          },
        })
      }
      imported++
      if (imported % 100 === 0) console.log(`  imported ${imported}...`)
    }
  }

  return { content: imported, jf: jf.size, skipped }
}

const seedMenuFromStatic = async () => {
  const count = await prisma.menuItem.count()
  if (count > 0) {
    console.log(`Menu already has ${count} items — skip static menu seed`)
    return
  }

  type Raw = {
    label: { tg: string; ru: string; en: string }
    href: string
    children?: Raw[]
  }

  // Minimal top menu matching clone (full tree seeded via import of static later)
  const raw: Raw[] = [
    { label: { tg: 'Cаҳифаи аслӣ', ru: 'Главная', en: 'Home' }, href: '/' },
    {
      label: { tg: 'Мақомоти иҷроия', ru: 'Исполнительная власть', en: 'Executive authority' },
      href: '#',
      children: [
        { label: { tg: 'Раиси шаҳр', ru: 'Председатель города', en: 'City Chairman' }, href: '/rais-shahar' },
        {
          label: { tg: 'Қарорҳои Раиси шаҳр', ru: 'Постановления председателя', en: 'Chairman resolutions' },
          href: '/decisions',
        },
        {
          label: { tg: 'Муовинони Раиси шаҳр', ru: 'Заместители председателя', en: 'Deputy chairmen' },
          href: '/muovinon',
        },
        {
          label: { tg: 'Дастгоҳи Раиси шаҳр', ru: 'Аппарат председателя', en: 'Chairman administration' },
          href: '/dastgoh',
        },
        {
          label: {
            tg: 'Роҳбарони воҳидҳои сохторӣ',
            ru: 'Руководители структурных подразделений',
            en: 'Heads of structural units',
          },
          href: '/rohbaron',
        },
      ],
    },
    {
      label: { tg: 'Сохторҳо', ru: 'Структуры', en: 'Structures' },
      href: '#',
      children: [
        { label: { tg: 'Саноат', ru: 'Промышленность', en: 'Industry' }, href: '/soxtor/sanoat' },
        { label: { tg: 'Маориф', ru: 'Образование', en: 'Education' }, href: '/soxtor/maorif' },
        { label: { tg: 'Варзиш', ru: 'Спорт', en: 'Sports' }, href: '/soxtor/varzish' },
        { label: { tg: 'Фарҳанг', ru: 'Культура', en: 'Culture' }, href: '/soxtor/farhang' },
        { label: { tg: 'Тандурустӣ', ru: 'Здравоохранение', en: 'Healthcare' }, href: '/soxtor/tandurusti' },
        {
          label: { tg: 'Бахши дин', ru: 'Отдел по делам религии', en: 'Religious affairs' },
          href: '/soxtor/bahshi-din',
        },
        {
          label: {
            tg: 'Мактубҳо ва муроҷиати шаҳрвандон',
            ru: 'Письма и обращения граждан',
            en: 'Citizen appeals',
          },
          href: '/soxtor/maktubho',
        },
        {
          label: {
            tg: 'Агентии меҳнат ва шуғли аҳолӣ',
            ru: 'Агентство труда и занятости',
            en: 'Labour and employment agency',
          },
          href: '/soxtor/mehnat',
        },
        { label: { tg: 'Меъморӣ', ru: 'Архитектура', en: 'Architecture' }, href: '/soxtor/memori' },
        { label: { tg: 'Матбуот', ru: 'Пресса', en: 'Press' }, href: '/soxtor/matbuot' },
        { label: { tg: 'Сайёҳӣ', ru: 'Туризм', en: 'Tourism' }, href: '/soxtor/sayohi' },
        {
          label: { tg: 'Сармоягузорӣ', ru: 'Инвестиции', en: 'Investment' },
          href: '/soxtor/sarmoyaguzori',
        },
        {
          label: { tg: 'Иҷроиши буҷет', ru: 'Исполнение бюджета', en: 'Budget execution' },
          href: '/soxtor/budjet',
        },
        { label: { tg: 'Истифодаи замин', ru: 'Использование земли', en: 'Land use' }, href: '/soxtor/zamin' },
        {
          label: { tg: 'Ҳолати фавқулодда', ru: 'Чрезвычайные ситуации', en: 'Emergencies' },
          href: '/soxtor/favqulodda',
        },
        {
          label: { tg: 'Хифзи иҷтимоӣ', ru: 'Социальная защита', en: 'Social protection' },
          href: '/soxtor/hifzi-ijtimoii',
        },
      ],
    },
    { label: { tg: 'Таърихи шаҳр', ru: 'История города', en: 'City history' }, href: '/tarikh' },
    {
      label: { tg: 'Иқтисод', ru: 'Экономика', en: 'Economy' },
      href: '#',
      children: [
        {
          label: { tg: 'Нақлиёт ва алоқа', ru: 'Транспорт и связь', en: 'Transport and communications' },
          href: '/iqtisod/naqliyot',
        },
        {
          label: { tg: 'Савдо ва хизматрасонӣ', ru: 'Торговля и услуги', en: 'Trade and services' },
          href: '/iqtisod/savdo',
        },
        {
          label: {
            tg: 'Лоиҳаҳои сармоягузорӣ',
            ru: 'Инвестиционные проекты',
            en: 'Investment projects',
          },
          href: '/iqtisod/loiha',
        },
      ],
    },
    {
      label: { tg: 'Ба аҳолӣ', ru: 'Населению', en: 'For residents' },
      href: '#',
      children: [
        {
          label: { tg: 'Ба сокинони шаҳр', ru: 'Жителям города', en: 'For city residents' },
          href: '/aholi',
        },
        { label: { tg: 'Бойгонӣ', ru: 'Архив', en: 'Archive' }, href: '/boygoni' },
      ],
    },
  ]

  let order = 0
  const insertTree = async (items: Raw[], parentId: string | null) => {
    for (const item of items) {
      const created = await prisma.menuItem.create({
        data: {
          parentId,
          href: item.href,
          labelTg: item.label.tg,
          labelRu: item.label.ru,
          labelEn: item.label.en,
          sortOrder: order++,
          published: true,
        },
      })
      if (item.children?.length) await insertTree(item.children, created.id)
    }
  }

  await insertTree(raw, null)
  console.log('Menu seeded from static structure')
}

const seedStaticArticles = async () => {
  // Dynamically import clone article sources and upsert by slug+type
  const { getRaisShaharArticle } = await import('../src/data/i18n/articles/rais-shahar')
  const { getDastgohArticle } = await import('../src/data/i18n/articles/dastgoh')
  const { getTarikhArticle } = await import('../src/data/i18n/pages/tarikh')
  const { getAholiArticle } = await import('../src/data/i18n/pages/aholi')
  const { soxtorSlugs, getSoxtorArticle } = await import('../src/data/i18n/pages/soxtor')
  const { iqtisodSlugs, getIqtisodArticle } = await import('../src/data/i18n/pages/iqtisod')
  const { muovinonSlugs, getMuovinonPerson } = await import('../src/data/i18n/categories/muovinon')
  const { rohbaronSlugs, getRohbaronPerson } = await import('../src/data/i18n/categories/rohbaron')
  const { getHomeContent } = await import('../src/data/i18n/home')

  const upsertLocalized = async (opts: {
    slug: string
    type: string
    categoryKey: string
    image?: string | null
    thumb?: string | null
    nameTg?: string
    roleTitleTg?: string
    roleTitleRu?: string
    roleTitleEn?: string
    showOnHome?: boolean
    isSlide?: boolean
    sortOrder?: number
    locales: Record<
      string,
      { title: string; excerpt?: string; bodyHtml?: string; dateLabel?: string; paragraphs?: string[] }
    >
  }) => {
    const existing = await prisma.article.findUnique({
      where: { slug_type: { slug: opts.slug, type: opts.type } },
    })
    const data = {
      categoryKey: opts.categoryKey,
      image: opts.image ?? null,
      thumb: opts.thumb ?? null,
      nameTg: opts.nameTg ?? null,
      roleTitleTg: opts.roleTitleTg ?? null,
      roleTitleRu: opts.roleTitleRu ?? null,
      roleTitleEn: opts.roleTitleEn ?? null,
      showOnHome: opts.showOnHome ?? false,
      isSlide: opts.isSlide ?? false,
      sortOrder: opts.sortOrder ?? 0,
      published: true,
    }
    const translations = Object.entries(opts.locales).map(([locale, t]) => ({
      locale,
      title: t.title,
      excerpt: t.excerpt || '',
      bodyHtml: t.bodyHtml || (t.paragraphs ? t.paragraphs.map((p) => `<p>${p}</p>`).join('') : ''),
      dateLabel: t.dateLabel || '',
      paragraphs: JSON.stringify(t.paragraphs || []),
    }))

    if (existing) {
      await prisma.article.update({
        where: { id: existing.id },
        data: {
          ...data,
          translations: { deleteMany: {}, create: translations },
        },
      })
    } else {
      await prisma.article.create({
        data: {
          slug: opts.slug,
          type: opts.type,
          ...data,
          translations: { create: translations },
        },
      })
    }
  }

  const localesFor = (getter: (lang: 'tg' | 'ru' | 'en') => {
    title: string
    paragraphs?: string[]
    date?: string
    image?: string
    roleTitle?: string
  }) => {
    const tg = getter('tg')
    const ru = getter('ru')
    const en = getter('en')
    return {
      articleMeta: tg,
      locales: {
        tg: { title: tg.title, paragraphs: tg.paragraphs, dateLabel: tg.date || '' },
        ru: { title: ru.title, paragraphs: ru.paragraphs, dateLabel: ru.date || '' },
        en: { title: en.title, paragraphs: en.paragraphs, dateLabel: en.date || '' },
      },
      role: {
        tg: tg.roleTitle,
        ru: ru.roleTitle,
        en: en.roleTitle,
      },
    }
  }

  // rais-shahar
  {
    const { locales, articleMeta, role } = localesFor(getRaisShaharArticle)
    await upsertLocalized({
      slug: 'rais-shahar',
      type: 'profile',
      categoryKey: 'home',
      image: articleMeta.image,
      nameTg: articleMeta.title,
      roleTitleTg: role.tg,
      roleTitleRu: role.ru,
      roleTitleEn: role.en,
      locales,
    })
  }

  {
    const { locales, articleMeta, role } = localesFor(getDastgohArticle)
    await upsertLocalized({
      slug: 'dastgoh',
      type: 'profile',
      categoryKey: 'home',
      image: articleMeta.image,
      nameTg: articleMeta.title,
      roleTitleTg: role.tg,
      roleTitleRu: role.ru,
      roleTitleEn: role.en,
      locales,
    })
  }

  {
    const { locales, articleMeta } = localesFor(getTarikhArticle)
    await upsertLocalized({
      slug: 'tarikh',
      type: 'page',
      categoryKey: 'none',
      image: articleMeta.image,
      locales,
    })
  }

  {
    const { locales, articleMeta } = localesFor(getAholiArticle)
    await upsertLocalized({
      slug: 'aholi',
      type: 'page',
      categoryKey: 'none',
      image: articleMeta.image,
      locales,
    })
  }

  for (const slug of soxtorSlugs) {
    const { locales, articleMeta } = localesFor((lang) => getSoxtorArticle(lang, slug)!)
    await upsertLocalized({
      slug,
      type: 'sector',
      categoryKey: 'soxtor',
      image: articleMeta.image,
      locales,
    })
  }

  for (const slug of iqtisodSlugs) {
    const { locales, articleMeta } = localesFor((lang) => getIqtisodArticle(lang, slug)!)
    await upsertLocalized({
      slug,
      type: 'economy',
      categoryKey: 'iqtisod',
      image: articleMeta.image,
      locales,
    })
  }

  for (const slug of muovinonSlugs) {
    const person = getMuovinonPerson('tg', slug)
    if (!person) continue
    const { locales, articleMeta, role } = localesFor((lang) => getMuovinonPerson(lang, slug)!)
    await upsertLocalized({
      slug,
      type: 'profile',
      categoryKey: 'muovinon',
      image: articleMeta.image,
      nameTg: person.title,
      roleTitleTg: role.tg,
      roleTitleRu: role.ru,
      roleTitleEn: role.en,
      locales,
    })
  }

  for (const slug of rohbaronSlugs) {
    const person = getRohbaronPerson('tg', slug)
    if (!person) continue
    const { locales, articleMeta, role } = localesFor((lang) => getRohbaronPerson(lang, slug)!)
    await upsertLocalized({
      slug,
      type: 'profile',
      categoryKey: 'rohbaron',
      image: articleMeta.image,
      nameTg: person.title,
      roleTitleTg: role.tg,
      roleTitleRu: role.ru,
      roleTitleEn: role.en,
      locales,
    })
  }

  // Home slides + news teasers from static home content → DB articles
  const homeTg = getHomeContent('tg')
  const homeRu = getHomeContent('ru')
  const homeEn = getHomeContent('en')

  const upsertHomeNews = async (opts: {
    slug: string
    legacyId?: number
    image?: string
    thumb?: string
    showOnHome: boolean
    isSlide: boolean
    sortOrder: number
    locales: Record<string, { title: string; excerpt?: string; dateLabel?: string }>
  }) => {
    const translations = Object.entries(opts.locales).map(([locale, t]) => ({
      locale,
      title: t.title,
      excerpt: t.excerpt || '',
      bodyHtml: '',
      dateLabel: t.dateLabel || '',
      paragraphs: '[]',
    }))
    const base = {
      slug: opts.slug,
      type: 'news',
      categoryKey: 'news',
      image: opts.image ?? null,
      thumb: opts.thumb ?? null,
      showOnHome: opts.showOnHome,
      isSlide: opts.isSlide,
      sortOrder: opts.sortOrder,
      published: true,
    }

    if (opts.legacyId) {
      await prisma.article.upsert({
        where: { legacyId: opts.legacyId },
        update: {
          ...base,
          translations: { deleteMany: {}, create: translations },
        },
        create: {
          ...base,
          legacyId: opts.legacyId,
          translations: { create: translations },
        },
      })
      return
    }

    const existing = await prisma.article.findUnique({
      where: { slug_type: { slug: opts.slug, type: 'news' } },
    })
    if (existing) {
      await prisma.article.update({
        where: { id: existing.id },
        data: { ...base, translations: { deleteMany: {}, create: translations } },
      })
    } else {
      await prisma.article.create({
        data: { ...base, translations: { create: translations } },
      })
    }
  }

  for (let i = 0; i < homeTg.slides.length; i++) {
    const tg = homeTg.slides[i]!
    const ru = homeRu.slides[i]!
    const en = homeEn.slides[i]!
    const legacyMatch = tg.href.match(/[?&]id=(\d+)/)
    const legacyId = legacyMatch ? Number(legacyMatch[1]) : undefined
    const slug = legacyId ? `news-${legacyId}` : `slide-${i + 1}`
    await upsertHomeNews({
      slug,
      legacyId,
      image: tg.image,
      thumb: tg.thumb,
      showOnHome: true,
      isSlide: true,
      sortOrder: i,
      locales: {
        tg: { title: tg.title, excerpt: tg.excerpt },
        ru: { title: ru.title, excerpt: ru.excerpt },
        en: { title: en.title, excerpt: en.excerpt },
      },
    })
  }

  for (let i = 0; i < homeTg.newsItems.length; i++) {
    const tg = homeTg.newsItems[i]!
    const ru = homeRu.newsItems[i]!
    const en = homeEn.newsItems[i]!
    const legacyMatch = tg.href.match(/[?&]id=(\d+)/)
    const legacyId = legacyMatch ? Number(legacyMatch[1]) : undefined
    const slug = legacyId ? `news-${legacyId}` : `news-home-${i + 1}`
    await upsertHomeNews({
      slug,
      legacyId,
      image: tg.image,
      showOnHome: true,
      isSlide: false,
      sortOrder: 100 + i,
      locales: {
        tg: { title: tg.title, excerpt: tg.excerpt, dateLabel: tg.date },
        ru: { title: ru.title, excerpt: ru.excerpt, dateLabel: ru.date },
        en: { title: en.title, excerpt: en.excerpt, dateLabel: en.date },
      },
    })
  }

  await prisma.siteSetting.upsert({
    where: { key: 'youtubeEmbed' },
    update: { value: homeTg.youtubeEmbed },
    create: { key: 'youtubeEmbed', value: homeTg.youtubeEmbed },
  })
  await prisma.siteSetting.upsert({
    where: { key: 'gismeteoInformerHash' },
    update: { value: homeTg.gismeteoInformerHash },
    create: { key: 'gismeteoInformerHash', value: homeTg.gismeteoInformerHash },
  })

  console.log('Static clone articles seeded')
}

const main = async () => {
  console.log('=== Joomla / static content import ===')
  await seedMenuFromStatic()
  await seedStaticArticles()
  const result = await importFromDump()
  console.log('SQL import result:', result)
  const counts = {
    articles: await prisma.article.count(),
    translations: await prisma.articleTranslation.count(),
    menu: await prisma.menuItem.count(),
  }
  console.log('DB counts:', counts)
  console.log('OK')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
