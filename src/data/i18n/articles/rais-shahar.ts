import type { Locale, LocalizedString } from '@/lib/i18n'
import { pick, withLangPath } from '@/lib/i18n'
import { getUi } from '@/data/i18n/ui'
import type { ProfileArticle } from '@/data/i18n/articles/types'

const L = (tg: string, ru: string, en: string): LocalizedString => ({ tg, ru, en })

const title = L('Фирдавс Шарифзода', 'Фирдавс Шарифзода', 'Firdavs Sharifzoda')

const roleTitle = L('Раиси шаҳри Хуҷанд', 'Председатель города Худжанда', 'Chairman of Khujand City')

const date = L('19 ИЮН 2021', '19 ИЮНЯ 2021', '19 JUNE 2021')

const paragraphs: LocalizedString[] = [
  L(
    'Фирдавс Шарифзода 16-уми феврали соли 1984 дар шаҳри Хуҷанд таваллуд шудааст. Миллаташ тоҷик, маълумоташ олӣ.',
    'Фирдавс Шарифзода родился 16 февраля 1984 в городе Худжанде в семье служащего. По национальности таджик. Имеет высшее образование.',
    'Firdavs Sharifzoda was born on 16 February 1984 in the city of Khujand in a family of employees. He is Tajik by nationality and has a higher education.'
  ),
  L(
    'Соли 2004 Донишгоҳи давлатии Хуҷанд ба номи академик Бобоҷон Ғафуровро бо ихтисоси иқтисодчӣ хатм намудааст. Соли 2015 Академияи хоҷагии халқ ва хизмати давлатии назди Президенти Федератсияи Россияро бо дипломи аъло хатм кардааст.',
    'В 2004 году окончил Худжандский государственный университет имени академика Б.Гафурова по специальности экономист. В 2015 году с отличием окончил Российскую Академию народного хозяйства и государственной службы при президенте Российской Федерации.',
    'In 2004 he graduated from Khujand State University named after Academician B. Gafurov with a degree in economics. In 2015 he graduated with honors from the Russian Presidential Academy of National Economy and Public Administration.'
  ),
  L(
    'Мавсуф солҳои 2001-2003 дар вазифаи сармутахассиси Кумитаи ҳифзи табиати вилояти Суғд, солҳои 2003-2012 дар вазифаи мутахассиси пешбари шуъбаи меъморӣ ва шаҳрсозии мақомоти иҷроияи ҳокимияти давлатии шаҳри Хуҷанд, солҳои 2012-2014 дар вазифаи сармутахассиси бахши сармоягузорӣ ва идораи амволи давлатии мақомоти иҷроияи ҳокимияти давлатии шаҳри Хуҷанд, солҳои 2014-2015 дар вазифаи мудири бахши Агентии давлатии ҳифзи иҷтимоии аҳолии мақомоти иҷроияи ҳокимияти давлатии шаҳри Хуҷанд кор кардааст.',
    'Свою трудовую деятельность начал в должности главного специалиста Комитета охраны природы Согдийской области в 2001-2003 году. В 2003-2012 годах — ведущий специалист отдела архитектуры и градостроительства исполнительного органа государственной власти города Худжанда. С 2012–2014 гг. — главный специалист отдела по инвестициям и управления госимуществом исполнительного органа государственной власти города Худжанда. В 2014-2015 гг. работал заведующим сектором Государственного Агентства социальной защиты населения исполнительного органа государственной власти Худжанда.',
    'He began his career as a chief specialist of the Committee for Nature Protection of Sughd Region in 2001–2003. In 2003–2012 he was a leading specialist of the Architecture and Urban Planning Department of the Executive Body of State Authority of Khujand City. In 2012–2014 he served as chief specialist of the Investment and State Property Management Department of the Executive Body of State Authority of Khujand City. In 2014–2015 he worked as head of the sector of the State Agency for Social Protection of the Population of the Executive Body of State Authority of Khujand.'
  ),
  L(
    'Аз моҳи апрели соли 2015 то декабри соли 2018 директори генералии Палатаи савдо ва саноати вилояти Суғд буд. Аз 12-уми декабри соли 2018 то санаи 18.11.2020 дар вазифаи Раиси шаҳри Гулистон фаъолияти пурсамар дошт.',
    'С апреля 2015 года по декабрь 2018 года был генеральным директором Торгово-промышленной палаты Согдийской области. С 12 декабря 2018 года по 18 ноября 2020 года был председателем города Гулистон.',
    'From April 2015 to December 2018 he was Director General of the Chamber of Commerce and Industry of Sughd Region. From 12 December 2018 to 18 November 2020 he served as Chairman of Guliston City.'
  ),
  L(
    'Бо Фармони Президенти Ҷумҳурии Тоҷикистон, муҳтарам Эмомалӣ Раҳмон аз 18 ноябри соли 2020 №74 Раиси шаҳри Хуҷанд таъин карда шуд.',
    'Указом Президента Республики Таджикистан, уважаемым Эмомали Рахмоном от 18 ноября 2020 года №74 назначен председателем города Худжанда.',
    'By Decree of the President of the Republic of Tajikistan, His Excellency Emomali Rahmon, No. 74 of 18 November 2020, he was appointed Chairman of Khujand City.'
  ),
  L(
    'Оиладор, соҳиби се фарзанд.',
    'Женат, имеет троих детей.',
    'He is married and has three children.'
  ),
]

export const RAIS_SHAHAR_SLUG = 'rais-shahar'

export const getRaisShaharArticle = (lang: Locale): ProfileArticle => {
  const ui = getUi(lang)
  const pageTitle = pick(title, lang)

  return {
    slug: RAIS_SHAHAR_SLUG,
    title: pageTitle,
    date: pick(date, lang),
    image: '/images/stories/fsharifzoda.jpg',
    imageAlt: pageTitle,
    imageWidth: 220,
    imageHeight: 147,
    roleTitle: pick(roleTitle, lang),
    paragraphs: paragraphs.map((p) => pick(p, lang)),
    rating: { votes: 180, average: 3.8, max: 5 },
    crumbs: [
      { label: ui.breadcrumb, href: withLangPath('/', lang) },
      { label: ui.executive },
      { label: ui.mayor },
    ],
  }
}

/** @deprecated use ProfileArticle */
export type ArticleContent = ProfileArticle
