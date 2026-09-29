import type { LabelHTMLAttributes, ReactNode } from 'react'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode
}

export const Label = ({ className = '', children, ...props }: LabelProps) => (
  <label className={`mb-1.5 block text-sm font-medium text-slate-700 ${className}`} {...props}>
    {children}
  </label>
)
