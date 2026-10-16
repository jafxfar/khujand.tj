import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const UI_KEYS: Record<string, { tg: string; ru: string; en: string }> = {
  siteTitle: {
    tg: 'Мақомоти иҷроияи ҳокимияти давлатии шаҳри Хуҷанд - Саҳифаи аслӣ',
    ru: 'Исполнительный орган государственной власти города Худжанд - Главная',
    en: 'Executive Body of State Authority of Khujand City - Home',
  },
  siteDescription: {
    tg: 'Сомонаи расмии Мақомоти иҷроияи ҳокимияти давлатии шаҳри Хуҷанд',
    ru: 'Официальный сайт Исполнительного органа государственной власти города Худжанд',
    en: 'Official website of the Executive Body of State Authority of Khujand City',
  },
  home: { tg: 'Саҳифаи аслӣ', ru: 'Главная', en: 'Home' },
  breadcrumb: { tg: 'Асосӣ', ru: 'Главная', en: 'Home' },
  readMore: { tg: 'Муфассал...', ru: 'Подробнее...', en: 'Read more...' },
  comment: { tg: 'Шарҳ додан', ru: 'Комментировать', en: 'Comment' },
  mayor: { tg: 'Раиси шаҳр', ru: 'Председатель города', en: 'City Chairman' },
  deputies: { tg: 'Муовинони Раиси шаҳр', ru: 'Заместители председателя', en: 'Deputy Chairmen' },
  leaders: { tg: 'Роҳбарони сохторҳо', ru: 'Руководители структур', en: 'Structural Unit Leaders' },
  leadersMenu: {
    tg: 'Роҳбарони воҳидҳои сохторӣ',
    ru: 'Руководители структурных подразделений',
    en: 'Heads of structural units',
  },
  administration: { tg: 'Дастгоҳи Раиси шаҳр', ru: 'Аппарат председателя', en: 'Chairman administration' },
  executive: { tg: 'Мақомоти иҷроия', ru: 'Исполнительная власть', en: 'Executive authority' },
  structures: { tg: 'Сохторҳо', ru: 'Структуры', en: 'Structures' },
  cityHistory: { tg: 'Таърихи шаҳр', ru: 'История города', en: 'City history' },
  economy: { tg: 'Иқтисод', ru: 'Экономика', en: 'Economy' },
  forResidents: { tg: 'Ба аҳолӣ', ru: 'Населению', en: 'For residents' },
  forCityResidents: { tg: 'Ба сокинони шаҳр', ru: 'Жителям города', en: 'For city residents' },
  archive: { tg: 'Бойгонӣ', ru: 'Архив', en: 'Archive' },
  newsArchive: { tg: 'Бойгонии ахборот', ru: 'Архив новостей', en: 'News archive' },
  newsCategory: { tg: 'Навгонӣ', ru: 'Новости', en: 'News' },
  decisions: { tg: 'Қарорҳои Раиси шаҳр', ru: 'Постановления председателя', en: 'Chairman Resolutions' },
  youtube: { tg: 'Youtube', ru: 'Youtube', en: 'Youtube' },
  weather: { tg: 'Обу хаво', ru: 'Погода', en: 'Weather' },
  search: { tg: 'Ҷустуҷӯ', ru: 'Поиск', en: 'Search' },
  oldSite: { tg: 'Сомонаи пешина', ru: 'Старый сайт', en: 'Previous website' },
  feedback: { tg: 'Қабулгоҳи ҷамъиятӣ', ru: 'Общественная приёмная', en: 'Public reception' },
  contacts: { tg: 'Робита:', ru: 'Контакты:', en: 'Contacts:' },
  phoneFax: { tg: 'Тел:/Факс:', ru: 'Тел./Факс:', en: 'Tel./Fax:' },
  emailLabel: { tg: 'e-mail:', ru: 'e-mail:', en: 'e-mail:' },
  copyright: {
    tg: '© 2013-2023 Таҳиягар ва дастгирии техникӣ:',
    ru: '© 2013-2023 Разработка и техническая поддержка:',
    en: '© 2013-2023 Developed and supported by:',
  },
  copyrightLink: { tg: 'ТҶ МТИ "Кова"', ru: 'ОО МТИ "Кова"', en: 'NGO STI "Kova"' },
  previous: { tg: 'Қаблӣ', ru: 'Назад', en: 'Previous' },
  next: { tg: 'Минбаъда', ru: 'Далее', en: 'Next' },
  page: { tg: 'Саҳифа', ru: 'Страница', en: 'Page' },
  votesWord: { tg: 'овоз', ru: 'голосов', en: 'votes' },
  averageWord: { tg: 'миёна', ru: 'средний', en: 'average' },
  ofWord: { tg: 'аз', ru: 'из', en: 'of' },
  rate: { tg: 'Баҳо додан', ru: 'Оценить', en: 'Rate' },
  print: { tg: 'Чоп', ru: 'Печать', en: 'Print' },
  emailAction: { tg: 'Почта', ru: 'Email', en: 'Email' },
}

const CATEGORIES = [
  { key: 'news', sortOrder: 1 },
  { key: 'muovinon', sortOrder: 2 },
  { key: 'rohbaron', sortOrder: 3 },
  { key: 'soxtor', sortOrder: 4 },
  { key: 'iqtisod', sortOrder: 5 },
  { key: 'home', sortOrder: 6 },
  { key: 'decision', sortOrder: 7 },
  { key: 'none', sortOrder: 99 },
]

const main = async () => {
  const username = process.env.ADMIN_USERNAME || 'admin'
  const password = process.env.ADMIN_PASSWORD || 'change-me'
  const passwordHash = await bcrypt.hash(password, 12)

  await prisma.user.upsert({
    where: { username },
    update: { passwordHash, name: 'Administrator', role: 'admin' },
    create: {
      username,
      name: 'Administrator',
      email: 'admin@khujand.tj',
      passwordHash,
      role: 'admin',
    },
  })

  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { key: cat.key },
      update: { sortOrder: cat.sortOrder },
      create: cat,
    })
  }

  for (const [key, values] of Object.entries(UI_KEYS)) {
    await prisma.uiString.upsert({
      where: { key },
      update: { valueTg: values.tg, valueRu: values.ru, valueEn: values.en },
      create: { key, valueTg: values.tg, valueRu: values.ru, valueEn: values.en },
    })
  }

  const settings: Record<string, string> = {
    youtubeEmbed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    gismeteoInformerHash: '',
    footerPhone: '+992 3422 6-03-00',
    footerEmail: 'mihd-khujand@mail.ru',
    footerSite: 'www.khujand.tj',
    footerSiteHref: 'https://khujand.tj',
    footerCopyrightHref: 'http://www.kova.tj/',
    footerAddressTg: 'Ҷумҳурии Тоҷикистон, вилояти Суғд,',
    footerAddressRu: 'Республика Таджикистан, Согдийская область,',
    footerAddressEn: 'Republic of Tajikistan, Sughd Region,',
    footerStreetTg: 'шаҳри Хуҷанд, хиёбони Р.Набиев 39.',
    footerStreetRu: 'г. Худжанд, пр. Р. Набиева 39.',
    footerStreetEn: 'Khujand city, R. Nabiev Ave. 39.',
    headerLogo: '/images/stories/banners/banner -110.jpg',
    headerSearchUrl: 'https://khujand.tj/index.php?option=com_search&view=search&Itemid=204',
    headerOldSiteUrl: 'http://217.11.179.39/khujand_old',
    headerFeedbackUrl: 'https://khujand.tj/feedback',
    mayorNameTg: 'Фирдавс Шарифзода',
    mayorNameRu: 'Фирдавс Шарифзода',
    mayorNameEn: 'Firdavs Sharifzoda',
    mayorImage: '/images/stories/fsharifzoda.jpg',
    mayorHref: '/rais-shahar',
  }

  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
  }

  console.log(`Seed OK: admin user "${username}", categories, UI strings, settings`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
