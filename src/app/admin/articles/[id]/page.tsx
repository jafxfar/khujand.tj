import { notFound } from 'next/navigation'
import { ArticleForm, type ArticleFormValues } from '@/components/admin/ArticleForm'
import { updateArticleAction } from '@/app/admin/articles/actions'
import { PageHeader } from '@/components/admin/ui/PageHeader'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { locales, type Locale } from '@/lib/i18n'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}

export default async function EditArticlePage({ params, searchParams }: Props) {
  await requireAdmin()
  const { id } = await params
  const { error } = await searchParams

  const article = await prisma.article.findUnique({
    where: { id },
    include: { translations: true },
  })
  if (!article) notFound()

  const translations = Object.fromEntries(
    locales.map((locale) => {
      const tr = article.translations.find((t: { locale: string }) => t.locale === locale)
      return [
        locale,
        {
          title: tr?.title ?? '',
          excerpt: tr?.excerpt ?? '',
          dateLabel: tr?.dateLabel ?? '',
          bodyHtml: tr?.bodyHtml ?? '',
        },
      ]
    })
  ) as Record<Locale, ArticleFormValues['translations'][Locale]>

  const initial: ArticleFormValues = {
    slug: article.slug,
    type: article.type,
    categoryKey: article.categoryKey,
    published: article.published,
    showOnHome: article.showOnHome,
    isSlide: article.isSlide,
    sortOrder: article.sortOrder,
    image: article.image ?? '',
    thumb: article.thumb ?? '',
    href: article.href ?? '',
    nameTg: article.nameTg ?? '',
    nameRu: article.nameRu ?? '',
    nameEn: article.nameEn ?? '',
    roleTitleTg: article.roleTitleTg ?? '',
    roleTitleRu: article.roleTitleRu ?? '',
    roleTitleEn: article.roleTitleEn ?? '',
    translations,
  }

  return (
    <div>
      <PageHeader title="Редактирование статьи" description={article.slug} />
      <ArticleForm
        action={updateArticleAction}
        articleId={article.id}
        initial={initial}
        submitLabel="Сохранить"
        error={error}
      />
    </div>
  )
}
