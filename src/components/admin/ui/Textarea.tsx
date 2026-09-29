import type { TextareaHTMLAttributes } from 'react'
import { fieldClass } from '@/components/admin/ui/Input'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = ({ className = '', ...props }: TextareaProps) => (
  <textarea className={`${fieldClass} min-h-[100px] resize-y ${className}`} {...props} />
)
