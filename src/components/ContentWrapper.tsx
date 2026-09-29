import type { ReactNode } from 'react'
import Link from 'next/link'

export type BreadcrumbCrumb = {
  label: string
  href?: string
}

type ContentWrapperProps = {
  breadcrumb?: string
  crumbs?: BreadcrumbCrumb[]
  children: ReactNode
}

const CrumbPill = ({ crumb }: { crumb: BreadcrumbCrumb }) => {
  const inner = (
    <span className="box-1">
      <span className="box-2">
        <span className="box-3">{crumb.label}</span>
      </span>
    </span>
  )

  if (crumb.href) {
    return (
      <Link href={crumb.href} className="pathway">
        {inner}
      </Link>
    )
  }

  return <span className="pathway">{inner}</span>
}

export const ContentWrapper = ({ breadcrumb = '', crumbs, children }: ContentWrapperProps) => {
  const items: BreadcrumbCrumb[] =
    crumbs && crumbs.length > 0
      ? crumbs
      : breadcrumb
        ? [{ label: breadcrumb }]
        : []

  return (
    <>
      <div className="content-wrapper-t1">
        <div className="content-wrapper-t2">
          <div className="content-wrapper-t3">
            <div id="breadcrumbs">
              <span className="breadcrumbs">
                {items.map((crumb, index) => (
                  <span key={`${crumb.label}-${index}`} className="crumb-item">
                    {index > 0 ? <span className="separator"> › </span> : null}
                    <CrumbPill crumb={crumb} />
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="content-wrapper-1">
        <div className="content-wrapper-2">
          <div id="mainmiddle">
            <div id="mainmiddle-expand">{children}</div>
          </div>
        </div>
      </div>

      <div className="content-wrapper-b1">
        <div className="content-wrapper-b2">
          <div className="content-wrapper-b3" />
        </div>
      </div>
    </>
  )
}
