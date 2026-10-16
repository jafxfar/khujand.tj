'use client'

import { useEffect, useState } from 'react'

type NspItem = {
  title: string
  href: string
  date?: string
}

type NspNewsProps = {
  items: NspItem[]
  pageLabel: string
}

export const NspNews = ({ items, pageLabel }: NspNewsProps) => {
  const [page, setPage] = useState(0)
  const pageCount = items.length

  useEffect(() => {
    if (pageCount < 2) return
    const timer = window.setInterval(() => {
      setPage((prev) => (prev + 1) % pageCount)
    }, 4500)
    return () => window.clearInterval(timer)
  }, [pageCount])

  if (!items.length) return null

  return (
    <div className="nsp_main autoanim hover nsp_fs100" id="nsp-nsp_228" style={{ width: '100%' }}>
      <div className="nsp_arts bottom" style={{ width: '100%' }}>
        <div className="nsp_top_interface">
          <div>
            <ul className="pagination">
              {items.map((_, index) => (
                <li
                  key={index}
                  className={index === page ? 'active' : ''}
                  onClick={() => setPage(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setPage(index)
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${pageLabel} ${index + 1}`}
                >
                  {index + 1}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="nsp_art_scroll1" style={{ width: 190, overflow: 'hidden' }}>
          <div
            className="nsp_art_scroll2"
            style={{
              width: pageCount * 190,
              transform: `translateX(-${page * 190}px)`,
            }}
          >
            {items.map((item) => (
              <div key={item.href} className="nsp_art_page" style={{ width: 190, float: 'left' }}>
                <div className="nsp_art" style={{ width: '100%' }}>
                  <div style={{ padding: '2px 4px' }}>
                    <h4 className="nsp_header tleft fnone">
                      <a href={item.href} title={item.title}>
                        {item.title.length > 42 ? `${item.title.slice(0, 40)}…` : item.title}
                      </a>
                    </h4>
                    {item.date ? <p className="nsp_info tleft fleft">{item.date}</p> : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
