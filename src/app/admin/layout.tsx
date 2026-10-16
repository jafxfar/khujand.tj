import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminShell } from '@/components/admin/AdminShell'
import { getAdminUser } from '@/lib/auth'
import './admin.css'

type Props = {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: Props) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''

  if (pathname === '/admin/login') {
    return <div className="admin-root">{children}</div>
  }

  const user = await getAdminUser()
  if (!user) {
    redirect('/admin/login')
  }

  return <AdminShell userName={user.name || user.username}>{children}</AdminShell>
}
