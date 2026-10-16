'use client'

import { useEffect } from 'react'
import { htmlLang, type Locale } from '@/lib/i18n'

export const HtmlLang = ({ lang }: { lang: Locale }) => {
  useEffect(() => {
    document.documentElement.lang = htmlLang[lang]
  }, [lang])

  return null
}
