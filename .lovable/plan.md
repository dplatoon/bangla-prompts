## Plan: SEO Re-audit Fixes (12 May 2026)

The auditor's report is partially stale — three items are already fixed in code and just need a fresh re-fetch to confirm. The remaining items split into "real code work" and "hosting-layer (out of scope for the React app)".

---

### Already done (verify with re-deploy, no code change needed)

1. **`og:locale = bn_BD`** — `index.html` line 54 already sets `bn_BD` as primary and `en_US` as alternate. `SEOHead.tsx` line 87 also writes `bn_BD` for Bangla pages. The auditor's snippet looks like a cached fetch.
2. **`/` defaults to Bangla metadata** — `index.html` `<title>`, description, and `og:title` are all Bangla; `pageMetadata['/']` returns Bangla as primary.
3. **Soft-404 noindex (interim)** — `NotFound.tsx` already passes `noindex` to `SEOHead`, which writes `<meta name="robots" content="noindex, follow">` once React mounts. This is the interim mitigation the auditor described.

No action — just republish so the live HTML reflects current code.

---

### Code fixes to ship

**1. Remove duplicate `FAQPage` JSON-LD from `index.html`** (5 min)

Two `FAQPage` schemas currently exist:
- `index.html` lines 122–153 (3 Bangla Q&As, static)
- `src/components/FAQ.tsx` lines 71–96 (6 Q&As, language-aware, matches visible content)

Keep the inline `FAQ.tsx` one (it matches visible content and is bilingual), delete the static one in `index.html`.

**2. Per-URL sitemap `<lastmod>` from database** (optional, ~1–2 hrs)

Currently `scripts/generate-sitemap.mjs` writes today's date to every URL. Better: fetch `updated_at` per prompt/category from the database and write per-row `<lastmod>`. Approach:

- Extend `generate-sitemap.mjs` to read `VITE_SUPABASE_URL` + anon key from `.env`
- Fetch `prompts.updated_at` and `prompt_packs.updated_at` via the public REST API
- Map each known route in `public/sitemap.xml` to the most recent matching `updated_at` (e.g., `/explore/business` → max `updated_at` of business-category prompts; static pages keep today's date)
- Write per-URL `<lastmod>` values

This is the only meaningful SEO improvement still gated on actual work.

---

### Out of scope (Lovable hosting layer — cannot be changed from the codebase)

These items in the audit require infrastructure config that Lovable hosting manages automatically:

- **True 404 status code for unknown routes** — Lovable's SPA fallback always returns `index.html` with HTTP 200. The interim React-side `noindex` (already shipped) is the best the app can do.
- **`Cache-Control: stale-while-revalidate` on HTML** — Set by Lovable's CDN, not the app.
- **Per-URL response headers** — Same.

I'll mention these in the closing note so the user knows they're not forgotten, just not fixable from React.

---

### Files touched

- `index.html` — delete the static `<script type="application/ld+json">` FAQPage block (lines 122–153)
- `scripts/generate-sitemap.mjs` — extend to fetch `updated_at` per URL (only if user wants the sitemap improvement now)

### Validation

After publish:
- `curl -s https://bdprompt.com/ | grep -c '"@type": "FAQPage"'` → should be `0` (the one in `<head>`); FAQ schema only appears once React renders the FAQ section
- `curl -s https://bdprompt.com/ | grep 'og:locale'` → should show `bn_BD` then `en_US:alternate`
- `curl -s -o /dev/null -w "%{http_code}" https://bdprompt.com/this-does-not-exist-xyz` — will still be 200 (hosting), but the noindex meta will appear after JS runs

---

### Question before I implement

The duplicate FAQPage removal is unambiguous. The per-URL sitemap is half a day of work and requires a DB read at build time. Want me to:

(A) Just remove the duplicate FAQ schema (5 min, ships the only real outstanding code fix), **or**
(B) Do both — remove duplicate FAQ schema **and** wire sitemap `<lastmod>` to per-URL `updated_at` from the database?