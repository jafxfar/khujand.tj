import type { BreadcrumbCrumb } from '@/components/ContentWrapper'

export type ArticleRating = {
  votes: number
  average: number
  max?: number
}

/** Shared article model for profile and sector pages */
export type SiteArticle = {
  slug: string
  title: string
  date: string
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  roleTitle?: string
  paragraphs: string[]
  rating?: ArticleRating
  crumbs: BreadcrumbCrumb[]
}

/** @deprecated use SiteArticle */
export type ProfileArticle = SiteArticle
