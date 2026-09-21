import type { Locale, LocalizedString } from '@/lib/i18n'
import { pick, withLangPath } from '@/lib/i18n'
import { getUi } from '@/data/i18n/ui'
import type { SiteArticle } from '@/data/i18n/articles/types'

const L = (tg: string, ru: string, en: string): LocalizedString => ({ tg, ru, en })

type RawIqtisod = {
  slug: string
  menuTitle: LocalizedString
  pageTitle: LocalizedString
  date: LocalizedString
  paragraphs: LocalizedString[]
  rating?: { votes: number; average: number }
}

const raw: RawIqtisod[] = [
  {
    slug: 'naqliyot',
    menuTitle: L('Нақлиёт ва алоқа', 'Транспорт и связь', 'Transport and communications'),
    pageTitle: L(
      'Вазъи соҳаи нақлиёт ва коммуникатсия',
      'Состояние отрасли транспорта и коммуникаций',
      'State of the transport and communications sector'
    ),
    date: L('04 Январ 2018', '04 Января 2018', '04 January 2018'),
    rating: { votes: 3, average: 4 },
    paragraphs: [
      L(
        'Дар самти ободонӣ ҳамчун ҳадафҳои бунёдкорӣ ба роҳсозӣ ва таъмиру таҷдиди онҳо таваҷҷуҳи хоса зоҳир шуда истодааст. Дар ин ҷода барои хобонидани мумфарши хунук дар сатҳи чуқурчаҳои роҳ, миёнаҷои роҳҳои кӯчаю хиёбонҳо, ҳамвор намудани бардюрҳои ду тараф, иваз намудани қубурҳои обгузар ва аз партов тоза намудани ҷӯйборҳо ба маблағи 4,1 миллион сомонӣ корҳо иҷро гардидааст.',
        'В сфере благоустройства особое внимание уделяется дорожному строительству, ремонту и реконструкции. На укладку холодного асфальта в ямах, серединах улиц и проспектов, выравнивание бордюров, замену водопропускных труб и очистку арыков от мусора выполнены работы на сумму 4,1 млн сомони.',
        'In urban improvement, special attention is given to road construction, repair and renovation. Cold asphalt patching of potholes and mid-road sections, curb levelling, replacement of culverts and clearing of ditches were carried out for 4.1 million somoni.'
      ),
      L(
        'Дар шаҳр 164,9 км роҳҳо, 318,0 ҳазор метри тӯлонӣ роҳрав, 175,9 ҳазор метри тӯлонӣ ҷӯйборҳо ва 2 адад кӯпрук вуҷуд дорад. Бо мақсади ба талаботи муосир ҷавобгӯй будани роҳҳо, дар ин давра бо масрафи 3306,35 тонна асфалтобетон, дар 98 кӯчаю хиёбонҳои шаҳр ба масоҳати 31509 м² ё ин, ки дар 44,82 километр роҳҳо корҳои таъмиру мумфаршкунӣ ба сомон расонида шуданд.',
        'В городе 164,9 км дорог, 318,0 тыс. погонных метров тротуаров, 175,9 тыс. погонных метров арыков и 2 моста. Для приведения дорог к современным требованиям с расходом 3306,35 тонны асфальтобетона на 98 улицах и проспектах на площади 31 509 м² (44,82 км) выполнены ремонт и асфальтирование.',
        'The city has 164.9 km of roads, 318,000 linear metres of sidewalks, 175,900 linear metres of ditches and 2 bridges. To meet modern standards, 3,306.35 tonnes of asphalt concrete were used to repair and pave 98 streets and avenues covering 31,509 m² (44.82 km).'
      ),
      L(
        'Ба аҳолии шаҳр 5 ширкатҳои нақлиёти автомобилии мусофиркашони хусусӣ ва Корхонаи давлатии коммуналии «Нақлиёти мусофиркашони шаҳри Хуҷанд» хизмат мерасонад. Шумораи умумии воситаҳои нақлиёти мусофиркашон ба 720 адад баробар аст, ки аз онҳо 612 адад бо сӯзишвории дизелӣ ва 108 адад бо гази моеъ фаъолият карда истодаанд.',
        'Население обслуживают 5 частных автомобильных пассажирских компаний и ГКУ «Пассажирский транспорт города Худжанда». Всего пассажирских транспортных средств — 720, из них 612 на дизельном топливе и 108 на сжиженном газе.',
        'Residents are served by 5 private passenger road companies and the State Communal Enterprise “Passenger Transport of Khujand City”. There are 720 passenger vehicles in total — 612 diesel and 108 LPG.'
      ),
      L(
        'Дар давраи ҳисоботӣ тавассути нақлиётҳои мусофиркашон дар 82 адад хатсайрҳои шаҳриву наздишаҳрӣ ба 46,6 млн. нафар мусофирон хизматрасонида шуда, он дар муқоиса бо ҳамин давраи соли 2016 110,1 фоизро ташкил дод. Дар самти боркашонӣ тавассути нақлиётҳои бахши хусусӣ 1,9 млн. тонна бор кашонида шуданд, ки ин нисбат ба ҳамин давраи соли пешина 119,2 фоизро ташкил медиҳад.',
        'В отчётном периоде пассажирским транспортом на 82 городских и пригородных маршрутах обслужено 46,6 млн пассажиров — 110,1% к аналогичному периоду 2016 года. Частным грузовым транспортом перевезено 1,9 млн тонн грузов — 119,2% к прошлому году.',
        'In the reporting period passenger transport on 82 urban and suburban routes carried 46.6 million passengers — 110.1% of the same period in 2016. Private freight transport hauled 1.9 million tonnes — 119.2% of the previous year.'
      ),
      L(
        'Алҳол ҷиҳати бо пуррагӣ ва сифатнок хизмат расонидан ба аҳолӣ бо нақлиёти мусофиркашон Лоиҳаи «Рушди нақлиёти мусофиркашони шаҳри Хуҷанд» бо дастгирии Бонки Аврупоии Таҷдид ва Рушд бо маблағи умумии он 26,8 млн. доллари амрикоӣ татбиқ шуда истода, маблағгузории аввали он соли 2018 оғоз мешавад.',
        'Для полного и качественного пассажирского обслуживания реализуется проект «Развитие пассажирского транспорта города Худжанда» при поддержке ЕБРР на общую сумму 26,8 млн долларов США; первое финансирование начинается в 2018 году.',
        'To provide full-quality passenger service, the project “Development of Passenger Transport in Khujand City” is being implemented with EBRD support for a total of USD 26.8 million; initial financing starts in 2018.'
      ),
    ],
  },
  {
    slug: 'savdo',
    menuTitle: L('Савдо ва хизматрасонӣ', 'Торговля и услуги', 'Trade and services'),
    pageTitle: L(
      'Савдои дохилӣ ва хориҷӣ',
      'Внутренняя и внешняя торговля',
      'Domestic and foreign trade'
    ),
    date: L('04 Январ 2018', '04 Января 2018', '04 January 2018'),
    rating: { votes: 2, average: 3.5 },
    paragraphs: [
      L(
        'Дар самти беҳтар намудани таъминоти аҳолии шаҳр бо маводҳои аввалиндараҷаю ниёзи мардум ва ҷиҳати такмили самаранокии фаъолияти муассисаҳои соҳаи савдо ва хизматрасонӣ тадбири амалӣ андешида шудаанд.',
        'Приняты практические меры по улучшению снабжения населения города товарами первой необходимости и повышению эффективности учреждений торговли и услуг.',
        'Practical measures have been taken to improve the city’s supply of essential goods and to raise the efficiency of trade and service establishments.'
      ),
      L(
        'Дар ин давра ҳаҷми гардиши савдои чакана 2218,2 миллион сомониро ташкил намуда, дар муқоиса бо ҳамин давраи соли 2016 ба маблағи 383,0 миллион сомонӣ, ё 20,9 фоиз афзудааст. Ҳаҷми хизматрасонии пулакӣ бошад, дар ин давра ба 1240,6 миллион сомонӣ баробар шуда, нисбатан 70,8 миллион сомонӣ зиёд гаштааст.',
        'Оборот розничной торговли составил 2218,2 млн сомони — на 383,0 млн сомони или на 20,9% больше, чем за аналогичный период 2016 года. Объём платных услуг достиг 1240,6 млн сомони — на 70,8 млн сомони больше.',
        'Retail trade turnover reached 2,218.2 million somoni — 383.0 million somoni or 20.9% more than in the same period of 2016. Paid services amounted to 1,240.6 million somoni — 70.8 million more.'
      ),
      L(
        'Ҳоло савдои чакана дар шаҳр рушду такомул ёфта, дар ин давра ҷиҳати бартараф намудани муаммои асосии соҳа, яъне ба танзим даровардани савдои кӯчагӣ, аз ҷумла майдони «Регистон»-и бозори «Панҷшанбе», бардоштани дӯконҳои дар қади роҳи протоколӣ ҷойгирбуда ва дар ҷойҳои холии бозорҳои шаҳр ҷойгир намудани онҳо корбарӣ карда шуда, 26 адад дӯконҳои сари роҳ бардошта шуданд.',
        'Розничная торговля развивается: для упорядочения уличной торговли, в том числе площади «Регистон» рынка «Панджшанбе», сняты киоски вдоль протокольной дороги и размещены на свободных местах рынков города — убрано 26 придорожных киосков.',
        'Retail trade continues to develop: to regulate street trade, including Registon Square at Panjshanbe Market, roadside kiosks on the protocol road were removed and relocated to vacant market sites — 26 roadside kiosks were taken down.'
      ),
      L(
        'Робитаҳои иқтисодӣ собит менамояд, ки имрӯз шаҳри Хуҷанд бо 39 мамолики дуру наздик ҳамкорӣ дошта, ҳаҷми гардиши савдои хориҷӣ дар давраи ҳисоботӣ ба 288,5 миллион доллари амрикоӣ, аз ҷумла воридот 258,2 миллион доллари амрикоӣ ва содирот 30,3 миллион доллари амрикоиро ташкил менамояд, ки ҳаҷми маҳсулотҳои содир гашта, нисбат ба ҳамин давраи соли сипаригашта 5,4 миллион доллари амрикоӣ зиёд шудааст.',
        'Экономические связи показывают: Худжанд сотрудничает с 39 ближними и дальними странами. Внешнеторговый оборот за отчётный период составил 288,5 млн долларов США, в том числе импорт 258,2 млн и экспорт 30,3 млн — экспорт вырос на 5,4 млн долларов к прошлому году.',
        'Economic ties show that Khujand cooperates with 39 near and far countries. Foreign trade turnover in the reporting period was USD 288.5 million — imports USD 258.2 million and exports USD 30.3 million — exports up USD 5.4 million on the previous year.'
      ),
      L(
        'Аз таҳлилҳо бармеояд, ки ҳаҷми содирот нисбат ба ҳамин давраи соли сипаригашта 21,7 фоиз зиёд гаштааст. Ин комёбиҳои назаррас дар самти содирот асосан аз ҳисоби татбиқ гардидани лоиҳаи афзалиятноки соҳаи истеҳсоли маҳсулотҳои воридотивазкунанда ба ҳисоб рафта, он дар натиҷаи дуруст истифода бурдани иқтидорҳои мавҷуда ва бунёди иқтидорҳои иловагии истеҳсоли маҳсулотҳои пахтагӣ, либосҳои дӯхта ва алюминию маснуот аз он маҳсуб меёбад.',
        'Экспорт вырос на 21,7% к прошлому году. Рост связан с приоритетным проектом импортозамещения — эффективным использованием существующих мощностей и созданием дополнительных мощностей по хлопковой продукции, швейным изделиям и алюминию с изделиями из него.',
        'Exports rose 21.7% year on year. Gains come mainly from the priority import-substitution project — better use of existing capacity and new capacity for cotton products, garments and aluminium and aluminium goods.'
      ),
      L(
        'Дар самти муносибатҳои бурунмарзӣ шаҳри Хуҷанд бо 6 шаҳрҳои хориҷӣ — Оренбурги Федератсияи Руссия, Могилёви Ҷумҳурии Белоруссия, Шимкенти Ҷумҳурии Қазоқистон, Оши Ҷумҳурии Қирғизистон, Табрези Ҷумҳурии Исломии Эрон ва Ганҷаи Ҷумҳурии Озарбойҷон — солҳои тӯлонӣ робитаҳои иқтисодию фарҳангии бародаршаҳрӣ дорад.',
        'Во внешнеэкономических связях Худжанд много лет поддерживает побратимские экономические и культурные отношения с 6 зарубежными городами: Оренбург (РФ), Могилёв (Беларусь), Шымкент (Казахстан), Ош (Кыргызстан), Тебриз (Иран) и Гянджа (Азербайджан).',
        'In external relations Khujand has long maintained sister-city economic and cultural ties with six foreign cities: Orenburg (Russia), Mogilev (Belarus), Shymkent (Kazakhstan), Osh (Kyrgyzstan), Tabriz (Iran) and Ganja (Azerbaijan).'
      ),
    ],
  },
  {
    slug: 'loiha',
    menuTitle: L(
      'Лоиҳаҳои инвеститсионӣ',
      'Инвестиционные проекты',
      'Investment projects'
    ),
    pageTitle: L('Коркард', 'В разработке', 'Under development'),
    date: L('Лоиҳаҳои инвеститсионӣ', 'Инвестиционные проекты', 'Investment projects'),
    rating: { votes: 1, average: 3 },
    paragraphs: [
      L(
        'Саҳифа дар ҳолати коркард қарор дорад!',
        'Страница находится в разработке!',
        'This page is under development!'
      ),
    ],
  },
]

export const iqtisodSlugs = raw.map((r) => r.slug)

export const getIqtisodArticle = (lang: Locale, slug: string): SiteArticle | null => {
  const item = raw.find((r) => r.slug === slug)
  if (!item) return null

  const ui = getUi(lang)
  const title = pick(item.pageTitle, lang)

  return {
    slug: item.slug,
    title,
    date: pick(item.date, lang),
    paragraphs: item.paragraphs.map((p) => pick(p, lang)),
    rating: item.rating
      ? { votes: item.rating.votes, average: item.rating.average, max: 5 }
      : undefined,
    crumbs: [
      { label: ui.breadcrumb, href: withLangPath('/', lang) },
      { label: ui.economy },
      { label: pick(item.menuTitle, lang) },
    ],
  }
}
