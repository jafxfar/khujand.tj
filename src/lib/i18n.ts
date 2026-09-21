export const locales = ['tg', 'ru', 'en'] as const

export type Locale = (typeof locales)[number]

export type LocalizedString = Record<Locale, string>

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value)

export const htmlLang: Record<Locale, string> = {
  tg: 'tg-tj',
  ru: 'ru',
  en: 'en',
}

export const pick = (value: LocalizedString, lang: Locale): string => value[lang]

export const withLangPath = (path: string, lang: Locale): string => {
  const clean = path.startsWith('/') ? path : `/${path}`
  const withoutLocale = clean.replace(/^\/(tg|ru|en)(?=\/|$)/, '') || '/'
  if (withoutLocale === '/') return `/${lang}`
  return `/${lang}${withoutLocale}`
}

export const withLangParam = (href: string, lang: Locale): string => {
  if (!href || href === '#') return href
  if (href.startsWith('/')) {
    if (href === '/' || href.startsWith('/?')) return `/${lang}`
    return withLangPath(href, lang)
  }
  if (!href.includes('khujand.tj') && !href.includes('lang=')) return href
  if (href.includes('lang=')) return href.replace(/lang=[a-z]{2}/i, `lang=${lang}`)
  const sep = href.includes('?') ? '&' : '?'
  return `${href}${sep}lang=${lang}`
}
