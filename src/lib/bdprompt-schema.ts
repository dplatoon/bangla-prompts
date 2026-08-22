/**
 * bdprompt.com — production JSON-LD graph builders
 * ------------------------------------------------
 * Drop into src/lib/bdprompt-schema.ts
 *
 * Design rules enforced here:
 *  1. ONE <script type="application/ld+json"> per page, containing ONE @graph.
 *  2. Every reusable node has a stable @id so it consolidates across all 47 routes.
 *  3. No aggregateRating unless it comes from real user data (see RATINGS note).
 *  4. Prompts are CreativeWork (free) or Product (paid) — never SoftwareApplication.
 *  5. All Offer.price values are STRINGS.
 *  6. All timestamps are ISO 8601 with Asia/Dhaka offset (+06:00).
 *
 * Usage in SEOHead.tsx:
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
 *   />
 */

export const SITE = "https://bdprompt.com";

export const ID = {
  org: `${SITE}/#organization`,
  website: `${SITE}/#website`,
  logo: `${SITE}/#logo`,
  founder: `${SITE}/#founder`,
} as const;

const webpageId = (path: string) => `${SITE}${path}#webpage`;
const breadcrumbId = (path: string) => `${SITE}${path}#breadcrumb`;
const abs = (path: string) => `${SITE}${path}`;

/** ISO 8601 in Asia/Dhaka. Pass a Date or an ISO string. */
export function bdTime(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  const dhaka = new Date(date.getTime() + 6 * 3600 * 1000);
  return dhaka.toISOString().replace(/\.\d{3}Z$/, "+06:00");
}

/* ------------------------------------------------------------------ */
/* CORE NODES — identical on every page, referenced everywhere by @id  */
/* ------------------------------------------------------------------ */

/**
 * ACTION REQUIRED before shipping:
 *  - Replace /logo-512.png with a real square logo (min 112x112, 512 recommended).
 *    Do NOT reuse og-image.png — a 1200x630 social card is not a logo.
 *  - Verify every sameAs URL resolves and is genuinely yours. Delete any that 404.
 *    An unverified sameAs is a false-identity signal and devalues the whole entity.
 */
export const organizationNode = {
  "@type": "Organization",
  "@id": ID.org,
  name: "BdPrompt",
  alternateName: ["বিডি প্রম্পট", "BD Prompt"],
  url: SITE,
  logo: { "@id": ID.logo },
  image: { "@id": ID.logo },
  description:
    "বাংলা AI প্রম্পট হাব — শিক্ষা, ফ্রিল্যান্সিং, ব্যবসা এবং মার্কেটিং-এর জন্য ৬০+ ChatGPT, Claude ও Gemini প্রম্পট।",
  email: "hello@bdprompt.com",
  foundingDate: "2025",
  areaServed: { "@type": "Country", name: "Bangladesh" },
  knowsLanguage: ["bn", "en"],
  sameAs: [
    // VERIFY EACH — remove any that do not resolve to a profile you control.
    "https://www.facebook.com/bdprompt",
    "https://www.linkedin.com/in/tawhid03",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@bdprompt.com",
    contactType: "customer support",
    availableLanguage: ["Bengali", "English"],
    areaServed: "BD",
  },
};

export const logoNode = {
  "@type": "ImageObject",
  "@id": ID.logo,
  url: `${SITE}/logo-512.png`,
  contentUrl: `${SITE}/logo-512.png`,
  width: 512,
  height: 512,
  caption: "BdPrompt",
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": ID.website,
  name: "BdPrompt",
  alternateName: "বিডি প্রম্পট — বাংলা AI প্রম্পট হাব",
  url: SITE,
  description:
    "বাংলা প্রম্পট টেমপ্লেট — কন্টেন্ট, ইমেজ, কোড, মার্কেটিং, শিক্ষা। ৬০+ AI প্রম্পট এক ক্লিকে কপি করে ChatGPT, Claude ও Gemini-তে ব্যবহার করুন।",
  publisher: { "@id": ID.org },
  inLanguage: "bn",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE}/explore?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/** Optional but recommended — strengthens E-E-A-T on Article pages. */
export const founderNode = {
  "@type": "Person",
  "@id": ID.founder,
  name: "Tawhid Hasan",
  url: "https://tawhid.info",
  worksFor: { "@id": ID.org },
  knowsLanguage: ["bn", "en"],
  knowsAbout: [
    "Prompt engineering",
    "Bangla natural language processing",
    "Generative AI",
  ],
  sameAs: ["https://www.linkedin.com/in/tawhid03"],
};

/**
 * Entity grounding. Anchors your content to known knowledge-graph nodes.
 * Highest leverage / lowest effort item for AI Overviews + AI Mode.
 */
export const AI_ENTITIES = [
  {
    "@type": "SoftwareApplication",
    name: "ChatGPT",
    applicationCategory: "https://schema.org/BusinessApplication",
    sameAs: ["https://en.wikipedia.org/wiki/ChatGPT"],
  },
  {
    "@type": "SoftwareApplication",
    name: "Claude",
    applicationCategory: "https://schema.org/BusinessApplication",
    sameAs: ["https://en.wikipedia.org/wiki/Claude_(language_model)"],
  },
  {
    "@type": "SoftwareApplication",
    name: "Gemini",
    applicationCategory: "https://schema.org/BusinessApplication",
    sameAs: ["https://en.wikipedia.org/wiki/Gemini_(chatbot)"],
  },
];

/* ------------------------------------------------------------------ */
/* SHARED BUILDERS                                                     */
/* ------------------------------------------------------------------ */

export interface Crumb {
  name: string;
  path: string;
}

export function buildBreadcrumb(path: string, crumbs: Crumb[]) {
  // Never emit a single-item breadcrumb — Google ignores it. (/guide currently does.)
  if (crumbs.length < 2) return null;
  return {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId(path),
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  crumbs: Crumb[];
  /** WebPage subtype: "CollectionPage" for listings, "ContactPage", etc. */
  type?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}

export function buildWebPage(meta: PageMeta) {
  const node: Record<string, unknown> = {
    "@type": meta.type ?? "WebPage",
    "@id": webpageId(meta.path),
    url: abs(meta.path),
    name: meta.title,
    description: meta.description,
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.org },
    inLanguage: "bn",
  };
  const bc = buildBreadcrumb(meta.path, meta.crumbs);
  if (bc) node.breadcrumb = { "@id": breadcrumbId(meta.path) };
  if (meta.image) {
    node.primaryImageOfPage = { "@type": "ImageObject", url: meta.image };
  }
  if (meta.datePublished) node.datePublished = bdTime(meta.datePublished);
  if (meta.dateModified) node.dateModified = bdTime(meta.dateModified);
  return node;
}

/** Wraps any page-specific nodes with the shared core. One graph, one script tag. */
export function buildGraph(meta: PageMeta, extra: unknown[] = []) {
  const bc = buildBreadcrumb(meta.path, meta.crumbs);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode,
      logoNode,
      websiteNode,
      buildWebPage(meta),
      ...(bc ? [bc] : []),
      ...extra.filter(Boolean),
    ],
  };
}

/* ------------------------------------------------------------------ */
/* PAGE TYPE 1 — HOMEPAGE                                              */
/* ------------------------------------------------------------------ */

export function buildHomeGraph(faqs: { q: string; a: string }[]) {
  const meta: PageMeta = {
    path: "/",
    title: "বাংলা AI প্রম্পট — 60+ ChatGPT ও Claude প্রম্পট | BdPrompt",
    description:
      "বাংলায় AI prompt তৈরি করুন — সম্পূর্ণ বিনামূল্যে। Students, freelancers ও businesses-এর জন্য ৬০+ ready prompts।",
    crumbs: [{ name: "হোম", path: "/" }],
  };

  // WebApplication belongs ONLY on / and /playground — the routes with a real tool.
  // It must NOT appear on /privacy, /terms, /support, /dmca (it currently does).
  const webApp = {
    "@type": "WebApplication",
    "@id": `${SITE}/#webapp`,
    name: "BdPrompt",
    url: SITE,
    applicationCategory: "https://schema.org/BusinessApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript",
    inLanguage: "bn",
    publisher: { "@id": ID.org },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BDT",
      availability: "https://schema.org/InStock",
      url: SITE,
    },
    featureList: [
      "৬০+ বাংলা AI প্রম্পট",
      "এক ক্লিকে কপি",
      "ChatGPT, Claude ও Gemini সাপোর্ট",
      "প্রম্পট প্লেগ্রাউন্ড",
    ],
    // NOTE: no aggregateRating. Do not add one until you have genuine
    // user-submitted ratings with a real count (10+). Self-issued ratings are a
    // structured-data policy violation and risk a site-wide manual action.
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE}/#faq`,
    mainEntity: faqs.map((f, i) => ({
      "@type": "Question",
      "@id": `${SITE}/#faq-${i + 1}`,
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
    isPartOf: { "@id": webpageId("/") },
    inLanguage: "bn",
  };

  return buildGraph(meta, [webApp, faqPage]);
}

/* ------------------------------------------------------------------ */
/* PAGE TYPE 2 — PROMPT DETAIL  /prompt/:slug   ← FIXES CRITICAL C1    */
/* ------------------------------------------------------------------ */

export interface PromptRecord {
  slug: string;
  title: string;
  description: string;
  body?: string;
  categorySlug: string;
  categoryName: string;
  price: number; // 0 = free
  createdAt: string;
  updatedAt: string;
  image?: string;
}

export function buildPromptDetailGraph(p: PromptRecord) {
  const path = `/prompt/${p.slug}`;
  const isPaid = p.price > 0;

  const meta: PageMeta = {
    path,
    title: `${p.title} | বাংলা AI প্রম্পট | BdPrompt`,
    description: p.description,
    crumbs: [
      { name: "হোম", path: "/" },
      { name: "এক্সপ্লোর", path: "/explore" },
      { name: p.categoryName, path: `/explore/${p.categorySlug}` },
      { name: p.title, path },
    ],
    image: p.image,
    datePublished: p.createdAt,
    dateModified: p.updatedAt,
  };

  const core: Record<string, unknown> = {
    // Free prompts are CreativeWork. Paid ones add Product so Offer is valid.
    "@type": isPaid ? ["CreativeWork", "Product"] : "CreativeWork",
    "@id": `${abs(path)}#prompt`,
    name: p.title,
    headline: p.title,
    description: p.description,
    url: abs(path),
    inLanguage: "bn",
    genre: "AI prompt template",
    learningResourceType: "Prompt template",
    educationalUse: ["Content creation", "Study aid", "Professional writing"],
    author: { "@id": ID.org },
    publisher: { "@id": ID.org },
    provider: { "@id": ID.org },
    isPartOf: { "@id": webpageId(path) },
    mainEntityOfPage: { "@id": webpageId(path) },
    datePublished: bdTime(p.createdAt),
    dateModified: bdTime(p.updatedAt),
    // Grounds the prompt against known AI-tool entities.
    mentions: AI_ENTITIES,
  };

  if (p.image) core.image = p.image;
  if (p.body) core.text = p.body;

  core.offers = {
    "@type": "Offer",
    price: String(p.price), // STRING, not number
    priceCurrency: "BDT",
    availability: "https://schema.org/InStock",
    url: abs(path),
    seller: { "@id": ID.org },
    priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
  };

  return buildGraph(meta, [core]);
}

/* ------------------------------------------------------------------ */
/* PAGE TYPE 3 — CATEGORY LISTING  /explore/:category                  */
/* ------------------------------------------------------------------ */

export function buildCategoryGraph(
  categorySlug: string,
  categoryName: string,
  description: string,
  prompts: PromptRecord[]
) {
  const path = `/explore/${categorySlug}`;

  const meta: PageMeta = {
    path,
    title: `${categoryName} প্রম্পট | বাংলা AI প্রম্পট | BdPrompt`,
    description,
    type: "CollectionPage",
    crumbs: [
      { name: "হোম", path: "/" },
      { name: "এক্সপ্লোর", path: "/explore" },
      { name: categoryName, path },
    ],
  };

  const list = {
    "@type": "ItemList",
    "@id": `${abs(path)}#itemlist`,
    name: `${categoryName} — বাংলা AI প্রম্পট`,
    description,
    numberOfItems: prompts.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    isPartOf: { "@id": webpageId(path) },
    itemListElement: prompts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(`/prompt/${p.slug}`),
      item: {
        // Was SoftwareApplication — wrong type for a text template.
        "@type": p.price > 0 ? ["CreativeWork", "Product"] : "CreativeWork",
        "@id": `${abs(`/prompt/${p.slug}`)}#prompt`,
        name: p.title,
        description: p.description,
        url: abs(`/prompt/${p.slug}`),
        inLanguage: "bn",
        learningResourceType: "Prompt template",
        offers: {
          "@type": "Offer",
          price: String(p.price),
          priceCurrency: "BDT",
          availability: "https://schema.org/InStock",
          url: abs(`/prompt/${p.slug}`),
          seller: { "@id": ID.org },
        },
        // aggregateRating deliberately omitted — see H2.
      },
    })),
  };

  return buildGraph(meta, [list]);
}

/* ------------------------------------------------------------------ */
/* PAGE TYPE 4 — PACKS  /packs   ← FIXES HIGH H4                       */
/* ------------------------------------------------------------------ */

export interface PackRecord {
  slug: string;
  name: string;
  description: string;
  price: number; // 499 | 999 | 1999 | 3999
  promptCount: number;
  image?: string;
}

export function buildPacksGraph(packs: PackRecord[]) {
  const path = "/packs";

  const meta: PageMeta = {
    path,
    title: "প্রম্পট প্যাক | কিউরেটেড কালেকশন | BdPrompt",
    description:
      "কিউরেটেড বাংলা AI প্রম্পট প্যাক — ফ্রিল্যান্সিং, ব্যবসা, শিক্ষা ও মার্কেটিং-এর জন্য।",
    type: "CollectionPage",
    crumbs: [
      { name: "হোম", path: "/" },
      { name: "প্যাক", path },
    ],
  };

  const list = {
    "@type": "ItemList",
    "@id": `${abs(path)}#packlist`,
    name: "বাংলা AI প্রম্পট প্যাক",
    numberOfItems: packs.length,
    isPartOf: { "@id": webpageId(path) },
    itemListElement: packs.map((pk, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(`/packs/${pk.slug}`),
      item: {
        "@type": "Product",
        "@id": `${abs(`/packs/${pk.slug}`)}#product`,
        name: pk.name,
        description: pk.description,
        url: abs(`/packs/${pk.slug}`),
        ...(pk.image ? { image: pk.image } : {}),
        brand: { "@id": ID.org },
        category: "AI prompt pack",
        inLanguage: "bn",
        additionalProperty: {
          "@type": "PropertyValue",
          name: "প্রম্পট সংখ্যা",
          value: pk.promptCount,
        },
        offers: {
          "@type": "Offer",
          price: String(pk.price), // "499", not 499
          priceCurrency: "BDT",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          url: abs(`/packs/${pk.slug}`),
          seller: { "@id": ID.org },
          priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
          // Digital delivery — no shipping node needed.
          acceptedPaymentMethod: [
            { "@type": "PaymentMethod", name: "bKash" },
            { "@type": "PaymentMethod", name: "Nagad" },
          ],
        },
      },
    })),
  };

  return buildGraph(meta, [list]);
}

/* ------------------------------------------------------------------ */
/* PAGE TYPE 5 — ARTICLE  /blog/:slug  and  /prompts/:slug             */
/* ------------------------------------------------------------------ */

export interface ArticleRecord {
  path: string;
  headline: string;
  description: string;
  image: string; // REQUIRED — 1200x675 min. See H3.
  datePublished: string;
  dateModified: string;
  section: string;
  keywords: string[];
  crumbs: Crumb[];
  wordCount?: number;
  /** true = named-person byline (stronger E-E-A-T), false = org byline */
  byPerson?: boolean;
}

export function buildArticleGraph(a: ArticleRecord, faqs?: { q: string; a: string }[]) {
  const meta: PageMeta = {
    path: a.path,
    title: a.headline,
    description: a.description,
    crumbs: a.crumbs,
    image: a.image,
    datePublished: a.datePublished,
    dateModified: a.dateModified,
  };

  const article: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${abs(a.path)}#article`,
    headline: a.headline, // keep under 110 chars
    description: a.description,
    url: abs(a.path),
    // image is REQUIRED for Article rich results. Multiple aspect ratios =
    // full eligibility across Search and Discover.
    image: [
      { "@type": "ImageObject", url: a.image, width: 1200, height: 675 },
    ],
    datePublished: bdTime(a.datePublished),
    dateModified: bdTime(a.dateModified), // must be a REAL edit time, not a copy of datePublished
    author: a.byPerson ? { "@id": ID.founder } : { "@id": ID.org },
    publisher: { "@id": ID.org },
    isPartOf: { "@id": webpageId(a.path) },
    mainEntityOfPage: { "@id": webpageId(a.path) },
    inLanguage: "bn",
    articleSection: a.section,
    keywords: a.keywords.join(", "),
    mentions: AI_ENTITIES,
  };
  if (a.wordCount) article.wordCount = a.wordCount;

  const nodes: unknown[] = [article];
  if (a.byPerson) nodes.push(founderNode);
  if (faqs?.length) {
    nodes.push({
      "@type": "FAQPage",
      "@id": `${abs(a.path)}#faq`,
      isPartOf: { "@id": webpageId(a.path) },
      inLanguage: "bn",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return buildGraph(meta, nodes);
}

/* ------------------------------------------------------------------ */
/* PAGE TYPE 6 — BLOG INDEX  /blog   ← FIXES MEDIUM M4                 */
/* ------------------------------------------------------------------ */

export function buildBlogIndexGraph(
  posts: { slug: string; headline: string; description: string; datePublished: string; image?: string }[]
) {
  const path = "/blog";
  const meta: PageMeta = {
    path,
    title: "ব্লগ | বাংলা AI ও প্রম্পট গাইড | BdPrompt",
    description: "বাংলা AI, প্রম্পট ইঞ্জিনিয়ারিং এবং ChatGPT ব্যবহারের গাইড ও টিউটোরিয়াল।",
    type: "CollectionPage",
    crumbs: [
      { name: "হোম", path: "/" },
      { name: "ব্লগ", path },
    ],
  };

  const blog = {
    "@type": "Blog",
    "@id": `${abs(path)}#blog`,
    name: "BdPrompt ব্লগ",
    url: abs(path),
    inLanguage: "bn",
    publisher: { "@id": ID.org },
    isPartOf: { "@id": webpageId(path) },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${abs(`/blog/${p.slug}`)}#article`,
      headline: p.headline,
      description: p.description,
      url: abs(`/blog/${p.slug}`),
      datePublished: bdTime(p.datePublished),
      author: { "@id": ID.org },
      publisher: { "@id": ID.org },
      ...(p.image ? { image: p.image } : {}),
    })),
  };

  return buildGraph(meta, [blog]);
}

/* ------------------------------------------------------------------ */
/* PAGE TYPE 7 — GUIDE  /guide   ← FIXES M3 (1-item breadcrumb) + L1/L3 */
/* ------------------------------------------------------------------ */

export interface HowToStepInput {
  name: string;
  text: string;
  example?: string;
}

export function buildGuideGraph(
  steps: HowToStepInput[],
  faqs: { q: string; a: string }[]
) {
  const path = "/guide";
  const meta: PageMeta = {
    path,
    title: "প্রম্পট ইঞ্জিনিয়ারিং গাইড ২০২৬ | ChatGPT বাংলা টিউটোরিয়াল | BdPrompt",
    description:
      "CORE মেথড ব্যবহার করে ChatGPT, Claude এবং Gemini-এর জন্য কার্যকর বাংলা প্রম্পট লিখতে শিখুন।",
    crumbs: [
      { name: "হোম", path: "/" },
      { name: "গাইড", path }, // was a single-item breadcrumb — Google ignored it
    ],
  };

  const howTo = {
    "@type": "HowTo",
    "@id": `${abs(path)}#howto`,
    name: "কীভাবে নিখুঁত AI প্রম্পট লিখবেন",
    description:
      "CORE মেথড ব্যবহার করে ChatGPT, Claude এবং অন্যান্য AI-এর জন্য কার্যকর প্রম্পট লিখুন।",
    inLanguage: "bn",
    totalTime: "PT15M",
    isPartOf: { "@id": webpageId(path) },
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${abs(path)}#step-${i + 1}`,
      // itemListElement must be an ARRAY of HowToDirection (was a bare object)
      ...(s.example
        ? { itemListElement: [{ "@type": "HowToDirection", text: s.example }] }
        : {}),
    })),
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${abs(path)}#faq`,
    isPartOf: { "@id": webpageId(path) },
    inLanguage: "bn",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Note: no nested "@context" inside these — it belongs once, at the graph root.
  return buildGraph(meta, [howTo, faqPage]);
}

/* ------------------------------------------------------------------ */
/* PAGE TYPE 8 — LEGAL / SUPPORT / STATIC                              */
/* ------------------------------------------------------------------ */

/**
 * For /privacy, /terms, /cookies, /dmca, /guidelines, /support, /community.
 * These currently emit a WebApplication node claiming a privacy policy is
 * software. This builder emits only Org + WebSite + WebPage + Breadcrumb.
 */
export function buildStaticGraph(meta: PageMeta, faqs?: { q: string; a: string }[]) {
  const extra: unknown[] = [];
  if (faqs?.length) {
    extra.push({
      "@type": "FAQPage",
      "@id": `${abs(meta.path)}#faq`,
      isPartOf: { "@id": webpageId(meta.path) },
      inLanguage: "bn",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  return buildGraph(meta, extra);
}

/* ------------------------------------------------------------------ */
/* NOT RECOMMENDED: LocalBusiness                                      */
/* ------------------------------------------------------------------ */
/**
 * The audit brief asked for LocalBusiness. Do NOT add it here.
 * BdPrompt has no premises customers visit and no local service area — a
 * LocalBusiness node with a Mymensingh address would be unverifiable markup
 * describing something that doesn't exist, which is exactly the pattern that
 * devalues an entity. The correct signals are already covered above:
 * Organization.areaServed = Bangladesh, knowsLanguage = bn, inLanguage = bn.
 *
 * Same reasoning for Service: BdPrompt distributes CreativeWork and Product,
 * not a service performed for a client. Adding Service would double-describe
 * the same offering under two conflicting types.
 */
