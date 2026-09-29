import { prisma } from '@/lib/db'
import { writeAudit } from '@/lib/admin/audit'
import { err, ok, type AdminResult } from '@/lib/admin/result'

export const updateUiString = async (
  input: { id: string; valueTg: string; valueRu: string; valueEn: string },
  userId: string
): Promise<AdminResult> => {
  try {
    const row = await prisma.uiString.update({
      where: { id: input.id },
      data: {
        valueTg: input.valueTg,
        valueRu: input.valueRu,
        valueEn: input.valueEn,
      },
    })
    await writeAudit({
      userId,
      action: 'update',
      entity: 'uiString',
      entityId: row.id,
      meta: { key: row.key },
    })
    return ok()
  } catch {
    return err('Не удалось сохранить строку UI')
  }
}
