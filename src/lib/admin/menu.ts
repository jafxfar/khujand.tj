import { prisma } from '@/lib/db'
import { writeAudit } from '@/lib/admin/audit'
import { err, ok, type AdminResult } from '@/lib/admin/result'
import type { MenuItemInput } from '@/lib/admin/schemas'

export const createMenuItem = async (
  input: MenuItemInput,
  userId: string
): Promise<AdminResult<{ id: string }>> => {
  try {
    const item = await prisma.menuItem.create({
      data: {
        parentId: input.parentId || null,
        labelTg: input.labelTg,
        labelRu: input.labelRu,
        labelEn: input.labelEn,
        href: input.href,
        sortOrder: input.sortOrder,
        published: input.published,
      },
    })
    await writeAudit({
      userId,
      action: 'create',
      entity: 'menu',
      entityId: item.id,
      meta: { href: item.href },
    })
    return ok({ id: item.id })
  } catch {
    return err('Не удалось создать пункт меню')
  }
}

export const updateMenuItem = async (
  input: MenuItemInput & { id: string },
  userId: string
): Promise<AdminResult> => {
  try {
    await prisma.menuItem.update({
      where: { id: input.id },
      data: {
        labelTg: input.labelTg,
        labelRu: input.labelRu,
        labelEn: input.labelEn,
        href: input.href,
        sortOrder: input.sortOrder,
        published: input.published,
      },
    })
    await writeAudit({
      userId,
      action: 'update',
      entity: 'menu',
      entityId: input.id,
    })
    return ok()
  } catch {
    return err('Не удалось обновить пункт меню')
  }
}

export const deleteMenuItem = async (
  id: string,
  userId: string
): Promise<AdminResult> => {
  try {
    await prisma.menuItem.delete({ where: { id } })
    await writeAudit({
      userId,
      action: 'delete',
      entity: 'menu',
      entityId: id,
    })
    return ok()
  } catch {
    return err('Не удалось удалить пункт меню')
  }
}
