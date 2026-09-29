'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { parseUiStringForm } from '@/lib/admin/form-parse'
import { updateUiString } from '@/lib/admin/ui-strings'
import { withAdmin } from '@/lib/admin/with-admin'

export const updateUiStringAction = async (formData: FormData) => {
  const result = await withAdmin(async ({ user }) => {
    const parsed = parseUiStringForm(formData)
    if (!parsed.ok) return parsed
    return updateUiString(parsed.data, user.id)
  })

  if (!result.ok) return

  revalidatePath('/admin/ui-strings')
  redirect('/admin/ui-strings')
}
