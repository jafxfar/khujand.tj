import Link from 'next/link'
import {
  FileText,
  ImageIcon,
  Languages,
  ListTree,
  Settings,
} from 'lucide-react'
import { PageHeader } from '@/components/admin/ui/PageHeader'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'

export default async function AdminDashboardPage() {
  await requireAdmin()

  const [articles, menuItems, uiStrings, media, settings] = await Promise.all([
    prisma.article.count(),
    prisma.menuItem.count(),
    prisma.uiString.count(),
    prisma.media.count(),
    prisma.siteSetting.count(),
  ])

  const cards = [
    { label: 'Статьи', count: articles, href: '/admin/articles', icon: FileText },
    { label: 'Пункты меню', count: menuItems, href: '/admin/menu', icon: ListTree },
    { label: 'Тексты интерфейса', count: uiStrings, href: '/admin/ui-strings', icon: Languages },
    { label: 'Медиафайлы', count: media, href: '/admin/media', icon: ImageIcon },
    { label: 'Настройки сайта', count: settings, href: '/admin/settings', icon: Settings },
  ]

  return (
    <div>
      <PageHeader
        title="Обзор"
        description="Управление контентом официального сайта Худжанда"
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group admin-surface relative overflow-hidden p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-teal-500 opacity-80 transition group-hover:opacity-100" />
              <div className="flex items-start justify-between gap-3 pl-2">
                <div>
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <p className="mt-2 text-3xl font-semibold tabular-nums text-slate-900">
                    {card.count.toLocaleString('ru-RU')}
                  </p>
                </div>
                <span className="rounded-xl bg-teal-50 p-2.5 text-teal-700 transition group-hover:bg-teal-100">
                  <Icon className="size-5" aria-hidden />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
