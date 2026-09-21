import type { Locale, LocalizedString } from '@/lib/i18n'
import { pick, withLangPath } from '@/lib/i18n'
import { getUi } from '@/data/i18n/ui'
import type { ProfileArticle } from '@/data/i18n/articles/types'
import type { BreadcrumbCrumb } from '@/components/ContentWrapper'

const L = (tg: string, ru: string, en: string): LocalizedString => ({ tg, ru, en })

export type CategoryPerson = {
  slug: string
  title: string
  image: string
  roleTitle?: LocalizedString
  excerpt: LocalizedString
  paragraphs: LocalizedString[]
  date?: LocalizedString
}

const people: CategoryPerson[] = [
  {
    slug: 'gaybullozoda',
    title: 'Ғайбуллозода Х.',
    image: '/images/extracted/dep-3b31bd671990.jpg',
    roleTitle: L(
      'Муовини аввали Раиси шаҳр',
      'Первый заместитель председателя города',
      'First Deputy City Chairman'
    ),
    excerpt: L(
      'Хайрулло Ғайбуллозода бо қарори Раиси шаҳр таҳти №281 аз 2 июни соли 2016 муовини якуми Раиси шаҳри Хуҷанд таъин гардид. 18-уми июли соли 1970 дар шаҳри Хуҷанд, дар оилаи зиёӣ ба дунё омадааст.',
      'Хайрулло Гайбуллозода назначен первым заместителем председателя города постановлением №281 от 2 июня 2016 года. Родился 18 июля 1970 года в Худжанде в семье интеллигенции.',
      'Khayrullo Gaybullozoda was appointed First Deputy City Chairman by resolution No. 281 of 2 June 2016. He was born on 18 July 1970 in Khujand into an educated family.'
    ),
    paragraphs: [
      L(
        'Хайрулло Ғайбуллозода бо қарори Раиси шаҳр таҳти №281 аз 2 июни соли 2016 муовини якуми Раиси шаҳри Хуҷанд таъин гардид.',
        'Хайрулло Гайбуллозода назначен первым заместителем председателя города Худжанда постановлением №281 от 2 июня 2016 года.',
        'Khayrullo Gaybullozoda was appointed First Deputy Chairman of Khujand City by resolution No. 281 of 2 June 2016.'
      ),
      L(
        '18-уми июли соли 1970 дар шаҳри Хуҷанд, дар оилаи зиёӣ ба дунё омадааст. Соли 1987 баъди хатми мактаби миёна ба Филиали хуҷандии Донишгоҳи политехникӣ дохил шудааст.',
        'Родился 18 июля 1970 года в Худжанде в семье интеллигенции. В 1987 году после окончания средней школы поступил в Худжандский филиал политехнического университета.',
        'He was born on 18 July 1970 in Khujand into an educated family. In 1987, after finishing secondary school, he entered the Khujand branch of the Polytechnic University.'
      ),
      L(
        'Оиладор, соҳиби 4 фарзанд.',
        'Женат, имеет четверых детей.',
        'He is married and has four children.'
      ),
    ],
  },
  {
    slug: 'qahori',
    title: 'Муяссара Қаҳорӣ',
    image: '/images/extracted/dep-b535d77216b8.jpg',
    roleTitle: L('Муовини Раиси шаҳр', 'Заместитель председателя города', 'Deputy City Chairman'),
    excerpt: L(
      'Муяссара Қаҳорӣ 15 октябри соли 1979 дар шаҳри Хуҷанд таваллуд шудааст. Миллаташ тоҷик. Маълумот олӣ. Соли 2002 Донишгоҳи давлатии Хуҷанд ба номи академик Б.Ғафуровро хатм кардааст.',
      'Муяссара Кахори родилась 15 октября 1979 года в Худжанде. Таджичка. Высшее образование. В 2002 году окончила Худжандский государственный университет имени академика Б.Гафурова.',
      'Muyassara Qahori was born on 15 October 1979 in Khujand. Tajik. Higher education. In 2002 she graduated from Khujand State University named after Academician B. Gafurov.'
    ),
    paragraphs: [
      L(
        'Муяссара Қаҳорӣ 15 октябри соли 1979 дар шаҳри Хуҷанд таваллуд шудааст. Миллаташ тоҷик. Маълумот олӣ.',
        'Муяссара Кахори родилась 15 октября 1979 года в Худжанде. По национальности таджичка. Имеет высшее образование.',
        'Muyassara Qahori was born on 15 October 1979 in Khujand. She is Tajik by nationality and has a higher education.'
      ),
      L(
        'Соли 2002 Донишгоҳи давлатии Хуҷанд ба номи академик Б.Ғафуровро бо ихтисоси сиёсатшиносӣ ва ҳуқуқ хатм намудааст. Аз моҳи августи соли 2017 ба ҳайси мудири шуъбаи кор бо занон ва оилаи Мақомоти иҷроияи ҳокимияти давлатии шаҳри Хуҷанд фаъолият намудааст.',
        'В 2002 году окончила Худжандский государственный университет имени академика Б.Гафурова по специальности политология и право. С августа 2017 года работала заведующей отделом по делам женщин и семьи исполнительного органа государственной власти города Худжанда.',
        'In 2002 she graduated from Khujand State University named after Academician B. Gafurov in political science and law. From August 2017 she headed the Women and Family Affairs Department of the city’s executive body.'
      ),
      L(
        'Бо қарори Раиси шаҳри Хуҷанд аз 12 январи соли 2024 ба мансаби муовини Раиси шаҳри Хуҷанд таъин гардид. Оиладор, соҳиби чор фарзанд.',
        'Постановлением председателя города Худжанда от 12 января 2024 года назначена заместителем председателя города. Замужем, имеет четверых детей.',
        'By decision of the City Chairman of 12 January 2024 she was appointed Deputy City Chairman. She is married and has four children.'
      ),
    ],
  },
  {
    slug: 'homidzoda',
    title: 'Ҳомидзода А.А.',
    image: '/images/extracted/dep-38e9c6eaa166.jpg',
    roleTitle: L(
      'Роҳбари Дастгоҳи Раиси шаҳр',
      'Руководитель аппарата председателя города',
      'Head of the Chairman’s Office'
    ),
    excerpt: L(
      'Абдуваҳҳоб Ҳомидзода 8-уми июни соли 1978 дар шаҳри Хуҷанд таваллуд ёфтааст. Миллаташ тоҷик, маълумоташ олӣ. Соли 1999 Донишгоҳи давлатии ҳуқуқ, бизнес ва сиёсати Тоҷикистонро хатм намудааст.',
      'Хомидзода Абдувахоб Абдумаджид родился 8 июня 1978 года в Худжанде. Таджик, высшее образование. В 1999 году окончил ТГУПБП.',
      'Abduvahhob Homidzoda was born on 8 June 1978 in Khujand. Tajik, higher education. Graduated from TSU LBP in 1999.'
    ),
    paragraphs: [
      L(
        'Абдуваҳҳоб Ҳомидзода 8-уми июни соли 1978 дар шаҳри Хуҷанд таваллуд ёфтааст. Миллаташ тоҷик, маълумоташ олӣ. Соли 1999 Донишгоҳи давлатии ҳуқуқ, бизнес ва сиёсати Тоҷикистонро бо ихтисоси иқтисодчӣ – менеҷер хатм намудааст.',
        'Хомидзода Абдувахоб Абдумаджид родился 8 июня 1978 года в городе Худжанде. По национальности таджик, имеет высшее образование. В 1999 году окончил ТГУПБП по специальности экономист–менеджер.',
        'Abduvahhob Homidzoda was born on 8 June 1978 in Khujand. Tajik, higher education. In 1999 he graduated as an economist-manager.'
      ),
      L(
        'Санаи 8 майи соли 2017 бо Қарори Раиси шаҳри Хуҷанд роҳбари дастгоҳи Раиси шаҳри Хуҷанд таъин гардид.',
        '8 мая 2017 года назначен руководителем аппарата Председателя города Худжанда.',
        'On 8 May 2017 he was appointed Head of the Chairman’s Office of Khujand City.'
      ),
    ],
  },
  {
    slug: 'nabizoda',
    title: 'Ҷамшед Набизода',
    image: '/images/extracted/dep-263e15c2aef3.jpg',
    roleTitle: L('Муовини Раиси шаҳр', 'Заместитель председателя города', 'Deputy City Chairman'),
    excerpt: L(
      'Ҷамшед Набизода 9-уми майи соли 1981 дар шаҳри Хуҷанд таваллуд ёфтааст. Миллаташ тоҷик. Соли 2003 Донишгоҳи давлатии ҳуқуқ, бизнес ва сиёсатро хатм кардааст.',
      'Джамшед Набизода родился 9 мая 1981 года в Худжанде. Таджик. В 2003 году окончил Государственный университет права, бизнеса и политики.',
      'Jamshed Nabizoda was born on 9 May 1981 in Khujand. Tajik. Graduated from the State University of Law, Business and Politics in 2003.'
    ),
    paragraphs: [
      L(
        'Ҷамшед Набизода 9-уми майи соли 1981 дар шаҳри Хуҷанд таваллуд ёфтааст. Миллаташ тоҷик.',
        'Джамшед Набизода родился 9 мая 1981 года в городе Худжанде. По национальности таджик.',
        'Jamshed Nabizoda was born on 9 May 1981 in Khujand. He is Tajik by nationality.'
      ),
      L(
        'Соли 2003 Донишгоҳи давлатии ҳуқуқ, бизнес ва сиёсатро хатм кардааст.',
        'В 2003 году окончил Государственный университет права, бизнеса и политики.',
        'In 2003 he graduated from the State University of Law, Business and Politics.'
      ),
    ],
  },
]

export const getMuovinonCategory = (lang: Locale) => {
  const ui = getUi(lang)
  const crumbs: BreadcrumbCrumb[] = [
    { label: ui.breadcrumb, href: withLangPath('/', lang) },
    { label: ui.executive },
    { label: ui.deputies },
  ]

  return {
    title: ui.deputies,
    crumbs,
    items: people.map((p) => ({
      title: p.title,
      href: withLangPath(`/muovinon/${p.slug}`, lang),
      image: p.image,
      excerpt: pick(p.excerpt, lang),
    })),
  }
}

export const getMuovinonPerson = (lang: Locale, slug: string): ProfileArticle | null => {
  const person = people.find((p) => p.slug === slug)
  if (!person) return null

  const ui = getUi(lang)
  // Homidzoda detail also lives under /dastgoh — keep slug page for LOF links
  const hrefBase = slug === 'homidzoda' ? '/dastgoh' : `/muovinon/${slug}`

  return {
    slug: person.slug,
    title: person.title,
    date: person.date ? pick(person.date, lang) : '',
    image: person.image,
    imageAlt: person.title,
    imageWidth: 150,
    imageHeight: 200,
    roleTitle: person.roleTitle ? pick(person.roleTitle, lang) : undefined,
    paragraphs: person.paragraphs.map((p) => pick(p, lang)),
    rating: { votes: 36, average: 4.0, max: 5 },
    crumbs: [
      { label: ui.breadcrumb, href: withLangPath('/', lang) },
      { label: ui.executive },
      { label: ui.deputies, href: withLangPath('/muovinon', lang) },
      { label: person.title, href: withLangPath(hrefBase, lang) },
    ],
  }
}

export const muovinonSlugs = people.map((p) => p.slug)
