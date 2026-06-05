## Plan: Verify GSC, Submit Sitemap, Audit & Fix Indexing

### 1. Verify the property in Google Search Console
- Call site-verification `webResource` endpoint with `verificationMethod=META` for `https://bdprompt.com/` (the meta tag is already live in `index.html`).
- If it returns 400 `failedToFindMetaTag`, confirm deploy is live and retry.

### 2. Register property + submit sitemap
- `PUT /webmasters/v3/sites/https%3A%2F%2Fbdprompt.com%2F` to add it as a Search Console property.
- `PUT /webmasters/v3/sites/https%3A%2F%2Fbdprompt.com%2F/sitemaps/https%3A%2F%2Fbdprompt.com%2Fsitemap.xml` to (re)submit the sitemap.
- `GET .../sitemaps/...` to confirm Google sees it without errors.

### 3. Run a fresh SEO scan
- Trigger `seo_chat--trigger_scan` (requires your approval) so the scanner re-evaluates after the recent meta/sitemap/hreflang fixes.
- While waiting, pull current findings with `seo_chat--list_findings` so I know the baseline.

### 4. Fix anything still blocking crawling
Based on whatever the scan + GSC sitemap report return, address the typical indexing blockers:
- **Sitemap parse errors** — if GSC flags any URL, fix the offending entry in `public/sitemap.xml`.
- **Stale `lastmod` dates** — bump to today on URLs whose pages changed recently so Google reprioritizes recrawl.
- **Canonical / duplicate-title issues** previously flagged in your CSV audit — verify `SEOHead.tsx` is mounted on each route and emits per-route canonical + unique title. If any page is missing it, add it.
- **`robots.txt`** — sanity check that no important path is disallowed (currently `/auth`, `/account`, `/profile`, `/settings`, `/checkout`, `/admin`, `/private` are blocked, which is correct).
- **404s in sitemap** — if any listed route returns 404 in the SPA, remove from sitemap.
- Mark each addressed finding fixed via `seo_chat--update_findings`.

### Out of scope (call out, don't do)
- Full SSR/prerender migration (Phase 2 of your uploaded plan) — large architectural change; needs its own approval.
- Adding new internal-link sections / H2 hierarchy (Phase 3) — content work; separate task.

### Verification
- GSC `sites` list contains `https://bdprompt.com/`.
- GSC `sitemaps` GET returns `isPending: false` with 0 errors/warnings.
- Re-run scan shows previously failing findings as passing.
