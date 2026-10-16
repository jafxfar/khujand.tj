'use client'

import { useEffect, useRef, useState } from 'react'
import type { MenuItem } from '@/data/menu'

type HeaderMenuProps = {
  items: MenuItem[]
}

export const HeaderMenu = ({ items }: HeaderMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [fancy, setFancy] = useState({ left: 0, width: 0, visible: false })

  const updateFancy = (el: HTMLElement | null) => {
    const root = menuRef.current
    if (!root || !el) return
    const rootRect = root.getBoundingClientRect()
    const rect = el.getBoundingClientRect()
    setFancy({
      left: rect.left - rootRect.left,
      width: rect.width,
      visible: true,
    })
  }

  useEffect(() => {
    const active = menuRef.current?.querySelector<HTMLElement>('li.level1.active > a, li.level1.active > span')
    updateFancy(active || null)
  }, [items])

  return (
    <div id="menu" ref={menuRef}>
      <ul className="menu menu-dropdown">
        {items.map((item, index) => {
          const isFirst = index === 0
          const isLast = index === items.length - 1
          const hasChildren = Boolean(item.children?.length)
          const isActive = isFirst
          const liClass = [
            'level1',
            `item${index + 1}`,
            isFirst ? 'first' : '',
            isLast ? 'last' : '',
            isActive ? 'active current' : '',
            hasChildren ? 'parent' : '',
            hasChildren && !item.href.startsWith('http') && item.href === '#' ? 'separator' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <li
              key={`${item.label}-${index}`}
              className={liClass}
              onMouseEnter={(e) => {
                const target = e.currentTarget.querySelector<HTMLElement>(':scope > a, :scope > span')
                updateFancy(target)
              }}
              onMouseLeave={() => {
                const active = menuRef.current?.querySelector<HTMLElement>(
                  'li.level1.active > a, li.level1.active > span'
                )
                updateFancy(active || null)
              }}
            >
              {hasChildren && item.href === '#' ? (
                <span className={`separator level1 item${index + 1} parent separator`} tabIndex={0}>
                  <span className="bg ">{item.label}</span>
                </span>
              ) : (
                <a
                  href={item.href}
                  className={`level1 item${index + 1}${isFirst ? ' first' : ''}${isLast ? ' last' : ''}${isActive ? ' active current' : ''}${hasChildren ? ' parent' : ''}`}
                >
                  <span className="bg ">{item.label}</span>
                </a>
              )}

              {hasChildren ? (
                <div className="dropdown columns1">
                  <div>
                    <div className="dropdown-t1">
                      <div className="dropdown-t2">
                        <div className="dropdown-t3" />
                      </div>
                    </div>
                    <div className="dropdown-1">
                      <div className="dropdown-2">
                        <div className="dropdown-3">
                          <ul className="col1 level2 first last">
                            {item.children!.map((child, cIndex) => {
                              const cFirst = cIndex === 0
                              const cLast = cIndex === item.children!.length - 1
                              return (
                                <li
                                  key={`${child.label}-${cIndex}`}
                                  className={`level2 item${cIndex + 1}${cFirst ? ' first' : ''}${cLast ? ' last' : ''}`}
                                >
                                  <div className="group-box1">
                                    <div className="group-box2">
                                      <div className="group-box3">
                                        <div className="group-box4">
                                          <div className="group-box5">
                                            <div className="hover-box1">
                                              <div className="hover-box2">
                                                <div className="hover-box3">
                                                  <div className="hover-box4">
                                                    <a
                                                      href={child.href}
                                                      className={`level2 item${cIndex + 1}${cFirst ? ' first' : ''}${cLast ? ' last' : ''}`}
                                                    >
                                                      <span className="bg ">{child.label}</span>
                                                    </a>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-b1">
                      <div className="dropdown-b2">
                        <div className="dropdown-b3" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>

      {[1, 2, 3, 4].map((n) => (
        <div key={n} className={`fancy bg${n}`}>
          <div className="fancy-1">
            <div className="fancy-2">
              <div className="fancy-3" />
            </div>
          </div>
        </div>
      ))}
      <div
        className="fancy bg5"
        style={{
          left: fancy.left,
          width: fancy.width,
          visibility: fancy.visible ? 'visible' : 'hidden',
          opacity: fancy.visible ? 1 : 0,
        }}
      >
        <div className="fancy-1">
          <div className="fancy-2">
            <div className="fancy-3" />
          </div>
        </div>
      </div>
    </div>
  )
}
