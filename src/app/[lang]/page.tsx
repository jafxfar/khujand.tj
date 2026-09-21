import { notFound } from 'next/navigation'
import { IceTabs } from '@/components/IceTabs'
import { MainNews } from '@/components/MainNews'
import { ModuleRounded } from '@/components/ModuleRounded'
import { PageShell } from '@/components/PageShell'
import { getHomeContent } from '@/data/i18n/home'
import { isLocale } from '@/lib/i18n'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function LangHomePage({ params }: Props) {
  const { lang: raw } = await params
  if (!isLocale(raw)) notFound()

  const content = getHomeContent(raw)

  return (
    <PageShell
      lang={raw}
      content={content}
      breadcrumb={content.ui.breadcrumb}
      maintop={
        <div id="maintop">
          <div className="maintopbox float-left width100">
            <ModuleRounded className="first last" minHeight={287}>
              <IceTabs slides={content.slides} ui={content.ui} />
            </ModuleRounded>
          </div>
        </div>
      }
    >
      <MainNews items={content.newsItems} ui={content.ui} />
    </PageShell>
  )
}
