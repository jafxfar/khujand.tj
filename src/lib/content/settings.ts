import { prisma } from '@/lib/db'

export const getSettingsMap = async (): Promise<Record<string, string>> => {
  try {
    const rows = await prisma.siteSetting.findMany()
    if (!rows.length) return {}
    return Object.fromEntries(rows.map((row: { key: string; value: string }) => [row.key, row.value]))
  } catch {
    return {}
  }
}

export const setting = (map: Record<string, string>, key: string, fallback = '') =>
  map[key] ?? fallback
