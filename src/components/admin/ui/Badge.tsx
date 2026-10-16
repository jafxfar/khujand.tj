import type { ReactNode } from 'react'

const tones = {
  neutral: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-800',
  danger: 'bg-red-50 text-red-700',
  accent: 'bg-teal-50 text-teal-800',
} as const

type BadgeProps = {
  children: ReactNode
  tone?: keyof typeof tones
  className?: string
}

export const Badge = ({ children, tone = 'neutral', className = '' }: BadgeProps) => (
  <span
    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${tones[tone]} ${className}`}
  >
    {children}
  </span>
)
