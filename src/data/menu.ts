export type MenuItem = {
  label: string
  href: string
  children?: MenuItem[]
}

export { getMenu } from '@/data/i18n/menu'
