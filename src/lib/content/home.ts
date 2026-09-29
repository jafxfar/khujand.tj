import type { MenuItem } from '@/data/i18n/menu'
import {
  getHomeContent,
  type HomeContent,
  type LofBlock,
  type NewsItem,
  type Slide,
} from '@/data/i18n/home'
import { footerAddress, footerStreet } from '@/data/i18n/ui'
import type { HeaderChrome } from '@/components/SiteHeader'
import { prisma } from '@/lib/db'
import type { Locale } from '@/lib/i18n'
import { pick, withLangParam, withLangPath } from '@/lib/i18n'
import { getMenuFromDb } from '@/lib/content/menu'
import { getSettingsMap, setting } from '@/lib/content/settings'
import { getUiFromDb } from '@/lib/content/ui'
import type { DbArticle } from '@/lib/content/types'

const cleanExcerpt = (text: string, max = 150) => {
  const t = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t.endsWith('.') ? t : `${t}...`
  return `${t.slice(0, max).replace(/\s+\S*$/, '')}...`
}

const trFor = (article: Pick<DbArticle, 'translations'>, lang: Locale) =>
  article.translations.find((t) => t.locale === lang) ??
  article.translations.find((t) => t.locale === 'tg')

const profileDescription = (
  article: Pick<
    DbArticle,
    | 'roleTitleTg'
    | 'roleTitleRu'
    | 'roleTitleEn'
    | 'nameTg'
    | 'nameRu'
    | 'nameEn'
    | 'translations'
  >,
  lang: Locale
) => {
  const translation = trFor(article, lang)
  if (translation?.excerpt) return cleanExcerpt(translation.excerpt)
  const role =
    lang === 'ru'
      ? article.roleTitleRu
      : lang === 'en'
        ? article.roleTitleEn
        : article.roleTitleTg
  const name =
    lang === 'ru' ? article.nameRu : lang === 'en' ? article.nameEn : article.nameTg
  return cleanExcerpt([role, name].filter(Boolean).join('. '))
}

export const getHomeContentFromDb = async (
  lang: Locale
): Promise<HomeContent & { menu: MenuItem[]; header: HeaderChrome }> => {
  const fallback = getHomeContent(lang)
  const ui = await getUiFromDb(lang)
  const menu = await getMenuFromDb(lang)
  const settings = await getSettingsMap()

  try {
    const [slideRows, newsRows, deputyRows, leaderRows, decisionRows] = await Promise.all([
      prisma.article.findMany({
        where: { isSlide: true, published: true },
        include: { translations: true },
        orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
      }),
      prisma.article.findMany({
        where: { type: 'news', showOnHome: true, published: true },
        include: { translations: true },
        orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
        take: 12,
      }),
      prisma.article.findMany({
        where: { type: 'profile', categoryKey: 'muovinon', published: true },
        include: { translations: true },
        orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
      }),
      prisma.article.findMany({
        where: { type: 'profile', categoryKey: 'rohbaron', published: true },
        include: { translations: true },
        orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
      }),
      prisma.article.findMany({
        where: { type: 'decision', published: true },
        include: { translations: true },
        orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
        take: 8,
      }),
    ])

    const slides: Slide[] = slideRows.length
      ? slideRows.map((row: DbArticle & { href: string | null }) => {
          const translation = trFor(row, lang)
          const href = row.href?.startsWith('http')
            ? withLangParam(row.href, lang)
            : withLangPath(`/news/${row.slug}`, lang)
          return {
            title: translation?.title ?? row.slug,
            excerpt: translation?.excerpt ? cleanExcerpt(translation.excerpt, 120) : '',
            href,
            image: row.image ?? '',
            thumb: row.thumb ?? row.image ?? '',
          }
        })
      : fallback.slides

    const newsItems: NewsItem[] = newsRows.length
      ? newsRows.map((row: DbArticle) => {
          const translation = trFor(row, lang)
          return {
            title: translation?.title ?? row.slug,
            excerpt: translation?.excerpt ? cleanExcerpt(translation.excerpt) : '',
            date: translation?.dateLabel ?? '',
            href: withLangPath(`/news/${row.slug}`, lang),
            image: row.image ?? '',
          }
        })
      : fallback.newsItems

    const deputies: LofBlock = deputyRows.length
      ? {
          title: ui.deputies,
          items: deputyRows.map((row: DbArticle) => {
            const name =
              lang === 'ru'
                ? row.nameRu ?? row.nameTg
                : lang === 'en'
                  ? row.nameEn ?? row.nameTg
                  : row.nameTg ?? row.slug
            const hrefBase = row.slug === 'homidzoda' ? '/dastgoh' : `/muovinon/${row.slug}`
            return {
              title: name ?? row.slug,
              href: withLangPath(hrefBase, lang),
              image: row.image ?? row.thumb ?? '',
              description: profileDescription(row, lang),
            }
          }),
        }
      : fallback.deputies

    const leaders: LofBlock = leaderRows.length
      ? {
          title: ui.leaders,
          items: leaderRows.map((row: DbArticle) => {
            const name =
              lang === 'ru'
                ? row.nameRu ?? row.nameTg
                : lang === 'en'
                  ? row.nameEn ?? row.nameTg
                  : row.nameTg ?? row.slug
            return {
              title: name ?? row.slug,
              href: withLangPath(`/rohbaron/${row.slug}`, lang),
              image: row.image ?? row.thumb ?? '',
              description: profileDescription(row, lang),
            }
          }),
        }
      : fallback.leaders

    const decisionDetails = decisionRows.length
      ? decisionRows.map((row: DbArticle) => {
          const translation = trFor(row, lang)
          return {
            title: translation?.title ?? row.slug,
            href: withLangPath(`/decisions/${row.slug}`, lang),
            date: translation?.dateLabel ?? '',
          }
        })
      : fallback.decisionDetails

    const mayorName =
      lang === 'ru'
        ? setting(settings, 'mayorNameRu', fallback.mayor.name)
        : lang === 'en'
          ? setting(settings, 'mayorNameEn', fallback.mayor.name)
          : setting(settings, 'mayorNameTg', fallback.mayor.name)

    const mayor = {
      name: mayorName,
      image: setting(settings, 'mayorImage', fallback.mayor.image),
      href: withLangPath(setting(settings, 'mayorHref', '/rais-shahar'), lang),
    }

    const footerLines = [
      setting(settings, `footerAddress${lang === 'tg' ? 'Tg' : lang === 'ru' ? 'Ru' : 'En'}`, pick(footerAddress, lang)),
      setting(settings, `footerStreet${lang === 'tg' ? 'Tg' : lang === 'ru' ? 'Ru' : 'En'}`, pick(footerStreet, lang)),
    ]

    const footer = {
      title: ui.contacts,
      lines: footerLines,
      phone: setting(settings, 'footerPhone', fallback.footer.phone),
      email: setting(settings, 'footerEmail', fallback.footer.email),
      site: setting(settings, 'footerSite', fallback.footer.site),
      siteHref: setting(settings, 'footerSiteHref', fallback.footer.siteHref),
      phoneFaxLabel: ui.phoneFax,
      emailLabel: ui.emailLabel,
      banners: fallback.footer.banners,
      copyright: ui.copyright,
      copyrightHref: setting(settings, 'footerCopyrightHref', fallback.footer.copyrightHref),
      copyrightLinkText: ui.copyrightLink,
    }

    const youtubeEmbed = setting(settings, 'youtubeEmbed', fallback.youtubeEmbed)
    const gismeteoInformerHash = setting(settings, 'gismeteoInformerHash', fallback.gismeteoInformerHash)

    const header = {
      logo: setting(settings, 'headerLogo', '/images/stories/banners/banner -110.jpg'),
      searchUrl: setting(
        settings,
        'headerSearchUrl',
        'https://khujand.tj/index.php?option=com_search&view=search&Itemid=204'
      ),
      oldSiteUrl: setting(settings, 'headerOldSiteUrl', 'http://217.11.179.39/khujand_old'),
      feedbackUrl: setting(settings, 'headerFeedbackUrl', 'https://khujand.tj/feedback'),
    }

    return {
      ui,
      slides,
      newsItems,
      mayor,
      deputies,
      leaders,
      decisionDetails,
      footer,
      youtubeEmbed,
      gismeteoInformerHash,
      menu,
      header,
    }
  } catch {
    return {
      ...fallback,
      menu,
      header: {
        logo: '/images/stories/banners/banner -110.jpg',
        searchUrl: 'https://khujand.tj/index.php?option=com_search&view=search&Itemid=204',
        oldSiteUrl: 'http://217.11.179.39/khujand_old',
        feedbackUrl: 'https://khujand.tj/feedback',
      },
    }
  }
}

export type HomeContentFromDb = Awaited<ReturnType<typeof getHomeContentFromDb>>
