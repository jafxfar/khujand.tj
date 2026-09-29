import Link from 'next/link'
import { Plus } from 'lucide-react'
import { ArticlesTable } from '@/components/admin/ArticlesTable'
import { Button } from '@/components/admin/ui/Button'
import { Input } from '@/components/admin/ui/Input'
import { PageHeader } from '@/components/admin/ui/PageHeader'
import { Select } from '@/components/admin/ui/Select'
import { listArticles } from '@/lib/admin/articles'
import { ARTICLE_TYPES, articleListQuerySchema } from '@/lib/admin/schemas'
import { requireAdmin } from '@/lib/auth'

type Props = {
  searchParams: Promise<{ q?: string; type?: string; published?: string; page?: string }>
}

export default async function AdminArticlesPage({ searchParams }: Props) {
  await requireAdmin()
  const raw = await searchParams
  const query = articleListQuerySchema.parse({
    q: raw.q ?? '',
    type: raw.type ?? '',
    published: raw.published ?? '',
    page: raw.page ?? '1',
    pageSize: '30',
  })

  const result = await listArticles(query)

  const buildHref = (page: number) => {
    const params = new URLSearchParams()
    if (query.q) params.set('q', query.q)
    if (query.type) params.set('type', query.type)
    if (query.published) params.set('published', query.published)
    if (page > 1) params.set('page', String(page))
    const qs = params.toString()
    return qs ? `/admin/articles?${qs}` : '/admin/articles'
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Статьи"
        description={`${result.total.toLocaleString('ru-RU')} записей в базе`}
        actions={
          <Link href="/admin/articles/new">
            <Button type="button">
              <Plus className="size-4" aria-hidden />
              Новая статья
            </Button>
          </Link>
        }
      />

      <form
        method="get"
        className="admin-surface flex flex-col gap-3 p-4 sm:flex-row sm:items-end"
      >
        <div className="min-w-0 flex-1">
          <label htmlFor="q" className="mb-1.5 block text-sm font-medium text-slate-700">
            Поиск
          </label>
          <Input
            id="q"
            name="q"
            defaultValue={query.q}
            placeholder="Заголовок или slug…"
            aria-label="Поиск статей"
          />
        </div>
        <div className="sm:w-40">
          <label htmlFor="type" className="mb-1.5 block text-sm font-medium text-slate-700">
            Тип
          </label>
          <Select id="type" name="type" defaultValue={query.type} aria-label="Тип">
            <option value="">Все</option>
            {ARTICLE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
        <div className="sm:w-44">
          <label
            htmlFor="published"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Статус
          </label>
          <Select
            id="published"
            name="published"
            defaultValue={query.published}
            aria-label="Статус"
          >
            <option value="">Все</option>
            <option value="true">Опубликовано</option>
            <option value="false">Черновик</option>
          </Select>
        </div>
        <Button type="submit" variant="secondary">
          Найти
        </Button>
      </form>

      <ArticlesTable articles={result.items} />

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <p>
          Страница {result.page} из {result.pageCount}
        </p>
        <div className="flex gap-2">
          {result.page > 1 ? (
            <Link href={buildHref(result.page - 1)}>
              <Button type="button" variant="secondary" size="sm">
                Назад
              </Button>
            </Link>
          ) : null}
          {result.page < result.pageCount ? (
            <Link href={buildHref(result.page + 1)}>
              <Button type="button" variant="secondary" size="sm">
                Далее
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}
