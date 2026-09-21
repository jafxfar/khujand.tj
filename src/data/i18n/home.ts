import type { Locale, LocalizedString } from '@/lib/i18n'
import { pick, withLangParam } from '@/lib/i18n'
import { footerAddress, footerStreet, getUi } from '@/data/i18n/ui'

export type Slide = {
  title: string
  excerpt: string
  href: string
  image: string
  thumb: string
}

export type NewsItem = {
  title: string
  href: string
  date: string
  image: string
  excerpt: string
}

export type LofItem = {
  title: string
  href: string
  image: string
  description: string
}

export type LofBlock = {
  title: string
  items: LofItem[]
}

export type LinkItem = {
  title: string
  href: string
  date?: string
}

type RawSlide = {
  title: LocalizedString
  excerpt: LocalizedString
  href: string
  image: string
  thumb: string
}

type RawNews = {
  title: LocalizedString
  excerpt: LocalizedString
  date: LocalizedString
  href: string
  image: string
}

type RawLof = {
  title: string
  href: string
  image: string
  description: LocalizedString
}

const L = (tg: string, ru: string, en: string): LocalizedString => ({ tg, ru, en })

const clean = (s: string, max = 150) => {
  const t = s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').replace(/\s*\.\.\.\s*$/, '').trim()
  if (t.length <= max) return t.endsWith('.') ? t : `${t}...`
  return `${t.slice(0, max).replace(/\s+\S*$/, '')}...`
}

const slidesRaw: RawSlide[] = [
  {
    title: L(
      'Номаи табрикотии Раиси шаҳри Хуҷанд Фирдавс Шарифзода ба муносибати 35 солагии Истиқлолияти давлатии Ҷумҳурии Тоҷикистон',
      'Поздравительное послание председателя города Худжанда Фирдавса Шарифзода к 35-летию государственной независимости Республики Таджикистан',
      'Congratulatory message of Khujand City Chairman Firdavs Sharifzoda on the 35th anniversary of Tajikistan’s state independence'
    ),
    excerpt: L(
      'ИСТИҚЛОЛ – ОМИЛИ ПЕШРАВИВУ СОҲИБДАВЛАТӢ',
      'НЕЗАВИСИМОСТЬ – ФАКТОР ПРОГРЕССА И ГОСУДАРСТВЕННОСТИ',
      'INDEPENDENCE – A DRIVER OF PROGRESS AND STATEHOOD'
    ),
    href: 'https://khujand.tj/index.php?option=com_content&view=article&id=9984%3Amuloqot&catid=36%3Anavgoni&Itemid=182&lang=tg',
    image: '/images/stories/4150.jpg',
    thumb: '/images/extracted/ice-thumb-da68f86a5415.jpg',
  },
  {
    title: L(
      'МТТ №28: “Истиқлол-дастоварди пурарзиши миллат!',
      'ДОУ №28: «Независимость — бесценное достижение нации!»',
      'Preschool No. 28: “Independence — the nation’s precious achievement!”'
    ),
    excerpt: L(
      'Бо садо додани Суруди миллӣ дар кӯдакистони №28-и шаҳри Хуҷанд маҳфили идона таҳти унвони “Ҷашни фархундаи истиқлолу озодӣ” оғоз гардид.',
      'Под гимн в детском саду №28 города Худжанда начался праздничный вечер «Светлый праздник независимости и свободы».',
      'With the national anthem, Preschool No. 28 in Khujand opened a festive event titled “The bright celebration of independence and freedom”.'
    ),
    href: 'https://khujand.tj/index.php?option=com_content&view=article&id=9982%3Amuloqot&catid=36%3Anavgoni&Itemid=182&lang=tg',
    image: '/images/stories/4489.jpg',
    thumb: '/images/extracted/ice-thumb-5d742736fc94.jpg',
  },
  {
    title: L(
      'МТТ №20: Истиқлолият-неъмати бебаҳо ва волои ҳаёти инсон',
      'ДОУ №20: Независимость — бесценное благо и высшая ценность жизни',
      'Preschool No. 20: Independence — an invaluable blessing and the highest value of life'
    ),
    excerpt: L(
      'Дар Муассисаи таълимии томактабии №20-и шаҳри Хуҷанд бахшида ба 35-умин солгарди Истиқлолият чорабинии маърифатӣ ва фарҳангӣ баргузор гардид.',
      'В дошкольном учреждении №20 города Худжанда прошло образовательно-культурное мероприятие к 35-летию независимости.',
      'An educational and cultural event marking the 35th anniversary of independence was held at Preschool No. 20 in Khujand.'
    ),
    href: 'https://khujand.tj/index.php?option=com_content&view=article&id=9983%3Amuloqot&catid=36%3Anavgoni&Itemid=182&lang=tg',
    image: '/images/stories/4490.jpg',
    thumb: '/images/extracted/ice-thumb-384337fc595b.jpg',
  },
  {
    title: L(
      'Иштироки беш аз 35 ҳазор нафар дар раҳпаймоии идона бахшида ба 35-солагии Истиқлол дар шаҳри Хуҷанд',
      'Более 35 тысяч участников праздничного шествия к 35-летию независимости в Худжанде',
      'More than 35,000 people joined the festive march for the 35th independence anniversary in Khujand'
    ),
    excerpt: L(
      'Субҳи имрӯз, санаи 5-уми сентябр бахшида ба 35–солагии Истиқлол дар маркази вилоят роҳпаймоии меҳнаткашон баргузор гардид.',
      'Утром 5 сентября в центре области состоялось шествие трудящихся, посвящённое 35-летию независимости.',
      'On the morning of 5 September, a workers’ march for the 35th independence anniversary was held in the regional centre.'
    ),
    href: 'https://khujand.tj/index.php?option=com_content&view=article&id=9981%3Amuloqot&catid=36%3Anavgoni&Itemid=182&lang=tg',
    image: '/images/stories/4488.jpg',
    thumb: '/images/extracted/ice-thumb-cb348bee9458.jpg',
  },
  {
    title: L(
      '“ШУКУФАИ ИСТИҚЛОЛ”: ИСТИҚЛОЛУ ОБОДИЯТ ПОЯНДА БОД, ТОҶИКИСТОН”!',
      '«ЦВЕТОК НЕЗАВИСИМОСТИ»: ДА ЗДРАВСТВУЮТ НЕЗАВИСИМОСТЬ И ПРОЦВЕТАНИЕ, ТАДЖИКИСТАН!»',
      '“BLOSSOM OF INDEPENDENCE”: LONG LIVE INDEPENDENCE AND PROSPERITY, TAJIKISTAN!”'
    ),
    excerpt: L(
      'Дар кӯдакистони ба номи «Шукуфаи Истиқлол» ба муносибати 35 солагии Истиқлоли давлатӣ маҳфили идона баргузор гардид.',
      'В детском саду «Цветок независимости» прошёл праздничный вечер к 35-летию государственной независимости.',
      'A festive gathering for the 35th anniversary of state independence was held at the “Blossom of Independence” preschool.'
    ),
    href: 'https://khujand.tj/index.php?option=com_content&view=article&id=9978%3Amuloqot&catid=36%3Anavgoni&Itemid=182&lang=tg',
    image: '/images/stories/4485.jpg',
    thumb: '/images/extracted/ice-thumb-c848737b971c.jpg',
  },
]

const newsRaw: RawNews[] = [
  {
    title: slidesRaw[0].title,
    excerpt: L(
      'ИСТИҚЛОЛ – ОМИЛИ ПЕШРАВИВУ СОҲИБДАВЛАТӢ. Ҳамдиёрони азиз, соҳибони ин Ватани ободу озод! Сиву панҷ сол аст, зери ливои Тоҷикистони соҳибистиқлол зиндагӣ ба сар дорем.',
      'НЕЗАВИСИМОСТЬ – ФАКТОР ПРОГРЕССА И ГОСУДАРСТВЕННОСТИ. Дорогие соотечественники! Тридцать пять лет мы живём под флагом независимого Таджикистана.',
      'INDEPENDENCE – A DRIVER OF PROGRESS AND STATEHOOD. Dear compatriots! For thirty-five years we have lived under the flag of independent Tajikistan.'
    ),
    date: L('08 Сентябр 2026', '08 Сентября 2026', '08 September 2026'),
    href: slidesRaw[0].href,
    image: '/images/stories/4150.jpg',
  },
  {
    title: slidesRaw[2].title,
    excerpt: slidesRaw[2].excerpt,
    date: L('07 Сентябр 2026', '07 Сентября 2026', '07 September 2026'),
    href: slidesRaw[2].href,
    image: '/images/stories/4490.jpg',
  },
  {
    title: slidesRaw[1].title,
    excerpt: slidesRaw[1].excerpt,
    date: L('07 Сентябр 2026', '07 Сентября 2026', '07 September 2026'),
    href: slidesRaw[1].href,
    image: '/images/stories/4489.jpg',
  },
  {
    title: slidesRaw[3].title,
    excerpt: slidesRaw[3].excerpt,
    date: L('05 Сентябр 2026', '05 Сентября 2026', '05 September 2026'),
    href: slidesRaw[3].href,
    image: '/images/stories/4488.jpg',
  },
  {
    title: L(
      'Тантанаҳои идона бахшида ба 35-солагии Истиқлоли давлатӣ',
      'Торжества, посвящённые 35-летию государственной независимости',
      'Celebrations dedicated to the 35th anniversary of state independence'
    ),
    excerpt: L(
      'Имрӯз дар шаҳри Хуҷанд чорабиниҳои идонаи ҷашнӣ баргузор гардиданд.',
      'Сегодня в городе Худжанде прошли праздничные мероприятия.',
      'Festive events were held today in the city of Khujand.'
    ),
    date: L('05 Сентябр 2026', '05 Сентября 2026', '05 September 2026'),
    href: 'https://khujand.tj/index.php?option=com_content&view=article&id=9980%3Amuloqot&catid=36%3Anavgoni&Itemid=182&lang=tg',
    image: '/images/stories/4487.jpg',
  },
  {
    title: L(
      'Гимназияи №1: ҷашни истиқлол бо шукуҳу шаҳомат',
      'Гимназия №1: праздник независимости с торжеством',
      'Gymnasium No. 1: independence celebration with ceremony'
    ),
    excerpt: L(
      'Дар Гимназияи №1-и шаҳри Хуҷанд маҳфили идона баргузор шуд.',
      'В гимназии №1 города Худжанда состоялся праздничный вечер.',
      'A festive gathering was held at Gymnasium No. 1 in Khujand.'
    ),
    date: L('04 Сентябр 2026', '04 Сентября 2026', '04 September 2026'),
    href: 'https://khujand.tj/index.php?option=com_content&view=article&id=9979%3Amuloqot&catid=36%3Anavgoni&Itemid=182&lang=tg',
    image: '/images/stories/4486.jpg',
  },
  {
    title: slidesRaw[4].title,
    excerpt: slidesRaw[4].excerpt,
    date: L('04 Сентябр 2026', '04 Сентября 2026', '04 September 2026'),
    href: slidesRaw[4].href,
    image: '/images/stories/4485.jpg',
  },
]

const deputiesRaw: RawLof[] = [
  {
    title: 'Ғайбуллозода Х.',
    href: '/muovinon/gaybullozoda',
    image: '/images/extracted/dep-3b31bd671990.jpg',
    description: L(
      clean('Муовини аввали Раиси шаҳр. Хайрулло Ғайбуллозода бо қарори Раиси шаҳр таҳти №281 аз 2 июни соли 2016 муовини якуми Раиси шаҳри Хуҷанд таъин гардидааст.'),
      clean('Первый заместитель председателя города. Хайрулло Гайбуллозода назначен постановлением №281 от 2 июня 2016 года.'),
      clean('First Deputy City Chairman. Khayrullo Gaybullozoda was appointed by resolution No. 281 of 2 June 2016.')
    ),
  },
  {
    title: 'Муяссара Қаҳорӣ',
    href: '/muovinon/qahori',
    image: '/images/extracted/dep-b535d77216b8.jpg',
    description: L(
      clean('15 октябри соли 1979 дар шаҳри Хуҷанд таваллуд шудааст. Миллаташ тоҷик. Маълумот олӣ. Соли 2002 Донишгоҳи давлатии Хуҷандро хатм кардааст.'),
      clean('Родилась 15 октября 1979 года в Худжанде. Таджичка. Высшее образование. Окончила Худжандский госуниверситет в 2002 году.'),
      clean('Born on 15 October 1979 in Khujand. Tajik. Higher education. Graduated from Khujand State University in 2002.')
    ),
  },
  {
    title: 'Ҳомидзода А.А.',
    href: '/dastgoh',
    image: '/images/extracted/dep-38e9c6eaa166.jpg',
    description: L(
      clean('Роҳбари Дастгоҳи Раиси шаҳр. Абдуваҳҳоб Ҳомидзода 8-уми июни соли 1978 дар шаҳри Хуҷанд таваллуд ёфтааст. Миллаташ тоҷик, маълумоташ олӣ.'),
      clean('Руководитель аппарата председателя. Абдуваххоб Хомидзода родился 8 июня 1978 года в Худжанде. Таджик, высшее образование.'),
      clean('Head of the Chairman’s Office. Abduvahhob Homidzoda was born on 8 June 1978 in Khujand. Tajik, higher education.')
    ),
  },
  {
    title: 'Ҷамшед Набизода',
    href: '/muovinon/nabizoda',
    image: '/images/extracted/dep-263e15c2aef3.jpg',
    description: L(
      clean('9-уми майи соли 1981 дар шаҳри Хуҷанд таваллуд ёфтааст. Миллаташ тоҷик. Соли 2003 Донишгоҳи давлатии ҳуқуқ, бизнес ва сиёсатро хатм кардааст.'),
      clean('Родился 9 мая 1981 года в Худжанде. Таджик. В 2003 году окончил Государственный университет права, бизнеса и политики.'),
      clean('Born on 9 May 1981 in Khujand. Tajik. Graduated from the State University of Law, Business and Politics in 2003.')
    ),
  },
]

const leadersRaw: RawLof[] = [
  {
    title: 'Ҷӯраева К.Я.',
    href: '/rohbaron/juraeva',
    image: '/images/extracted/lead-64aa8ead995d.jpg',
    description: L(
      clean('Ҷӯраева Кибриё Яҳёевна 9 сентябри соли 1966 дар ноҳияи Бобоҷон Ғафуров таваллуд шуда, миллаташ тоҷик, маълумот олӣ мебошад.'),
      clean('Джураева Кибриё Яхёевна родилась 9 сентября 1966 года в районе Б. Гафурова, таджичка, высшее образование.'),
      clean('Juraeva Kibriyo Yahyoevna was born on 9 September 1966 in Bobojon Ghafurov district; Tajik, higher education.')
    ),
  },
  {
    title: 'Юсупов М. З.',
    href: '/rohbaron/yusupov',
    image: '/images/extracted/lead-5b07dfe1cac3.jpg',
    description: L(
      clean('Юсупов Маъмурҷон Зулҳайдарович 1-уми июни соли 1981 таваллуд шудааст. Миллаташ тоҷик, маълумот олӣ мебошад.'),
      clean('Юсупов Мамурджон Зулхайдарович родился 1 июня 1981 года. Таджик, высшее образование.'),
      clean('Yusupov Mamurjon Zulhaydarovich was born on 1 June 1981. Tajik, higher education.')
    ),
  },
  {
    title: 'Маликисломов Н. Н.',
    href: '/rohbaron/malikislomov',
    image: '/images/extracted/lead-f445a7a446ef.jpg',
    description: L(
      clean('Насим Маликисломов 23 октябри соли 1986 дар шаҳри Хуҷанд, дар оилаи хизматчӣ ба дунё омадааст.'),
      clean('Насим Маликисломов родился 23 октября 1986 года в Худжанде в семье служащего.'),
      clean('Nasim Malikislomov was born on 23 October 1986 in Khujand into a civil servant’s family.')
    ),
  },
  {
    title: 'Юсуфӣ У. C.',
    href: '/rohbaron/yusufi',
    image: '/images/extracted/lead-6ffc1b07d374.jpg',
    description: L(
      clean('Юсуфӣ Усмон Сиддиқзода 23-юми сентябри соли 1982 дар ноҳияи Бобоҷон Ғафуров таваллуд шудааст. Миллаташ тоҷик, маълумоташ олӣ.'),
      clean('Юсуфи Усмон Сиддикзода родился 23 сентября 1982 года в районе Б. Гафурова. Таджик, высшее образование.'),
      clean('Yusufi Usmon Siddiqzoda was born on 23 September 1982 in Bobojon Ghafurov district. Tajik, higher education.')
    ),
  },
  {
    title: 'Ӯлмасова Н. М.',
    href: '/rohbaron/ulmasova',
    image: '/images/extracted/lead-a8fb96272b5e.jpg',
    description: L(
      clean('Ӯлмасова Нигина Маруфовна 08-уми октябри соли 1980 дар шаҳри Хуҷанд таваллуд шудааст. Миллаташ тоҷик, маълумоташ олӣ.'),
      clean('Улмасова Нигина Маруфовна родилась 8 октября 1980 года в Худжанде. Таджичка, высшее образование.'),
      clean('Ulmasova Nigina Marufovna was born on 8 October 1980 in Khujand. Tajik, higher education.')
    ),
  },
  {
    title: 'Абдуқаҳҳорзода Т.',
    href: '/rohbaron/abdukahhorzoda',
    image: '/images/extracted/lead-e5f90ab8d6cb.jpg',
    description: L(
      clean('Абдуқаҳҳорзода Таҳмина. Солҳои 2000–2002 лаборанти кафедраи забон ва адабиёти тоҷик дар Донишгоҳи давлатии Хуҷанд.'),
      clean('Абдукаххорзода Тахмина. В 2000–2002 гг. лаборант кафедры таджикского языка и литературы ХГУ.'),
      clean('Abdukahhorzoda Tahmina. In 2000–2002, laboratory assistant at the Tajik language and literature department, KSU.')
    ),
  },
  {
    title: 'Каримов А. А.',
    href: '/rohbaron/karimov',
    image: '/images/extracted/lead-86c01980df59.jpg',
    description: L(
      clean('Каримов Азимҷон Акрамҷонович 1-уми январи соли 1998 дар шаҳри Хуҷанд таваллуд шудааст. Миллаташ тоҷик, маълумоташ олӣ.'),
      clean('Каримов Азимджон Акрамджонович родился 1 января 1998 года в Худжанде. Таджик, высшее образование.'),
      clean('Karimov Azimjon Akramjonovich was born on 1 January 1998 in Khujand. Tajik, higher education.')
    ),
  },
  {
    title: 'Воҳидов А.Б.',
    href: '/rohbaron/vohidov',
    image: '/images/extracted/lead-8419dd1ad4c9.jpg',
    description: L(
      clean('Воҳидов Азамат Баҳодурович 6-уми июни соли 1974 дар н. Б.Ғафуров таваллуд шуда, миллаташ тоҷик, маълумот олии тиббӣ.'),
      clean('Вохидов Азамат Баходурович родился 6 июня 1974 года в р-не Б. Гафурова, таджик, высшее медицинское образование.'),
      clean('Vohidov Azamat Bahodurovich was born on 6 June 1974 in B. Ghafurov district; Tajik, higher medical education.')
    ),
  },
  {
    title: 'Пӯлотов М. М.',
    href: '/rohbaron/pulotov',
    image: '/images/extracted/lead-63ea297f9e06.jpg',
    description: L(
      clean('Пӯлотов Мунир Мухторович 12 августи соли 1973 дар шаҳри Хуҷанд таваллуд шуда, миллаташ тоҷик, маълумоташ олӣ мебошад.'),
      clean('Пулотов Мунир Мухторович родился 12 августа 1973 года в Худжанде, таджик, высшее образование.'),
      clean('Pulotov Munir Mukhtorovich was born on 12 August 1973 in Khujand; Tajik, higher education.')
    ),
  },
  {
    title: 'Раҳмонова М. А.',
    href: '/rohbaron/rahmonova',
    image: '/images/extracted/lead-b5e028889ea6.jpg',
    description: L(
      clean('Раҳмонова Маҳфуза Абдуманоновна 12 феврали соли 1988 дар шаҳри Хуҷанд дар оилаи коргар таваллуд шуда, миллаташ тоҷик, маълумот олӣ.'),
      clean('Рахмонова Махфуза Абдуманоновна родилась 12 февраля 1988 года в Худжанде в семье рабочего, таджичка, высшее образование.'),
      clean('Rahmonova Mahfuza Abdumanonovna was born on 12 February 1988 in Khujand into a worker’s family; Tajik, higher education.')
    ),
  },
  {
    title: 'Шосаидов С. С.',
    href: '/rohbaron/shosaidov',
    image: '/images/extracted/lead-d224ee396d9a.jpg',
    description: L(
      clean('Шосаидов Саидакбар Саидқурбонович 10-уми октябри соли 1993 дар шаҳри Бӯстон таваллуд шудааст. Миллаташ тоҷик. Маълумот олӣ.'),
      clean('Шосаидов Саидакбар Саидкурбонович родился 10 октября 1993 года в городе Бустон. Таджик. Высшее образование.'),
      clean('Shosaidov Saidakbar Saidqurbonovich was born on 10 October 1993 in Buston. Tajik. Higher education.')
    ),
  },
  {
    title: 'Диловарзода Д. Д.',
    href: '/rohbaron/dilovarzoda',
    image: '/images/extracted/lead-17d8c6d6febe.jpg',
    description: L(
      clean('Диловарзода Достон Диловар 21-уми феврали соли 1996 дар шаҳри Бӯстон таваллуд шуда, миллаташ тоҷик, маълумот олӣ мебошад.'),
      clean('Диловарзода Достон Диловар родился 21 февраля 1996 года в городе Бустон, таджик, высшее образование.'),
      clean('Dilovarzoda Doston Dilovar was born on 21 February 1996 in Buston; Tajik, higher education.')
    ),
  },
]

const decisionsRaw = [
  {
    title: L(
      'Дар бораи ташкил ва баргузор кардани Озмуни шаҳрии «Кадбонуи беҳтарин»',
      'О проведении городского конкурса «Лучшая хозяйка»',
      'On holding the city contest “Best Homemaker”'
    ),
    href: 'https://khujand.tj/index.php?option=com_content&view=article&id=8098%3A1300-ruz&catid=55%3Aqarorho&Itemid=188&lang=tg',
    date: L('24 Апр 2023', '24 Апр 2023', '24 Apr 2023'),
  },
  {
    title: L(
      'Дар бораи ташкил ва гузаронидани озмуни шаҳрии “Сайри гули лола”',
      'О проведении городского конкурса «Праздник тюльпана»',
      'On holding the city contest “Tulip Festival”'
    ),
    href: 'https://khujand.tj/index.php?option=com_content&view=article&id=8100%3A1300-ruz&catid=55%3Aqarorho&Itemid=188&lang=tg',
    date: L('24 Апр 2023', '24 Апр 2023', '24 Apr 2023'),
  },
  {
    title: L(
      'Дар бораи ташкил ва баргузории Фестивали шаҳрии «Сад ранги чакан»',
      'О проведении городского фестиваля «Сто цветов чакана»',
      'On holding the city festival “A Hundred Chakan Colors”'
    ),
    href: 'https://khujand.tj/index.php?option=com_content&view=article&id=8099%3A1300-ruz&catid=55%3Aqarorho&Itemid=188&lang=tg',
    date: L('24 Апр 2023', '24 Апр 2023', '24 Apr 2023'),
  },
  {
    title: L(
      'Дар бораи баргузории Фестивали шаҳрии ҳунарҳои мардумӣ «Ҳунар беҳтар аз зар бувад»',
      'О проведении городского фестиваля народных промыслов «Ремесло лучше золота»',
      'On holding the city folk crafts festival “Craft is Better than Gold”'
    ),
    href: 'https://khujand.tj/index.php?option=com_content&view=article&id=8101%3A1300-ruz&catid=55%3Aqarorho&Itemid=188&lang=tg',
    date: L('24 Апр 2023', '24 Апр 2023', '24 Apr 2023'),
  },
]

export const youtubeEmbed = 'https://www.youtube.com/embed/U96P8jb8TNs'
export const gismeteoInformerHash = 'i1K481wLf8MI5G'

export const getHomeContent = (lang: Locale) => {
  const ui = getUi(lang)

  const slides: Slide[] = slidesRaw.map((s) => ({
    title: pick(s.title, lang),
    excerpt: pick(s.excerpt, lang),
    href: withLangParam(s.href, lang),
    image: s.image,
    thumb: s.thumb,
  }))

  const newsItems: NewsItem[] = newsRaw.map((n) => ({
    title: pick(n.title, lang),
    excerpt: pick(n.excerpt, lang),
    date: pick(n.date, lang),
    href: withLangParam(n.href, lang),
    image: n.image,
  }))

  const mayor = {
    name: 'Фирдавс Шарифзода',
    image: '/images/stories/fsharifzoda3.jpg',
    href: withLangParam('/rais-shahar', lang),
  }

  const deputies: LofBlock = {
    title: ui.deputies,
    items: deputiesRaw.map((d) => ({
      title: d.title,
      href: withLangParam(d.href, lang),
      image: d.image,
      description: pick(d.description, lang),
    })),
  }

  const leaders: LofBlock = {
    title: ui.leaders,
    items: leadersRaw.map((d) => ({
      title: d.title,
      href: withLangParam(d.href, lang),
      image: d.image,
      description: pick(d.description, lang),
    })),
  }

  const decisionDetails = decisionsRaw.map((d) => ({
    title: pick(d.title, lang),
    href: withLangParam(d.href, lang),
    date: pick(d.date, lang),
  }))

  const footer = {
    title: ui.contacts,
    lines: [pick(footerAddress, lang), pick(footerStreet, lang)],
    phone: '992 3422 6-02-44, 992 3422 6-08-65',
    email: 'mihd-khujand@mail.ru',
    site: 'www.khujand.tj',
    siteHref: 'http://www.khujand.tj',
    phoneFaxLabel: ui.phoneFax,
    emailLabel: ui.emailLabel,
    banners: [
      {
        href: 'http://maorif.khujand.tj/',
        image: '/images/stories/banners/maorif.png',
        alt: lang === 'en' ? 'Khujand Education Department' : lang === 'ru' ? 'Отдел образования г. Худжанда' : 'Шуъбаи маорифи шаҳри Хуҷанд',
      },
      {
        href: 'http://javonon.khujand.tj/',
        image: '/images/stories/banners/javonon.png',
        alt:
          lang === 'en'
            ? 'Youth, Sports and Tourism Department of Khujand'
            : lang === 'ru'
              ? 'Отдел молодёжи, спорта и туризма г. Худжанда'
              : 'Бахши ҷавонон, варзиш ва сайёҳии шаҳри Хуҷанд',
      },
    ],
    copyright: ui.copyright,
    copyrightHref: 'http://www.kova.tj/',
    copyrightLinkText: ui.copyrightLink,
  }

  return {
    ui,
    slides,
    newsItems,
    mayor,
    deputies,
    leaders,
    decisionDetails,
    footer,
    youtubeEmbed,
    gismeteoInformerHash,
  }
}

export type HomeContent = ReturnType<typeof getHomeContent>
