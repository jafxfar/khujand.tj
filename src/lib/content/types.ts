export type DbTranslation = {
  locale: string
  title: string
  excerpt: string
  dateLabel: string
  bodyHtml: string
  paragraphs: string
}

export type DbArticle = {
  id: string
  slug: string
  type: string
  categoryKey: string
  image: string | null
  imageAlt: string | null
  imageWidth: number | null
  imageHeight: number | null
  thumb: string | null
  href: string | null
  nameTg: string | null
  nameRu: string | null
  nameEn: string | null
  roleTitleTg: string | null
  roleTitleRu: string | null
  roleTitleEn: string | null
  ratingVotes: number
  ratingAverage: number
  translations: DbTranslation[]
}
