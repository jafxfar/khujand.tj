import type { BreadcrumbCrumb } from '@/components/ContentWrapper'
import { ContentWrapper } from '@/components/ContentWrapper'
import { LeftColumn } from '@/components/LeftColumn'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import type { HomeContent } from '@/data/i18n/home'
import type { Locale } from '@/lib/i18n'
import type { ReactNode } from 'react'

type PageShellProps = {
  lang: Locale
  content: HomeContent
  breadcrumb?: string
  crumbs?: BreadcrumbCrumb[]
  children: ReactNode
  maintop?: ReactNode
}

export const PageShell = ({ lang, content, breadcrumb, crumbs, children, maintop }: PageShellProps) => {
  return (
    <>
      <div id="absolute" />

      <div id="page-body">
        <div className="wrapper">
          <SiteHeader lang={lang} />

          <div className="wrapper-body">
            <div id="middle">
              <div id="middle-expand">
                <div id="main">
                  <div id="main-shift">
                    {maintop}

                    <ContentWrapper breadcrumb={breadcrumb} crumbs={crumbs}>
                      {children}
                    </ContentWrapper>
                  </div>
                </div>

                <LeftColumn lang={lang} content={content} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter footer={content.footer} />
    </>
  )
}
