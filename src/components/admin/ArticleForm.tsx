'use client'

import { LocaleTabs } from '@/components/admin/LocaleTabs'
import { Alert } from '@/components/admin/ui/Alert'
import { Button } from '@/components/admin/ui/Button'
import { Card, CardHeader } from '@/components/admin/ui/Card'
import { Checkbox } from '@/components/admin/ui/Checkbox'
import { Input } from '@/components/admin/ui/Input'
import { Label } from '@/components/admin/ui/Label'
import { Select } from '@/components/admin/ui/Select'
import { Textarea } from '@/components/admin/ui/Textarea'
import type { Locale } from '@/lib/i18n'

export type ArticleFormValues = {
  slug: string
  type: string
  categoryKey: string
  published: boolean
  showOnHome: boolean
  isSlide: boolean
  sortOrder: number
  image: string
  thumb: string
  href: string
  nameTg: string
  nameRu: string
  nameEn: string
  roleTitleTg: string
  roleTitleRu: string
  roleTitleEn: string
  translations: Record<
    Locale,
    { title: string; excerpt: string; dateLabel: string; bodyHtml: string }
  >
}

type ArticleFormProps = {
  action: (formData: FormData) => void | Promise<void>
  articleId?: string
  initial: ArticleFormValues
  error?: string
  submitLabel: string
}

export const ArticleForm = ({ action, articleId, initial, error, submitLabel }: ArticleFormProps) => {
  return (
    <form action={action} className="relative mx-auto max-w-4xl space-y-5 pb-24">
      {articleId ? <input type="hidden" name="id" value={articleId} /> : null}
      {error ? <Alert>{error}</Alert> : null}

      <Card>
        <CardHeader title="Основные поля" description="Slug, тип и категория" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" required defaultValue={initial.slug} />
          </div>
          <div>
            <Label htmlFor="type">Тип</Label>
            <Select id="type" name="type" defaultValue={initial.type}>
              {['news', 'page', 'profile', 'sector', 'economy', 'decision'].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="categoryKey">Ключ категории</Label>
            <Input id="categoryKey" name="categoryKey" defaultValue={initial.categoryKey} />
          </div>
          <div>
            <Label htmlFor="sortOrder">Порядок</Label>
            <Input
              id="sortOrder"
              name="sortOrder"
              type="number"
              defaultValue={initial.sortOrder}
            />
          </div>
          <div>
            <Label htmlFor="image">Путь к изображению</Label>
            <Input id="image" name="image" defaultValue={initial.image} />
          </div>
          <div>
            <Label htmlFor="thumb">Превью</Label>
            <Input id="thumb" name="thumb" defaultValue={initial.thumb} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="href">Внешняя ссылка (необязательно)</Label>
            <Input id="href" name="href" defaultValue={initial.href} />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-5">
          <Checkbox name="published" label="Опубликовано" defaultChecked={initial.published} />
          <Checkbox name="showOnHome" label="На главной" defaultChecked={initial.showOnHome} />
          <Checkbox name="isSlide" label="Слайд главной" defaultChecked={initial.isSlide} />
        </div>
      </Card>

      <Card>
        <CardHeader title="Профиль" description="Имя и должность на трёх языках" />
        <div className="grid gap-3 sm:grid-cols-3">
          <Input name="nameTg" placeholder="Имя TG" defaultValue={initial.nameTg} aria-label="Имя TG" />
          <Input name="nameRu" placeholder="Имя RU" defaultValue={initial.nameRu} aria-label="Имя RU" />
          <Input name="nameEn" placeholder="Имя EN" defaultValue={initial.nameEn} aria-label="Имя EN" />
          <Input
            name="roleTitleTg"
            placeholder="Должность TG"
            defaultValue={initial.roleTitleTg}
            aria-label="Должность TG"
          />
          <Input
            name="roleTitleRu"
            placeholder="Должность RU"
            defaultValue={initial.roleTitleRu}
            aria-label="Должность RU"
          />
          <Input
            name="roleTitleEn"
            placeholder="Должность EN"
            defaultValue={initial.roleTitleEn}
            aria-label="Должность EN"
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="Переводы" description="Заполните все три языка перед публикацией" />
        <LocaleTabs>
          {(locale) => {
            const tr = initial.translations[locale]
            return (
              <div className="space-y-3">
                <div>
                  <Label htmlFor={`title_${locale}`}>Заголовок</Label>
                  <Input
                    id={`title_${locale}`}
                    name={`title_${locale}`}
                    defaultValue={tr.title}
                  />
                </div>
                <div>
                  <Label htmlFor={`excerpt_${locale}`}>Анонс</Label>
                  <Textarea
                    id={`excerpt_${locale}`}
                    name={`excerpt_${locale}`}
                    rows={3}
                    defaultValue={tr.excerpt}
                  />
                </div>
                <div>
                  <Label htmlFor={`dateLabel_${locale}`}>Дата (подпись)</Label>
                  <Input
                    id={`dateLabel_${locale}`}
                    name={`dateLabel_${locale}`}
                    defaultValue={tr.dateLabel}
                  />
                </div>
                <div>
                  <Label htmlFor={`bodyHtml_${locale}`}>Текст (HTML)</Label>
                  <Textarea
                    id={`bodyHtml_${locale}`}
                    name={`bodyHtml_${locale}`}
                    rows={10}
                    defaultValue={tr.bodyHtml}
                    className="font-mono text-xs"
                  />
                </div>
              </div>
            )
          }}
        </LocaleTabs>
      </Card>

      <div className="sticky bottom-4 z-10 flex justify-end">
        <div className="rounded-xl border border-slate-200 bg-white/95 p-2 shadow-lg backdrop-blur">
          <Button type="submit" size="lg">
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  )
}
