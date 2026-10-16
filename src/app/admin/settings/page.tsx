import { saveSettingsAction } from '@/app/admin/settings/actions'
import { Alert } from '@/components/admin/ui/Alert'
import { Button } from '@/components/admin/ui/Button'
import { Card, CardHeader } from '@/components/admin/ui/Card'
import { Input } from '@/components/admin/ui/Input'
import { Label } from '@/components/admin/ui/Label'
import { PageHeader } from '@/components/admin/ui/PageHeader'
import { getSettingsMap } from '@/lib/content/settings'
import { requireAdmin } from '@/lib/auth'

type Props = {
  searchParams: Promise<{ saved?: string }>
}

export default async function AdminSettingsPage({ searchParams }: Props) {
  await requireAdmin()
  const { saved } = await searchParams
  const settings = await getSettingsMap()

  const field = (key: string, label: string) => (
    <div key={key}>
      <Label htmlFor={key}>{label}</Label>
      <Input id={key} name={key} defaultValue={settings[key] ?? ''} />
    </div>
  )

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Настройки сайта"
        description="Модули главной, футер, шапка и блок раиса"
      />
      {saved ? <div className="mb-4"><Alert tone="success">Настройки сохранены</Alert></div> : null}
      <form action={saveSettingsAction} className="space-y-5">
        <Card>
          <CardHeader title="Модули" />
          <div className="space-y-3">
            {field('youtubeEmbed', 'YouTube embed URL')}
            {field('gismeteoInformerHash', 'Хеш Gismeteo')}
          </div>
        </Card>
        <Card>
          <CardHeader title="Футер" />
          <div className="grid gap-3 sm:grid-cols-2">
            {field('footerPhone', 'Телефон')}
            {field('footerEmail', 'Email')}
            {field('footerSite', 'Подпись сайта')}
            {field('footerSiteHref', 'URL сайта')}
            {field('footerCopyrightHref', 'Ссылка копирайта')}
            {field('footerAddressTg', 'Адрес TG')}
            {field('footerAddressRu', 'Адрес RU')}
            {field('footerAddressEn', 'Адрес EN')}
            {field('footerStreetTg', 'Улица TG')}
            {field('footerStreetRu', 'Улица RU')}
            {field('footerStreetEn', 'Улица EN')}
          </div>
        </Card>
        <Card>
          <CardHeader title="Шапка" />
          <div className="space-y-3">
            {field('headerLogo', 'Путь к логотипу')}
            {field('headerSearchUrl', 'URL поиска')}
            {field('headerOldSiteUrl', 'Старый сайт')}
            {field('headerFeedbackUrl', 'Обратная связь')}
          </div>
        </Card>
        <Card>
          <CardHeader title="Блок раиса" />
          <div className="grid gap-3 sm:grid-cols-2">
            {field('mayorNameTg', 'Имя TG')}
            {field('mayorNameRu', 'Имя RU')}
            {field('mayorNameEn', 'Имя EN')}
            {field('mayorImage', 'Фото')}
            {field('mayorHref', 'Ссылка')}
          </div>
        </Card>
        <Button type="submit" size="lg">
          Сохранить настройки
        </Button>
      </form>
    </div>
  )
}
