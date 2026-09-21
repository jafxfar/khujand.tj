import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArticlePage } from '@/components/ArticlePage'
import { getRohbaronPerson, rohbaronSlugs } from '@/data/i18n/categories/rohbaron'
import { isLocale } from '@/lib/i18n'

type Props = {
  params: Promise<{ lang: string; slug: string }>
}

export const generateStaticParams = () => rohbaronSlugs.map((slug) => ({ slug }))

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { lang: raw, slug } = await params
  if (!isLocale(raw)) return {}
  return { title: getRohbaronPerson(raw, slug)?.title }
}

export default async function RohbaronPersonPage({ params }: Props) {
  const { lang: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const article = getRohbaronPerson(raw, slug)
  if (!article) notFound()
  return <ArticlePage lang={raw} article={article} />
}
