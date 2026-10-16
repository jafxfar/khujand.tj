import { LoginForm } from '@/app/admin/login/LoginForm'

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-20 size-72 rounded-full bg-teal-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 size-80 rounded-full bg-slate-500/30 blur-3xl"
        aria-hidden
      />

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">Админ-панель</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Хуҷанд CMS</h1>
          <p className="mt-2 text-sm text-slate-500">
            Войдите, чтобы управлять контентом сайта на трёх языках
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
