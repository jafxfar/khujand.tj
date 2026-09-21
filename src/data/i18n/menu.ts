import type { Locale, LocalizedString } from '@/lib/i18n'
import { pick, withLangParam } from '@/lib/i18n'

export type MenuItem = {
  label: string
  href: string
  children?: MenuItem[]
}

type RawMenuItem = {
  label: LocalizedString
  href: string
  children?: RawMenuItem[]
}

const L = (tg: string, ru: string, en: string): LocalizedString => ({ tg, ru, en })

const rawMenu: RawMenuItem[] = [
  {
    label: L('Cаҳифаи аслӣ', 'Главная', 'Home'),
    href: '/',
  },
  {
    label: L('Мақомоти иҷроия', 'Исполнительная власть', 'Executive authority'),
    href: '#',
    children: [
      {
        label: L('Раиси шаҳр', 'Председатель города', 'City Chairman'),
        href: '/rais-shahar',
      },
      {
        label: L('Қарорҳои Раиси шаҳр', 'Постановления председателя', 'Chairman resolutions'),
        href: 'https://khujand.tj/index.php?option=com_content&view=category&id=55&Itemid=188&lang=tg',
      },
      {
        label: L('Муовинони Раиси шаҳр', 'Заместители председателя', 'Deputy chairmen'),
        href: '/muovinon',
      },
      {
        label: L('Дастгоҳи Раиси шаҳр', 'Аппарат председателя', 'Chairman administration'),
        href: '/dastgoh',
      },
      {
        label: L('Роҳбарони воҳидҳои сохторӣ', 'Руководители структурных подразделений', 'Heads of structural units'),
        href: '/rohbaron',
      },
    ],
  },
  {
    label: L('Сохторҳо', 'Структуры', 'Structures'),
    href: '#',
    children: [
      { label: L('Саноат', 'Промышленность', 'Industry'), href: '/soxtor/sanoat' },
      { label: L('Маориф', 'Образование', 'Education'), href: '/soxtor/maorif' },
      { label: L('Варзиш', 'Спорт', 'Sports'), href: '/soxtor/varzish' },
      { label: L('Фарҳанг', 'Культура', 'Culture'), href: '/soxtor/farhang' },
      { label: L('Тандурустӣ', 'Здравоохранение', 'Healthcare'), href: '/soxtor/tandurusti' },
      { label: L('Бахши дин', 'Отдел по делам религии', 'Religious affairs'), href: '/soxtor/bahshi-din' },
      { label: L('Мактубҳо ва муроҷиати шаҳрвандон', 'Письма и обращения граждан', 'Citizen appeals'), href: '/soxtor/maktubho' },
      { label: L('Агентии меҳнат ва шуғли аҳолӣ', 'Агентство труда и занятости', 'Labour and employment agency'), href: '/soxtor/mehnat' },
      { label: L('Меъморӣ', 'Архитектура', 'Architecture'), href: '/soxtor/memori' },
      { label: L('Матбуот', 'Пресса', 'Press'), href: '/soxtor/matbuot' },
      { label: L('Сайёҳӣ', 'Туризм', 'Tourism'), href: '/soxtor/sayohi' },
      { label: L('Сармоягузорӣ', 'Инвестиции', 'Investment'), href: '/soxtor/sarmoyaguzori' },
      { label: L('Иҷроиши буҷет', 'Исполнение бюджета', 'Budget execution'), href: '/soxtor/budjet' },
      { label: L('Истифодаи замин', 'Использование земли', 'Land use'), href: '/soxtor/zamin' },
      { label: L('Ҳолати фавқулодда', 'Чрезвычайные ситуации', 'Emergencies'), href: '/soxtor/favqulodda' },
      { label: L('Хифзи иҷтимоӣ', 'Социальная защита', 'Social protection'), href: '/soxtor/hifzi-ijtimoii' },
    ],
  },
  {
    label: L('Таърихи шаҳр', 'История города', 'City history'),
    href: '/tarikh',
  },
  {
    label: L('Иқтисод', 'Экономика', 'Economy'),
    href: '#',
    children: [
      { label: L('Нақлиёт ва алоқа', 'Транспорт и связь', 'Transport and communications'), href: '/iqtisod/naqliyot' },
      { label: L('Савдо ва хизматрасонӣ', 'Торговля и услуги', 'Trade and services'), href: '/iqtisod/savdo' },
      { label: L('Лоиҳаҳои инвеститсионӣ', 'Инвестиционные проекты', 'Investment projects'), href: '/iqtisod/loiha' },
    ],
  },
  {
    label: L('Ба аҳолӣ', 'Населению', 'For residents'),
    href: '#',
    children: [
      { label: L('Ба сокинони шаҳр', 'Жителям города', 'For city residents'), href: '/aholi' },
    ],
  },
  {
    label: L('Бойгонӣ', 'Архив', 'Archive'),
    href: '#',
    children: [
      { label: L('Бойгонии ахборот', 'Архив новостей', 'News archive'), href: '/boygoni' },
    ],
  },
]

const localizeItem = (item: RawMenuItem, lang: Locale): MenuItem => ({
  label: pick(item.label, lang),
  href: withLangParam(item.href, lang),
  children: item.children?.map((child) => localizeItem(child, lang)),
})

export const getMenu = (lang: Locale): MenuItem[] => rawMenu.map((item) => localizeItem(item, lang))

/** @deprecated use getMenu(lang) */
export const mainMenu = getMenu('tg')
