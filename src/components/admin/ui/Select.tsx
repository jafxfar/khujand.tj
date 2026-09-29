import type { SelectHTMLAttributes } from 'react'
import { fieldClass } from '@/components/admin/ui/Input'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

export const Select = ({ className = '', children, ...props }: SelectProps) => (
  <select className={`${fieldClass} ${className}`} {...props}>
    {children}
  </select>
)
