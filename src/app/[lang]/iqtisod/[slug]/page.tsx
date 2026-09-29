import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArticlePage } from '@/components/ArticlePage'
import {
  collectArticleSlugs,
  getIqtisodArticleFromDb,
  mergeSlugs,
  iqtisodSlugs,
} from '@/lib/content/articles'
import { isLocale } from '@/lib/i18n'

type Props = {
  params: Promise<{ lang: string; slug: string }>
}

export const generateStaticParams = async () => {
  const dbSlugs = await collectArticleSlugs('economy', 'iqtisod')
  return mergeSlugs(iqtisodSlugs, dbSlugs).map((slug) => ({ slug }))
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { lang: raw, slug } = await params
  if (!isLocale(raw)) return {}
  const article = await getIqtisodArticleFromDb(raw, slug)
  return { title: article?.title }
}

export default async function IqtisodArticlePage({ params }: Props) {
  const { lang: raw, slug } = await params
  if (!isLocale(raw)) notFound()

  const article = await getIqtisodArticleFromDb(raw, slug)
  if (!article) notFound()

  return <ArticlePage lang={raw} article={article} />
}
