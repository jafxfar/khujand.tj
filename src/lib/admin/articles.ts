import { prisma } from '@/lib/db'
import { writeAudit } from '@/lib/admin/audit'
import { err, ok, type AdminResult } from '@/lib/admin/result'
import type { ArticleInput, ArticleListQuery } from '@/lib/admin/schemas'
import { locales } from '@/lib/i18n'
import type { Prisma } from '@prisma/client'

const emptyToNull = (v?: string | null) => {
  if (v == null) return null
  const t = v.trim()
  return t ? t : null
}

export const listArticles = async (query: ArticleListQuery) => {
  const where: Prisma.ArticleWhereInput = {}

  if (query.type) where.type = query.type
  if (query.published === 'true') where.published = true
  if (query.published === 'false') where.published = false

  if (query.q) {
    where.OR = [
      { slug: { contains: query.q } },
      {
        translations: {
          some: {
            locale: 'tg',
            title: { contains: query.q },
          },
        },
      },
    ]
  }

  const skip = (query.page - 1) * query.pageSize

  const [total, rows] = await Promise.all([
    prisma.article.count({ where }),
    prisma.article.findMany({
      where,
      include: { translations: { where: { locale: 'tg' } } },
      orderBy: [{ updatedAt: 'desc' }],
      skip,
      take: query.pageSize,
    }),
  ])

  return {
    total,
    page: query.page,
    pageSize: query.pageSize,
    pageCount: Math.max(1, Math.ceil(total / query.pageSize)),
    items: rows.map((article) => ({
      id: article.id,
      slug: article.slug,
      type: article.type,
      published: article.published,
      title: article.translations[0]?.title || article.slug,
    })),
  }
}

export const createArticle = async (
  input: ArticleInput,
  userId: string
): Promise<AdminResult<{ id: string }>> => {
  try {
    const article = await prisma.article.create({
      data: {
        slug: input.slug,
        type: input.type,
        categoryKey: input.categoryKey || 'none',
        image: emptyToNull(input.image),
        thumb: emptyToNull(input.thumb),
        href: emptyToNull(input.href),
        nameTg: emptyToNull(input.nameTg),
        nameRu: emptyToNull(input.nameRu),
        nameEn: emptyToNull(input.nameEn),
        roleTitleTg: emptyToNull(input.roleTitleTg),
        roleTitleRu: emptyToNull(input.roleTitleRu),
        roleTitleEn: emptyToNull(input.roleTitleEn),
        showOnHome: input.showOnHome,
        isSlide: input.isSlide,
        published: input.published,
        sortOrder: input.sortOrder,
        translations: {
          create: locales.map((locale) => {
            const tr = input.translations[locale] ?? {
              title: '',
              excerpt: '',
              dateLabel: '',
              bodyHtml: '',
            }
            return {
              locale,
              title: tr.title.trim(),
              excerpt: tr.excerpt.trim(),
              dateLabel: tr.dateLabel.trim(),
              bodyHtml: tr.bodyHtml.trim(),
            }
          }),
        },
      },
    })

    await writeAudit({
      userId,
      action: 'create',
      entity: 'article',
      entityId: article.id,
      meta: { slug: article.slug, type: article.type },
    })

    return ok({ id: article.id })
  } catch {
    return err('Не удалось создать статью (возможно, slug уже занят для этого типа)')
  }
}

export const updateArticle = async (
  input: ArticleInput & { id: string },
  userId: string
): Promise<AdminResult<{ id: string }>> => {
  try {
    await prisma.$transaction([
      prisma.article.update({
        where: { id: input.id },
        data: {
          slug: input.slug,
          type: input.type,
          categoryKey: input.categoryKey || 'none',
          image: emptyToNull(input.image),
          thumb: emptyToNull(input.thumb),
          href: emptyToNull(input.href),
          nameTg: emptyToNull(input.nameTg),
          nameRu: emptyToNull(input.nameRu),
          nameEn: emptyToNull(input.nameEn),
          roleTitleTg: emptyToNull(input.roleTitleTg),
          roleTitleRu: emptyToNull(input.roleTitleRu),
          roleTitleEn: emptyToNull(input.roleTitleEn),
          showOnHome: input.showOnHome,
          isSlide: input.isSlide,
          published: input.published,
          sortOrder: input.sortOrder,
        },
      }),
      ...locales.map((locale) => {
        const tr = input.translations[locale] ?? {
          title: '',
          excerpt: '',
          dateLabel: '',
          bodyHtml: '',
        }
        const payload = {
          title: tr.title.trim(),
          excerpt: tr.excerpt.trim(),
          dateLabel: tr.dateLabel.trim(),
          bodyHtml: tr.bodyHtml.trim(),
        }
        return prisma.articleTranslation.upsert({
          where: { articleId_locale: { articleId: input.id, locale } },
          create: { articleId: input.id, locale, ...payload },
          update: payload,
        })
      }),
    ])

    await writeAudit({
      userId,
      action: 'update',
      entity: 'article',
      entityId: input.id,
      meta: { slug: input.slug, type: input.type },
    })

    return ok({ id: input.id })
  } catch {
    return err('Не удалось обновить статью')
  }
}

export const deleteArticle = async (
  id: string,
  userId: string
): Promise<AdminResult> => {
  try {
    await prisma.article.delete({ where: { id } })
    await writeAudit({
      userId,
      action: 'delete',
      entity: 'article',
      entityId: id,
    })
    return ok()
  } catch {
    return err('Не удалось удалить статью')
  }
}
