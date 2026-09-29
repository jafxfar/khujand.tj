import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArticlePage } from '@/components/ArticlePage'
import { getDastgohArticleFromDb } from '@/lib/content/articles'
import { isLocale } from '@/lib/i18n'

type Props = {
  params: Promise<{ lang: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { lang: raw } = await params
  if (!isLocale(raw)) return {}
  const article = await getDastgohArticleFromDb(raw)
  return { title: article.title }
}

export default async function DastgohPage({ params }: Props) {
  const { lang: raw } = await params
  if (!isLocale(raw)) notFound()
  const article = await getDastgohArticleFromDb(raw)
  return <ArticlePage lang={raw} article={article} />
}
