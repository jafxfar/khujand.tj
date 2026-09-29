'use client'

import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteArticleAction } from '@/app/admin/articles/actions'
import { Badge } from '@/components/admin/ui/Badge'
import { Button } from '@/components/admin/ui/Button'
import { Card } from '@/components/admin/ui/Card'
import { Table, Td } from '@/components/admin/ui/Table'

export type ArticleListRow = {
  id: string
  slug: string
  type: string
  published: boolean
  title: string
}

type ArticlesTableProps = {
  articles: ArticleListRow[]
}

const typeTone = (type: string) => {
  if (type === 'news') return 'accent' as const
  if (type === 'decision') return 'warning' as const
  if (type === 'profile') return 'success' as const
  return 'neutral' as const
}

export const ArticlesTable = ({ articles }: ArticlesTableProps) => (
  <Card padding={false}>
    <Table columns={['Заголовок (TG)', 'Тип', 'Статус', 'Действия']}>
      {articles.map((article) => (
        <tr key={article.id} className="hover:bg-slate-50/80">
          <Td>
            <div className="font-medium text-slate-900">{article.title}</div>
            <div className="mt-0.5 text-xs text-slate-400">{article.slug}</div>
          </Td>
          <Td>
            <Badge tone={typeTone(article.type)}>{article.type}</Badge>
          </Td>
          <Td>
            <Badge tone={article.published ? 'success' : 'neutral'}>
              {article.published ? 'Опубликовано' : 'Черновик'}
            </Badge>
          </Td>
          <Td>
            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/admin/articles/${article.id}`}>
                <Button type="button" variant="secondary" size="sm">
                  <Pencil className="size-3.5" aria-hidden />
                  Изменить
                </Button>
              </Link>
              <form action={deleteArticleAction}>
                <input type="hidden" name="id" value={article.id} />
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="size-3.5" aria-hidden />
                  Удалить
                </Button>
              </form>
            </div>
          </Td>
        </tr>
      ))}
    </Table>
    {!articles.length ? (
      <p className="px-4 py-10 text-center text-sm text-slate-500">Ничего не найдено</p>
    ) : null}
  </Card>
)
