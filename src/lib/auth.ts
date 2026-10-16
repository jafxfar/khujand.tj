import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'

const SESSION_COOKIE = 'khujand_admin_session'
const SESSION_DAYS = 7

const hashToken = (token: string) =>
  createHash('sha256').update(token).digest('hex')

export const verifyPassword = async (password: string, passwordHash: string) =>
  bcrypt.compare(password, passwordHash)

export const hashPassword = async (password: string) => bcrypt.hash(password, 12)

export const createSession = async (userId: string) => {
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)
  await prisma.session.create({
    data: {
      token: hashToken(token),
      userId,
      expiresAt,
    },
  })
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
  })
}

export const destroySession = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (token) {
    await prisma.session.deleteMany({ where: { token: hashToken(token) } })
  }
  cookieStore.set(SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
}

export const getAdminUser = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null

  const session = await prisma.session.findUnique({
    where: { token: hashToken(token) },
    include: { user: true },
  })
  if (!session) return null
  if (session.expiresAt.getTime() < Date.now()) {
    await prisma.session.delete({ where: { id: session.id } })
    return null
  }
  return session.user
}

export const requireAdmin = async () => {
  const user = await getAdminUser()
  if (!user) {
    throw new Error('UNAUTHORIZED')
  }
  return user
}

export const safeEqual = (a: string, b: string) => {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ba.length !== bb.length) return false
  return timingSafeEqual(ba, bb)
}
