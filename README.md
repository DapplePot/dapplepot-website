# DapplePot Website

Next.js 15 (App Router) + Tailwind v4 replica of the marketing site at
`https://www.dapplepot.com`, migrated from the Vite/React source in `../website/`.

## Local dev

```bash
npm install
npm run dev
```

Runs at http://localhost:3000.

## Structure

- `app/` — routes, layout, metadata
- `components/` — SiteNav, SiteFooter, LegalLayout, BlogListClient
- `lib/` — blogApi, markdown pipeline, useDocumentMeta, constants
- `public/` — logo, favicon, `llms.txt`, background asset

## Blog data

Blog posts fetched from `https://api.dapplepot.com/v1/blogs` at request time.
Rendering uses ISR (`revalidate: 300s`) plus on-demand revalidation via
`POST /api/revalidate` (guarded by `REVALIDATE_SECRET`).

## Deploy

Requires a Node runtime (Vercel, Firebase App Hosting, Cloud Run, or `next start`
behind any HTTP server). Static export is **not** supported — RSS, sitemap,
dynamic OG images, and revalidation all need server routes.
