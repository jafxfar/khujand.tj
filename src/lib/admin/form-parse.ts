import { locales } from '@/lib/i18n'
import {
  articleInputSchema,
  menuItemSchema,
  uiStringSchema,
  idSchema,
  type ArticleInput,
} from '@/lib/admin/schemas'
import { formBool, formNum, formStr, parseWithSchema } from '@/lib/admin/with-admin'
import type { AdminResult } from '@/lib/admin/result'

export const parseArticleForm = (formData: FormData): AdminResult<ArticleInput> => {
  const translations = Object.fromEntries(
    locales.map((locale) => [
      locale,
      {
        title: formStr(formData.get(`title_${locale}`)),
        excerpt: formStr(formData.get(`excerpt_${locale}`)),
        dateLabel: formStr(formData.get(`dateLabel_${locale}`)),
        bodyHtml: formStr(formData.get(`bodyHtml_${locale}`)),
      },
    ])
  )

  const id = formStr(formData.get('id'))

  return parseWithSchema(articleInputSchema, {
    id: id || undefined,
    slug: formStr(formData.get('slug')),
    type: formStr(formData.get('type')) || 'news',
    categoryKey: formStr(formData.get('categoryKey')) || 'none',
    image: formStr(formData.get('image')) || null,
    thumb: formStr(formData.get('thumb')) || null,
    href: formStr(formData.get('href')) || null,
    nameTg: formStr(formData.get('nameTg')) || null,
    nameRu: formStr(formData.get('nameRu')) || null,
    nameEn: formStr(formData.get('nameEn')) || null,
    roleTitleTg: formStr(formData.get('roleTitleTg')) || null,
    roleTitleRu: formStr(formData.get('roleTitleRu')) || null,
    roleTitleEn: formStr(formData.get('roleTitleEn')) || null,
    showOnHome: formBool(formData.get('showOnHome')),
    isSlide: formBool(formData.get('isSlide')),
    published: formBool(formData.get('published')),
    sortOrder: formNum(formData.get('sortOrder'), 0),
    translations,
  })
}

export const parseMenuForm = (formData: FormData) => {
  const parentRaw = formStr(formData.get('parentId'))
  return parseWithSchema(menuItemSchema, {
    id: formStr(formData.get('id')) || undefined,
    parentId: parentRaw || null,
    labelTg: formStr(formData.get('labelTg')),
    labelRu: formStr(formData.get('labelRu')),
    labelEn: formStr(formData.get('labelEn')),
    href: formStr(formData.get('href')) || '/',
    sortOrder: formNum(formData.get('sortOrder'), 0),
    published: formBool(formData.get('published')),
  })
}

export const parseUiStringForm = (formData: FormData) =>
  parseWithSchema(uiStringSchema, {
    id: formStr(formData.get('id')),
    valueTg: formStr(formData.get('valueTg')),
    valueRu: formStr(formData.get('valueRu')),
    valueEn: formStr(formData.get('valueEn')),
  })

export const parseIdForm = (formData: FormData) =>
  parseWithSchema(idSchema, { id: formStr(formData.get('id')) })
