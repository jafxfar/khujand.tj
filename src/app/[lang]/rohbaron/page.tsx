import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CategoryBlogView } from '@/components/CategoryBlogView'
import { PageShell } from '@/components/PageShell'
import { getRohbaronCategoryFromDb } from '@/lib/content/articles'
import { getHomeContentFromDb } from '@/lib/content/home'
import { getUiFromDb } from '@/lib/content/ui'
import { isLocale } from '@/lib/i18n'

type Props = {
  params: Promise<{ lang: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { lang: raw } = await params
  if (!isLocale(raw)) return {}
  const category = await getRohbaronCategoryFromDb(raw)
  return { title: category.title }
}

export default async function RohbaronPage({ params }: Props) {
  const { lang: raw } = await params
  if (!isLocale(raw)) notFound()

  const content = await getHomeContentFromDb(raw)
  const category = await getRohbaronCategoryFromDb(raw)
  const ui = await getUiFromDb(raw)

  return (
    <PageShell lang={raw} content={content} crumbs={category.crumbs}>
      <CategoryBlogView
        pageTitle={category.title}
        items={category.items}
        readMoreLabel={ui.readMore}
      />
    </PageShell>
  )
}
