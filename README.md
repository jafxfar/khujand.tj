# Khujand.tj homepage (Next.js)

Pixel-faithful clone of the [khujand.tj](https://khujand.tj/) homepage using Next.js App Router + TypeScript. Original YOO Flux CSS/images are mirrored under `public/`.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run assets` — re-download CSS/images from khujand.tj into `public/`
- `node scripts/extract-content.mjs` — refresh `src/data` from `source/index.html`

## Structure

- `source/` — woblo dump (HTML/CSS)
- `public/` — static assets (template, modules, images)
- `src/app` — Next.js routes
- `src/components` — header, IceTabs, news, sidebar, footer
- `src/data` — extracted homepage content
