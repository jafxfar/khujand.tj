import type { Locale, LocalizedString } from '@/lib/i18n'
import { pick, withLangPath } from '@/lib/i18n'
import { getUi } from '@/data/i18n/ui'
import type { SiteArticle } from '@/data/i18n/articles/types'

const L = (tg: string, ru: string, en: string): LocalizedString => ({ tg, ru, en })

type RawSoxtor = {
  slug: string
  menuTitle: LocalizedString
  pageTitle: LocalizedString
  date: LocalizedString
  paragraphs: LocalizedString[]
  rating?: { votes: number; average: number }
  /** Share body with another slug (e.g. id=7934) */
  bodyFrom?: string
}

const shared7934: LocalizedString[] = [
  L(
    'Дар самти меъморӣ, сайёҳӣ ва сармоягузорӣ мақомоти иҷроияи ҳокимияти давлатии шаҳри Хуҷанд чораҳои амалӣ андешида, рушди инфрасохтор ва ҷалби сармояро таъмин менамояд.',
    'В сферах архитектуры, туризма и инвестиций исполнительный орган государственной власти города Худжанда принимает практические меры по развитию инфраструктуры и привлечению капитала.',
    'In architecture, tourism and investment, the Executive Body of State Authority of Khujand City takes practical measures to develop infrastructure and attract capital.'
  ),
  L(
    'Лоиҳаҳои ободонӣ, таҳияи ҳуҷҷатҳои шаҳрсозӣ, рушди сайёҳӣ ва фароҳам овардани шароити мусоид барои сармоягузорон дар маркази таваҷҷуҳ қарор доранд.',
    'В центре внимания находятся проекты благоустройства, разработка градостроительной документации, развитие туризма и создание благоприятных условий для инвесторов.',
    'Priority is given to improvement projects, urban planning documentation, tourism development and creating favourable conditions for investors.'
  ),
]

const raw: RawSoxtor[] = [
  {
    slug: 'sanoat',
    menuTitle: L('Саноат', 'Промышленность', 'Industry'),
    pageTitle: L(
      'Вазъи соҳаи энергетика ва саноат',
      'Состояние отрасли энергетики и промышленности',
      'State of the energy and industry sector'
    ),
    date: L('01 Феврал 2023', '01 Февраля 2023', '01 February 2023'),
    rating: { votes: 2, average: 3 },
    paragraphs: [
      L(
        'Дар самти саноатикунонии босуръати кишвар ҳамчун ҳадафи чорўми стратегӣ дар шаҳр соли 2022 чораҳои амалӣ андешида, дар натиҷа, теъдоди корхонаҳои истеҳсоли хурду миёнаи шаҳр ба 209 адад расидааст.',
        'В рамках четвёртой стратегической цели — ускоренной индустриализации страны — в 2022 году в городе были приняты практические меры, в результате число малых и средних производственных предприятий достигло 209.',
        'As part of the country’s fourth strategic goal of rapid industrialisation, practical measures in 2022 brought the number of small and medium production enterprises in the city to 209.'
      ),
      L(
        'Дар натиҷаи фаъолияти пурсамари корхонаҳои саноатии шаҳр давоми марҳилаи ҳисоботӣ ба маблағи 1702,6 млн. сомонӣ маҳсулот истеҳсол карда шудааст, ки он нисбат ба ҳамин давраи соли гузашта 262,9 млн. сомонӣ ё 18,3 дар сад зиёд таъмин шудааст.',
        'По итогам отчётного периода промышленные предприятия города произвели продукцию на 1 702,6 млн сомони, что на 262,9 млн сомони или на 18,3% больше, чем за аналогичный период прошлого года.',
        'In the reporting period city industrial enterprises produced goods worth 1,702.6 million somoni — 262.9 million somoni or 18.3% more than in the same period of the previous year.'
      ),
      L(
        'Ҷиҳати афзоиши ҳаҷми маҳсулоти саноатӣ дар шаҳр 17 адад корхонаҳои истеҳсоли нав ва 23 адад коргоҳҳои истеҳсоли аз нав бақайдгирифта шуда, дар маҷмўъ 40 адад корхона таъсис дода шудааст. Аз ҳисоби корхонаҳои нав 289 нафар шаҳрвандон бо ҷойи корӣ таъмин гардиданд.',
        'Для роста объёмов промышленной продукции в городе зарегистрированы 17 новых производственных предприятий и 23 производственных цеха — всего 40 предприятий. За счёт новых предприятий работой обеспечены 289 граждан.',
        'To increase industrial output, 17 new production enterprises and 23 workshops were registered — 40 in total. New enterprises provided jobs for 289 citizens.'
      ),
    ],
  },
  {
    slug: 'maorif',
    menuTitle: L('Маориф', 'Образование', 'Education'),
    pageTitle: L('Вазъи соҳаи илм, маориф', 'Состояние сферы науки и образования', 'State of science and education'),
    date: L('01 Феврал 2023', '01 Февраля 2023', '01 February 2023'),
    rating: { votes: 4, average: 3.5 },
    paragraphs: [
      L(
        'Дар давраи ҳисоботӣ дар назди Марказ 25 маҳфили фаннӣ ва 2 маҳфили маърифатӣ-фарҳангӣ ташкил карда шудааст, ки ба он 284 нафар хонанда ҷалб гардидааст.',
        'В отчётном периоде при Центре организованы 25 предметных кружков и 2 культурно-просветительских кружка, охвативших 284 учащихся.',
        'In the reporting period the Centre organised 25 subject clubs and 2 cultural-educational clubs involving 284 pupils.'
      ),
      L(
        'Дар муассисаҳои таълимӣ 220 махфилҳои фаннӣ ташкил шудаанд, ки ба он 2640 нафар хонандагон ва ба 80 маҳфилҳои фарҳангӣ-варзишӣ 2212 нафар ҷалб гардидаанд.',
        'В учебных заведениях созданы 220 предметных кружков (2640 учащихся) и 80 культурно-спортивных кружков (2212 участников).',
        'Schools run 220 subject clubs (2,640 pupils) and 80 cultural-sports clubs (2,212 participants).'
      ),
      L(
        'Мақомоти иҷроияи ҳокимияти давлатии шаҳри Хуҷанд мактабҳои нав бунёд намуда, бо ҷалби сарпарастон синфхонаҳои иловагӣ ва муассисаҳои томактабиро барқарор намуда истодааст.',
        'Исполнительный орган власти города Худжанда строит новые школы и при поддержке спонсоров восстанавливает дополнительные классы и дошкольные учреждения.',
        'The city’s executive body builds new schools and, with sponsors’ support, restores extra classrooms and preschool facilities.'
      ),
    ],
  },
  {
    slug: 'varzish',
    menuTitle: L('Варзиш', 'Спорт', 'Sports'),
    pageTitle: L(
      'Вазъи соҳаи ҷавонон ва варзиш',
      'Состояние сферы молодёжи и спорта',
      'State of youth and sports'
    ),
    date: L('01 Феврал 2023', '01 Февраля 2023', '01 February 2023'),
    rating: { votes: 3, average: 4 },
    paragraphs: [
      L(
        'Дар соли 2022 зиёда аз 170 чорабиниҳои сатҳи мухталиф бо иштироки беш аз 125 ҳазор нафар наврасону ҷавонон, варзишгарону мухлисон баргузор гардиданд.',
        'В 2022 году проведено более 170 мероприятий разного уровня с участием свыше 125 тысяч подростков, молодых людей, спортсменов и болельщиков.',
        'In 2022 more than 170 events at various levels were held with over 125,000 teenagers, young people, athletes and fans taking part.'
      ),
      L(
        'Таҳти унвони «Мо ҷавонон ин Ватанро сабзу хуррам мекунем!» зиёда аз 60 маротиба шанбегиҳо ва корҳои ободкорӣ бо иштироки зиёда аз 9500 ҷавонону варзишгарон баргузор гардиданд.',
        'Под девизом «Мы, молодёжь, сделаем эту Родину зелёной и прекрасной!» более 60 раз проведены субботники и работы по благоустройству с участием свыше 9500 молодых людей и спортсменов.',
        'Under the motto “We youth will make this Homeland green and bright!” more than 60 clean-up and improvement actions involved over 9,500 young people and athletes.'
      ),
    ],
  },
  {
    slug: 'farhang',
    menuTitle: L('Фарҳанг', 'Культура', 'Culture'),
    pageTitle: L('Вазъи соҳаи фарҳанг', 'Состояние сферы культуры', 'State of the culture sector'),
    date: L('01 Феврал 2023', '01 Февраля 2023', '01 February 2023'),
    rating: { votes: 5, average: 3.8 },
    paragraphs: [
      L(
        'Ба ҳолати 1.01.2023 дар мувозинаи бахши фарҳанги шаҳри Хуҷанд 13 адад муассисаҳои фарҳангӣ, аз ҷумла Маркази фарҳанг, хонаҳои маданият, мактабҳои санъат ва осорхонаҳо фаъолият доранд.',
        'По состоянию на 1.01.2023 в ведении отдела культуры города Худжанда находятся 13 учреждений культуры, включая Центр культуры, дома культуры, школы искусств и музеи.',
        'As of 1 January 2023 the city’s culture department oversees 13 cultural institutions, including the Culture Centre, houses of culture, art schools and museums.'
      ),
      L(
        'Бахшида ба ҷашнҳои миллӣ барномаҳои театрикунонидашуда, намоиши ҳунармандӣ ва таъомҳои миллӣ баргузор гардида, мероси фарҳангии шаҳр тарғиб мешавад.',
        'К национальным праздникам проводятся театрализованные программы, выставки ремёсел и национальной кухни, пропагандируется культурное наследие города.',
        'For national holidays theatrical programmes, craft and national cuisine exhibitions are held, promoting the city’s cultural heritage.'
      ),
    ],
  },
  {
    slug: 'tandurusti',
    menuTitle: L('Тандурустӣ', 'Здравоохранение', 'Healthcare'),
    pageTitle: L('Вазъи соҳаи тандурустӣ', 'Состояние сферы здравоохранения', 'State of healthcare'),
    date: L('01 Феврал 2023', '01 Февраля 2023', '01 February 2023'),
    rating: { votes: 6, average: 3.6 },
    paragraphs: [
      L(
        'Дар шаҳри Хуҷанд муассисаҳои тиббӣ, аз ҷумла беморхонаҳо ва марказҳои саломатӣ, бо усулҳои муосири ташхису табобат ва таҷҳизоти замонавӣ ҷиҳозонида шуда истодаанд.',
        'В городе Худжанде медицинские учреждения, включая больницы и центры здоровья, оснащаются современными методами диагностики и лечения и современным оборудованием.',
        'In Khujand medical institutions, including hospitals and health centres, continue to be equipped with modern diagnostics, treatment methods and equipment.'
      ),
      L(
        'Соҳаи тандурустӣ ҷиҳати зиёд намудани шумораи кадрҳои баландихтисос, аз ҷумла мутахассисони бемориҳои сироятӣ, фаъолият мекунад ва рушди соҳаи дорусозиро тақвият медиҳад.',
        'Сфера здравоохранения работает над увеличением числа высококвалифицированных кадров, в том числе специалистов по инфекционным болезням, и укрепляет развитие фармацевтики.',
        'Healthcare works to increase highly qualified staff, including infectious disease specialists, and strengthens pharmaceutical development.'
      ),
    ],
  },
  {
    slug: 'bahshi-din',
    menuTitle: L('Бахши дин', 'Отдел по делам религии', 'Religious affairs'),
    pageTitle: L(
      'Кор дар самти дин, танзими анъана ва ҷашну маросим',
      'Работа в сфере религии, регулирования традиций и обрядов',
      'Work on religion, regulating traditions and ceremonies'
    ),
    date: L('01 Феврал 2023', '01 Февраля 2023', '01 February 2023'),
    rating: { votes: 2, average: 3.2 },
    paragraphs: [
      L(
        'Назорати мунтазам аз ҷониби масъулини мақомоти иҷроия ва комиссияҳои маҳаллӣ якҷо бо мақомоти ҳифзи ҳуқуқ гузаронида шуда, ҳолатҳои қонунвайронкунӣ ҳангоми ҷашну маросим ошкор карда мешаванд.',
        'Регулярный контроль со стороны должностных лиц исполнительного органа и местных комиссий совместно с правоохранительными органами выявляет нарушения закона при проведении праздников и обрядов.',
        'Regular oversight by executive officials and local commissions together with law enforcement identifies legal violations during celebrations and ceremonies.'
      ),
      L(
        'Тибқи талаботи қонун дар кумитаҳои маҳаллаҳо ва корхонаву муассисаҳо комиссияҳои ҷамъиятӣ ташкил карда шудаанд.',
        'В соответствии с требованиями закона в махаллинских комитетах, предприятиях и учреждениях созданы общественные комиссии.',
        'In line with the law, public commissions have been established in neighbourhood committees, enterprises and institutions.'
      ),
    ],
  },
  {
    slug: 'maktubho',
    menuTitle: L(
      'Мактубҳо ва муроҷиати шаҳрвандон',
      'Письма и обращения граждан',
      'Citizen appeals'
    ),
    pageTitle: L(
      'Мактубҳо ва муроҷиати шаҳрвандон',
      'Письма и обращения граждан',
      'Letters and citizen appeals'
    ),
    date: L('01 Феврал 2023', '01 Февраля 2023', '01 February 2023'),
    rating: { votes: 3, average: 3.7 },
    paragraphs: [
      L(
        'Шуъбаи мактубҳо ва қабули шаҳрвандон муроҷиатҳои хаттӣ ва шифоҳии сокинонро қабул ва баррасӣ намуда, ҷавобгӯии саривақтиро таъмин мекунад.',
        'Отдел писем и приёма граждан принимает и рассматривает письменные и устные обращения жителей и обеспечивает своевременные ответы.',
        'The Letters and Citizen Reception Department receives and reviews written and oral appeals and ensures timely responses.'
      ),
      L(
        'Қабулгоҳи ҷамъиятӣ ва рӯзҳои қабули роҳбарият барои ҳалли масъалаҳои сокинон фаъолият мекунанд.',
        'Общественная приёмная и дни приёма руководства работают для решения вопросов жителей.',
        'The public reception office and leadership reception days operate to resolve residents’ issues.'
      ),
    ],
  },
  {
    slug: 'mehnat',
    menuTitle: L(
      'Агентии меҳнат ва шуғли аҳолӣ',
      'Агентство труда и занятости',
      'Labour and employment agency'
    ),
    pageTitle: L(
      'Вазъи соҳаи меҳнат, шуғл ва ҳифзи иҷтимоии аҳолӣ',
      'Состояние сферы труда, занятости и социальной защиты',
      'State of labour, employment and social protection'
    ),
    date: L('01 Феврал 2023', '01 Февраля 2023', '01 February 2023'),
    rating: { votes: 4, average: 3.9 },
    paragraphs: [
      L(
        'Бо мақсади таъмини шуғл ва кам намудани бекорӣ дар маркази шаҳр 17 маротиба ярмаркаи ҷойҳои кории холӣ ташкил карда шуд, бо пешниҳоди зиёда аз 12 ҳазор ҷойи кории холӣ.',
        'В целях обеспечения занятости и снижения безработицы в центре города 17 раз организованы ярмарки вакансий с предложением более 12 тысяч свободных рабочих мест.',
        'To promote employment and reduce unemployment, 17 job fairs were held in the city centre offering more than 12,000 vacancies.'
      ),
      L(
        'Ярмаркаҳо дар кумитаҳои маҳалла, бозорҳо ва муассисаҳои таълимӣ бо иштироки намояндагони корхонаҳо ва шуъбаҳои мақомоти иҷроия баргузор гардиданд.',
        'Ярмарки проходили в махаллинских комитетах, на рынках и в учебных заведениях с участием представителей предприятий и отделов исполнительного органа.',
        'Fairs were held at neighbourhood committees, markets and educational institutions with enterprises and executive departments taking part.'
      ),
    ],
  },
  {
    slug: 'memori',
    menuTitle: L('Меъморӣ', 'Архитектура', 'Architecture'),
    pageTitle: L('Меъморӣ', 'Архитектура', 'Architecture'),
    date: L('01 Феврал 2023', '01 Февраля 2023', '01 February 2023'),
    rating: { votes: 2, average: 3.5 },
    bodyFrom: '7934',
    paragraphs: shared7934,
  },
  {
    slug: 'matbuot',
    menuTitle: L('Матбуот', 'Пресса', 'Press'),
    pageTitle: L('Матбуот ва алоқа', 'Пресса и связь', 'Press and communications'),
    date: L('01 Феврал 2023', '01 Февраля 2023', '01 February 2023'),
    rating: { votes: 5, average: 4.1 },
    paragraphs: [
      L(
        'Дар соли 2022 аз дафтари матбуоти раиси шаҳр ва сомонаи расмӣ 820 адад маводҳо нашр гардиданд, рӯйдодҳои шаҳр дар ВАО ва шабакаҳои иҷтимоӣ инъикос ёфтанд.',
        'В 2022 году пресс-службой председателя города и официальным сайтом опубликовано 820 материалов; события города освещались в СМИ и социальных сетях.',
        'In 2022 the chairman’s press office and the official website published 820 materials; city events were covered in the media and on social networks.'
      ),
      L(
        'Саҳифаҳои иҷтимоии «Фейсбук» ва гурӯҳҳои мавзӯӣ оид ба хабарҳои шаҳрдорӣ, ободонӣ ва чорабиниҳои муҳим фаъолият мекунанд.',
        'Работают страницы в Facebook и тематические группы с новостями мэрии, благоустройства и важных мероприятий.',
        'Facebook pages and thematic groups share city hall news, improvement work and major events.'
      ),
    ],
  },
  {
    slug: 'sayohi',
    menuTitle: L('Сайёҳӣ', 'Туризм', 'Tourism'),
    pageTitle: L('Сайёҳӣ', 'Туризм', 'Tourism'),
    date: L('01 Феврал 2023', '01 Февраля 2023', '01 February 2023'),
    rating: { votes: 2, average: 3.5 },
    bodyFrom: '7934',
    paragraphs: shared7934,
  },
  {
    slug: 'sarmoyaguzori',
    menuTitle: L('Сармоягузорӣ', 'Инвестиции', 'Investment'),
    pageTitle: L('Сармоягузорӣ', 'Инвестиции', 'Investment'),
    date: L('01 Феврал 2023', '01 Февраля 2023', '01 February 2023'),
    rating: { votes: 2, average: 3.5 },
    bodyFrom: '7934',
    paragraphs: shared7934,
  },
  {
    slug: 'budjet',
    menuTitle: L('Иҷроиши буҷет', 'Исполнение бюджета', 'Budget execution'),
    pageTitle: L('Вазъи иҷрои буҷет', 'Состояние исполнения бюджета', 'State of budget execution'),
    date: L('01 Январ 2021', '01 Января 2021', '01 January 2021'),
    rating: { votes: 3, average: 3.4 },
    paragraphs: [
      L(
        'Соли 2020 нақшаи буҷети шаҳр ба андозаи 100,8 фоиз ё 3,4 миллион сомонӣ зиёд таъмин гардидааст.',
        'В 2020 году план городского бюджета выполнен на 100,8%, или на 3,4 миллиона сомони сверх плана.',
        'In 2020 the city budget plan was fulfilled at 100.8%, or 3.4 million somoni above plan.'
      ),
      L(
        'Ба буҷети маҳаллӣ 196,6 миллион сомонӣ андозу пардохтҳо ворид гардидааст. Қисми хароҷот 98,9 фоиз таъмин шуда, барои соҳаҳои иҷтимоӣ 130,8 миллион сомонӣ равона карда шуд.',
        'В местный бюджет поступило 196,6 млн сомони налогов и платежей. Расходная часть исполнена на 98,9%; на социальные отрасли направлено 130,8 млн сомони.',
        'The local budget received 196.6 million somoni in taxes and payments. Expenditure was 98.9% fulfilled; 130.8 million somoni went to social sectors.'
      ),
    ],
  },
  {
    slug: 'zamin',
    menuTitle: L('Истифодаи замин', 'Использование земли', 'Land use'),
    pageTitle: L('Истифодаи замин', 'Использование земли', 'Land use'),
    date: L('01 Январ 2021', '01 Января 2021', '01 January 2021'),
    rating: { votes: 2, average: 3.3 },
    paragraphs: [
      L(
        'Бахши истифодаи замин назорати қонунии тақсимоти қитъаҳои замин, ҳуҷҷатгузорӣ ва риояи меъёрҳои шаҳрсозиро таъмин менамояд.',
        'Отдел использования земли обеспечивает законный контроль распределения земельных участков, документооборот и соблюдение градостроительных норм.',
        'The land-use unit ensures lawful control of plot allocation, documentation and compliance with urban planning norms.'
      ),
      L(
        'Корҳо оид ба ҳифзи ҳуқуқи заминдорӣ ва пешгирии ҳолатҳои ғайриқонунии истифодаи замин идома доранд.',
        'Продолжается работа по защите прав землепользователей и предотвращению незаконного использования земли.',
        'Work continues to protect land-user rights and prevent unlawful land use.'
      ),
    ],
  },
  {
    slug: 'favqulodda',
    menuTitle: L('Ҳолати фавқулодда', 'Чрезвычайные ситуации', 'Emergencies'),
    pageTitle: L(
      'Ҳолати фавқулодда',
      'Чрезвычайные ситуации',
      'Emergency situations'
    ),
    date: L('01 Январ 2021', '01 Января 2021', '01 January 2021'),
    rating: { votes: 2, average: 3.6 },
    paragraphs: [
      L(
        'Бахши ҳолатҳои фавқулодда омодагии муассисаҳо ва аҳолиро ба ҳолатҳои фавқулодда таъмин намуда, чораҳои пешгирӣ ва наҷотро ҳамоҳанг месозад.',
        'Отдел по чрезвычайным ситуациям обеспечивает готовность учреждений и населения к ЧС и координирует меры предупреждения и спасения.',
        'The emergencies unit ensures readiness of institutions and the public for emergencies and coordinates prevention and rescue measures.'
      ),
      L(
        'Машқҳо, таҳқиқи хатарҳо ва ҳамкорӣ бо мақомоти дахлдор дар самти амнияти шаҳрвандон идома меёбад.',
        'Продолжаются учения, оценка рисков и взаимодействие с профильными органами по безопасности граждан.',
        'Drills, risk assessment and cooperation with relevant agencies on citizen safety continue.'
      ),
    ],
  },
  {
    slug: 'hifzi-ijtimoii',
    menuTitle: L('Хифзи иҷтимоӣ', 'Социальная защита', 'Social protection'),
    pageTitle: L('Хифзи иҷтимоӣ', 'Социальная защита', 'Social protection'),
    date: L('01 Январ 2021', '01 Января 2021', '01 January 2021'),
    rating: { votes: 3, average: 3.8 },
    paragraphs: [
      L(
        'Бахши ҳифзи иҷтимоӣ дастгирии оилаҳои камбизоат, нафақагирон ва гурӯҳҳои осебпазирро тавассути барномаҳои давлатӣ таъмин менамояд.',
        'Отдел социальной защиты обеспечивает поддержку малоимущих семей, пенсионеров и уязвимых групп через государственные программы.',
        'The social protection unit supports low-income families, pensioners and vulnerable groups through state programmes.'
      ),
      L(
        'Корҳо оид ба таъмини имтиёзҳо, кумакҳои яквақта ва ҳамкорӣ бо муассисаҳои иҷтимоӣ идома доранд.',
        'Продолжается работа по предоставлению льгот, единовременной помощи и взаимодействию с социальными учреждениями.',
        'Work continues on benefits, one-off assistance and cooperation with social institutions.'
      ),
    ],
  },
]

export const soxtorSlugs = raw.map((r) => r.slug)

export const getSoxtorMenuTitle = (lang: Locale, slug: string): string | null => {
  const item = raw.find((r) => r.slug === slug)
  return item ? pick(item.menuTitle, lang) : null
}

export const getSoxtorArticle = (lang: Locale, slug: string): SiteArticle | null => {
  const item = raw.find((r) => r.slug === slug)
  if (!item) return null

  const ui = getUi(lang)
  const title = pick(item.pageTitle, lang)
  const paragraphsSource =
    item.bodyFrom === '7934' ? shared7934 : item.paragraphs

  return {
    slug: item.slug,
    title,
    date: pick(item.date, lang),
    paragraphs: paragraphsSource.map((p) => pick(p, lang)),
    rating: item.rating
      ? { votes: item.rating.votes, average: item.rating.average, max: 5 }
      : undefined,
    crumbs: [
      { label: ui.breadcrumb, href: withLangPath('/', lang) },
      { label: ui.structures },
      { label: pick(item.menuTitle, lang) },
    ],
  }
}
