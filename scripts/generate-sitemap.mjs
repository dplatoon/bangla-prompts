// Regenerates public/sitemap.xml with today's lastmod for each static URL.
// Runs automatically via the "prebuild" npm script.
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sitemapPath = resolve(__dirname, '../public/sitemap.xml');
if (!existsSync(sitemapPath)) {
  console.warn('[sitemap] public/sitemap.xml not found, skipping');
  process.exit(0);
}
const today = new Date().toISOString().split('T')[0];
const xml = readFileSync(sitemapPath, 'utf8').replace(
  /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
  `<lastmod>${today}</lastmod>`
);
writeFileSync(sitemapPath, xml);
console.log('[sitemap] updated lastmod -> ' + today);
