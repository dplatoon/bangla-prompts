# Gap plan check — what's fixed, what isn't

I checked the uploaded plan against the current project and the database.

## Already done (Sprint 3 — SEO)

- `/prompt/*` pages are prerendered at build time with unique title, description, self-canonical and OG (64 routes from the DB).
- Sitemap generator pulls every published prompt with real `lastmod`; 111 URLs.
- Real 404: `/404` prerendered and copied to `dist/404.html`, `NotFound` is noindex.
- `og:locale` = `bn_BD`, per-page `hreflang` (`bn` + `x-default`) self-references.
- Footer duplicate block removed, copyright year is dynamic.
- JSON-LD: Organization, WebSite+SearchAction, FAQPage, BreadcrumbList.

## Not done — Sprint 1 (credibility)

Database truth: **64 published prompts, 62 free, 2 paid.** The site claims 500+, 80+, 60+, 1k+ users, 500+ creators, ৳20L+ revenue.

1. **One source of truth for counts.** Add `src/config/siteStats.ts` exporting `promptCount` (60, rounded down from the build-time fetch already stored in `generated-prompt-routes.json`) plus Bangla-digit helper. Replace every hardcoded "500+/৫০০+/80+/60+" in: `Hero`, `PromptCategoryLinks`, `CTA`, `FAQ`, `Explore`, `Guide`, `Product`, `PromptPacks`, `Community`, `BlogPostChatGPTBanglaPrompt`, `pageMetadata.ts`, `Index.tsx`, `index.html` (title, description, JSON-LD, noscript fallback).
2. **Remove unverifiable figures**: "1k+ Active Users" (Hero stats), "500+ Active Creators" and "৳20L+ Total Revenue" (`CTA.tsx`, `BecomeCreator.tsx`), inflated community numbers (`Community.tsx`). Replace with honest signals (categories count, free-prompt count, "নতুন — বাংলাদেশে তৈরি").
3. **Remove keyword search volumes** ("14k–28k/mo" etc.) from the seven category cards in `PromptCategoryLinks.tsx` — keep them as code comments only.
4. **Rewrite the "#১ platform" FAQ item** (bn + en) into a real user question about using prompts across ChatGPT/Claude/Gemini, and drop "সবচেয়ে বড়" from `index.html` JSON-LD descriptions and `pageMetadata.ts`.
5. **Free-vs-paid honesty**: hero says 100% free while 2 prompts are paid. Reword to "৬০+ ফ্রি বাংলা প্রম্পট — সাইনআপ ছাড়াই কপি করুন" and make the price badge on `PromptCard` as prominent as the Free badge.

## Not done — Sprint 2 (navigation)

6. **Homepage search bar** in the hero, Bangla placeholder, routes to `/explore?q=`; `Explore` reads `q` from the URL on mount so the existing SearchAction JSON-LD becomes truthful.
7. **Audience entry points** — four chips under the hero (শিক্ষার্থী / ফ্রিল্যান্সার / ব্যবসা / কন্টেন্ট ক্রিয়েটর) linking to existing filtered routes.
8. **Curate "Most Copied"** so it mixes education/content/business/code instead of showing six coding prompts in a row.
9. **Trim competing CTAs** on the homepage: one primary (search/explore), one secondary (playground); move creator + newsletter lower.

## Not doing now

- Sprint 2.3 (Bangla prompt titles) — `titleBn` already exists in the data model and is displayed; the gap is content, i.e. filling it in for prompts that still carry English titles. Separate content task.
- Sprint 4 (per-prompt depth: usage notes, example I/O, model notes, variations) — needs new DB columns and written content; a bigger separate project.

## Technical notes

- Prompt count comes from `src/config/generated-prompt-routes.json`, already written at prebuild by `scripts/fetch-prompt-routes.mjs`, so the number stays in sync without a runtime query and is baked into the prerendered HTML.
- Metadata text changes must go through `pageMetadata.ts` / page-level `SEOHead` props so prerender picks them up; `index.html` only carries the sitewide fallback.
- After these changes the site needs a publish + sitemap resubmit for the new titles/descriptions to appear in search.
