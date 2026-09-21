import type { Locale } from '@/lib/i18n'
import { withLangPath } from '@/lib/i18n'
import { getUi } from '@/data/i18n/ui'
import { getHomeContent } from '@/data/i18n/home'
import type { BreadcrumbCrumb } from '@/components/ContentWrapper'

export type BoygoniCategory = {
  title: string
  crumbs: BreadcrumbCrumb[]
  items: {
    title: string
    href: string
    image?: string
    excerpt: string
    date?: string
  }[]
}

export const getBoygoniCategory = (lang: Locale): BoygoniCategory => {
  const ui = getUi(lang)
  const { newsItems } = getHomeContent(lang)

  return {
    title: ui.newsCategory,
    crumbs: [
      { label: ui.breadcrumb, href: withLangPath('/', lang) },
      { label: ui.archive },
    ],
    items: newsItems.map((n) => ({
      title: n.title,
      href: n.href,
      image: n.image,
      excerpt: n.excerpt,
      date: n.date,
    })),
  }
}
