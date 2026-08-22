/**
 * Route helpers on top of bdprompt-schema.ts.
 * Keeps the provided graph builders untouched.
 */
import { buildGraph, type Crumb, type PageMeta, SITE, ID } from "@/lib/bdprompt-schema";

/** Bangla labels for known path segments. */
const SEGMENT_LABELS: Record<string, string> = {
  explore: "এক্সপ্লোর",
  prompt: "প্রম্পট",
  prompts: "প্রম্পট",
  packs: "প্যাক",
  blog: "ব্লগ",
  guide: "গাইড",
  playground: "প্লেগ্রাউন্ড",
  community: "কমিউনিটি",
  support: "সাপোর্ট",
  resources: "রিসোর্স",
  privacy: "প্রাইভেসি পলিসি",
  terms: "টার্মস",
  cookies: "কুকিজ",
  dmca: "DMCA",
  guidelines: "গাইডলাইন",
  legal: "লিগ্যাল",
  api: "API",
  business: "ব্যবসা",
  product: "প্রোডাক্ট",
  shikkha: "শিক্ষা",
  kobita: "কবিতা",
  profile: "প্রোফাইল",
  "become-creator": "ক্রিয়েটর হন",
  sitemap: "সাইটম্যাপ",
  auth: "লগইন",
};

const humanize = (segment: string) =>
  SEGMENT_LABELS[segment] ||
  segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/** হোম > … derived from the URL path. Single-item lists are dropped by the builder. */
export function deriveCrumbs(pathname: string): Crumb[] {
  const crumbs: Crumb[] = [{ name: "হোম", path: "/" }];
  const segments = pathname.split("/").filter(Boolean);
  let acc = "";
  for (const segment of segments) {
    acc += `/${segment}`;
    crumbs.push({ name: humanize(segment), path: acc });
  }
  return crumbs;
}

/**
 * WebApplication node — allowed ONLY on / and /playground.
 * The homepage builder already includes it, so this is for /playground.
 */
export function buildPlaygroundGraph(
  meta: Omit<PageMeta, "crumbs"> & { crumbs?: Crumb[] }
) {
  const webApp = {
    "@type": "WebApplication",
    "@id": `${SITE}/#webapp`,
    name: "BdPrompt প্লেগ্রাউন্ড",
    url: `${SITE}/playground`,
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
      url: `${SITE}/playground`,
    },
  };

  return buildGraph(
    { ...meta, crumbs: meta.crumbs ?? deriveCrumbs(meta.path) },
    [webApp]
  );
}
