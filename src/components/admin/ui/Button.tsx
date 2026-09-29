import type { ButtonHTMLAttributes, ReactNode } from 'react'

const variants = {
  primary:
    'bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-500 shadow-sm',
  secondary:
    'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus-visible:ring-slate-400',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
  soft: 'bg-teal-50 text-teal-800 hover:bg-teal-100 focus-visible:ring-teal-500',
} as const

const sizes = {
  sm: 'px-2.5 py-1.5 text-xs rounded-md gap-1.5',
  md: 'px-3.5 py-2 text-sm rounded-lg gap-2',
  lg: 'px-4 py-2.5 text-sm rounded-lg gap-2',
} as const

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  children: ReactNode
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
    {children}
  </button>
)
