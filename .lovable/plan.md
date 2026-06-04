## New Page: YouTube Script AI Prompts

Add a new route `/youtube-script-prompts` with a self-contained, bilingual landing page following the detailed spec provided.

### Route & file structure
- New page: `src/pages/YoutubeScriptPrompts.tsx` (default export, React + hooks + Tailwind only)
- Register route in `src/App.tsx` with lazy import, alongside existing pages
- Add SEO metadata entry in `src/config/pageMetadata.ts` for `/youtube-script-prompts` (Bangla + English title/description) so the existing `SEOHead` component picks it up with self-referencing canonical
- Add the URL to `src/config/prerenderRoutes.ts` and `scripts/generate-sitemap.mjs` so it ships in the sitemap and prerender list
- Add a footer/nav-friendly internal link from `Header.tsx` (or at least Footer) so the page isn't an orphan

### Page sections (single component, top-to-bottom)
1. **Nav bar** — BdPrompt logo + BETA chip, links (Explore, Prompts, Guide, Packs hidden on mobile), amber CTA "বিনামূল্যে শুরু করুন" linking to `/auth`
2. **Hero** — teal gradient bg, pulsing live badge ("১,৮৯০+ বাংলাদেশি YouTuber ব্যবহার করছেন"), H1 "YouTube Script লেখার বাংলা AI Prompt", subhead, two CTAs (scroll to prompts / link to `/playground`), 4-check trust bar
3. **Stats bar** — white, 4 stats (6+ prompts, 13K+ copies, 4.9★, 3 AI platforms)
4. **Filter + prompt grid**
   - Search input, category pills (All/Tech/Education/Vlog/Faceless/Marketing/News), AI pills (All/ChatGPT/Claude/Gemini) with amber active state
   - Local `PROMPTS` array of 6 items per spec
   - 2-col grid (1 col mobile). Each card: category + free/paid badge, EN title + BN subtitle, ★ rating + uses, AI chips, monospace preview box with gradient fade + expand toggle, "📋 Copy Prompt" (teal full-width, flips to "✅ Copied!" 2s) + "Try →" outline linking to `/playground`
   - Empty state with search icon
5. **How to use** — teal-50 bg, H2 "কীভাবে ব্যবহার করবেন?", 3 numbered cards (১/২/৩)
6. **FAQ** — 4 expandable `<details>` items in Bangla; also emit FAQPage JSON-LD inline for rich-result eligibility
7. **Bottom CTA** — teal-900 bg, H2 with "Viral YouTube Video" highlighted amber, two buttons
8. **Footer** — teal-950, copyright + "Made with 💚 in Bangladesh"

### State (single component)
`selectedCategory`, `selectedAI`, `searchQuery`, `copiedId` (2s timeout reset), `expandedPromptId`. Real-time filter combining all three. `navigator.clipboard.writeText` for copy.

### Styling decisions
- Use Tailwind utility classes directly with the literal palette in the spec (teal-900/950, amber-400, gray-50). This page is intentionally a standalone landing-style page outside the shared design-token system, per the spec ("Tailwind CSS only, no custom CSS"). All other site pages remain on semantic tokens.
- Font: rely on Tailwind defaults (system sans). Bangla text inherits Noto Sans Bengali via global CSS.
- Fully responsive: 1-col grids on mobile, 2-col on `md:`, nav links hidden under `md:`.

### SEO
- `SEOHead` (existing component) added at top with route-specific title/description from `pageMetadata.ts` → self-referencing canonical handled automatically
- FAQPage JSON-LD injected via `<script type="application/ld+json">` in the FAQ section
- Single H1, semantic H2s per section, descriptive alt text where icons are decorative (use `aria-hidden`)

### Out of scope
- No DB integration; prompt data is a local array per spec ("Replace prompt text… after generation")
- No analytics wiring on copy button beyond local state (spec lists it as a post-generation step)
- No changes to existing pages beyond adding the route, metadata entry, sitemap entry, and one nav/footer link

### Verification
- Build passes, route renders, filters + copy + expand all work in preview, mobile viewport check, sitemap includes new URL.
