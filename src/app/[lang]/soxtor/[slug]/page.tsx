import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArticlePage } from '@/components/ArticlePage'
import { getSoxtorArticle, soxtorSlugs } from '@/data/i18n/pages/soxtor'
import { isLocale } from '@/lib/i18n'

type Props = {
  params: Promise<{ lang: string; slug: string }>
}

export const generateStaticParams = () => soxtorSlugs.map((slug) => ({ slug }))

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { lang: raw, slug } = await params
  if (!isLocale(raw)) return {}
  return { title: getSoxtorArticle(raw, slug)?.title }
}

export default async function SoxtorArticlePage({ params }: Props) {
  const { lang: raw, slug } = await params
  if (!isLocale(raw)) notFound()

  const article = getSoxtorArticle(raw, slug)
  if (!article) notFound()

  return <ArticlePage lang={raw} article={article} />
}
