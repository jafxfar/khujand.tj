import { prisma } from '@/lib/db'
import { writeAudit } from '@/lib/admin/audit'
import { ok, type AdminResult } from '@/lib/admin/result'
import { SETTING_KEYS } from '@/lib/admin/schemas'

export const saveSettings = async (
  values: Record<string, string>,
  userId: string
): Promise<AdminResult> => {
  for (const key of SETTING_KEYS) {
    const value = values[key] ?? ''
    await prisma.siteSetting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    })
  }

  await writeAudit({
    userId,
    action: 'update',
    entity: 'settings',
    entityId: 'site',
    meta: { keys: [...SETTING_KEYS] },
  })

  return ok()
}

export const settingsFromForm = (formData: FormData): Record<string, string> => {
  const out: Record<string, string> = {}
  for (const key of SETTING_KEYS) {
    out[key] = String(formData.get(key) ?? '')
  }
  return out
}
