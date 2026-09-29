import {
  createMenuItemAction,
  deleteMenuItemAction,
  updateMenuItemAction,
} from '@/app/admin/menu/actions'
import { Button } from '@/components/admin/ui/Button'
import { Card, CardHeader } from '@/components/admin/ui/Card'
import { Checkbox } from '@/components/admin/ui/Checkbox'
import { Input } from '@/components/admin/ui/Input'
import { PageHeader } from '@/components/admin/ui/PageHeader'
import { Select } from '@/components/admin/ui/Select'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'

type DbMenuItem = {
  id: string
  parentId: string | null
  labelTg: string
  labelRu: string
  labelEn: string
  href: string
  sortOrder: number
  published: boolean
}

const flattenMenu = (
  rows: DbMenuItem[],
  parentId: string | null = null,
  depth = 0
): Array<DbMenuItem & { depth: number }> => {
  const children = rows
    .filter((row) => row.parentId === parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder)

  return children.flatMap((child) => [
    { ...child, depth },
    ...flattenMenu(rows, child.id, depth + 1),
  ])
}

export default async function AdminMenuPage() {
  await requireAdmin()

  const items = await prisma.menuItem.findMany()
  const flat = flattenMenu(items)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Меню"
        description="Подписи на трёх языках и иерархия пунктов"
      />

      <div className="space-y-3">
        {flat.map((item) => (
          <form
            key={item.id}
            action={updateMenuItemAction}
            className="admin-surface p-4"
            style={{ marginLeft: `${item.depth * 1.25}rem` }}
          >
            <input type="hidden" name="id" value={item.id} />
            <div className="grid gap-3 lg:grid-cols-6">
              <Input name="labelTg" defaultValue={item.labelTg} placeholder="Подпись TG" aria-label="Подпись TG" />
              <Input name="labelRu" defaultValue={item.labelRu} placeholder="Подпись RU" aria-label="Подпись RU" />
              <Input name="labelEn" defaultValue={item.labelEn} placeholder="Подпись EN" aria-label="Подпись EN" />
              <Input name="href" defaultValue={item.href} placeholder="Ссылка" aria-label="Ссылка" />
              <Input
                name="sortOrder"
                type="number"
                defaultValue={item.sortOrder}
                aria-label="Порядок"
              />
              <Checkbox name="published" label="Опубликован" defaultChecked={item.published} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button type="submit" size="sm">
                Сохранить
              </Button>
            </div>
          </form>
        ))}
        {!flat.length ? (
          <p className="text-sm text-slate-500">Пунктов меню пока нет</p>
        ) : null}
      </div>

      <Card>
        <CardHeader title="Добавить пункт" />
        <form action={createMenuItemAction} className="grid gap-3 lg:grid-cols-6">
          <Input name="labelTg" placeholder="Подпись TG" required aria-label="Подпись TG" />
          <Input name="labelRu" placeholder="Подпись RU" required aria-label="Подпись RU" />
          <Input name="labelEn" placeholder="Подпись EN" required aria-label="Подпись EN" />
          <Input name="href" placeholder="Ссылка" defaultValue="/" aria-label="Ссылка" />
          <Input name="sortOrder" type="number" defaultValue={0} aria-label="Порядок" />
          <Select name="parentId" aria-label="Родительский пункт">
            <option value="">Верхний уровень</option>
            {items.map((item: (typeof items)[number]) => (
              <option key={item.id} value={item.id}>
                {item.labelTg}
              </option>
            ))}
          </Select>
          <div className="lg:col-span-2">
            <Checkbox name="published" label="Опубликован" defaultChecked />
          </div>
          <Button type="submit" className="lg:col-span-2">
            Добавить
          </Button>
        </form>
      </Card>

      {flat.length ? (
        <Card>
          <CardHeader title="Удаление" description="Удаляет пункт и дочерние" />
          <div className="flex flex-wrap gap-2">
            {flat.map((item) => (
              <form key={`del-${item.id}`} action={deleteMenuItemAction}>
                <input type="hidden" name="id" value={item.id} />
                <Button type="submit" variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                  Удалить «{item.labelTg}»
                </Button>
              </form>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  )
}
