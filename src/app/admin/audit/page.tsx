import { PageHeader } from '@/components/admin/ui/PageHeader'
import { Table, Td } from '@/components/admin/ui/Table'
import { Card } from '@/components/admin/ui/Card'
import { listAuditLogs } from '@/lib/admin/audit'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'

export default async function AdminAuditPage() {
  await requireAdmin()

  const logs = await listAuditLogs(150)
  const userIds = [...new Set(logs.map((l) => l.userId).filter(Boolean))] as string[]
  const users = userIds.length
    ? await prisma.user.findMany({
        where: { id: { in: userIds } },
        select: { id: true, username: true, name: true },
      })
    : []
  const userMap = Object.fromEntries(
    users.map((u) => [u.id, u.name || u.username])
  )

  return (
    <div>
      <PageHeader
        title="Журнал изменений"
        description="Последние действия администраторов"
      />
      <Card padding={false}>
        <Table columns={['Время', 'Пользователь', 'Действие', 'Сущность', 'ID']}>
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-slate-50/80">
              <Td className="whitespace-nowrap text-xs text-slate-500">
                {log.createdAt.toLocaleString('ru-RU')}
              </Td>
              <Td>{(log.userId && userMap[log.userId]) || '—'}</Td>
              <Td>
                <span className="font-medium text-slate-900">{log.action}</span>
              </Td>
              <Td>{log.entity}</Td>
              <Td className="font-mono text-xs text-slate-500">
                {log.entityId || '—'}
              </Td>
            </tr>
          ))}
        </Table>
        {!logs.length ? (
          <p className="px-4 py-10 text-center text-sm text-slate-500">
            Записей пока нет
          </p>
        ) : null}
      </Card>
    </div>
  )
}
