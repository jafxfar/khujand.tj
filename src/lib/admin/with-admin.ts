import { ZodError, type ZodSchema } from 'zod'
import { requireAdmin } from '@/lib/auth'
import { err, type AdminResult } from '@/lib/admin/result'
import type { User } from '@prisma/client'

export type AdminContext = {
  user: User
}

const zodToFieldErrors = (error: ZodError): Record<string, string[]> => {
  const fieldErrors: Record<string, string[]> = {}
  for (const issue of error.issues) {
    const key = issue.path.join('.') || '_form'
    if (!fieldErrors[key]) fieldErrors[key] = []
    fieldErrors[key]!.push(issue.message)
  }
  return fieldErrors
}

export const withAdmin = async <T>(
  handler: (ctx: AdminContext) => Promise<AdminResult<T>>
): Promise<AdminResult<T>> => {
  try {
    const user = await requireAdmin()
    return await handler({ user })
  } catch (e) {
    if (e instanceof Error && e.message === 'UNAUTHORIZED') {
      return err('Требуется авторизация')
    }
    console.error(e)
    return err('Внутренняя ошибка сервера')
  }
}

export const parseWithSchema = <T>(
  schema: ZodSchema<T>,
  data: unknown
): AdminResult<T> => {
  const parsed = schema.safeParse(data)
  if (!parsed.success) {
    const fieldErrors = zodToFieldErrors(parsed.error)
    const first = Object.values(fieldErrors)[0]?.[0] ?? 'Ошибка валидации'
    return err(first, fieldErrors)
  }
  return { ok: true, data: parsed.data }
}

export const formBool = (value: FormDataEntryValue | null) =>
  value === 'on' || value === 'true' || value === '1'

export const formStr = (value: FormDataEntryValue | null) =>
  String(value ?? '').trim()

export const formNum = (value: FormDataEntryValue | null, fallback = 0) => {
  const n = Number(value ?? fallback)
  return Number.isFinite(n) ? n : fallback
}
