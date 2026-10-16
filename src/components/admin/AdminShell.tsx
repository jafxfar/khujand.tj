'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  ImageIcon,
  Settings,
  Languages,
  ListTree,
  ScrollText,
  X,
} from 'lucide-react'
import { logoutAction } from '@/app/admin/actions'

const navItems = [
  { href: '/admin', label: 'Обзор', icon: LayoutDashboard, exact: true },
  { href: '/admin/articles', label: 'Статьи', icon: FileText },
  { href: '/admin/menu', label: 'Меню', icon: ListTree },
  { href: '/admin/settings', label: 'Настройки', icon: Settings },
  { href: '/admin/ui-strings', label: 'Тексты UI', icon: Languages },
  { href: '/admin/media', label: 'Медиа', icon: ImageIcon },
  { href: '/admin/audit', label: 'Журнал', icon: ScrollText },
]

type AdminShellProps = {
  userName: string
  children: React.ReactNode
}

export const AdminShell = ({ userName, children }: AdminShellProps) => {
  const pathname = usePathname() || '/admin'
  const [open, setOpen] = useState(false)

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const nav = (
    <>
      <div className="border-b border-white/10 px-5 py-5">
        <p className="text-lg font-semibold tracking-tight text-white">Хуҷанд CMS</p>
        <p className="mt-1 truncate text-xs text-slate-400">{userName}</p>
      </div>
      <nav className="flex-1 space-y-1 p-3" aria-label="Навигация админки">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href, item.exact)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                active
                  ? 'bg-teal-500/15 text-teal-300'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-white/10 p-3">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="size-4" aria-hidden />
            Выйти
          </button>
        </form>
      </div>
    </>
  )

  return (
    <div className="admin-root flex min-h-screen bg-slate-100">
      <aside className="hidden w-[260px] shrink-0 flex-col bg-slate-900 text-white lg:flex">
        {nav}
      </aside>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50"
            aria-label="Закрыть меню"
            onClick={() => setOpen(false)}
          />
          <aside className="relative z-10 flex h-full w-[260px] flex-col bg-slate-900 text-white shadow-xl">
            <button
              type="button"
              className="absolute right-3 top-4 rounded-md p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              aria-label="Закрыть"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>
            {nav}
          </aside>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50"
            aria-label="Открыть меню"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </button>
          <span className="font-semibold text-slate-900">Хуҷанд CMS</span>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
