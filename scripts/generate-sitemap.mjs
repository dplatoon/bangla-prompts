// Regenerates public/sitemap.xml at build time.
// - Appends one <url> per published prompt (/prompt/{slug}) fetched from Supabase,
//   with a page-specific <lastmod> taken from the row's updated_at/created_at.
// - Never stamps a build-time date onto static URLs (that is not a real lastmod).
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sitemapPath = resolve(__dirname, '../public/sitemap.xml');
if (!existsSync(sitemapPath)) {
  console.warn('[sitemap] public/sitemap.xml not found, skipping');
  process.exit(0);
}

// Read .env to pick up VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY
function loadEnv() {
  const envPath = resolve(__dirname, '../.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '');
  }
}
loadEnv();

async function fetchPrompts() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    console.warn('[sitemap] Supabase env missing, skipping dynamic prompts');
    return [];
  }
  try {
    const res = await fetch(`${url}/rest/v1/rpc/get_public_prompts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      body: '{}',
    });
    if (!res.ok) {
      console.warn(`[sitemap] RPC failed: ${res.status}`);
      return [];
    }
    const rows = await res.json();
    return rows
      .filter((r) => r.slug)
      .map((r) => {
        const stamp = r.updated_at || r.created_at;
        return { slug: r.slug, lastmod: stamp ? String(stamp).split('T')[0] : null };
      });
  } catch (err) {
    console.warn(`[sitemap] fetch error: ${err.message}`);
    return [];
  }
}

let xml = readFileSync(sitemapPath, 'utf8');

// Strip any previously-generated dynamic block, then re-append a fresh one.
xml = xml.replace(/\s*<!-- BEGIN dynamic prompts -->[\s\S]*?<!-- END dynamic prompts -->/g, '');

const prompts = await fetchPrompts();
if (prompts.length > 0) {
  const block = prompts
    .map((p) =>
      [
        `  <url>`,
        `    <loc>https://bdprompt.com/prompt/${p.slug}</loc>`,
        p.lastmod ? `    <lastmod>${p.lastmod}</lastmod>` : null,
        `    <changefreq>weekly</changefreq>`,
        `    <priority>0.7</priority>`,
        `  </url>`,
      ]
        .filter(Boolean)
        .join('\n')
    )
    .join('\n');
  const dynamic = `\n  <!-- BEGIN dynamic prompts -->\n${block}\n  <!-- END dynamic prompts -->\n`;
  xml = xml.replace('</urlset>', `${dynamic}</urlset>`);
}

writeFileSync(sitemapPath, xml);
console.log(`[sitemap] dynamic prompts=${prompts.length}`);
