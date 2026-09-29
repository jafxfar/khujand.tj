import { getMenu, type MenuItem } from '@/data/i18n/menu'
import { prisma } from '@/lib/db'
import type { Locale } from '@/lib/i18n'
import { withLangParam } from '@/lib/i18n'

type DbMenuRow = {
  id: string
  parentId: string | null
  href: string
  labelTg: string
  labelRu: string
  labelEn: string
  sortOrder: number
  published: boolean
}

const labelFor = (row: DbMenuRow, lang: Locale) => {
  if (lang === 'ru') return row.labelRu
  if (lang === 'en') return row.labelEn
  return row.labelTg
}

const buildTree = (rows: DbMenuRow[], lang: Locale, parentId: string | null = null): MenuItem[] =>
  rows
    .filter((row) => row.parentId === parentId && row.published)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((row) => {
      const children = buildTree(rows, lang, row.id)
      return {
        label: labelFor(row, lang),
        href: withLangParam(row.href, lang),
        ...(children.length ? { children } : {}),
      }
    })

export const getMenuFromDb = async (lang: Locale): Promise<MenuItem[]> => {
  try {
    const rows = await prisma.menuItem.findMany()
    if (!rows.length) return getMenu(lang)
    return buildTree(rows, lang)
  } catch {
    return getMenu(lang)
  }
}
