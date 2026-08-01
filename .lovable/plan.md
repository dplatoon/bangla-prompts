# SEO Fix Pack — what actually still needs doing

I compared the uploaded fix pack (7 files) against the current project. Most of it is already implemented. Two real gaps remain, plus verification.

## Already done (no action needed)

- **Sitemap with prompt pages** (pack 02): `scripts/generate-sitemap.mjs` already fetches all published prompts from the backend and appends `/prompt/{slug}` entries with real `lastmod`, wired into `prebuild`.
- **og:locale** (pack 03): `index.html` already sets `bn_BD` with an `en_US` alternate, and `SEOHead` keeps it correct per page.
- **hreflang** (pack 03): `bn` + `x-default` self-references per page — the correct choice, since EN is a client-side toggle with no separate URLs.
- **JSON-LD** (pack 05): Organization / WebSite / SearchAction in `index.html`, FAQPage from the FAQ component, breadcrumbs via `SEOHead`.
- **robots.txt** (pack 06): matches the reference and covers more bots.
- **Custom 404** (pack 07): `/404` is prerendered and `scripts/post-build.mjs` copies it to `dist/404.html`; `NotFound` is `noindex`.

## Gap 1 — `/prompt/*` pages are not prerendered (the P0 issue)

`src/config/prerenderRoutes.ts` is a static list of marketing routes only. Prompt detail pages are absent, so crawlers get the homepage shell with the homepage canonical.

Fix: make the prerender route list dynamic at build time.

- Add a small build script that calls the same public prompts source the sitemap uses and writes the slug list to a generated JSON file.
- Have `vite.config.ts` read that file and concat `/prompt/{slug}` onto `prerenderRoutes` before handing them to the prerender plugin.
- If the fetch fails, fall back to the static list only, so the build never breaks.
- Build-time cost: with ~64 prompts at `renderAfterTime: 1500` and 4 concurrent, roughly a minute extra. If the catalog grows past a few hundred, we lower the wait for prompt routes.

`PromptDetail` already emits a correct self-canonical, unique title/description and prompt structured data, so prerendering alone bakes all of that into static HTML.

## Gap 2 — duplicate footer block and conflicting copyright year

The static fallback block in `index.html` carries `© 2026 BD Prompt.` plus a duplicated Bangla marketing paragraph, while `src/components/Footer.tsx` renders `© 2025 / © ২০২৫ BD Prompt by Start BD`. Both end up in the served HTML.

Fix:
- Trim the static fallback block to a short JavaScript-required notice plus the nav links crawlers benefit from; drop the duplicated marketing paragraph and the hardcoded `© 2026` line.
- Make the React footer year dynamic in both the bn and en strings so it never goes stale.

## Not doing

- **Repo access (P2-2)** — a GitHub setting outside this project.
- **Slug standardization** (`-bn` suffix vs plain) — would change live URLs and break indexed links; only worth doing with redirects, as a separate decision.
- **Product/AggregateRating schema** — the displayed ratings aren't verified data.

## Verification after publish

Curl two `/prompt/<slug>` URLs and confirm each `<title>` and canonical self-references, and confirm an unknown URL returns HTTP 404.
