'use client'

import { useActionState } from 'react'
import { loginAction, type LoginState } from '@/app/admin/actions'
import { Alert } from '@/components/admin/ui/Alert'
import { Button } from '@/components/admin/ui/Button'
import { Input } from '@/components/admin/ui/Input'
import { Label } from '@/components/admin/ui/Label'

const initialState: LoginState = {}

export const LoginForm = () => {
  const [state, formAction, pending] = useActionState(loginAction, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="username">Логин</Label>
        <Input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          aria-label="Логин"
        />
      </div>
      <div>
        <Label htmlFor="password">Пароль</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-label="Пароль"
        />
      </div>
      {state.error ? <Alert>{state.error}</Alert> : null}
      <Button type="submit" disabled={pending} className="w-full" size="lg">
        {pending ? 'Вход…' : 'Войти'}
      </Button>
    </form>
  )
}
