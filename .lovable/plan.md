## Fixes to apply

Two outstanding items from yesterday's audit, in priority order.

### 1. Connect Google Search Console (resolves the only failing scan finding)

- Trigger the connector picker for `google_search_console` so you can authorize the OAuth flow inline.
- Once connected, request a META verification token for `https://bdprompt.com/` via the Site Verification API.
- Add the returned `<meta name="google-site-verification" content="..." />` tag to `index.html` `<head>`.
- After redeploy, call the verify endpoint, then `PUT` the site to add it as a Search Console property.
- Submit `https://bdprompt.com/sitemap.xml` through the Search Console API.
- Mark the `gsc:gsc` SEO finding as fixed.

### 2. Remove unsupported `?lang=en` hreflang alternates from `public/sitemap.xml`

The app stores language client-side (localStorage). `?lang=en` URLs don't actually render English server-side, so Google treats them as duplicates of the Bengali page and may emit hreflang-return errors.

- Strip every `<xhtml:link rel="alternate" hreflang="en" href="...?lang=en" />` line from `public/sitemap.xml`.
- Keep the `hreflang="bn"` and `hreflang="x-default"` alternates (both point at the real URL).
- Leave the `xmlns:xhtml` declaration in place — still used by remaining alternates.

### Out of scope (for later)

- Building real `?lang=en` SSR routes (large change; defer until you actually want English pages indexed separately).
- Migrating `YoutubeScriptPrompts.tsx` from literal Tailwind colors to semantic tokens (cosmetic, page works fine).

### Verification

- After GSC connect: confirm the site shows up in `/webmasters/v3/sites` listing and that verify returned 200.
- After sitemap edit: grep `public/sitemap.xml` for `lang=en` → should return zero matches.