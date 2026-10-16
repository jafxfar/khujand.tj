'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createArticle, deleteArticle, updateArticle } from '@/lib/admin/articles'
import { parseArticleForm, parseIdForm } from '@/lib/admin/form-parse'
import { withAdmin } from '@/lib/admin/with-admin'

export const createArticleAction = async (formData: FormData) => {
  const result = await withAdmin(async ({ user }) => {
    const parsed = parseArticleForm(formData)
    if (!parsed.ok) return parsed
    return createArticle(parsed.data, user.id)
  })

  if (!result.ok) {
    redirect(`/admin/articles/new?error=${encodeURIComponent(result.error)}`)
  }

  revalidatePath('/admin/articles')
  redirect('/admin/articles')
}

export const updateArticleAction = async (formData: FormData) => {
  const id = String(formData.get('id') ?? '')
  const result = await withAdmin(async ({ user }) => {
    const parsed = parseArticleForm(formData)
    if (!parsed.ok) return parsed
    if (!parsed.data.id) {
      return { ok: false as const, error: 'ID обязателен' }
    }
    return updateArticle({ ...parsed.data, id: parsed.data.id }, user.id)
  })

  if (!result.ok) {
    redirect(
      `/admin/articles/${id || ''}?error=${encodeURIComponent(result.error)}`
    )
  }

  revalidatePath('/admin/articles')
  revalidatePath(`/admin/articles/${id}`)
  redirect('/admin/articles')
}

export const deleteArticleAction = async (formData: FormData) => {
  const result = await withAdmin(async ({ user }) => {
    const parsed = parseIdForm(formData)
    if (!parsed.ok) return parsed
    return deleteArticle(parsed.data.id, user.id)
  })

  if (!result.ok) return

  revalidatePath('/admin/articles')
  redirect('/admin/articles')
}
