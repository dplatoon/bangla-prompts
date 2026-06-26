// Post-build: copy prerendered /404/index.html → /404.html at dist root
// so Vercel serves it with HTTP 404 for unmatched routes (kills the soft-404).
import { copyFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, '../dist/404/index.html');
const dest = resolve(__dirname, '../dist/404.html');

if (existsSync(src)) {
  copyFileSync(src, dest);
  console.log('[post-build] dist/404.html written (host serves it as real 404)');
} else {
  console.warn('[post-build] dist/404/index.html missing — prerender may have failed');
}