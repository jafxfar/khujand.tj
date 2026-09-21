import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArticlePage } from '@/components/ArticlePage'
import { getIqtisodArticle, iqtisodSlugs } from '@/data/i18n/pages/iqtisod'
import { isLocale } from '@/lib/i18n'

type Props = {
  params: Promise<{ lang: string; slug: string }>
}

export const generateStaticParams = () => iqtisodSlugs.map((slug) => ({ slug }))

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { lang: raw, slug } = await params
  if (!isLocale(raw)) return {}
  return { title: getIqtisodArticle(raw, slug)?.title }
}

export default async function IqtisodArticlePage({ params }: Props) {
  const { lang: raw, slug } = await params
  if (!isLocale(raw)) notFound()

  const article = getIqtisodArticle(raw, slug)
  if (!article) notFound()

  return <ArticlePage lang={raw} article={article} />
}
