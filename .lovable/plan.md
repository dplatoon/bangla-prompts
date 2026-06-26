# SEO Audit Fix Implementation Plan

The uploaded `bdprompt.zip` audit is accurate and aligned with our stack. Per your choices:
- **Skip** the 6 brand-new landing pages (HSC, CV, email, blog, ecommerce, university).
- **Use** the static audit sitemap as the source of truth (filtered to remove the skipped pages).

## What this fixes

- **Fix A (Critical)** — 16 indexable URLs currently serve the homepage with a homepage canonical (self-deindexing). Adding them to the prerender list gives each its own static HTML with its own canonical, title, and meta.
- **Fix B (Critical)** — Unknown URLs return HTTP 200 + homepage content (soft-404). Wiring a real prerendered `/404` page through to a `dist/404.html` that the host serves with HTTP 404 kills the soft-404.
- **Fix C (High/Medium)** — Already correct in code (`og:locale` = `bn_BD`, hreflang `bn` + `x-default`). Deploying the audit's static `sitemap.xml` aligns the route list and uniform hreflang.

## Changes

### 1. `src/config/prerenderRoutes.ts` — add 17 missing routes
Add: `/image-generation-prompts`, `/video-generation-prompts`, `/facebook-post-prompts`, `/ad-copy-prompts`, `/ssc-exam-prompts`, `/freelancer-prompts`, `/prompts/seo-bangla`, `/prompts/freelancing`, `/prompts/students`, `/prompts/coding`, `/prompts/creative-art`, `/prompts/youtube-growth`, `/prompts/bangla-writing`, `/prompts/productivity`, `/blog/chatgpt-bangla-prompt`, `/404`.

### 2. `src/App.tsx` — register `/404` route
Add `<Route path="/404" element={<NotFound />} />` so the prerender step produces `dist/404/index.html` with the correct `noindex` head.

### 3. `scripts/post-build.mjs` (new) + `package.json`
After `vite build`, copy `dist/404/index.html` → `dist/404.html`. Vercel auto-serves a root `404.html` with HTTP 404 for unmatched paths. Wire via `"postbuild"` script.

### 4. `vercel.json`
Remove the `/sitemap.xml` → Supabase Edge Function rewrite so our new static `public/sitemap.xml` is served directly. Keep `/sitemap-pages.xml`, `/sitemap-categories.xml`, `/sitemap-prompts-:page.xml` rewrites (those still proxy useful per-prompt subsitemaps).

### 5. `public/sitemap.xml` — replace with audit's static sitemap
Deploy the 46-URL static sitemap (audit's 52 minus the 6 skipped new pages). The existing `scripts/generate-sitemap.mjs` already refreshes `<lastmod>` and appends one `<url>` per published prompt — both behaviors are preserved.

## Technical Notes

- `og:locale` and `hreflang` are **already correct** in `index.html` and `SEOHead.tsx` — no change needed for Fix C beyond the new sitemap.
- The `/prompts/<slug>` cluster pages all resolve to the existing `PromptCategory.tsx` dynamic route — prerender will render the static shell for each slug.
- 6 keyword-gap landing pages from the audit are **deliberately not added** (per your decision); they can be built later without re-touching this scaffolding.
- Audit's Medium-priority `CollectionPage`/`ItemList` schema (Fix D) and blog cluster build-out (M2) are **out of scope** for this pass.

## Acceptance checks (after publish)

```bash
# A) Each money page has its own canonical (no longer the homepage)
for r in image-generation-prompts video-generation-prompts facebook-post-prompts \
         ad-copy-prompts ssc-exam-prompts freelancer-prompts blog/chatgpt-bangla-prompt; do
  echo "== /$r =="
  curl -s "https://bdprompt.com/$r" | grep -o 'rel="canonical" href="[^"]*"' | head -1
done

# B) Unknown URLs return HTTP 404
curl -sI https://bdprompt.com/this-does-not-exist-xyz | grep -i "^HTTP"
```
