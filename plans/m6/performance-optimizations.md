# Milestone 6: Performance & Initial Load Optimization

## Objective
Achieve an "instant" initial load feel by shrinking the core JavaScript bundle and ensuring Server-Side Rendering (SSR) is functional, eliminating the need for a splash screen.

---

## Milestone 1: JavaScript Bundle Optimization
**Goal:** Drastically reduce the amount of code the browser has to parse before the first render.

- [ ] **Task 1.1: Narrow JS Page Globs**
  - Update `app.tsx` to only index files in `app/pages` and `admin/pages`.
  - This prevents the initial bundle from tracking hundreds of internal components, hooks, and lib files.
- [ ] **Task 1.2: Lazy Load Heavy Layouts**
  - Modify the `layout` resolver in `createInertiaApp` to use dynamic imports.
  - This ensures users visiting the public site don't download the Admin dashboard's dependencies (charts, tables, etc.).
- [ ] **Task 1.3: Clean Up Eager Imports**
  - Remove all top-level layout imports from `app.tsx` to ensure they are properly code-split.

## Pre-check: React Compiler
**Status: Done — build completed with zero warnings, compiler-runtime chunk confirmed in output.**

---

## Milestone 2: SSR Verification & Configuration
**Goal:** Ensure the server delivers the initial HTML design so the user sees the page before the JS even finishes loading.

- [ ] **Task 2.1: Build SSR Bundle**
  - Run `npm run build:ssr` (builds both client and SSR).
  - Confirm `bootstrap/ssr/ssr.mjs` is created.
- [ ] **Task 2.2: Check SSR Status**
  - Verify if the SSR server is running and reachable.
  - Test if `@inertia` in `app.blade.php` is outputting HTML on the first request.
- [ ] **Task 2.3: Optimize SSR Bundle**
  - Narrow the glob in `ssr.tsx` from `./**/*.tsx` to only match actual pages (`app/pages/**/*.tsx`, `admin/pages/**/*.tsx`) — same fix as Task 1.1.
  - Keep `{ eager: true }` (SSR needs all pages available), but reduce the matched set.
- [ ] **Task 2.4: Add SSR Server to Dev Workflow**
  - Update `composer.json` `dev` script to start the SSR Node server after Vite.
  - The SSR server runs from `bootstrap/ssr/ssr.mjs` once built.

## Milestone 3: Font & Resource Optimization
**Goal:** Reduce render-blocking font downloads and improve perceived load time.

- [ ] **Task 3.1: Font Optimization**
  - Audit `app.blade.php` — currently preloads 4 font families (Plus Jakarta Sans, Inter, Cairo, Material Symbols).
  - Add `font-display: swap` via `@font-face` or subset fonts to only used characters.
  - Consider removing unused font weights/variants.

## Milestone 4: Validation
**Goal:** Confirm the "instant" feel and check for regressions.

- [ ] **Task 4.1: Bundle Size Audit**
  - Use Vite's build report to confirm the `app.js` size has decreased.
- [ ] **Task 4.2: SSR HTML Verification**
  - Curl a page (e.g. `/`) and confirm the response contains rendered HTML content, not just a `<div id="app">` shell.
- [ ] **Task 4.3: First Paint Verification**
  - Use browser dev tools to confirm the "Time to First Paint" is under 300ms.
- [ ] **Task 4.4: Functional Smoke Test**
  - Ensure navigation between public pages and admin pages works perfectly with lazy-loaded layouts.
