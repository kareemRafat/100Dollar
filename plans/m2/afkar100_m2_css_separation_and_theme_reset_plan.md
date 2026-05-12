# Afkar100 M2 Plan: CSS Separation & Theme Reset

**Description:**  
This plan outlines the strategy to decouple the "Gold" theme from the core shadcn/ui styles. The core `app.css` will be reset to the standard Zinc/Black palette used by shadcn/ui components, providing a professional "default" look for the admin panel. The "Gold" brand identity will be isolated into a dedicated `frontend.css` and applied specifically to the user-facing application layouts.

---

## 🏗️ Milestone 1: Frontend CSS Isolation (Gold Theme)
**Goal:** Move the current branding and custom utilities to a separate file to prevent them from leaking into the admin panel.

- [x] **Task 1.1: Create `resources/css/frontend.css`**
    - Create the file and import `tailwindcss` at the top (or use `@reference` if v4 allows).
    - Move all gold-specific `:root` and `.dark` variables from `app.css`.
    - Move custom utilities like `.animate-sparkle`, `.bg-editorial-gradient`, `.airy-dots`, etc.
- [x] **Task 1.2: Integrate `frontend.css` into App Layout**
    - Import `frontend.css` inside `resources/js/app/layouts/app-layout.tsx`.
    - Verify that the user-facing app still looks exactly the same.
- [x] **Task 1.3: Update Vite Configuration**
    - Add `resources/css/frontend.css` to the `input` array in `vite.config.ts` to ensure it's compiled correctly.

---

## 🖤 Milestone 2: Core CSS Reset (Zinc/Black Theme)
**Goal:** Reset the global `app.css` to the official shadcn/ui Zinc palette to improve the admin panel's aesthetic.

- [x] **Task 2.1: Reset `:root` and `.dark` in `app.css`**
    - Replace current gold variables with standard Zinc values.
    - **Light Mode:** Background: `#ffffff`, Foreground: `#09090b`, Primary: `#18181b`.
    - **Dark Mode:** Background: `#09090b`, Foreground: `#fafafa`, Primary: `#fafafa`.
- [x] **Task 2.2: Clean Up Global Utilities**
    - Remove unused "gold" shadows and gradients from `app.css` that are now in `frontend.css`.
    - Ensure standard shadcn/ui utilities (like `--radius`) are preserved.
- [x] **Task 2.3: Verification of Admin Panel**
    - Verify the admin panel now uses the clean Zinc/Black theme without any gold leakage.
- [x] **Task 2.4: Regression Testing**
    - Check for any broken layouts in components shared between App and Admin.

---

## ✅ Done Criteria
- [x] The Admin Panel uses the default Shadcn UI Zinc (Black/White) color palette.
- [x] The User-facing App preserves the "Gold" theme exactly as it was.
- [x] No "Gold" variables are defined in the global `app.css`.
- [x] CSS files are properly split and optimized in the build process.
