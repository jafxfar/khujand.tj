'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HeaderMenu } from '@/components/HeaderMenu'
import { getMenu, type MenuItem } from '@/data/i18n/menu'
import { getUi, type UiStrings } from '@/data/i18n/ui'
import { withLangPath, type Locale } from '@/lib/i18n'

const formatDate = (date: Date, lang: Locale) => {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()
  if (lang === 'en') return `${dd}.${mm}.${yyyy}`
  return `${dd}.${mm}.${yyyy}`
}

const flags: { code: Locale; src: string; alt: string; title: string }[] = [
  { code: 'tg', src: '/images/tj.png', alt: 'Tojiki (CIS)', title: 'Tojiki (CIS)' },
  { code: 'ru', src: '/images/ru.png', alt: 'Русский', title: 'Русский' },
  { code: 'en', src: '/images/en.svg', alt: 'English', title: 'English' },
]

export type HeaderChrome = {
  logo: string
  searchUrl: string
  oldSiteUrl: string
  feedbackUrl: string
}

type SiteHeaderProps = {
  lang: Locale
  menu?: MenuItem[]
  ui?: UiStrings
  header?: HeaderChrome
}

export const SiteHeader = ({ lang, menu: menuProp, ui: uiProp, header }: SiteHeaderProps) => {
  const [dateLabel, setDateLabel] = useState('')
  const pathname = usePathname() || `/${lang}`
  const ui = uiProp ?? getUi(lang)
  const menu = menuProp ?? getMenu(lang)
  const logo = header?.logo ?? '/images/stories/banners/banner -110.jpg'
  const searchUrl = header?.searchUrl
    ? `${header.searchUrl}${header.searchUrl.includes('?') ? '&' : '?'}lang=${lang}`
    : `https://khujand.tj/index.php?option=com_search&view=search&Itemid=204&lang=${lang}`
  const oldSiteUrl = header?.oldSiteUrl ?? 'http://217.11.179.39/khujand_old'
  const feedbackUrl = header?.feedbackUrl ?? 'https://khujand.tj/feedback'

  useEffect(() => {
    setDateLabel(formatDate(new Date(), lang))
  }, [lang])

  return (
    <div id="header">
      <div id="toolbar">
        <div id="date">{dateLabel}</div>
        <div className="right">
          <div className="module mod-blank first last">
            <div id="jflanguageselection">
              <div className="rawimages">
                {flags.map((flag) => {
                  const isActive = flag.code === lang
                  const link = (
                    <Link href={withLangPath(pathname, flag.code)} aria-label={flag.title}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={flag.src} alt={flag.alt} title={flag.title} width={20} height={20} />
                    </Link>
                  )
                  return isActive ? (
                    <span key={flag.code} id="active_language">
                      {link}
                    </span>
                  ) : (
                    <span key={flag.code}>{link}</span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="headerbar" />

      <div id="menubar">
        <div className="menubar-2">
          <div className="menubar-3">
            <div className="menubar-4" />
          </div>
        </div>
      </div>

      <div id="logo">
        <p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt={ui.siteTitle} />
          <br />
        </p>
      </div>

      <HeaderMenu items={menu} />

      <div id="banner">
        <p style={{ textAlign: 'center' }}>
          &nbsp;
          <a href={searchUrl} title={ui.search}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/stories/banners/search.png"
              alt={ui.search}
              title={ui.search}
              width={20}
              style={{ border: 0 }}
            />
          </a>{' '}
          <a href={oldSiteUrl} target="_blank" rel="noreferrer" title={ui.oldSite}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/stories/banners/sites.png"
              alt={ui.oldSite}
              title={ui.oldSite}
              width={20}
            />
          </a>
          &nbsp;
          <a href={feedbackUrl} title={ui.feedback}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/stories/banners/email.png"
              width={20}
              height={20}
              alt={ui.feedback}
              title={ui.feedback}
            />
          </a>
        </p>
      </div>
    </div>
  )
}
