import type { ReactNode } from 'react'

type AlertProps = {
  children: ReactNode
  tone?: 'error' | 'info' | 'success'
}

const tones = {
  error: 'bg-red-50 text-red-700 border-red-100',
  info: 'bg-sky-50 text-sky-800 border-sky-100',
  success: 'bg-emerald-50 text-emerald-800 border-emerald-100',
}

export const Alert = ({ children, tone = 'error' }: AlertProps) => (
  <div className={`rounded-lg border px-3 py-2.5 text-sm ${tones[tone]}`} role="alert">
    {children}
  </div>
)
