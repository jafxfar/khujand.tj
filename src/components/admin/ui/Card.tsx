import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
  padding?: boolean
}

export const Card = ({ children, className = '', padding = true }: CardProps) => (
  <div
    className={`admin-surface overflow-hidden transition-shadow duration-200 hover:shadow-md/5 ${padding ? 'p-5 sm:p-6' : ''} ${className}`}
  >
    {children}
  </div>
)

type CardHeaderProps = {
  title: string
  description?: string
  action?: ReactNode
}

export const CardHeader = ({ title, description, action }: CardHeaderProps) => (
  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
    <div>
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      {description ? <p className="mt-0.5 text-sm text-slate-500">{description}</p> : null}
    </div>
    {action}
  </div>
)
