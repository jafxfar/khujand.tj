'use client'

import { useEffect, useState } from 'react'
import { formatVotesLabel, getUi } from '@/data/i18n/ui'
import type { Locale } from '@/lib/i18n'

type ArticleRatingProps = {
  slug: string
  lang: Locale
  votes: number
  average: number
  max?: number
}

type StoredVote = {
  value: number
  baseVotes: number
  baseSum: number
}

const storageKey = (slug: string) => `khujand-rating:${slug}`

const DisplayStars = ({ average, max = 5 }: { average: number; max?: number }) => {
  const full = Math.floor(average)
  const hasHalf = average - full >= 0.25 && average - full < 0.75
  const stars = Array.from({ length: max }, (_, i) => {
    if (i < full) return 'full'
    if (i === full && hasHalf) return 'half'
    return 'empty'
  })

  return (
    <ul className="article-rating-stars" aria-hidden="true">
      {stars.map((state, i) => (
        <li key={i} className={`star star-${state}`} />
      ))}
    </ul>
  )
}

export const ArticleRating = ({
  slug,
  lang,
  votes: baseVotes,
  average: baseAverage,
  max = 5,
}: ArticleRatingProps) => {
  const ui = getUi(lang)
  const baseSum = Math.round(baseAverage * baseVotes * 100) / 100
  const [votes, setVotes] = useState(baseVotes)
  const [average, setAverage] = useState(baseAverage)
  const [selected, setSelected] = useState(0)
  const [hover, setHover] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(slug))
      if (!raw) return
      const stored = JSON.parse(raw) as StoredVote
      if (!stored?.value || stored.value < 1 || stored.value > max) return

      const votesCount = stored.baseVotes + 1
      const sum = stored.baseSum + stored.value
      setVotes(votesCount)
      setAverage(sum / votesCount)
      setSelected(stored.value)
      setHasVoted(true)
    } catch {
      /* ignore corrupt storage */
    }
  }, [slug, max])

  const handleSelect = (value: number) => {
    setSelected(value)
  }

  const handleRate = () => {
    if (selected < 1 || selected > max) return

    let nextVotes: number
    let nextSum: number
    let prevValue = 0

    if (hasVoted) {
      try {
        const raw = localStorage.getItem(storageKey(slug))
        const stored = raw ? (JSON.parse(raw) as StoredVote) : null
        prevValue = stored?.value ?? 0
      } catch {
        prevValue = 0
      }
      nextVotes = votes
      nextSum = average * votes - prevValue + selected
    } else {
      nextVotes = baseVotes + 1
      nextSum = baseSum + selected
    }

    const nextAverage = nextSum / nextVotes
    setVotes(nextVotes)
    setAverage(nextAverage)
    setHasVoted(true)

    try {
      const payload: StoredVote = {
        value: selected,
        baseVotes,
        baseSum,
      }
      localStorage.setItem(storageKey(slug), JSON.stringify(payload))
    } catch {
      /* private mode */
    }
  }

  const preview = hover || selected

  return (
    <div className="content_rating">
      <DisplayStars average={average} max={max} />
      <span className="rating-text">{formatVotesLabel(lang, votes, average, max)}</span>

      <form
        className="content_vote"
        onSubmit={(e) => {
          e.preventDefault()
          handleRate()
        }}
      >
        <fieldset className="vote-stars" onMouseLeave={() => setHover(0)}>
          <legend className="visually-hidden">{ui.rate}</legend>
          {Array.from({ length: max }, (_, i) => {
            const value = i + 1
            const active = preview >= value
            return (
              <button
                key={value}
                type="button"
                className={`vote-star${active ? ' is-active' : ''}`}
                aria-label={`${value}`}
                aria-pressed={selected === value}
                onMouseEnter={() => setHover(value)}
                onFocus={() => setHover(value)}
                onClick={() => handleSelect(value)}
              />
            )
          })}
        </fieldset>
        <button type="submit" className="vote-submit" disabled={selected < 1}>
          {ui.rate}
        </button>
      </form>
    </div>
  )
}
