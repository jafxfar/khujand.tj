import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CategoryBlogView } from '@/components/CategoryBlogView'
import { PageShell } from '@/components/PageShell'
import { getDecisionsListFromDb } from '@/lib/content/articles'
import { getHomeContentFromDb } from '@/lib/content/home'
import { getUiFromDb } from '@/lib/content/ui'
import { isLocale } from '@/lib/i18n'

type Props = {
  params: Promise<{ lang: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { lang: raw } = await params
  if (!isLocale(raw)) return {}
  const list = await getDecisionsListFromDb(raw)
  return { title: list.title }
}

export default async function DecisionsPage({ params }: Props) {
  const { lang: raw } = await params
  if (!isLocale(raw)) notFound()

  const content = await getHomeContentFromDb(raw)
  const list = await getDecisionsListFromDb(raw)
  const ui = await getUiFromDb(raw)

  return (
    <PageShell lang={raw} content={content} crumbs={list.crumbs}>
      <CategoryBlogView pageTitle={list.title} items={list.items} readMoreLabel={ui.readMore} />
    </PageShell>
  )
}
