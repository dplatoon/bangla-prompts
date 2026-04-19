

# Audit Report: What Actually Happened

I tested the live site as Googlebot would see it. Here is what I found:

## The Critical Issue (Confirmed Live)

When I fetched `/explore/business`, `/guide`, `/playground`, and `/kobita` with a Googlebot user agent, **every page returned identical static HTML**:

| Tag | What Crawlers See on EVERY Page |
|---|---|
| `<title>` | "বাংলা AI প্রম্পট জেনারেটর \| 500+ প্রম্পট \| BdPrompt" (homepage default) |
| `<link rel="canonical">` | **MISSING** — only an HTML comment exists |
| `og:url` | `https://bdprompt.com/` (homepage on every page) |
| `og:title` | Homepage default |

## Why This Is Happening

`SEOHead.tsx` updates titles/canonicals at runtime using `useLayoutEffect` — but this runs **client-side after JavaScript executes**. The static `index.html` Lovable's CDN serves on first request has only the homepage defaults. Google's initial crawl sees those defaults.

`src/config/prerenderRoutes.ts` exists but **no prerender plugin is wired into `vite.config.ts`** — so the file is dead code.

The CSV report you uploaded was correct: 27 duplicate titles, 27 missing canonicals, all pointing to homepage.

## Good News

- Page **content** does render for crawlers (Lovable hosting handles SPA HTML for content). I fetched `/explore/business` and saw the prompt cards in markdown.
- The `pageMetadata.ts` config and `SEOHead` component are well-built — they just need to run at build time, not runtime.
- Recent fixes (favicon, OG image consistency, removed fake aggregateRating) are intact.

## The Fix: Build-Time Prerendering

Add `vite-plugin-prerender` (or `vite-plugin-ssr`'s static mode) so each route in `prerenderRoutes.ts` gets a real HTML file at build time with its own title, canonical, and meta tags baked in.

### Plan

1. **Install** `@prerenderer/rollup-plugin` + `puppeteer` as dev dependencies
2. **Wire it into `vite.config.ts`** to read from `src/config/prerenderRoutes.ts` (already exists with 39 routes)
3. **Verify `SEOHead`** writes canonical + title synchronously so prerender captures them (it uses `useLayoutEffect` — should work, but verify with a smoke test)
4. **Update `index.html`** to mark default title/og as fallback only (already done in recent fix — confirmed)
5. **Test build output**: After `npm run build`, `dist/explore/business/index.html` should contain unique title + self-canonical
6. **Keep noscript fallback** but make the `<h1>` more generic since each prerendered page will have its own H1 from React content

### What This Fixes (Per CSV Report)

| Issue | Before | After |
|---|---|---|
| Duplicate titles | 27 pages | 0 |
| Missing canonicals | 27 pages | 0 |
| H1 detection | 0 H1s | 1 per page |
| Crawlable content | 12 words | 200-500 words |
| `og:url` per page | All homepage | Self-referencing |

### Out of Scope (for this round)

- Dynamic routes like `/prompt/:slug` — would need DB fetch at build time. Recommend Phase 2.
- Migrating to Next.js (overkill; prerendering solves 95% of the SEO issue).

