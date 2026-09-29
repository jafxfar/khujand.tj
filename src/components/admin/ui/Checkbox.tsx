import type { InputHTMLAttributes, ReactNode } from 'react'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode
}

export const Checkbox = ({ label, className = '', id, ...props }: CheckboxProps) => {
  const inputId = id || props.name
  return (
    <label
      htmlFor={inputId}
      className={`inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer ${className}`}
    >
      <input
        id={inputId}
        type="checkbox"
        className="size-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
        {...props}
      />
      <span>{label}</span>
    </label>
  )
}
