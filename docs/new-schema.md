# New database schema (Next.js CMS)

SQLite via Prisma for local/dev; `DATABASE_URL` can point at MySQL/MariaDB later with the same models.

## Models

| Model | Role |
|-------|------|
| `User` | Admin accounts |
| `Session` | Cookie sessions |
| `MenuItem` | Nested navigation |
| `Article` | Pages, profiles, sectors, economy, news |
| `ArticleTranslation` | Per-locale title, body, excerpt, dates |
| `Category` | Logical groups: news, muovinon, rohbaron, soxtor, iqtisod |
| `SiteSetting` | Key/value for modules (youtube, gismeteo, footer JSON) |
| `Media` | Optional registry of image paths |

Article `type` enum: `news | page | profile | sector | economy | decision`

Article `categoryKey`: `news | muovinon | rohbaron | soxtor | iqtisod | home | none`

Flags on Article: `showOnHome`, `isSlide`, `published`, `sortOrder`
