

# Master Audit Report: BdPrompt.com

After reconnecting GitHub and domain, here is a complete audit of connections, pages, security, and SEO.

---

## Status Summary

| Area | Status | Issues Found |
|------|--------|-------------|
| Publishing | OK | Site is published and public |
| Database connection | OK | Supabase queries returning data (200s) |
| Authentication | OK | Google OAuth + email/password working |
| Security (RLS) | OK | All findings previously addressed |
| Edge Functions | OK | Deployed and accessible |

---

## Issues Found

### 1. FAKE AggregateRating STILL in index.html (CRITICAL - SEO Penalty Risk)

Lines 123-129 of `index.html` still contain fabricated review data:
```json
"aggregateRating": {
  "ratingValue": "4.9",
  "ratingCount": "1245"
}
```
This was supposed to be removed in a previous fix but is still present. Google can penalize the site for fake structured data.

**Fix**: Remove the entire `aggregateRating` block (lines 123-129) from the SoftwareApplication JSON-LD.

---

### 2. vercel.json references WRONG Supabase project (CRITICAL)

`vercel.json` sitemap rewrites point to `lazqucrttzggymmzsqvs.supabase.co` -- this is an old/different project. The current project is `oduvbhiggycaasssfdny`.

However, since Lovable hosting does not use `vercel.json` (it has built-in SPA fallback), this file is inert on Lovable. But if you ever deploy to Vercel, it will break.

**Fix**: Update all sitemap rewrite URLs in `vercel.json` from `lazqucrttzggymmzsqvs` to `oduvbhiggycaasssfdny`, OR delete `vercel.json` entirely if not deploying to Vercel.

---

### 3. supabase/config.toml has wrong project_id (MEDIUM)

`supabase/config.toml` line 1 says `project_id = "lazqucrttzggymmzsqvs"` but the actual Cloud project is `oduvbhiggycaasssfdny`. This is auto-managed by Lovable so it should not be manually edited, but it indicates a mismatch from the reconnection.

**Fix**: This file is auto-generated -- no manual action needed. Lovable Cloud manages it.

---

### 4. Missing explicit favicon link in index.html (LOW)

There is no `<link rel="icon" ...>` tag in `<head>`. The browser relies on the default `/favicon.ico` fallback. While `favicon.ico` exists, an explicit link is more reliable and allows specifying the PNG version.

**Fix**: Add `<link rel="icon" type="image/png" sizes="64x64" href="/favicon.png">` to `<head>`.

---

### 5. Duplicate OG image references (LOW - Consistency)

Line 54 of `index.html` points to a Google Storage URL for og:image:
```
https://storage.googleapis.com/gpt-engineer-file-uploads/.../social-1773901277875-OG.webp
```
But line 77 (JSON-LD) and the SEOHead component use `https://bdprompt.com/og-image.png`.

These are inconsistent. The Google Storage URL is from the old GPT Engineer era.

**Fix**: Update lines 54 and 66 to use `https://bdprompt.com/og-image.png` for consistency.

---

### 6. Old favicon.jpg still present (LOW - Cleanup)

`public/favicon.jpg` is an orphaned file not referenced anywhere.

**Fix**: Delete `public/favicon.jpg`.

---

### 7. Security Definer View linter warning (INFO - Already Addressed)

The `prompts_public` view uses SECURITY DEFINER, which triggers a linter warning. This is intentional (implements paywall logic) and already documented as an accepted pattern.

**No action needed.**

---

## Pages Audit (All 27+ Routes)

All routes in `App.tsx` are properly configured:
- Critical pages (/, /prompt/:id, /explore, /auth) are eagerly loaded
- All other pages use code splitting via `lazy()`
- SEOHead component handles dynamic meta tags per route
- `pageMetadata.ts` provides unique bilingual titles/descriptions for all routes
- Canonical URLs are auto-generated from `useLocation().pathname`

**All pages are functional.** No missing routes or broken imports detected.

---

## What Needs Fixing (4 items)

1. Remove fake `aggregateRating` from `index.html` (lines 123-129)
2. Update `vercel.json` sitemap URLs to use correct project ref (or delete the file)
3. Add explicit `<link rel="icon">` to `index.html` head
4. Replace old Google Storage OG image URLs with `https://bdprompt.com/og-image.png` (lines 54, 66)

### Optional Cleanup
5. Delete orphaned `public/favicon.jpg`

