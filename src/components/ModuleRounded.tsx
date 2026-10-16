import type { ReactNode } from 'react'

type ModuleRoundedProps = {
  title?: string
  className?: string
  children: ReactNode
  deepest?: boolean
  minHeight?: number
}

export const ModuleRounded = ({
  title,
  className = '',
  children,
  deepest = true,
  minHeight,
}: ModuleRoundedProps) => {
  const hasHeader = Boolean(title)

  return (
    <div
      className={`module mod-rounded ${hasHeader ? 'mod-rounded-header mod-rounded-grey mod-rounded-header-templatecolor' : ''} ${className}`.trim()}
    >
      {hasHeader ? (
        <>
          <div className="header-1">
            <div className="header-2">
              <div className="header-3" />
            </div>
          </div>
          <h3 className="header">{title}</h3>
        </>
      ) : null}

      <div className="box-t1">
        <div className="box-t2">
          <div className="box-t3" />
        </div>
      </div>

      <div
        className={hasHeader ? 'box-1' : deepest ? 'box-1 deepest' : 'box-1'}
        style={minHeight ? { minHeight } : undefined}
      >
        {hasHeader ? <div className="box-2 deepest">{children}</div> : children}
      </div>

      {hasHeader ? (
        <div className="box-b1">
          <div className="box-b2">
            <div className="box-b3" />
          </div>
        </div>
      ) : null}
    </div>
  )
}
