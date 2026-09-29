# Joomla database dumps

Place the **application** database export here (not `information_schema`).

## Correct export (phpMyAdmin)

1. Open phpMyAdmin on the hosting panel.
2. Select **`khujand_db`** (not `information_schema`).
3. Tab **Export** → SQL → structure **and** data.
4. Save as `dumps/khujand_joomla.sql`.

## Validation

```bash
node scripts/validate-joomla-dump.mjs dumps/khujand_joomla.sql
```

## Import into the new CMS

```bash
npm run db:seed
npm run db:migrate:joomla
```

This seeds the admin user, UI strings, menu, clone pages, then imports `jos_content` + Joom!Fish translations.

## Files in this folder

| File | Purpose |
|------|---------|
| `joomla15-reference-schema.sql` | Empty reference DDL for typical Joomla 1.5 + Joom!Fish tables |
| `khujand_joomla.sql` | Live dump (gitignored) |
