'use client'

import { useEffect, useState } from 'react'
import type { Slide } from '@/data/i18n/home'
import type { UiStrings } from '@/data/i18n/ui'

type IceTabsProps = {
  slides: Slide[]
  ui: UiStrings
}

export const IceTabs = ({ slides, ui }: IceTabsProps) => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [slides.length])

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleNext = () => {
    setActive((prev) => (prev + 1) % slides.length)
  }

  if (!slides.length) return null

  return (
    <div
      id="icetabs204"
      className="ice-slideshow-candy ice-right-sl-candy clearfix"
      style={{ height: 'auto', width: 'auto' }}
    >
      <div className="ice-navigator-wrapper clearfix">
        <div className="ice-navigator-outer" style={{ height: 255, width: 250 }}>
          <ul className="ice-navigator" style={{ top: -10 }}>
            {slides.map((slide, index) => (
              <li
                key={slide.title}
                className={index === active ? 'active' : ''}
                style={{ height: 85, width: 250 }}
                onClick={() => setActive(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActive(index)
                }}
                tabIndex={0}
                role="button"
                aria-label={slide.title}
              >
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={slide.thumb || slide.image} title={slide.title} alt={slide.title} />
                  <h4 className="ice-title">{slide.title}</h4>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ice-main-wapper" style={{ height: 230, width: 485 }}>
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`ice-main-item ${index === active ? 'is-active' : 'is-hidden'}`}
            style={{ height: 230, width: 485 }}
          >
            <div className="ice-description">
              <h3 className="ice-title">
                <a href={slide.href}>{slide.title}</a>
              </h3>
              <p style={{ textAlign: 'justify' }}>
                <a
                  style={{ float: 'left' }}
                  className="thumbnail with-zoomin-img zoomin-cur"
                  href={slide.image}
                  target="_blank"
                  rel="noreferrer"
                  title={slide.title}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    width={200}
                    height={133}
                    style={{ float: 'left', marginRight: 8 }}
                  />
                  <span className="zoomin-img" />
                </a>
                {slide.excerpt}
              </p>
              <a className="ice-readmore" target="_parent" href={slide.href} title={slide.title}>
                <span className="ice-button">
                  <span className="round">
                    <span>{ui.readMore}</span>
                  </span>
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="ice-buttons-control">
        <div
          className="ice-previous"
          onClick={handlePrev}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handlePrev()
          }}
          tabIndex={0}
          role="button"
          aria-label={ui.previous}
        >
          {ui.previous}
        </div>
        <div
          className="ice-next"
          onClick={handleNext}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleNext()
          }}
          tabIndex={0}
          role="button"
          aria-label={ui.next}
        >
          {ui.next}
        </div>
      </div>
    </div>
  )
}
