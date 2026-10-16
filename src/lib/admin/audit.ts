import { prisma } from '@/lib/db'

export const writeAudit = async (opts: {
  userId?: string | null
  action: string
  entity: string
  entityId?: string | null
  meta?: Record<string, unknown>
}) => {
  try {
    await prisma.auditLog.create({
      data: {
        userId: opts.userId ?? null,
        action: opts.action,
        entity: opts.entity,
        entityId: opts.entityId ?? null,
        meta: JSON.stringify(opts.meta ?? {}),
      },
    })
  } catch (e) {
    console.error('audit write failed', e)
  }
}

export const listAuditLogs = async (take = 100) =>
  prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take,
  })
