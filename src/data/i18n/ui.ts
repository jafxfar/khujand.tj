import type { Locale, LocalizedString } from '@/lib/i18n'

export type UiStrings = {
  siteTitle: string
  siteDescription: string
  home: string
  breadcrumb: string
  readMore: string
  comment: string
  mayor: string
  deputies: string
  leaders: string
  leadersMenu: string
  administration: string
  executive: string
  structures: string
  cityHistory: string
  economy: string
  forResidents: string
  forCityResidents: string
  archive: string
  newsArchive: string
  newsCategory: string
  decisions: string
  youtube: string
  weather: string
  search: string
  oldSite: string
  feedback: string
  contacts: string
  phoneFax: string
  emailLabel: string
  copyright: string
  copyrightLink: string
  previous: string
  next: string
  page: string
  votesWord: string
  averageWord: string
  ofWord: string
  rate: string
}

const dict: Record<Locale, UiStrings> = {
  tg: {
    siteTitle: 'Мақомоти иҷроияи ҳокимияти давлатии шаҳри Хуҷанд - Саҳифаи аслӣ',
    siteDescription: 'Сомонаи расмии Мақомоти иҷроияи ҳокимияти давлатии шаҳри Хуҷанд',
    home: 'Саҳифаи аслӣ',
    breadcrumb: 'Асосӣ',
    readMore: 'Муфассал...',
    comment: 'Шарҳ додан',
    mayor: 'Раиси шаҳр',
    deputies: 'Муовинони Раиси шаҳр',
    leaders: 'Роҳбарони сохторҳо',
    leadersMenu: 'Роҳбарони воҳидҳои сохторӣ',
    administration: 'Дастгоҳи Раиси шаҳр',
    executive: 'Мақомоти иҷроия',
    structures: 'Сохторҳо',
    cityHistory: 'Таърихи шаҳр',
    economy: 'Иқтисод',
    forResidents: 'Ба аҳолӣ',
    forCityResidents: 'Ба сокинони шаҳр',
    archive: 'Бойгонӣ',
    newsArchive: 'Бойгонии ахборот',
    newsCategory: 'Навгонӣ',
    decisions: 'Қарорҳои Раиси шаҳр',
    youtube: 'Youtube',
    weather: 'Обу хаво',
    search: 'Ҷустуҷӯ',
    oldSite: 'Сомонаи пешина',
    feedback: 'Қабулгоҳи ҷамъиятӣ',
    contacts: 'Робита:',
    phoneFax: 'Тел:/Факс:',
    emailLabel: 'e-mail:',
    copyright: '© 2013-2023 Таҳиягар ва дастгирии техникӣ:',
    copyrightLink: 'ТҶ МТИ "Кова"',
    previous: 'Previous',
    next: 'Минбаъда',
    page: 'Саҳифа',
    votesWord: 'овоз',
    averageWord: 'миёна',
    ofWord: 'аз',
    rate: 'Баҳо додан',
  },
  ru: {
    siteTitle: 'Исполнительный орган государственной власти города Худжанд - Главная',
    siteDescription: 'Официальный сайт Исполнительного органа государственной власти города Худжанд',
    home: 'Главная',
    breadcrumb: 'Главная',
    readMore: 'Подробнее...',
    comment: 'Комментировать',
    mayor: 'Председатель города',
    deputies: 'Заместители председателя',
    leaders: 'Руководители структур',
    leadersMenu: 'Руководители структурных подразделений',
    administration: 'Аппарат председателя',
    executive: 'Исполнительная власть',
    structures: 'Структуры',
    cityHistory: 'История города',
    economy: 'Экономика',
    forResidents: 'Населению',
    forCityResidents: 'Жителям города',
    archive: 'Архив',
    newsArchive: 'Архив новостей',
    newsCategory: 'Новости',
    decisions: 'Постановления председателя',
    youtube: 'Youtube',
    weather: 'Погода',
    search: 'Поиск',
    oldSite: 'Старый сайт',
    feedback: 'Общественная приёмная',
    contacts: 'Контакты:',
    phoneFax: 'Тел./Факс:',
    emailLabel: 'e-mail:',
    copyright: '© 2013-2023 Разработка и техническая поддержка:',
    copyrightLink: 'ОО МТИ "Кова"',
    previous: 'Назад',
    next: 'Далее',
    page: 'Страница',
    votesWord: 'голосов',
    averageWord: 'средний',
    ofWord: 'из',
    rate: 'Оценить',
  },
  en: {
    siteTitle: 'Executive Body of State Authority of Khujand City - Home',
    siteDescription: 'Official website of the Executive Body of State Authority of Khujand City',
    home: 'Home',
    breadcrumb: 'Home',
    readMore: 'Read more...',
    comment: 'Comment',
    mayor: 'City Chairman',
    deputies: 'Deputy Chairmen',
    leaders: 'Structural Unit Leaders',
    leadersMenu: 'Heads of structural units',
    administration: 'Chairman administration',
    executive: 'Executive authority',
    structures: 'Structures',
    cityHistory: 'City history',
    economy: 'Economy',
    forResidents: 'For residents',
    forCityResidents: 'For city residents',
    archive: 'Archive',
    newsArchive: 'News archive',
    newsCategory: 'News',
    decisions: 'Chairman Resolutions',
    youtube: 'Youtube',
    weather: 'Weather',
    search: 'Search',
    oldSite: 'Previous website',
    feedback: 'Public reception',
    contacts: 'Contacts:',
    phoneFax: 'Tel./Fax:',
    emailLabel: 'e-mail:',
    copyright: '© 2013-2023 Developed and supported by:',
    copyrightLink: 'NGO STI "Kova"',
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
    votesWord: 'votes',
    averageWord: 'average',
    ofWord: 'of',
    rate: 'Rate',
  },
}

export const getUi = (lang: Locale): UiStrings => dict[lang]

export const formatVotesLabel = (
  lang: Locale,
  votes: number,
  average: number,
  max = 5
): string => {
  const ui = getUi(lang)
  return `(${votes} ${ui.votesWord}, ${ui.averageWord} ${average.toFixed(2)} ${ui.ofWord} ${max})`
}

export const footerAddress: LocalizedString = {
  tg: 'Ҷумҳурии Тоҷикистон, вилояти Суғд,',
  ru: 'Республика Таджикистан, Согдийская область,',
  en: 'Republic of Tajikistan, Sughd Region,',
}

export const footerStreet: LocalizedString = {
  tg: 'шаҳри Хуҷанд, хиёбони Р.Набиев 39.',
  ru: 'г. Худжанд, пр. Р. Набиева 39.',
  en: 'Khujand city, R. Nabiev Ave. 39.',
}
