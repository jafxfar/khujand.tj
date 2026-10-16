import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArticlePage } from '@/components/ArticlePage'
import { getDecisionArticleFromDb } from '@/lib/content/articles'
import { isLocale } from '@/lib/i18n'

type Props = {
  params: Promise<{ lang: string; slug: string }>
}

export const dynamic = 'force-dynamic'

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { lang: raw, slug } = await params
  if (!isLocale(raw)) return {}
  const article = await getDecisionArticleFromDb(raw, slug)
  return { title: article?.title }
}

export default async function DecisionDetailPage({ params }: Props) {
  const { lang: raw, slug } = await params
  if (!isLocale(raw)) notFound()

  const article = await getDecisionArticleFromDb(raw, slug)
  if (!article) notFound()

  return <ArticlePage lang={raw} article={article} />
}
