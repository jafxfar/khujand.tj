import type { Locale, LocalizedString } from '@/lib/i18n'
import { pick, withLangPath } from '@/lib/i18n'
import { getUi } from '@/data/i18n/ui'
import type { SiteArticle } from '@/data/i18n/articles/types'

const L = (tg: string, ru: string, en: string): LocalizedString => ({ tg, ru, en })

const title = L(
  'Хуҷанд - маркази ҳунарҳои мардумӣ',
  'Худжанд — центр народных ремёсел',
  'Khujand — centre of folk crafts'
)

const date = L('Маълумоти Хуҷанд', 'Сведения о Худжанде', 'Khujand facts')

const paragraphs: LocalizedString[] = [
  L(
    '1. Масоҳати шаҳр – 3996,0 га.',
    '1. Площадь города — 3996,0 га.',
    '1. City area — 3,996.0 ha.'
  ),
  L(
    '2. Миқдори аҳолӣ – 174 ҳазору 100 нафар. Ҷойи кор – 41403 адад; шумораи ҷойҳои кории холӣ – 442; ҷавонони корҷӯянда (то 35 сола) – 965 нафар; нафақахӯрон – 17378 нафар; муҳоҷирон – 2210 нафар.',
    '2. Население — 174 100 человек. Рабочих мест — 41 403; вакансий — 442; молодых соискателей работы (до 35 лет) — 965; пенсионеров — 17 378; мигрантов — 2210.',
    '2. Population — 174,100. Jobs — 41,403; vacancies — 442; young job seekers (under 35) — 965; pensioners — 17,378; migrants — 2,210.'
  ),
  L(
    '3. Миқдори умумии корхонаҳои истеҳсоли маҳсулоти саноатӣ дар шаҳр – 597 адад (хусусӣ 592, давлатӣ 5). Миқдори кормандон дар соҳаи саноат – 8775 нафар; корхонаҳои муштарак – 7; корхонаҳои нав дар 3 соли охир – 110 адад.',
    '3. Всего промышленных предприятий в городе — 597 (частных 592, государственных 5). Занятых в промышленности — 8775; совместных предприятий — 7; новых за последние 3 года — 110.',
    '3. Total industrial enterprises in the city — 597 (private 592, state 5). Industry employees — 8,775; joint ventures — 7; new enterprises in the last 3 years — 110.'
  ),
  L(
    '4. Соҳаи маориф: миқдори мактабҳои маълумоти умумӣ – 48; кӯдакистонҳо – 31 адад (аз онҳо хусусӣ 5).',
    '4. Образование: общеобразовательных школ — 48; детских садов — 31 (из них частных 5).',
    '4. Education: general education schools — 48; kindergartens — 31 (including 5 private).'
  ),
  L(
    '5. Муассисаҳои тандурустӣ – 43 адад: марказҳои тиббӣ – 7, беморхонаҳо – 15, марказҳои тиббии хусусӣ – 21.',
    '5. Учреждения здравоохранения — 43: медицинских центров — 7, больниц — 15, частных медицинских центров — 21.',
    '5. Healthcare institutions — 43: medical centres — 7, hospitals — 15, private medical centres — 21.'
  ),
  L(
    '6. Муассисаҳои фарҳангӣ: театрҳо ва марказҳои фарҳангӣ – 6; толорҳои консертӣ – 5; китобхонаҳои оммавӣ – 11; китобхонаҳои хусусӣ – 10; осорхонаҳо – 3; ёдгориҳои таърихӣ – 10 адад.',
    '6. Учреждения культуры: театры и культурные центры — 6; концертные залы — 5; публичные библиотеки — 11; частные библиотеки — 10; музеи — 3; исторические памятники — 10.',
    '6. Cultural institutions: theatres and culture centres — 6; concert halls — 5; public libraries — 11; private libraries — 10; museums — 3; historical monuments — 10.'
  ),
]

export const getTarikhArticle = (lang: Locale): SiteArticle => {
  const ui = getUi(lang)
  const pageTitle = pick(title, lang)

  return {
    slug: 'tarikh',
    title: pageTitle,
    date: pick(date, lang),
    paragraphs: paragraphs.map((p) => pick(p, lang)),
    rating: { votes: 8, average: 4.0, max: 5 },
    crumbs: [
      { label: ui.breadcrumb, href: withLangPath('/', lang) },
      { label: ui.cityHistory },
    ],
  }
}
