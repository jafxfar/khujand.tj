import type { Locale, LocalizedString } from '@/lib/i18n'
import { pick, withLangPath } from '@/lib/i18n'
import { getUi } from '@/data/i18n/ui'
import type { ProfileArticle } from '@/data/i18n/articles/types'
import type { BreadcrumbCrumb } from '@/components/ContentWrapper'

const L = (tg: string, ru: string, en: string): LocalizedString => ({ tg, ru, en })

type Leader = {
  slug: string
  title: string
  image: string
  excerpt: LocalizedString
  paragraphs: LocalizedString[]
}

const people: Leader[] = [
  {
    slug: 'juraeva',
    title: 'Ҷӯраева К.Я.',
    image: '/images/extracted/lead-64aa8ead995d.jpg',
    excerpt: L(
      'Ҷӯраева Кибриё Яҳёевна 9 сентябри соли 1966 дар ноҳияи Бобоҷон Ғафуров таваллуд шуда, миллаташ тоҷик, маълумот олӣ мебошад.',
      'Джураева Кибриё Яхёевна родилась 9 сентября 1966 года в районе Б. Гафурова, таджичка, высшее образование.',
      'Juraeva Kibriyo Yahyoevna was born on 9 September 1966 in Bobojon Ghafurov district; Tajik, higher education.'
    ),
    paragraphs: [
      L(
        'Ҷӯраева Кибриё Яҳёевна 9 сентябри соли 1966 дар ноҳияи Бобоҷон Ғафуров таваллуд шуда, миллаташ тоҷик, маълумот олӣ мебошад.',
        'Джураева Кибриё Яхёевна родилась 9 сентября 1966 года в районе Б. Гафурова. По национальности таджичка, имеет высшее образование.',
        'Juraeva Kibriyo Yahyoevna was born on 9 September 1966 in Bobojon Ghafurov district. She is Tajik and has a higher education.'
      ),
    ],
  },
  {
    slug: 'yusupov',
    title: 'Юсупов М. З.',
    image: '/images/extracted/lead-5b07dfe1cac3.jpg',
    excerpt: L(
      'Юсупов Маъмурҷон Зулҳайдарович 1-уми июни соли 1981 таваллуд шудааст. Миллаташ тоҷик, маълумот олӣ мебошад.',
      'Юсупов Мамурджон Зулхайдарович родился 1 июня 1981 года. Таджик, высшее образование.',
      'Yusupov Mamurjon Zulhaydarovich was born on 1 June 1981. Tajik, higher education.'
    ),
    paragraphs: [
      L(
        'Юсупов Маъмурҷон Зулҳайдарович 1-уми июни соли 1981 таваллуд шудааст. Миллаташ тоҷик, маълумот олӣ мебошад.',
        'Юсупов Мамурджон Зулхайдарович родился 1 июня 1981 года. По национальности таджик, имеет высшее образование.',
        'Yusupov Mamurjon Zulhaydarovich was born on 1 June 1981. He is Tajik and has a higher education.'
      ),
    ],
  },
  {
    slug: 'malikislomov',
    title: 'Маликисломов Н. Н.',
    image: '/images/extracted/lead-f445a7a446ef.jpg',
    excerpt: L(
      'Насим Маликисломов 23 октябри соли 1986 дар шаҳри Хуҷанд, дар оилаи хизматчӣ ба дунё омадааст.',
      'Насим Маликисломов родился 23 октября 1986 года в Худжанде в семье служащего.',
      'Nasim Malikislomov was born on 23 October 1986 in Khujand into a civil servant’s family.'
    ),
    paragraphs: [
      L(
        'Насим Маликисломов 23 октябри соли 1986 дар шаҳри Хуҷанд, дар оилаи хизматчӣ ба дунё омадааст.',
        'Насим Маликисломов родился 23 октября 1986 года в Худжанде в семье служащего.',
        'Nasim Malikislomov was born on 23 October 1986 in Khujand into a civil servant’s family.'
      ),
    ],
  },
  {
    slug: 'yusufi',
    title: 'Юсуфӣ У. C.',
    image: '/images/extracted/lead-6ffc1b07d374.jpg',
    excerpt: L(
      'Юсуфӣ Усмон Сиддиқзода 23-юми сентябри соли 1982 дар ноҳияи Бобоҷон Ғафуров таваллуд шудааст. Миллаташ тоҷик, маълумоташ олӣ.',
      'Юсуфи Усмон Сиддикзода родился 23 сентября 1982 года в районе Б. Гафурова. Таджик, высшее образование.',
      'Yusufi Usmon Siddiqzoda was born on 23 September 1982 in Bobojon Ghafurov district. Tajik, higher education.'
    ),
    paragraphs: [
      L(
        'Юсуфӣ Усмон Сиддиқзода 23-юми сентябри соли 1982 дар ноҳияи Бобоҷон Ғафуров таваллуд шудааст. Миллаташ тоҷик, маълумоташ олӣ.',
        'Юсуфи Усмон Сиддикзода родился 23 сентября 1982 года в районе Б. Гафурова. Таджик, высшее образование.',
        'Yusufi Usmon Siddiqzoda was born on 23 September 1982 in Bobojon Ghafurov district. Tajik, higher education.'
      ),
    ],
  },
  {
    slug: 'ulmasova',
    title: 'Ӯлмасова Н. М.',
    image: '/images/extracted/lead-a8fb96272b5e.jpg',
    excerpt: L(
      'Ӯлмасова Нигина Маруфовна 08-уми октябри соли 1980 дар шаҳри Хуҷанд таваллуд шудааст. Миллаташ тоҷик, маълумоташ олӣ.',
      'Улмасова Нигина Маруфовна родилась 8 октября 1980 года в Худжанде. Таджичка, высшее образование.',
      'Ulmasova Nigina Marufovna was born on 8 October 1980 in Khujand. Tajik, higher education.'
    ),
    paragraphs: [
      L(
        'Ӯлмасова Нигина Маруфовна 08-уми октябри соли 1980 дар шаҳри Хуҷанд таваллуд шудааст. Миллаташ тоҷик, маълумоташ олӣ.',
        'Улмасова Нигина Маруфовна родилась 8 октября 1980 года в Худжанде. Таджичка, высшее образование.',
        'Ulmasova Nigina Marufovna was born on 8 October 1980 in Khujand. Tajik, higher education.'
      ),
    ],
  },
  {
    slug: 'abdukahhorzoda',
    title: 'Абдуқаҳҳорзода Т.',
    image: '/images/extracted/lead-e5f90ab8d6cb.jpg',
    excerpt: L(
      'Абдуқаҳҳорзода Таҳмина. Солҳои 2000–2002 лаборанти кафедраи забон ва адабиёти тоҷик дар Донишгоҳи давлатии Хуҷанд.',
      'Абдукаххорзода Тахмина. В 2000–2002 гг. лаборант кафедры таджикского языка и литературы ХГУ.',
      'Abdukahhorzoda Tahmina. In 2000–2002, laboratory assistant at the Tajik language and literature department, KSU.'
    ),
    paragraphs: [
      L(
        'Абдуқаҳҳорзода Таҳмина. Солҳои 2000–2002 лаборанти кафедраи забон ва адабиёти тоҷик дар Донишгоҳи давлатии Хуҷанд.',
        'Абдукаххорзода Тахмина. В 2000–2002 гг. лаборант кафедры таджикского языка и литературы ХГУ.',
        'Abdukahhorzoda Tahmina. In 2000–2002, laboratory assistant at the Tajik language and literature department, KSU.'
      ),
    ],
  },
  {
    slug: 'karimov',
    title: 'Каримов А. А.',
    image: '/images/extracted/lead-86c01980df59.jpg',
    excerpt: L(
      'Каримов Азимҷон Акрамҷонович 1-уми январи соли 1998 дар шаҳри Хуҷанд таваллуд шудааст. Миллаташ тоҷик, маълумоташ олӣ.',
      'Каримов Азимджон Акрамджонович родился 1 января 1998 года в Худжанде. Таджик, высшее образование.',
      'Karimov Azimjon Akramjonovich was born on 1 January 1998 in Khujand. Tajik, higher education.'
    ),
    paragraphs: [
      L(
        'Каримов Азимҷон Акрамҷонович 1-уми январи соли 1998 дар шаҳри Хуҷанд таваллуд шудааст. Миллаташ тоҷик, маълумоташ олӣ.',
        'Каримов Азимджон Акрамджонович родился 1 января 1998 года в Худжанде. Таджик, высшее образование.',
        'Karimov Azimjon Akramjonovich was born on 1 January 1998 in Khujand. Tajik, higher education.'
      ),
    ],
  },
  {
    slug: 'vohidov',
    title: 'Воҳидов А.Б.',
    image: '/images/extracted/lead-8419dd1ad4c9.jpg',
    excerpt: L(
      'Воҳидов Азамат Баҳодурович 6-уми июни соли 1974 дар н. Б.Ғафуров таваллуд шуда, миллаташ тоҷик, маълумот олии тиббӣ.',
      'Вохидов Азамат Баходурович родился 6 июня 1974 года в р-не Б. Гафурова, таджик, высшее медицинское образование.',
      'Vohidov Azamat Bahodurovich was born on 6 June 1974 in B. Ghafurov district; Tajik, higher medical education.'
    ),
    paragraphs: [
      L(
        'Воҳидов Азамат Баҳодурович 6-уми июни соли 1974 дар н. Б.Ғафуров таваллуд шуда, миллаташ тоҷик, маълумот олии тиббӣ.',
        'Вохидов Азамат Баходурович родился 6 июня 1974 года в р-не Б. Гафурова, таджик, высшее медицинское образование.',
        'Vohidov Azamat Bahodurovich was born on 6 June 1974 in B. Ghafurov district; Tajik, higher medical education.'
      ),
    ],
  },
  {
    slug: 'pulotov',
    title: 'Пӯлотов М. М.',
    image: '/images/extracted/lead-63ea297f9e06.jpg',
    excerpt: L(
      'Пӯлотов Мунир Мухторович 12 августи соли 1973 дар шаҳри Хуҷанд таваллуд шуда, миллаташ тоҷик, маълумоташ олӣ мебошад.',
      'Пулотов Мунир Мухторович родился 12 августа 1973 года в Худжанде, таджик, высшее образование.',
      'Pulotov Munir Mukhtorovich was born on 12 August 1973 in Khujand; Tajik, higher education.'
    ),
    paragraphs: [
      L(
        'Пӯлотов Мунир Мухторович 12 августи соли 1973 дар шаҳри Хуҷанд таваллуд шуда, миллаташ тоҷик, маълумоташ олӣ мебошад.',
        'Пулотов Мунир Мухторович родился 12 августа 1973 года в Худжанде, таджик, высшее образование.',
        'Pulotov Munir Mukhtorovich was born on 12 August 1973 in Khujand; Tajik, higher education.'
      ),
    ],
  },
  {
    slug: 'rahmonova',
    title: 'Раҳмонова М. А.',
    image: '/images/extracted/lead-b5e028889ea6.jpg',
    excerpt: L(
      'Раҳмонова Маҳфуза Абдуманоновна 12 феврали соли 1988 дар шаҳри Хуҷанд дар оилаи коргар таваллуд шуда, миллаташ тоҷик, маълумот олӣ.',
      'Рахмонова Махфуза Абдуманоновна родилась 12 февраля 1988 года в Худжанде в семье рабочего, таджичка, высшее образование.',
      'Rahmonova Mahfuza Abdumanonovna was born on 12 February 1988 in Khujand into a worker’s family; Tajik, higher education.'
    ),
    paragraphs: [
      L(
        'Раҳмонова Маҳфуза Абдуманоновна 12 феврали соли 1988 дар шаҳри Хуҷанд дар оилаи коргар таваллуд шуда, миллаташ тоҷик, маълумот олӣ.',
        'Рахмонова Махфуза Абдуманоновна родилась 12 февраля 1988 года в Худжанде в семье рабочего, таджичка, высшее образование.',
        'Rahmonova Mahfuza Abdumanonovna was born on 12 February 1988 in Khujand into a worker’s family; Tajik, higher education.'
      ),
    ],
  },
  {
    slug: 'shosaidov',
    title: 'Шосаидов С. С.',
    image: '/images/extracted/lead-d224ee396d9a.jpg',
    excerpt: L(
      'Шосаидов Саидакбар Саидқурбонович 10-уми октябри соли 1993 дар шаҳри Бӯстон таваллуд шудааст. Миллаташ тоҷик. Маълумот олӣ.',
      'Шосаидов Саидакбар Саидкурбонович родился 10 октября 1993 года в городе Бустон. Таджик. Высшее образование.',
      'Shosaidov Saidakbar Saidqurbonovich was born on 10 October 1993 in Buston. Tajik. Higher education.'
    ),
    paragraphs: [
      L(
        'Шосаидов Саидакбар Саидқурбонович 10-уми октябри соли 1993 дар шаҳри Бӯстон таваллуд шудааст. Миллаташ тоҷик. Маълумот олӣ.',
        'Шосаидов Саидакбар Саидкурбонович родился 10 октября 1993 года в городе Бустон. Таджик. Высшее образование.',
        'Shosaidov Saidakbar Saidqurbonovich was born on 10 October 1993 in Buston. Tajik. Higher education.'
      ),
    ],
  },
  {
    slug: 'dilovarzoda',
    title: 'Диловарзода Д. Д.',
    image: '/images/extracted/lead-17d8c6d6febe.jpg',
    excerpt: L(
      'Диловарзода Достон Диловар 21-уми феврали соли 1996 дар шаҳри Бӯстон таваллуд шуда, миллаташ тоҷик, маълумот олӣ мебошад.',
      'Диловарзода Достон Диловар родился 21 февраля 1996 года в городе Бустон, таджик, высшее образование.',
      'Dilovarzoda Doston Dilovar was born on 21 February 1996 in Buston; Tajik, higher education.'
    ),
    paragraphs: [
      L(
        'Диловарзода Достон Диловар 21-уми феврали соли 1996 дар шаҳри Бӯстон таваллуд шуда, миллаташ тоҷик, маълумот олӣ мебошад.',
        'Диловарзода Достон Диловар родился 21 февраля 1996 года в городе Бустон, таджик, высшее образование.',
        'Dilovarzoda Doston Dilovar was born on 21 February 1996 in Buston; Tajik, higher education.'
      ),
    ],
  },
]

export const getRohbaronCategory = (lang: Locale) => {
  const ui = getUi(lang)
  const crumbs: BreadcrumbCrumb[] = [
    { label: ui.breadcrumb, href: withLangPath('/', lang) },
    { label: ui.executive },
    { label: ui.leadersMenu },
  ]

  return {
    title: ui.leadersMenu,
    crumbs,
    items: people.map((p) => ({
      title: p.title,
      href: withLangPath(`/rohbaron/${p.slug}`, lang),
      image: p.image,
      excerpt: pick(p.excerpt, lang),
    })),
  }
}

export const getRohbaronPerson = (lang: Locale, slug: string): ProfileArticle | null => {
  const person = people.find((p) => p.slug === slug)
  if (!person) return null

  const ui = getUi(lang)

  return {
    slug: person.slug,
    title: person.title,
    date: '',
    image: person.image,
    imageAlt: person.title,
    imageWidth: 150,
    imageHeight: 200,
    paragraphs: person.paragraphs.map((p) => pick(p, lang)),
    rating: { votes: 24, average: 3.9, max: 5 },
    crumbs: [
      { label: ui.breadcrumb, href: withLangPath('/', lang) },
      { label: ui.executive },
      { label: ui.leadersMenu, href: withLangPath('/rohbaron', lang) },
      { label: person.title },
    ],
  }
}

export const rohbaronSlugs = people.map((p) => p.slug)
