import type { BreadcrumbCrumb } from '@/components/ContentWrapper'
import { getBoygoniCategory } from '@/data/i18n/categories/boygoni'
import { getMuovinonCategory, getMuovinonPerson, muovinonSlugs } from '@/data/i18n/categories/muovinon'
import { getRohbaronCategory, getRohbaronPerson, rohbaronSlugs } from '@/data/i18n/categories/rohbaron'
import { getDastgohArticle } from '@/data/i18n/articles/dastgoh'
import { getRaisShaharArticle } from '@/data/i18n/articles/rais-shahar'
import type { SiteArticle } from '@/data/i18n/articles/types'
import { getAholiArticle } from '@/data/i18n/pages/aholi'
import { getIqtisodArticle, iqtisodSlugs } from '@/data/i18n/pages/iqtisod'
import { getSoxtorArticle, soxtorSlugs } from '@/data/i18n/pages/soxtor'
import { getTarikhArticle } from '@/data/i18n/pages/tarikh'
import { prisma } from '@/lib/db'
import type { Locale } from '@/lib/i18n'
import { withLangPath } from '@/lib/i18n'
import { getUiFromDb } from '@/lib/content/ui'
import type { DbArticle } from '@/lib/content/types'

type ArticleWithTranslations = DbArticle | null

const fetchArticle = async (slug: string, type: string) =>
  prisma.article.findFirst({
    where: { slug, type, published: true },
    include: { translations: true },
  })

const localeField = (lang: Locale) => lang

const tr = (article: DbArticle, lang: Locale) =>
  article.translations.find((t: DbArticle['translations'][number]) => t.locale === localeField(lang)) ??
  article.translations.find((t: DbArticle['translations'][number]) => t.locale === 'tg')

export const bodyToParagraphs = (bodyHtml: string, paragraphsJson: string): string[] => {
  if (paragraphsJson && paragraphsJson !== '[]') {
    try {
      const parsed = JSON.parse(paragraphsJson) as unknown
      if (Array.isArray(parsed) && parsed.every((p) => typeof p === 'string')) {
        return parsed.filter(Boolean)
      }
    } catch {
      /* use bodyHtml */
    }
  }
  if (!bodyHtml.trim()) return []
  const stripped = bodyHtml
    .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .trim()
  return stripped.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
}

const roleTitleFor = (article: DbArticle, lang: Locale) => {
  if (lang === 'ru') return article.roleTitleRu ?? undefined
  if (lang === 'en') return article.roleTitleEn ?? undefined
  return article.roleTitleTg ?? undefined
}

const displayName = (article: DbArticle, lang: Locale) => {
  if (lang === 'ru') return article.nameRu ?? ''
  if (lang === 'en') return article.nameEn ?? ''
  return article.nameTg ?? ''
}

export const mapArticleToSite = async (
  article: DbArticle,
  lang: Locale,
  crumbs: BreadcrumbCrumb[]
): Promise<SiteArticle> => {
  const translation = tr(article, lang)
  const title = translation?.title ?? article.slug
  const date = translation?.dateLabel ?? ''
  const paragraphs = bodyToParagraphs(translation?.bodyHtml ?? '', translation?.paragraphs ?? '[]')

  return {
    slug: article.slug,
    title,
    date,
    image: article.image ?? undefined,
    imageAlt: article.imageAlt ?? title,
    imageWidth: article.imageWidth ?? undefined,
    imageHeight: article.imageHeight ?? undefined,
    roleTitle: roleTitleFor(article, lang),
    paragraphs,
    rating: {
      votes: article.ratingVotes,
      average: article.ratingAverage,
      max: 5,
    },
    crumbs,
  }
}

export const getArticleBySlug = async (
  slug: string,
  type: string,
  lang: Locale,
  crumbs: BreadcrumbCrumb[]
): Promise<SiteArticle | null> => {
  try {
    const article = await fetchArticle(slug, type)
    if (!article) return null
    return mapArticleToSite(article, lang, crumbs)
  } catch {
    return null
  }
}

const listPublished = async (type: string, categoryKey?: string, take = 200) => {
  try {
    return prisma.article.findMany({
      where: {
        type,
        published: true,
        ...(categoryKey ? { categoryKey } : {}),
      },
      include: { translations: true },
      orderBy: [{ publishedAt: 'desc' }, { sortOrder: 'asc' }, { updatedAt: 'desc' }],
      take,
    })
  } catch {
    return []
  }
}

export const getMuovinonCategoryFromDb = async (lang: Locale) => {
  const ui = await getUiFromDb(lang)
  const crumbs: BreadcrumbCrumb[] = [
    { label: ui.breadcrumb, href: withLangPath('/', lang) },
    { label: ui.executive },
    { label: ui.deputies },
  ]

  const rows = await listPublished('profile', 'muovinon')
  if (!rows.length) return getMuovinonCategory(lang)

  return {
    title: ui.deputies,
    crumbs,
    items: rows.map((row: DbArticle) => {
      const translation = tr(row, lang)
      const title = displayName(row, lang) || translation?.title || row.slug
      const hrefBase = row.slug === 'homidzoda' ? '/dastgoh' : `/muovinon/${row.slug}`
      return {
        title,
        href: withLangPath(hrefBase, lang),
        image: row.image ?? row.thumb ?? undefined,
        excerpt: translation?.excerpt ?? '',
      }
    }),
  }
}

export const getMuovinonPersonFromDb = async (lang: Locale, slug: string) => {
  const ui = await getUiFromDb(lang)
  const hrefBase = slug === 'homidzoda' ? '/dastgoh' : `/muovinon/${slug}`
  const crumbs: BreadcrumbCrumb[] = [
    { label: ui.breadcrumb, href: withLangPath('/', lang) },
    { label: ui.executive },
    { label: ui.deputies, href: withLangPath('/muovinon', lang) },
    { label: slug, href: withLangPath(hrefBase, lang) },
  ]

  const fromDb = await getArticleBySlug(slug, 'profile', lang, crumbs)
  if (fromDb) {
    const row = await fetchArticle(slug, 'profile')
    if (row) {
      const name = displayName(row, lang)
      if (name) fromDb.title = name
    }
    return fromDb
  }
  return getMuovinonPerson(lang, slug)
}

export const getRohbaronCategoryFromDb = async (lang: Locale) => {
  const ui = await getUiFromDb(lang)
  const crumbs: BreadcrumbCrumb[] = [
    { label: ui.breadcrumb, href: withLangPath('/', lang) },
    { label: ui.executive },
    { label: ui.leadersMenu, href: withLangPath('/rohbaron', lang) },
  ]

  const rows = await listPublished('profile', 'rohbaron')
  if (!rows.length) return getRohbaronCategory(lang)

  return {
    title: ui.leadersMenu,
    crumbs,
    items: rows.map((row: DbArticle) => {
      const translation = tr(row, lang)
      const title = displayName(row, lang) || translation?.title || row.slug
      return {
        title,
        href: withLangPath(`/rohbaron/${row.slug}`, lang),
        image: row.image ?? row.thumb ?? undefined,
        excerpt: translation?.excerpt ?? '',
      }
    }),
  }
}

export const getRohbaronPersonFromDb = async (lang: Locale, slug: string) => {
  const ui = await getUiFromDb(lang)
  const crumbs: BreadcrumbCrumb[] = [
    { label: ui.breadcrumb, href: withLangPath('/', lang) },
    { label: ui.executive },
    { label: ui.leadersMenu, href: withLangPath('/rohbaron', lang) },
    { label: slug, href: withLangPath(`/rohbaron/${slug}`, lang) },
  ]

  const fromDb = await getArticleBySlug(slug, 'profile', lang, crumbs)
  if (fromDb) {
    const row = await fetchArticle(slug, 'profile')
    if (row) {
      const name = displayName(row, lang)
      if (name) fromDb.title = name
    }
    return fromDb
  }
  return getRohbaronPerson(lang, slug)
}

export const getSoxtorArticleFromDb = async (lang: Locale, slug: string) => {
  const ui = await getUiFromDb(lang)
  const crumbs: BreadcrumbCrumb[] = [
    { label: ui.breadcrumb, href: withLangPath('/', lang) },
    { label: ui.structures },
    { label: slug, href: withLangPath(`/soxtor/${slug}`, lang) },
  ]
  const fromDb = await getArticleBySlug(slug, 'sector', lang, crumbs)
  if (fromDb) return fromDb
  return getSoxtorArticle(lang, slug)
}

export const getIqtisodArticleFromDb = async (lang: Locale, slug: string) => {
  const ui = await getUiFromDb(lang)
  const crumbs: BreadcrumbCrumb[] = [
    { label: ui.breadcrumb, href: withLangPath('/', lang) },
    { label: ui.economy },
    { label: slug, href: withLangPath(`/iqtisod/${slug}`, lang) },
  ]
  const fromDb = await getArticleBySlug(slug, 'economy', lang, crumbs)
  if (fromDb) return fromDb
  return getIqtisodArticle(lang, slug)
}

export const getRaisShaharArticleFromDb = async (lang: Locale) => {
  const ui = await getUiFromDb(lang)
  const crumbs: BreadcrumbCrumb[] = [
    { label: ui.breadcrumb, href: withLangPath('/', lang) },
    { label: ui.executive },
    { label: ui.mayor, href: withLangPath('/rais-shahar', lang) },
  ]
  const fromDb = await getArticleBySlug('rais-shahar', 'page', lang, crumbs)
  if (fromDb) return fromDb
  return getRaisShaharArticle(lang)
}

export const getDastgohArticleFromDb = async (lang: Locale) => {
  const ui = await getUiFromDb(lang)
  const crumbs: BreadcrumbCrumb[] = [
    { label: ui.breadcrumb, href: withLangPath('/', lang) },
    { label: ui.executive },
    { label: ui.administration, href: withLangPath('/dastgoh', lang) },
  ]
  const fromDb = await getArticleBySlug('dastgoh', 'page', lang, crumbs)
  if (fromDb) return fromDb
  return getDastgohArticle(lang)
}

export const getTarikhArticleFromDb = async (lang: Locale) => {
  const ui = await getUiFromDb(lang)
  const crumbs: BreadcrumbCrumb[] = [
    { label: ui.breadcrumb, href: withLangPath('/', lang) },
    { label: ui.cityHistory, href: withLangPath('/tarikh', lang) },
  ]
  const fromDb = await getArticleBySlug('tarikh', 'page', lang, crumbs)
  if (fromDb) return fromDb
  return getTarikhArticle(lang)
}

export const getAholiArticleFromDb = async (lang: Locale) => {
  const ui = await getUiFromDb(lang)
  const crumbs: BreadcrumbCrumb[] = [
    { label: ui.breadcrumb, href: withLangPath('/', lang) },
    { label: ui.forResidents },
    { label: ui.forCityResidents, href: withLangPath('/aholi', lang) },
  ]
  const fromDb = await getArticleBySlug('aholi', 'page', lang, crumbs)
  if (fromDb) return fromDb
  return getAholiArticle(lang)
}

export const getNewsArticleFromDb = async (lang: Locale, slug: string) => {
  const ui = await getUiFromDb(lang)
  const crumbs: BreadcrumbCrumb[] = [
    { label: ui.breadcrumb, href: withLangPath('/', lang) },
    { label: ui.newsCategory },
    { label: slug, href: withLangPath(`/news/${slug}`, lang) },
  ]
  return getArticleBySlug(slug, 'news', lang, crumbs)
}

export const getDecisionArticleFromDb = async (lang: Locale, slug: string) => {
  const ui = await getUiFromDb(lang)
  const crumbs: BreadcrumbCrumb[] = [
    { label: ui.breadcrumb, href: withLangPath('/', lang) },
    { label: ui.executive },
    { label: ui.decisions, href: withLangPath('/decisions', lang) },
    { label: slug, href: withLangPath(`/decisions/${slug}`, lang) },
  ]
  return getArticleBySlug(slug, 'decision', lang, crumbs)
}

export const getBoygoniCategoryFromDb = async (lang: Locale) => {
  const ui = await getUiFromDb(lang)
  const crumbs: BreadcrumbCrumb[] = [
    { label: ui.breadcrumb, href: withLangPath('/', lang) },
    { label: ui.archive },
  ]

  const rows = await listPublished('news')
  if (!rows.length) return getBoygoniCategory(lang)

  return {
    title: ui.newsCategory,
    crumbs,
    items: rows.map((row: DbArticle) => {
      const translation = tr(row, lang)
      return {
        title: translation?.title ?? row.slug,
        href: withLangPath(`/news/${row.slug}`, lang),
        image: row.image ?? undefined,
        excerpt: translation?.excerpt ?? '',
        date: translation?.dateLabel ?? undefined,
      }
    }),
  }
}

export const getDecisionsListFromDb = async (lang: Locale) => {
  const ui = await getUiFromDb(lang)
  const crumbs: BreadcrumbCrumb[] = [
    { label: ui.breadcrumb, href: withLangPath('/', lang) },
    { label: ui.executive },
    { label: ui.decisions },
  ]

  const rows = await listPublished('decision')
  return {
    title: ui.decisions,
    crumbs,
    items: rows.map((row: DbArticle) => {
      const translation = tr(row, lang)
      return {
        title: translation?.title ?? row.slug,
        href: withLangPath(`/decisions/${row.slug}`, lang),
        excerpt: translation?.excerpt ?? '',
        date: translation?.dateLabel ?? undefined,
      }
    }),
  }
}

export const collectArticleSlugs = async (type: string, categoryKey?: string) => {
  try {
    const rows = await prisma.article.findMany({
      where: { type, published: true, ...(categoryKey ? { categoryKey } : {}) },
      select: { slug: true },
    })
    return rows.map((r: { slug: string }) => r.slug)
  } catch {
    return []
  }
}

export const mergeSlugs = (staticSlugs: string[], dbSlugs: string[]) =>
  [...new Set([...staticSlugs, ...dbSlugs])]

export { muovinonSlugs, rohbaronSlugs, soxtorSlugs, iqtisodSlugs }
