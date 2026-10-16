'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { deleteMedia, uploadMedia } from '@/lib/admin/media'
import { parseIdForm } from '@/lib/admin/form-parse'
import { formStr } from '@/lib/admin/with-admin'
import { withAdmin } from '@/lib/admin/with-admin'

export const uploadMediaAction = async (formData: FormData) => {
  const result = await withAdmin(async ({ user }) => {
    const file = formData.get('file')
    if (!(file instanceof File)) {
      return { ok: false as const, error: 'Файл не выбран' }
    }
    return uploadMedia(file, formStr(formData.get('alt')), user.id)
  })

  if (!result.ok) {
    redirect(`/admin/media?error=${encodeURIComponent(result.error)}`)
  }

  revalidatePath('/admin/media')
  redirect('/admin/media')
}

export const deleteMediaAction = async (formData: FormData) => {
  const result = await withAdmin(async ({ user }) => {
    const parsed = parseIdForm(formData)
    if (!parsed.ok) return parsed
    return deleteMedia(parsed.data.id, user.id)
  })

  if (!result.ok) return

  revalidatePath('/admin/media')
  redirect('/admin/media')
}
