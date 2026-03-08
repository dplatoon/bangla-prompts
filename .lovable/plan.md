

# BdPrompt.com — Full Pre-Deployment Audit Report

## EXECUTIVE SUMMARY

- **Engineering Health Score:** 78/100
- **Production Readiness:** Needs Work
- **One-Paragraph Assessment:** The project is a well-structured React SPA with strong security fundamentals — proper RLS policies, JWT-based auth, rate limiting, and prompt injection defense. The codebase is clean, well-organized, and follows consistent patterns. However, there are several medium-severity issues that should be addressed before a major production push: missing fetch timeouts in edge functions, unsanitized search input in Supabase queries, no test coverage, and the fundamental SPA/SSR limitation for SEO. No stop-ship critical issues were found.

### Top 10 Risks (Ranked by Impact)

1. **No fetch timeouts on external API calls** - Severity: High - Files: All 5 edge functions - Impact: Functions can hang indefinitely if OpenAI/Stripe/Lovable AI APIs are slow
2. **Unsanitized search input in ilike query** - Severity: High - File: `src/hooks/usePrompts.ts:164` - Impact: Special Postgres characters (`%`, `_`) in search could cause unexpected query behavior
3. **No statement_timeout on database functions** - Severity: Medium - All 10 DB functions - Impact: Heavy queries could exhaust DB connection pool
4. **Zero test coverage** - Severity: Medium - Entire project - Impact: Regressions undetectable, risky deployments
5. **SPA renders client-side only** - Severity: Medium - `index.html` + all pages - Impact: SEO crawlers rely on hidden seo-fallback div; JS-rendered content may not be fully indexed
6. **create-checkout queries `prompts` table with anon key** - Severity: Medium - `supabase/functions/create-checkout/index.ts:69-73` - Impact: Query uses user JWT against admin-only RLS table, will fail for non-admin users
7. **og-image function has wildcard CORS** - Severity: Low - `supabase/functions/og-image/index.ts:4` - Impact: Minor, SVG images are not sensitive data
8. **sitemap function has wildcard CORS** - Severity: Low - `supabase/functions/sitemap/index.ts:4` - Impact: Minor, sitemaps are public data
9. **CSP allows `unsafe-eval`** - Severity: Low - `vercel.json:55` - Impact: Reduces XSS defense; needed for Vite dev but could be tightened for production
10. **No React.StrictMode** - Severity: Low - `src/main.tsx` - Impact: Won't catch double-render issues in development

---

## DETAILED FINDINGS

### Section 1: Repository Structure & Architecture

**Total Issues: 1 | Critical: 0 | High: 0 | Medium: 0 | Low: 1**

Architecture is well-organized with clear separation:
- `src/pages/` — 32 route pages
- `src/components/` — reusable UI + admin/playground/profile sub-groups
- `src/hooks/` — 9 custom hooks for auth, data, admin, PWA
- `src/config/` — centralized metadata
- `supabase/functions/` — 7 edge functions
- State management via React Query + local state (appropriate for this app size)

**Issue 1.1: Duplicated CORS configuration across edge functions**
- **Severity:** Low
- **Location:** All 5 JWT-verified edge functions
- **Evidence:** Identical `ALLOWED_ORIGINS` array and `getCorsHeaders` function duplicated in `chat/index.ts`, `create-checkout/index.ts`, `generate-prompt/index.ts`, `suggest-prompt/index.ts`, `stripe-webhook/index.ts`
- **Impact:** Maintenance burden — adding a new domain requires editing 5 files
- **Fix:** Extract into a shared `_shared/cors.ts` module imported by all functions

---

### Section 2: Performance Optimization

**Total Issues: 2 | Critical: 0 | High: 0 | Medium: 1 | Low: 1**

**Strengths already in place:**
- Code splitting via React.lazy for 20+ lazy routes
- React Query with 5min stale/30min GC
- PWA with aggressive caching (fonts, images, API)
- Manual chunking for vendor splits
- Lazy image loading via IntersectionObserver
- Font preloading with `font-display: swap`
- DNS-prefetch and preconnect for Google Fonts/GTM

**Issue 2.1: Google Analytics script is render-blocking**
- **Severity:** Medium
- **Location:** `index.html:8-14`
- **Evidence:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HGF89GHXW4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-HGF89GHXW4');
</script>
```
- **Impact:** The inline `<script>` block in `<head>` is parser-blocking. The `async` on gtag.js helps but the inline config still blocks.
- **Fix:** Move inline GA config to end of `<body>` or defer initialization until after page load.

**Issue 2.2: Preloading og-image.webp may be unnecessary**
- **Severity:** Low
- **Location:** `index.html:89-90`
- **Evidence:** `<link rel="preload" as="image" href="/og-image.webp" type="image/webp" />`
- **Impact:** OG images are only used by social crawlers, not visible to users. Preloading wastes bandwidth on every page load.
- **Fix:** Remove preload for OG images.

---

### Section 3: Security Hardening

**Total Issues: 5 | Critical: 0 | High: 2 | Medium: 2 | Low: 1**

**Strengths already in place:**
- All 7 tables have proper RLS policies
- SECURITY DEFINER functions with `search_path = public`
- JWT-based auth (inherent CSRF protection)
- Prompt injection regex defense in 3 edge functions
- Stripe webhook signature verification enforced
- Purchase records only insertable via service role
- Audit logging on prompts/categories changes
- Rate limiting on all AI edge functions
- Conditional error logging (dev-only)
- Checkout URL domain validation (Stripe only)
- Security headers via vercel.json (HSTS, X-Frame-Options, CSP, etc.)

**Issue 3.1: No fetch timeouts on external API calls in edge functions**
- **Severity:** High
- **Location:** `supabase/functions/chat/index.ts:150`, `generate-prompt/index.ts:134`, `suggest-prompt/index.ts:131`, `create-checkout/index.ts:136`
- **Evidence:**
```typescript
// chat/index.ts:150 — no timeout
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  // ... no AbortController
});
```
- **Impact:** If OpenAI/Stripe APIs are slow or hang, edge functions will run until Deno's default timeout (potentially 150s+), exhausting function execution slots and degrading service for all users.
- **Fix:** Add AbortController with 30s timeout to all external fetch calls:
```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 30000);
try {
  const response = await fetch(url, { ...options, signal: controller.signal });
} finally {
  clearTimeout(timeout);
}
```

**Issue 3.2: Unsanitized search input passed to Supabase ilike**
- **Severity:** High
- **Location:** `src/hooks/usePrompts.ts:164`
- **Evidence:**
```typescript
query = query.or(`title_bn.ilike.%${options.search}%,title_en.ilike.%${options.search}%,...`);
```
- **Impact:** Postgres `ILIKE` treats `%` and `_` as wildcards. A user searching for `%` or `_` gets unintended results. While not SQL injection (Supabase parameterizes), it's a logic flaw. Malicious patterns like `%%%%` could also cause slow queries.
- **Fix:** Escape special Postgres LIKE characters before passing to query:
```typescript
const escapedSearch = options.search.replace(/[%_\\]/g, '\\$&');
query = query.or(`title_bn.ilike.%${escapedSearch}%,...`);
```

**Issue 3.3: create-checkout queries admin-only `prompts` table**
- **Severity:** Medium
- **Location:** `supabase/functions/create-checkout/index.ts:69-73`
- **Evidence:**
```typescript
const { data: prompt, error: promptError } = await supabase
  .from("prompts")
  .select("id, title_bn, title_en, price, is_free, is_published")
  .eq("id", promptId)
  .single();
```
- **Impact:** This uses the user's JWT (anon key + user auth header), but the `prompts` table RLS only allows SELECT for admins (`is_admin()`). Non-admin users trying to purchase will get "Prompt not found" because the query returns nothing.
- **Fix:** Either use `prompts_public` view, or use a service role client for this read, or create a SECURITY DEFINER function that returns prompt metadata for checkout.

**Issue 3.4: No statement_timeout on database functions**
- **Severity:** Medium
- **Location:** All 10 database functions (e.g., `get_public_prompts`, `check_rate_limit`, `get_prompt_template`)
- **Evidence:** Functions have `SET search_path = public` but no `SET statement_timeout`
- **Impact:** A malformed or heavy query could hold a connection for too long, affecting other users.
- **Fix:** Add `SET statement_timeout = '5s'` to each function definition.

**Issue 3.5: CSP includes `unsafe-eval`**
- **Severity:** Low
- **Location:** `vercel.json:55`
- **Evidence:** `script-src 'self' 'unsafe-inline' 'unsafe-eval' ...`
- **Impact:** `unsafe-eval` weakens XSS protections. Needed during Vite dev mode but shouldn't be needed in production builds.
- **Fix:** Remove `unsafe-eval` from production CSP if the app works without it. Test after removal.

---

### Section 4: SEO Optimization

**Total Issues: 1 | Critical: 0 | High: 0 | Medium: 1 | Low: 0**

**Strengths already in place:**
- Centralized `pageMetadata.ts` with unique bilingual titles/descriptions for 30+ routes
- Dynamic SEOHead component with canonical, OG, Twitter Card, structured data
- Multiple JSON-LD schemas (Organization, WebSite, SoftwareApplication, BreadcrumbList, HowTo, Product)
- Dynamic XML sitemap via edge function (paginated, with categories)
- Static fallback sitemap in `public/sitemap.xml`
- SEO-fallback div in `index.html` with semantic H1, nav, content for crawlers
- `<noscript>` styling for JS-disabled crawlers
- robots.txt properly configured with user-agent-specific rules
- Breadcrumb component with JSON-LD
- Hreflang alternate language tags

**Issue 4.1: SPA client-side rendering limitation**
- **Severity:** Medium
- **Location:** Architectural (entire app)
- **Evidence:** The app is a Vite React SPA. The `seo-fallback` div in `index.html` provides static content for crawlers, but page-specific content (prompt lists, details) renders only via JavaScript.
- **Impact:** Google claims to render JS well, but other search engines (Bing, Yandex) and social crawlers may not. The seo-fallback partially mitigates this for the homepage but not for category/detail pages.
- **Fix:** This is an architectural limitation of Vite SPA. The current mitigation (seo-fallback + structured data + dynamic sitemap) is the best possible within the current stack. A full fix would require migrating to a framework with SSR (Next.js), which is outside Lovable's React+Vite stack.

---

### Section 5: Code Quality & Maintainability

**Total Issues: 2 | Critical: 0 | High: 0 | Medium: 1 | Low: 1**

**Strengths:**
- Consistent PascalCase components, camelCase functions/variables
- TypeScript throughout with well-defined interfaces
- Clean hook abstractions (useAuth, useAdmin, usePrompts, usePurchase)
- ErrorBoundary with dev-only error details
- Conditional console logging (dev-only)

**Issue 5.1: Zero test coverage**
- **Severity:** Medium
- **Location:** Entire project (no test files found)
- **Impact:** No automated regression detection. Critical paths (auth, purchase, admin operations) are untested. Any code change risks breaking existing functionality silently.
- **Fix:** Prioritize tests for: (1) Edge functions (unit tests), (2) usePurchase hook (payment flow), (3) useAdmin hook (role verification), (4) Auth page (login/signup). Use Vitest (already compatible with Vite).

**Issue 5.2: `any` type usage in usePrompts**
- **Severity:** Low
- **Location:** `src/hooks/usePrompts.ts:91`
- **Evidence:** `const attachCategories = async (prompts: any[]): Promise<Prompt[]> =>`
- **Impact:** Loses type safety for database query results.
- **Fix:** Replace `any[]` with a proper type matching the `prompts_public` view columns.

---

### Section 6: User Experience & Accessibility

**Total Issues: 1 | Critical: 0 | High: 0 | Medium: 0 | Low: 1**

**Strengths:**
- Responsive design with mobile-first breakpoints
- Mobile hamburger menu with all navigation items
- Proper form labels associated with inputs (Auth page)
- Loading states for async operations (Loader2 spinners)
- Toast notifications for success/error states
- `aria-label` on breadcrumb navigation
- Keyboard-accessible dropdown menus (Radix UI)
- `role="main"` on main content area

**Issue 6.1: `dangerouslySetInnerHTML` used for structured data**
- **Severity:** Low
- **Location:** `src/components/FAQ.tsx:95`, `src/components/Breadcrumbs.tsx:53`
- **Evidence:** `dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}`
- **Impact:** Safe in this case since `JSON.stringify` on developer-controlled objects won't produce executable HTML. No user input flows into these schemas. No actual XSS risk.
- **Fix:** None needed — this is the standard React pattern for injecting JSON-LD.

---

### Section 7: Business Logic & Functionality

**Total Issues: 1 | Critical: 0 | High: 0 | Medium: 1 | Low: 0**

**Issue 7.1: create-checkout RLS conflict (duplicate of 3.3)**
- **Severity:** Medium
- **Location:** `supabase/functions/create-checkout/index.ts:69-73`
- **Impact:** Non-admin users cannot complete purchases because the checkout function queries the `prompts` table (which has admin-only SELECT RLS) using the user's JWT. The query will return null, and the function will respond with "Prompt not found" — effectively **breaking the purchase flow for all non-admin users**.
- **Fix:** Change to query `prompts_public` view instead, or use service role for this specific read.

---

## IMPLEMENTATION PRIORITY

### Week 1 — Ship-Blocking Fixes
1. **Fix create-checkout RLS conflict** (Issue 3.3/7.1) — Purchase flow is broken for non-admin users
2. **Add fetch timeouts to edge functions** (Issue 3.1) — Prevent function hangs
3. **Sanitize search input** (Issue 3.2) — Prevent query logic flaws

### Week 2 — Hardening
4. **Add statement_timeout to DB functions** (Issue 3.4)
5. **Move GA script to body end** (Issue 2.1)
6. **Remove og-image preload** (Issue 2.2)
7. **Tighten CSP** (Issue 3.5)

### Ongoing
8. **Add test coverage** (Issue 5.1)
9. **Extract shared CORS module** (Issue 1.1)
10. **Type-safe Supabase queries** (Issue 5.2)

