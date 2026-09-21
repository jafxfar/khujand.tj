import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArticlePage } from '@/components/ArticlePage'
import { getAholiArticle } from '@/data/i18n/pages/aholi'
import { isLocale } from '@/lib/i18n'

type Props = {
  params: Promise<{ lang: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { lang: raw } = await params
  if (!isLocale(raw)) return {}
  return { title: getAholiArticle(raw).title }
}

export default async function AholiPage({ params }: Props) {
  const { lang: raw } = await params
  if (!isLocale(raw)) notFound()
  return <ArticlePage lang={raw} article={getAholiArticle(raw)} />
}
