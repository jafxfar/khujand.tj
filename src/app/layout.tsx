import type { Metadata } from 'next'
import '@/styles/site.css'

export const metadata: Metadata = {
  title: 'Мақомоти иҷроияи ҳокимияти давлатии шаҳри Хуҷанд',
  icons: {
    icon: '/templates/yoo_flux/favicon.ico',
    apple: '/templates/yoo_flux/apple_touch_icon.png',
  },
}

const templateStyles = [
  '/templates/yoo_flux/css/reset.css',
  '/templates/yoo_flux/css/layout.css',
  '/templates/yoo_flux/css/typography.css',
  '/templates/yoo_flux/css/menus.css',
  '/templates/yoo_flux/css/modules.css',
  '/templates/yoo_flux/css/joomla.css',
  '/templates/yoo_flux/css/extensions.css',
  '/templates/yoo_flux/css/custom.css',
  '/modules/mod_icetabs/themes/candy/assets/style.css',
  '/modules/mod_lofarticlesscroller/assets/style.css',
  '/modules/mod_news_pro_gk4/interface/css/style.css',
  '/modules/mod_jflanguageselection/tmpl/mod_jflanguageselection.css',
  '/components/com_jcomments/tpl/default/style.css',
  'https://nst1.gismeteo.ru/assets/flat-ui/legacy/css/informer.min.css',
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tg-tj" dir="ltr" suppressHydrationWarning>
      <head>
        {templateStyles.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body id="page" className="yoopage column-left">
        {children}
      </body>
    </html>
  )
}
