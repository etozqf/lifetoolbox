# DevToolbox

Free online developer tools — Phase 0 MVP per `DevToolbox-MVP-开发规格书.md` (v1.1).

## Requirements

- **Node.js ≥ 18.17** (Next.js 14 does not run on Node 14)

## Setup

```bash
cd devtoolbox
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build (static export for Cloudflare Pages)

```bash
npm run build
```

Output is in `out/`. Connect the repo to Cloudflare Pages with build command `npm run build` and output directory `out`.

## Environment

```bash
# optional — used in sitemap/canonical URLs
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Release scope

### Phase 0
- 9 tools: `dev`, `encode`, `security`
- Blog ×3, Privacy, Terms, About

### Phase 1 (current — `CURRENT_PHASE = 1`)
- **Time:** timezone converter, time difference, date duration, unix timestamp
- **Text:** word counter, case converter, remove duplicates, sort lines, text diff
- **Encode:** unicode escape
- Blog ×8 total (+5 Phase 1 articles)
- **~19 tool URLs** + static pages (~38 routes after build)

## Deploy to Cloudflare Pages

1. Push repo to GitHub  
2. Cloudflare Dashboard → Workers & Pages → Create → Connect Git  
3. Settings:
   - **Framework preset:** Next.js (Static HTML Export) or None  
   - **Build command:** `npm run build`  
   - **Build output directory:** `out`  
   - **Node version:** 20 (Environment variable `NODE_VERSION=20`)  
4. Add `NEXT_PUBLIC_SITE_URL=https://your-domain.com`  
5. Custom domain → DNS in Cloudflare  

Local preview of static output:

```bash
npx serve out
```

## Project structure

See specification §2.3 — `lib/tool-registry.ts` is the source of truth for tool routes and metadata.
