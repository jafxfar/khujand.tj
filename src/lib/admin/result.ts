export type AdminOk<T = void> = { ok: true; data: T }
export type AdminErr = {
  ok: false
  error: string
  fieldErrors?: Record<string, string[]>
}

export type AdminResult<T = void> = AdminOk<T> | AdminErr

export const ok = <T = void>(data: T = undefined as T): AdminOk<T> => ({ ok: true, data })

export const err = (error: string, fieldErrors?: Record<string, string[]>): AdminErr => ({
  ok: false,
  error,
  fieldErrors,
})
