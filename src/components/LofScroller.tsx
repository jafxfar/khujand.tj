'use client'

import { useEffect, useState } from 'react'
import type { LofItem } from '@/data/i18n/home'

type LofScrollerProps = {
  id: string
  items: LofItem[]
}

export const LofScroller = ({ id, items }: LofScrollerProps) => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (items.length < 2) return
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % items.length)
    }, 7000)
    return () => window.clearInterval(timer)
  }, [items.length])

  if (!items.length) return null

  return (
    <div id={id} className="lof-articlessroller" style={{ height: 230, width: 200 }}>
      <div className="lof-vertical lof-container">

        <div className="lof-main-wapper" style={{ height: 230, width: 200 }}>
          {items.map((item, index) => {
            let top = 230
            if (index === active) top = 0
            else if (index === (active - 1 + items.length) % items.length) top = -230

            return (
              <div
                key={item.title}
                className={`lof-main-item page-${index + 1}`}
                style={{
                  top,
                  height: 230,
                  display: 'block',
                  transition: 'top 0.8s ease-in-out',
                }}
              >
                <div className="lof-row" style={{ width: '100%' }}>
                  <div className="lof-inner">
                    <a
                      target="_parent"
                      className="lof-image-link"
                      style={{ width: 150, display: 'block' }}
                      title={item.title}
                      href={item.href}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        title={item.title}
                        alt={item.title}
                        className="lof-image"
                        height={180}
                        width={150}
                      />
                    </a>
                    <a className="lof-title" target="_parent" title={item.title} href={item.href}>
                      {item.title}
                    </a>
                    {item.description}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
