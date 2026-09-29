'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createSession, destroySession, verifyPassword } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { loginSchema } from '@/lib/admin/schemas'
import { parseWithSchema } from '@/lib/admin/with-admin'
import {
  checkLoginAllowed,
  clearLoginFailures,
  loginKey,
  recordLoginFailure,
} from '@/lib/admin/login-rate-limit'
import { writeAudit } from '@/lib/admin/audit'

export type LoginState = { error?: string }

export const loginAction = async (
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> => {
  const parsed = parseWithSchema(loginSchema, {
    username: String(formData.get('username') ?? ''),
    password: String(formData.get('password') ?? ''),
  })
  if (!parsed.ok) return { error: parsed.error }

  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headersList.get('x-real-ip') ||
    'unknown'
  const key = loginKey(ip, parsed.data.username)

  const allowed = checkLoginAllowed(key)
  if (!allowed.ok) return { error: allowed.error }

  const user = await prisma.user.findUnique({
    where: { username: parsed.data.username },
  })
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    recordLoginFailure(key)
    return { error: 'Неверный логин или пароль' }
  }

  clearLoginFailures(key)
  await createSession(user.id)
  await writeAudit({
    userId: user.id,
    action: 'login',
    entity: 'user',
    entityId: user.id,
  })
  redirect('/admin')
}

export const logoutAction = async () => {
  await destroySession()
  redirect('/admin/login')
}
