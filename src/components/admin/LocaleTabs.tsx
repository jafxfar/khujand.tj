'use client'

import { useState, type ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'
import { locales } from '@/lib/i18n'

const labels: Record<Locale, string> = {
  tg: 'Тоҷикӣ',
  ru: 'Русский',
  en: 'English',
}

type LocaleTabsProps = {
  children: (locale: Locale) => ReactNode
  defaultLocale?: Locale
}

export const LocaleTabs = ({ children, defaultLocale = 'tg' }: LocaleTabsProps) => {
  const [active, setActive] = useState<Locale>(defaultLocale)

  return (
    <div>
      <div
        className="mb-4 inline-flex rounded-xl bg-slate-100 p-1"
        role="tablist"
        aria-label="Язык контента"
      >
        {locales.map((locale) => {
          const isActive = active === locale
          return (
            <button
              key={locale}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(locale)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActive(locale)
                }
              }}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {labels[locale]}
            </button>
          )
        })}
      </div>
      <div role="tabpanel">{children(active)}</div>
    </div>
  )
}
