'use client'

import { ArticleRating } from '@/components/ArticleRating'
import type { UiStrings } from '@/data/i18n/ui'
import type { Locale } from '@/lib/i18n'

type RatingData = {
  votes: number
  average: number
  max?: number
}

type ArticleViewProps = {
  title: string
  date: string
  slug?: string
  lang?: Locale
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  roleTitle?: string
  paragraphs: string[]
  rating?: RatingData
  ui?: Pick<UiStrings, 'print' | 'emailAction'>
}

export const ArticleView = ({
  title,
  date,
  slug,
  lang = 'tg',
  image,
  imageAlt,
  imageWidth = 200,
  imageHeight = 150,
  roleTitle,
  paragraphs,
  rating,
  ui,
}: ArticleViewProps) => {
  const printLabel = ui?.print ?? 'Print'
  const emailLabel = ui?.emailAction ?? 'Email'

  const handlePrint = () => {
    window.print()
  }

  return (
    <div id="content">
      <div id="content-shift">
        <div className="floatbox">
          <div className="joomla ">
            <div className="article">
              <div className="headline">
                <h1 className="title">{title}</h1>
                <div className="icons">
                  <div className="icon print">
                    <button
                      type="button"
                      className="article-icon-btn"
                      onClick={handlePrint}
                      aria-label={printLabel}
                      title={printLabel}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/templates/yoo_flux/images/printButton.png"
                        alt={printLabel}
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>
                  <div className="icon email">
                    <a
                      href={`mailto:?subject=${encodeURIComponent(title)}`}
                      aria-label={emailLabel}
                      title={emailLabel}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/templates/yoo_flux/images/emailButton.png"
                        alt={emailLabel}
                        width={16}
                        height={16}
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="article-meta">
                {rating && slug ? (
                  <ArticleRating
                    slug={slug}
                    lang={lang}
                    votes={rating.votes}
                    average={rating.average}
                    max={rating.max ?? 5}
                  />
                ) : null}
                {date ? <span className="created">{date}</span> : null}
              </div>

              {paragraphs.map((text, index) => (
                <p key={index} style={{ textAlign: 'justify' }}>
                  {index === 0 && image ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt={imageAlt || title}
                        title={imageAlt || title}
                        style={{ float: 'left', margin: '0 12px 8px 0' }}
                        width={imageWidth}
                        height={imageHeight}
                      />
                    </>
                  ) : null}
                  {index === 0 && roleTitle ? (
                    <>
                      <strong>{roleTitle}</strong>
                      <br />
                      <br />
                    </>
                  ) : null}
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
