import { z } from 'zod'
import { locales } from '@/lib/i18n'

export const ARTICLE_TYPES = [
  'news',
  'page',
  'profile',
  'sector',
  'economy',
  'decision',
] as const

export const SETTING_KEYS = [
  'youtubeEmbed',
  'gismeteoInformerHash',
  'footerPhone',
  'footerEmail',
  'footerSite',
  'footerSiteHref',
  'footerCopyrightHref',
  'footerAddressTg',
  'footerAddressRu',
  'footerAddressEn',
  'footerStreetTg',
  'footerStreetRu',
  'footerStreetEn',
  'headerLogo',
  'headerSearchUrl',
  'headerOldSiteUrl',
  'headerFeedbackUrl',
  'mayorNameTg',
  'mayorNameRu',
  'mayorNameEn',
  'mayorImage',
  'mayorHref',
] as const

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Введите логин'),
  password: z.string().min(1, 'Введите пароль'),
})

const translationSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  dateLabel: z.string(),
  bodyHtml: z.string(),
})

export const articleInputSchema = z
  .object({
    id: z.string().optional(),
    slug: z.string().trim().min(1, 'Slug обязателен'),
    type: z.enum(ARTICLE_TYPES),
    categoryKey: z.string().trim().min(1).default('none'),
    image: z.string().trim().optional().nullable(),
    thumb: z.string().trim().optional().nullable(),
    href: z.string().trim().optional().nullable(),
    nameTg: z.string().trim().optional().nullable(),
    nameRu: z.string().trim().optional().nullable(),
    nameEn: z.string().trim().optional().nullable(),
    roleTitleTg: z.string().trim().optional().nullable(),
    roleTitleRu: z.string().trim().optional().nullable(),
    roleTitleEn: z.string().trim().optional().nullable(),
    showOnHome: z.boolean(),
    isSlide: z.boolean(),
    published: z.boolean(),
    sortOrder: z.number().int(),
    translations: z.record(z.string(), translationSchema),
  })
  .superRefine((data, ctx) => {
    if (!data.published) return
    for (const locale of locales) {
      const title = data.translations[locale]?.title?.trim()
      if (!title) {
        ctx.addIssue({
          code: 'custom',
          message: `Заголовок (${locale.toUpperCase()}) обязателен при публикации`,
          path: ['translations', locale, 'title'],
        })
      }
    }
  })

export const articleListQuerySchema = z.object({
  q: z.string().trim().optional().default(''),
  type: z.string().trim().optional().default(''),
  published: z.enum(['', 'true', 'false']).optional().default(''),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(30),
})

export const menuItemSchema = z.object({
  id: z.string().optional(),
  parentId: z.string().trim().nullable().optional(),
  labelTg: z.string().trim().min(1, 'Подпись TG обязательна'),
  labelRu: z.string().trim().min(1, 'Подпись RU обязательна'),
  labelEn: z.string().trim().min(1, 'Подпись EN обязательна'),
  href: z.string().trim().min(1),
  sortOrder: z.number().int().default(0),
  published: z.boolean().default(true),
})

export const uiStringSchema = z.object({
  id: z.string().min(1),
  valueTg: z.string(),
  valueRu: z.string(),
  valueEn: z.string(),
})

export const mediaUploadMetaSchema = z.object({
  alt: z.string().trim().default(''),
})

export const idSchema = z.object({
  id: z.string().min(1, 'ID обязателен'),
})

export type ArticleInput = z.infer<typeof articleInputSchema>
export type ArticleListQuery = z.infer<typeof articleListQuerySchema>
export type MenuItemInput = z.infer<typeof menuItemSchema>
