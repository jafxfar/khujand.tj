import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArticlePage } from '@/components/ArticlePage'
import { getMuovinonPerson, muovinonSlugs } from '@/data/i18n/categories/muovinon'
import { isLocale } from '@/lib/i18n'

type Props = {
  params: Promise<{ lang: string; slug: string }>
}

export const generateStaticParams = () => muovinonSlugs.map((slug) => ({ slug }))

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { lang: raw, slug } = await params
  if (!isLocale(raw)) return {}
  return { title: getMuovinonPerson(raw, slug)?.title }
}

export default async function MuovinonPersonPage({ params }: Props) {
  const { lang: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const article = getMuovinonPerson(raw, slug)
  if (!article) notFound()
  return <ArticlePage lang={raw} article={article} />
}
