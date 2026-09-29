import { updateUiStringAction } from '@/app/admin/ui-strings/actions'
import { Button } from '@/components/admin/ui/Button'
import { Input } from '@/components/admin/ui/Input'
import { PageHeader } from '@/components/admin/ui/PageHeader'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'

export default async function AdminUiStringsPage() {
  await requireAdmin()

  const rows = await prisma.uiString.findMany({ orderBy: { key: 'asc' } })

  return (
    <div>
      <PageHeader
        title="Тексты интерфейса"
        description="Хлебные крошки, кнопки и подписи модулей (tg / ru / en)"
      />
      <div className="space-y-3">
        {rows.map((row: (typeof rows)[number]) => (
          <form key={row.id} action={updateUiStringAction} className="admin-surface p-4">
            <input type="hidden" name="id" value={row.id} />
            <p className="mb-3 font-mono text-xs text-teal-700">{row.key}</p>
            <div className="grid gap-3 md:grid-cols-3">
              <Input name="valueTg" defaultValue={row.valueTg} placeholder="TG" aria-label={`${row.key} TG`} />
              <Input name="valueRu" defaultValue={row.valueRu} placeholder="RU" aria-label={`${row.key} RU`} />
              <Input name="valueEn" defaultValue={row.valueEn} placeholder="EN" aria-label={`${row.key} EN`} />
            </div>
            <Button type="submit" size="sm" className="mt-3" variant="secondary">
              Сохранить
            </Button>
          </form>
        ))}
        {!rows.length ? (
          <p className="text-sm text-slate-500">Нет строк. Выполните npm run db:seed</p>
        ) : null}
      </div>
    </div>
  )
}
