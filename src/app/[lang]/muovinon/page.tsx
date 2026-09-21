import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CategoryBlogView } from '@/components/CategoryBlogView'
import { PageShell } from '@/components/PageShell'
import { getMuovinonCategory } from '@/data/i18n/categories/muovinon'
import { getHomeContent } from '@/data/i18n/home'
import { getUi } from '@/data/i18n/ui'
import { isLocale } from '@/lib/i18n'

type Props = {
  params: Promise<{ lang: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { lang: raw } = await params
  if (!isLocale(raw)) return {}
  return { title: getMuovinonCategory(raw).title }
}

export default async function MuovinonPage({ params }: Props) {
  const { lang: raw } = await params
  if (!isLocale(raw)) notFound()

  const content = getHomeContent(raw)
  const category = getMuovinonCategory(raw)
  const ui = getUi(raw)

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
