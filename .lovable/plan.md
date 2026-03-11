

# Fix Plan: SEO & Configuration Cleanup

Here's my analysis of each suggestion and what actually needs fixing:

## What we WILL fix (4 changes)

### 1. Remove fake AggregateRating from JSON-LD (High Priority)
Google can penalize sites for fabricated review data. The hardcoded `"ratingValue": "4.8", "ratingCount": "150"` in the SoftwareApplication schema must be removed since there's no real review system.

**File:** `index.html` — Remove the `aggregateRating` block from the SoftwareApplication JSON-LD (lines 141-145).

### 2. Fix Organization logo URL (Medium)
Change `favicon.jpg` to `og-image.png` in the Organization JSON-LD since `og-image.png` exists in `public/` and is a proper logo.

**File:** `index.html` — Update line with `"logo": "https://bdprompt.com/favicon.jpg"` → `"logo": "https://bdprompt.com/og-image.png"`

### 3. Remove duplicate apple-touch-icon (Minor)
There are two `<link rel="apple-touch-icon">` tags (one without size, one with `sizes="180x180"`). Keep only the sized one.

**File:** `index.html` — Remove the first bare `<link rel="apple-touch-icon" href="/favicon.png" />` (around line 83), keep the `sizes="180x180"` one.

### 4. Delete unused lockfiles (Minor)
Remove `bun.lock` and `bun.lockb` — the project uses npm.

**Files:** Delete `bun.lock` and `bun.lockb`.

## What we will NOT change (and why)

- **`public/_redirects`**: Lovable's CDN already handles SPA routing. Not needed.
- **`vite.config.ts` define block**: This is an intentional fallback documented in project memory to prevent blank screens when env injection fails. The values are the **anon (public) key**, not a secret. Removing it would break the preview.
- **SEO fallback div**: This is an intentional architecture decision (documented in project memory) to help crawlers index content before React hydrates. The `<noscript>` block already makes it visible when JS is off. This is working as designed.

