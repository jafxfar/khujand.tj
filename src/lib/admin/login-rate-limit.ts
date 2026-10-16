type Attempt = { count: number; lockedUntil: number }

const attempts = new Map<string, Attempt>()

const MAX_FAILS = 5
const LOCK_MS = 15 * 60 * 1000

export const loginKey = (ip: string, username: string) =>
  `${ip.trim()}::${username.trim().toLowerCase()}`

export const checkLoginAllowed = (key: string): { ok: true } | { ok: false; error: string } => {
  const row = attempts.get(key)
  if (!row) return { ok: true }
  if (row.lockedUntil > Date.now()) {
    const mins = Math.ceil((row.lockedUntil - Date.now()) / 60000)
    return { ok: false, error: `Слишком много попыток. Повторите через ${mins} мин.` }
  }
  return { ok: true }
}

export const recordLoginFailure = (key: string) => {
  const row = attempts.get(key) ?? { count: 0, lockedUntil: 0 }
  row.count += 1
  if (row.count >= MAX_FAILS) {
    row.lockedUntil = Date.now() + LOCK_MS
    row.count = 0
  }
  attempts.set(key, row)
}

export const clearLoginFailures = (key: string) => {
  attempts.delete(key)
}
