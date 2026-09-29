import type { InputHTMLAttributes } from 'react'

export const fieldClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = ({ className = '', ...props }: InputProps) => (
  <input className={`${fieldClass} ${className}`} {...props} />
)
