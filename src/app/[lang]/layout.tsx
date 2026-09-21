import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isLocale, type Locale } from '@/lib/i18n'
import { getUi } from '@/data/i18n/ui'
import { HtmlLang } from '@/components/HtmlLang'

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export const generateStaticParams = () => [{ lang: 'tg' }, { lang: 'ru' }, { lang: 'en' }]

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { lang: raw } = await params
  const lang: Locale = isLocale(raw) ? raw : 'tg'
  const ui = getUi(lang)
  return {
    title: ui.siteTitle,
    description: ui.siteDescription,
  }
}

export default async function LangLayout({ children, params }: Props) {
  const { lang: raw } = await params
  if (!isLocale(raw)) notFound()

  return (
    <>
      <HtmlLang lang={raw} />
      {children}
    </>
  )
}
