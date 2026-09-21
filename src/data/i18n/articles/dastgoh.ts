import type { Locale, LocalizedString } from '@/lib/i18n'
import { pick, withLangPath } from '@/lib/i18n'
import { getUi } from '@/data/i18n/ui'
import type { ProfileArticle } from '@/data/i18n/articles/types'

const L = (tg: string, ru: string, en: string): LocalizedString => ({ tg, ru, en })

const title = L('Ҳомидзода А.А.', 'Хомидзода А.А.', 'Homidzoda A.A.')

const roleTitle = L(
  'Роҳбари Дастгоҳи Раиси шаҳр',
  'Руководитель аппарата председателя города',
  'Head of the Chairman’s Office'
)

const date = L('08 МАЙ 2017', '08 МАЯ 2017', '08 MAY 2017')

const paragraphs: LocalizedString[] = [
  L(
    'Абдуваҳҳоб Ҳомидзода 8-уми июни соли 1978 дар шаҳри Хуҷанд таваллуд ёфтааст. Миллаташ тоҷик, маълумоташ олӣ.',
    'Хомидзода Абдувахоб Абдумаджид родился 8 июня 1978 года в городе Худжанде. По национальности таджик, имеет высшее образование.',
    'Abduvahhob Homidzoda was born on 8 June 1978 in the city of Khujand. He is Tajik by nationality and has a higher education.'
  ),
  L(
    'Соли 1999 Донишгоҳи давлатии ҳуқуқ, бизнес ва сиёсати Тоҷикистонро бо ихтисоси иқтисодчӣ – менеҷер хатм намудааст.',
    'В 1999 году окончил Таджикский государственный университет права, бизнеса и политики по специальности экономист–менеджер.',
    'In 1999 he graduated from the Tajik State University of Law, Business and Politics with a degree in economics and management.'
  ),
  L(
    'Фаъолияти меҳнатии худро соли 2002 дар вазифаи мутахассиси шуъбаи робитаҳои бурунмарзӣ ва фаъолияти инвеститсионии шаҳри Хуҷанд оғоз намудааст. Солҳои 2004-2006 мудири шуъбаи мактубҳо ва қабули шаҳрвандони мақомоти иҷроияи ҳокимияти давлатии шаҳри Хуҷанд буд. Аз соли 2006 то соли 2007 мудири шуъбаи савдои мақомоти иҷроияи ҳокимияти давлатии шаҳри Хуҷанд ифои вазифа намуд. Солҳои 2007-2011 фаъолияти худро чун сармутахассиси бахши савдои мақомоти иҷроияи ҳокимияти давлатии шаҳри Хуҷанд идома дода, аз соли 2011 ба вазифаи сармутахассиси шуъбаи иқтисод ва савдои мақомоти иҷроияи ҳокимияти давлатии шаҳри Хуҷанд таъин гардид.',
    'Начал свою трудовую деятельность в 2002 году в должности специалиста отдела внешних связей и инвестиционной деятельности города Худжанда. В 2004-2006 годах занимал должность управляющего отделом писем и приёма граждан. С 2006 до 2007 года — управляющий отделом торговли. В 2007-2011 годах — главный специалист отдела торговли, с 2011 года — главный специалист отдела экономики и торговли органа исполнительной власти города Худжанда.',
    'He began his career in 2002 as a specialist of the External Relations and Investment Activity Department of Khujand. In 2004–2006 he headed the Letters and Citizen Reception Department. From 2006 to 2007 he headed the Trade Department. In 2007–2011 he served as chief specialist of the Trade Department, and from 2011 as chief specialist of the Economy and Trade Department of the city’s executive body.'
  ),
  L(
    'Санаи 8 майи соли 2017 бо Қарори Раиси шаҳри Хуҷанд роҳбари дастгоҳи Раиси шаҳри Хуҷанд таъин гардид.',
    '8 мая 2017 года по решению Председателя города Худжанда назначен руководителем аппарата Председателя города Худжанда.',
    'On 8 May 2017, by decision of the Chairman of Khujand City, he was appointed Head of the Chairman’s Office.'
  ),
]

export const DASTGOH_SLUG = 'dastgoh'

export const getDastgohArticle = (lang: Locale): ProfileArticle => {
  const ui = getUi(lang)
  const pageTitle = pick(title, lang)

  return {
    slug: DASTGOH_SLUG,
    title: pageTitle,
    date: pick(date, lang),
    image: '/images/extracted/dep-38e9c6eaa166.jpg',
    imageAlt: pageTitle,
    imageWidth: 150,
    imageHeight: 200,
    roleTitle: pick(roleTitle, lang),
    paragraphs: paragraphs.map((p) => pick(p, lang)),
    rating: { votes: 42, average: 4.2, max: 5 },
    crumbs: [
      { label: ui.breadcrumb, href: withLangPath('/', lang) },
      { label: ui.executive },
      { label: ui.administration },
    ],
  }
}
