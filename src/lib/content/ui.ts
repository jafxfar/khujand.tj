import { getUi, type UiStrings } from '@/data/i18n/ui'
import { prisma } from '@/lib/db'
import type { Locale } from '@/lib/i18n'

const uiKeys = new Set<string>([
  'siteTitle',
  'siteDescription',
  'home',
  'breadcrumb',
  'readMore',
  'comment',
  'mayor',
  'deputies',
  'leaders',
  'leadersMenu',
  'administration',
  'executive',
  'structures',
  'cityHistory',
  'economy',
  'forResidents',
  'forCityResidents',
  'archive',
  'newsArchive',
  'newsCategory',
  'decisions',
  'youtube',
  'weather',
  'search',
  'oldSite',
  'feedback',
  'contacts',
  'phoneFax',
  'emailLabel',
  'copyright',
  'copyrightLink',
  'previous',
  'next',
  'page',
  'votesWord',
  'averageWord',
  'ofWord',
  'rate',
  'print',
  'emailAction',
])

export const getUiFromDb = async (lang: Locale): Promise<UiStrings> => {
  const fallback = getUi(lang)
  try {
    const rows = await prisma.uiString.findMany()
    if (!rows.length) return fallback

    const ui = { ...fallback }
    for (const row of rows) {
      if (!uiKeys.has(row.key)) continue
      const key = row.key as keyof UiStrings
      const value =
        lang === 'tg' ? row.valueTg : lang === 'ru' ? row.valueRu : row.valueEn
      if (value) ui[key] = value
    }
    return ui
  } catch {
    return fallback
  }
}
