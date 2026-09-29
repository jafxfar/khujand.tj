'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { saveSettings, settingsFromForm } from '@/lib/admin/settings'
import { withAdmin } from '@/lib/admin/with-admin'

export const saveSettingsAction = async (formData: FormData) => {
  const result = await withAdmin(async ({ user }) =>
    saveSettings(settingsFromForm(formData), user.id)
  )

  if (!result.ok) return

  revalidatePath('/admin/settings')
  redirect('/admin/settings?saved=1')
}
