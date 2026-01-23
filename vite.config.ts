import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";
import Prerender from "vite-plugin-prerender";
import { prerenderRoutes } from "./src/config/prerenderRoutes";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'favicon.webp', 'favicon.ico', 'icon-192x192.png', 'icon-512x512.png', 'og-image.png', 'og-image.webp'],
      manifest: {
        name: 'bdprompt.com - বাংলা AI প্রম্পট হাব',
        short_name: 'bdprompt',
        description: 'বাংলা প্রম্পট টেমপ্লেট — কন্টেন্ট, ইমেজ, কোড, মার্কেটিং। এক ক্লিকে কপি করে প্রয়োগ করুন।',
        theme_color: '#0f766e',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        lang: 'bn',
        scope: '/',
        start_url: '/',
        categories: ['education', 'productivity', 'utilities'],
        icons: [
          {
            src: '/favicon.png',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/png'
          },
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // Cache strategies for different asset types
        runtimeCaching: [
          {
            // Cache Google Fonts
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Cache Google Fonts stylesheets
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Cache images
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            // Cache API requests (network first for fresh data)
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5 // 5 minutes
              },
              networkTimeoutSeconds: 10
            }
          },
          {
            // Cache static assets
            urlPattern: /\.(?:js|css|woff|woff2|ttf|eot)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              }
            }
          }
        ],
        // Pre-cache critical routes
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        // Skip waiting for faster updates
        skipWaiting: true,
        clientsClaim: true
      }
    }),
    // Pre-render static HTML for SEO (production only)
    mode === 'production' && Prerender({
      staticDir: path.resolve(__dirname, 'dist'),
      routes: prerenderRoutes,
      renderer: {
        // Wait for React app to fully render before capturing HTML
        renderAfterDocumentEvent: 'app-rendered',
        // Timeout for rendering each page (ms)
        timeout: 30000,
        // Inject a base tag to ensure assets load correctly
        injectProperty: '__PRERENDER_INJECTED',
        // Headless Chrome options
        headless: true,
      },
      // Post-process rendered HTML
      postProcess(renderedRoute: { route: string; html: string }) {
        // Ensure proper lang attribute
        renderedRoute.html = renderedRoute.html.replace(
          '<html',
          '<html lang="bn"'
        );
        
        // Add prerender indicator comment for debugging
        renderedRoute.html = renderedRoute.html.replace(
          '</head>',
          `<!-- Pre-rendered at build time for SEO - ${new Date().toISOString()} -->\n</head>`
        );
        
        return renderedRoute;
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - rarely change, cached well
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
          ],
          // Supabase SDK
          'vendor-supabase': ['@supabase/supabase-js'],
        },
      },
    },
    // Use esbuild for minification (built-in, no extra dependency)
    minify: 'esbuild',
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
    // Enable source maps for production debugging (optional)
    sourcemap: mode !== 'production',
  },
}));
