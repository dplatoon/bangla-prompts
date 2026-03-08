

## Fix: "Cannot read properties of null (reading 'useState')" — Duplicate React Instance

**Root Cause:** Vite's dependency pre-bundling is creating multiple React instances (visible in the stack trace referencing two different chunks: `chunk-ZMLY2J2T.js` and `chunk-W6L2VRDA.js`). When React loads twice, the hooks dispatcher is `null` in the second instance, causing `useState` to crash.

**Fix:** Add `dedupe` configuration to `vite.config.ts` to force Vite to resolve a single copy of `react` and `react-dom`.

### Change: `vite.config.ts`

Add `dedupe` to the existing `resolve` block:

```ts
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
  dedupe: ['react', 'react-dom'],
},
```

This is a one-line addition that tells Vite to always resolve these packages to the same instance, preventing the duplicate React problem that causes hooks to fail.

