# Admin & DB content readers (Phases 0–6)

## Setup

```bash
npm run db:migrate
npm run db:seed
npm run db:migrate:joomla
```

Dump path: `dumps/khujand_joomla.sql` (gitignored).

## Admin auth & shell

- `src/middleware.ts` — soft gate for `/admin/*` (cookie present); sets `x-pathname` for layout
- `src/app/admin/layout.tsx` — login route bare; otherwise sidebar + `requireAdmin`
- `src/app/admin/login/page.tsx`, `src/app/admin/login/LoginForm.tsx`
- `src/app/admin/actions.ts` — `loginAction`, `logoutAction`
- `src/app/admin/page.tsx` — dashboard counts

## Admin CRUD (tg/ru/en)

- Articles: `src/app/admin/articles/**`, `src/components/admin/ArticleForm.tsx`
- Menu: `src/app/admin/menu/**`
- Settings: `src/app/admin/settings/**`
- UI strings: `src/app/admin/ui-strings/**`
- Media: `src/app/admin/media/**` → `public/uploads/`

## Content readers (public site)

- `src/lib/content/*` — DB-first with static `src/data/i18n/*` fallback
- Routes: home, boygoni, profiles, soxtor, iqtisod, tarikh, aholi
- Added: `/[lang]/news/[slug]`, `/[lang]/decisions`, `/[lang]/decisions/[slug]`

## Import

- `scripts/import-joomla.ts` + `scripts/sql-parse.ts`
- Seeds menu + clone pages from TS, then imports ~9k `jos_content` rows with Joom!Fish translations

## Ops

- Backup: `prisma/dev.db` + `public/uploads/`
- Seed admin from `.env` `ADMIN_USERNAME` / `ADMIN_PASSWORD`
