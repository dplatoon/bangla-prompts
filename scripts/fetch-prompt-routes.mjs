// Build-time: fetch published prompt slugs and write them to
// src/config/generated-prompt-routes.json so the prerenderer can
// produce static HTML for every /prompt/{slug} page.
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, '../src/config/generated-prompt-routes.json');

function loadEnv() {
  const envPath = resolve(__dirname, '../.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '');
  }
}
loadEnv();

function write(routes) {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(routes, null, 2) + '\n');
  console.log(`[prompt-routes] wrote ${routes.length} prompt routes`);
}

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.warn('[prompt-routes] backend env missing — keeping existing route list');
  if (!existsSync(outPath)) write([]);
  process.exit(0);
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
  if (!res.ok) throw new Error(`RPC failed: ${res.status}`);
  const rows = await res.json();
  const routes = [
    ...new Set(
      rows
        .map((r) => r.slug)
        .filter((s) => typeof s === 'string' && /^[a-z0-9-]+$/i.test(s))
        .map((s) => `/prompt/${s}`)
    ),
  ];
  write(routes);
} catch (err) {
  console.warn(`[prompt-routes] ${err.message} — keeping existing route list`);
  if (!existsSync(outPath)) write([]);
}
