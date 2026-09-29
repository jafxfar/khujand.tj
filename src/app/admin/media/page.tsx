import { deleteMediaAction, uploadMediaAction } from '@/app/admin/media/actions'
import { Alert } from '@/components/admin/ui/Alert'
import { Button } from '@/components/admin/ui/Button'
import { Card, CardHeader } from '@/components/admin/ui/Card'
import { Input } from '@/components/admin/ui/Input'
import { Label } from '@/components/admin/ui/Label'
import { PageHeader } from '@/components/admin/ui/PageHeader'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'

type Props = {
  searchParams: Promise<{ error?: string }>
}

export default async function AdminMediaPage({ searchParams }: Props) {
  await requireAdmin()
  const { error } = await searchParams

  const items = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="space-y-8">
      <PageHeader
        title="Медиа"
        description="jpg, png, webp, gif, pdf — до 5 МБ"
      />

      {error ? <Alert>{error}</Alert> : null}

      <Card className="max-w-lg">
        <CardHeader title="Загрузить файл" />
        <form action={uploadMediaAction} encType="multipart/form-data" className="space-y-4">
          <div>
            <Label htmlFor="file">Файл</Label>
            <Input id="file" name="file" type="file" required className="border-dashed py-2.5" />
          </div>
          <div>
            <Label htmlFor="alt">Alt-текст</Label>
            <Input id="alt" name="alt" type="text" />
          </div>
          <Button type="submit">Загрузить</Button>
        </form>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item: (typeof items)[number]) => (
          <div key={item.id} className="admin-surface overflow-hidden p-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.path}
              alt={item.alt || 'Медиа'}
              className="h-40 w-full object-cover"
            />
            <div className="space-y-2 p-3">
              <p className="break-all font-mono text-xs text-slate-500">{item.path}</p>
              <form action={deleteMediaAction}>
                <input type="hidden" name="id" value={item.id} />
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                >
                  Удалить файл
                </Button>
              </form>
            </div>
          </div>
        ))}
      </div>
      {!items.length ? (
        <p className="text-sm text-slate-500">Пока нет загруженных файлов</p>
      ) : null}
    </div>
  )
}
