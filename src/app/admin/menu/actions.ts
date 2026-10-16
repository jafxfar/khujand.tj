'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createMenuItem, deleteMenuItem, updateMenuItem } from '@/lib/admin/menu'
import { parseIdForm, parseMenuForm } from '@/lib/admin/form-parse'
import { withAdmin } from '@/lib/admin/with-admin'

export const updateMenuItemAction = async (formData: FormData) => {
  const result = await withAdmin(async ({ user }) => {
    const parsed = parseMenuForm(formData)
    if (!parsed.ok) return parsed
    if (!parsed.data.id) return { ok: false as const, error: 'ID обязателен' }
    return updateMenuItem({ ...parsed.data, id: parsed.data.id }, user.id)
  })

  if (!result.ok) return

  revalidatePath('/admin/menu')
  redirect('/admin/menu')
}

export const createMenuItemAction = async (formData: FormData) => {
  const result = await withAdmin(async ({ user }) => {
    const parsed = parseMenuForm(formData)
    if (!parsed.ok) return parsed
    return createMenuItem(parsed.data, user.id)
  })

  if (!result.ok) return

  revalidatePath('/admin/menu')
  redirect('/admin/menu')
}

export const deleteMenuItemAction = async (formData: FormData) => {
  const result = await withAdmin(async ({ user }) => {
    const parsed = parseIdForm(formData)
    if (!parsed.ok) return parsed
    return deleteMenuItem(parsed.data.id, user.id)
  })

  if (!result.ok) return

  revalidatePath('/admin/menu')
  redirect('/admin/menu')
}
