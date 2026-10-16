import { ArticleForm, type ArticleFormValues } from '@/components/admin/ArticleForm'
import { createArticleAction } from '@/app/admin/articles/actions'
import { PageHeader } from '@/components/admin/ui/PageHeader'
import { requireAdmin } from '@/lib/auth'
import { locales } from '@/lib/i18n'

type Props = {
  searchParams: Promise<{ error?: string }>
}

const emptyTranslations = () =>
  Object.fromEntries(
    locales.map((locale) => [locale, { title: '', excerpt: '', dateLabel: '', bodyHtml: '' }])
  ) as ArticleFormValues['translations']

const initial: ArticleFormValues = {
  slug: '',
  type: 'news',
  categoryKey: 'news',
  published: false,
  showOnHome: false,
  isSlide: false,
  sortOrder: 0,
  image: '',
  thumb: '',
  href: '',
  nameTg: '',
  nameRu: '',
  nameEn: '',
  roleTitleTg: '',
  roleTitleRu: '',
  roleTitleEn: '',
  translations: emptyTranslations(),
}

export default async function NewArticlePage({ searchParams }: Props) {
  await requireAdmin()
  const { error } = await searchParams

  return (
    <div>
      <PageHeader title="Новая статья" description="Заполните переводы tg / ru / en" />
      <ArticleForm
        action={createArticleAction}
        initial={initial}
        submitLabel="Создать"
        error={error}
      />
    </div>
  )
}
