# Khujand web (Next.js CMS)

Pixel-faithful clone of [khujand.tj](https://khujand.tj/) with a modern stack: **Next.js App Router + Prisma + admin CMS**. Content is editable in three languages (tg / ru / en).

## Quick start

```bash
cp .env.example .env
# set ADMIN_USERNAME / ADMIN_PASSWORD / DATABASE_URL / AUTH_SECRET

npm install
npm run db:migrate
npm run db:seed
npm run db:migrate:joomla   # needs dumps/khujand_joomla.sql
npm run dev
```

- Public site: http://localhost:3000/tg
- Admin: http://localhost:3000/admin/login

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Next.js dev server |
| `npm run db:migrate` | Prisma migrate |
| `npm run db:seed` | Admin user, categories, UI strings, settings |
| `npm run db:migrate:joomla` | Import dump + seed clone pages/menu |
| `npm run assets` | Re-download CSS/images from khujand.tj |

## Architecture

- **Public:** `/[lang]/…` reads from Prisma via `src/lib/content/*` (fallback to `src/data/i18n/*` if empty)
- **Admin:** `/admin` — articles, menu, settings, UI strings, media (session cookie auth)
- **DB:** SQLite by default (`file:./dev.db` under `prisma/`); switch `DATABASE_URL` for MySQL later

## Backup

Copy `prisma/dev.db` (and `public/uploads/`) regularly. Re-import from dump with `npm run db:migrate:joomla` if needed.

## Docs

- [docs/new-schema.md](docs/new-schema.md) — Prisma models
- [docs/joomla-schema-analysis.md](docs/joomla-schema-analysis.md) — legacy mapping
- [docs/admin-implementation-notes.md](docs/admin-implementation-notes.md) — admin file map
- [dumps/README.md](dumps/README.md) — dump export/import
