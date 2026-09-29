import type { ReactNode } from 'react'

type TableProps = {
  columns: string[]
  children: ReactNode
}

export const Table = ({ columns, children }: TableProps) => (
  <div className="overflow-x-auto">
    <table className="min-w-full text-left text-sm">
      <thead>
        <tr className="border-b border-slate-200 bg-slate-50/80">
          {columns.map((col) => (
            <th
              key={col}
              className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">{children}</tbody>
    </table>
  </div>
)

type TdProps = {
  children: ReactNode
  className?: string
}

export const Td = ({ children, className = '' }: TdProps) => (
  <td className={`px-4 py-3 align-middle text-slate-700 ${className}`}>{children}</td>
)
