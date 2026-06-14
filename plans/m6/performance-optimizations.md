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

## Milestone 2: SSR Verification & Configuration
**Goal:** Ensure the server delivers the initial HTML design so the user sees the page before the JS even finishes loading.

- [ ] **Task 2.1: Check SSR Status**
  - Verify if the SSR server is running and reachable.
  - Test if `@inertia` in `app.blade.php` is outputting HTML on the first request.
- [ ] **Task 2.2: Optimize SSR Bundle**
  - Ensure `ssr.tsx` is also using optimized globs to keep the server-side rendering fast.

## Milestone 3: Validation
**Goal:** Confirm the "instant" feel and check for regressions.

- [ ] **Task 3.1: Bundle Size Audit**
  - Use Vite's build report to confirm the `app.js` size has decreased.
- [ ] **Task 3.2: First Paint Verification**
  - Use browser dev tools to confirm the "Time to First Paint" is under 300ms.
- [ ] **Task 3.3: Functional Smoke Test**
  - Ensure navigation between public pages and admin pages works perfectly with lazy-loaded layouts.
