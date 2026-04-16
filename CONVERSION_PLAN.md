# HTML-to-React Conversion Plan

## Overview

Convert all static HTML pages in `resources/static/` to Inertia React pages under `resources/js/pages/app/`, following the existing conventions established in `resources/js/pages/admin/`.

---

## Source Inventory

### Root-level pages (7)

| #   | Source File                 | Target Page            | Route Name (proposed) |
| --- | --------------------------- | ---------------------- | --------------------- |
| 1   | `index.html`                | `app/home.tsx`         | `app.home`            |
| 2   | `about.html`                | `app/about.tsx`        | `app.about`           |
| 3   | `archive.html`              | `app/archive.tsx`      | `app.archive`         |
| 4   | `contact-us.html`           | `app/contact.tsx`      | `app.contact`         |
| 5   | `sponsores.html`            | `app/sponsors.tsx`     | `app.sponsors`        |
| 6   | `info.html`                 | `app/how-it-works.tsx` | `app.info`            |
| 7   | `Terms and Conditions.html` | `app/terms.tsx`        | `app.terms`           |

### Auth pages (4)

| #   | Source File                | Target Page                   | Route Name (proposed)  |
| --- | -------------------------- | ----------------------------- | ---------------------- |
| 8   | `auth/login.html`          | `app/auth/login.tsx`          | `app.login`            |
| 9   | `auth/register.html`       | `app/auth/register.tsx`       | `app.register`         |
| 10  | `auth/reset-password.html` | `app/auth/reset-password.tsx` | `app.password.request` |
| 11  | `auth/new-password.html`   | `app/auth/new-password.tsx`   | `app.password.reset`   |

### Authenticated pages (2)

| #   | Source File     | Target Page           | Route Name (proposed) |
| --- | --------------- | --------------------- | --------------------- |
| 12  | `profile.html`  | `app/profile.tsx`     | `app.profile`         |
| 13  | `add idea.html` | `app/submit-idea.tsx` | `app.ideas.create`    |

### Utility / reference pages (3 - decide whether to convert)

| #   | Source File      | Notes                                                                                             |
| --- | ---------------- | ------------------------------------------------------------------------------------------------- |
| 14  | `dark.html`      | Dark-mode variant of idea detail page. May merge with a single detail page using `dark:` classes. |
| 15  | `dd.html`        | Appears to be an edit-profile draft/variant. May merge with `profile.tsx`.                        |
| 16  | `pin modal.html` | Standalone PIN modal component. Extract as a reusable component, not a page.                      |

---

## Target Directory Structure

```
resources/js/
  pages/
    app/
      home.tsx              # Landing / homepage
      about.tsx             # About us
      archive.tsx            # Ideas archive
      contact.tsx            # Contact us
      sponsors.tsx           # Sponsors page
      how-it-works.tsx       # How it works / info
      terms.tsx              # Terms and conditions
      profile.tsx            # User profile (authenticated)
      submit-idea.tsx        # Submit new idea (authenticated)
      ideas/
        show.tsx             # Idea detail (from dark.html concept)
      auth/
        login.tsx            # Login
        register.tsx         # Register
        reset-password.tsx   # Reset password
        new-password.tsx     # New password
  components/
    app/
      top-nav-bar.tsx        # Shared top navigation
      footer.tsx             # Shared footer
      idea-card.tsx          # Reusable idea card
      winner-card.tsx        # Hall of fame winner card
      sponsor-card.tsx       # Sponsor card
      countdown-timer.tsx    # Voting countdown timer
      pin-modal.tsx           # PIN verification modal
      side-nav.tsx            # Profile sidebar navigation
      mobile-bottom-nav.tsx  # Profile mobile bottom nav
```

---

## Milestone 1: Shared Layout & Components ✅ DONE

**Goal:** Extract repeated HTML into reusable React components and set up the app layout shell.

### Tasks

- [x] **1.1** Create `AppLayout` component (`resources/js/layouts/app/app-layout.tsx`) ✅
    - Wraps children with `<TopNavBar />` and `<Footer />`
    - Supports `<Head title>` via Inertia
    - Handles RTL `<html dir="rtl" lang="ar">` setup
- [x] **1.2** Extract `TopNavBar` component (`resources/js/components/app/top-nav-bar.tsx`) ✅
    - Logo link, center nav links (home, archive, sponsors, about, contact), auth buttons
    - Active link highlighting based on current route
    - Conditional auth state (login/register vs account button)
- [x] **1.3** Extract `Footer` component (`resources/js/components/app/footer.tsx`) ✅
    - 4-column grid: brand, quick links, support, social links
    - Bottom copyright bar with dynamic year
- [x] **1.4** Extract `IdeaCard` component (`resources/js/components/app/idea-card.tsx`) ✅
    - Props: `title`, `description`, `category`, `budget`, `authorName`, `authorAvatar`, `votes`, `voteProgress`, etc.
    - Two variants: `home` (with vote progress/button) and `archive` (with image/winner badge)
    - Vote button with hover state
- [x] **1.5** Extract `WinnerCard` component (`resources/js/components/app/winner-card.tsx`) ✅
    - Props: `name`, `idea`, `avatarUrl`, `badge`, `prize`
    - Trophy badge overlay, pulse animation
- [x] **1.6** Extract `CountdownTimer` component (`resources/js/components/app/countdown-timer.tsx`) ✅
    - Props: `targetDate`
    - Live ticking with `useEffect` interval
- [x] **1.7** Extract `PinModal` component (`resources/js/components/app/pin-modal.tsx`) ✅
    - Props: `isOpen`, `onClose`, `onSubmit`, `email`
    - 6-digit PIN input grid with auto-focus navigation
- [x] **1.8** Extract `SideNav` component (`resources/js/components/app/side-nav.tsx`) ✅
    - Props: `activeSection`, configurable `items`
- [x] **1.9** Extract `MobileBottomNav` component (`resources/js/components/app/mobile-bottom-nav.tsx`) ✅
    - Props: `activeSection`, configurable `items`

---

## Milestone 2: Public Pages (No Auth Required) ✅ DONE

**Goal:** Convert all publicly accessible pages.

### Tasks

- [x] **2.1** Convert `index.html` → `app/home.tsx` ✅
    - Hero section with particles background (tsParticles)
    - Daily sponsor + countdown timer section
    - Weekly tabs section
    - Ideas grid (using `IdeaCard`)
    - Hall of fame winners carousel (using `WinnerCard`)
- [x] **2.2** Convert `about.html` → `app/about.tsx` ✅
    - Hero with image
    - Mission & Vision section
    - Impact metrics counters
    - Core values grid
    - Founding story section
    - Partner logos
- [x] **2.3** Convert `archive.html` → `app/archive.tsx` ✅
    - Breadcrumbs
    - Page header with background image
    - Search bar
    - Filter dropdowns (category, date, month, status)
    - Ideas grid with winner badges (using `IdeaCard` variant)
    - Pagination
- [x] **2.4** Convert `sponsores.html` → `app/sponsors.tsx` ✅
    - Sponsor tiers grid
    - Become a sponsor CTA
- [x] **2.5** Convert `contact-us.html` → `app/contact.tsx` ✅
    - Contact form (name, email, subject, message)
    - Map / address section
    - Social links
- [x] **2.6** Convert `info.html` → `app/how-it-works.tsx` ✅
    - Step-by-step process timeline
    - FAQ accordion
    - CTA section
- [x] **2.7** Convert `Terms and Conditions.html` → `app/terms.tsx` ✅
    - Long-form legal content with section navigation
    - Last updated date

---

## Milestone 3: Auth Pages ✅ DONE

**Goal:** Convert authentication pages, integrate with Laravel Fortify.

### Tasks

- [x] **3.1** Convert `auth/login.html` → `app/auth/login.tsx` ✅
    - Fortify `Form` integration (email, password, remember)
    - Social login buttons (if applicable)
    - Link to register / forgot password
- [x] **3.2** Convert `auth/register.html` → `app/auth/register.tsx` ✅
    - Fortify `Form` integration (name, email, password, confirm)
    - Terms acceptance checkbox
    - Link to login
- [x] **3.3** Convert `auth/reset-password.html` → `app/auth/reset-password.tsx` ✅
    - Email input form
    - Back to login link
- [x] **3.4** Convert `auth/new-password.html` → `app/auth/new-password.tsx` ✅
    - Password + confirm password form
    - Password strength indicator

---

## Milestone 4: Authenticated Pages ✅ DONE

**Goal:** Convert pages that require a logged-in user.

### Tasks

- [x] **4.1** Convert `profile.html` → `app/profile.tsx` ✅
    - Three-section layout: personal info, password & security, protection settings
    - Side navigation + mobile bottom nav
    - Profile image upload
    - Form fields with validation
    - 2FA toggle
    - Profile visibility toggle
- [x] **4.2** Convert `add idea.html` → `app/submit-idea.tsx` ✅
    - Multi-step form or single form
    - Category selector, budget input, description
    - Image upload
    - Preview before submit
- [x] **4.3** Convert `dark.html` concept → `app/ideas/show.tsx` ✅
    - Idea detail page with full content
    - Vote section, comments, author info
    - Support both light and dark mode via Tailwind `dark:` classes

---

## Milestone 5: Tailwind Config & Design Token Consolidation ✅ DONE

**Goal:** Move inline Tailwind config from each HTML file into the project's `tailwind.config.js` / CSS, ensuring consistent design tokens.

### Tasks

- [x] **5.1** Merge all color tokens from `resources/static/tailwind.config.js` and each HTML's inline config into the project's `resources/css/app.css` or `tailwind.config.ts` ✅
    - Surface hierarchy colors
    - Primary / secondary / tertiary palettes
    - Dark mode variants (from `dark.html`)
- [x] **5.2** Add font families (Cairo, Plus Jakarta Sans, Inter) to the project's font configuration ✅
    - Google Fonts loaded via `<Head>` in app.blade.php
- [x] **5.3** Add custom utility classes ✅
    - `.font-headline` → `fontFamily: headline`
    - `.no-scrollbar` utility
    - `.editorial-shadow` (from `about.html`)
    - `.glass-header` backdrop blur
    - `.golden-ledger-shadow`, `.ambient-shadow`, `.bg-editorial-gradient`, `.airy-dots`, `.hero-overlay`, `.arabic-dynamic-padding`
- [x] **5.4** Verify dark mode support works across all converted pages ✅
    - Replaced all hardcoded hex colors with design tokens
    - Updated components to use tokens instead of `slate-*` / `gray-*` in `dark:` variants

---

## Milestone 6: Backend Routes & Integration ✅ DONE

**Goal:** Wire up Laravel controllers and Inertia responses for all app pages.

### Tasks

- [x] **6.1** Create `AppHomeController` with `index()` returning Inertia render for `app/home` ✅
- [x] **6.2** Create `AppPageController` for static pages (about, archive, sponsors, contact, how-it-works, terms) ✅
- [x] **6.3** Update Fortify auth views to use `app/auth/*` pages ✅
    - Changed Fortify prefix from `admin` to root level
    - Updated FortifyServiceProvider to render app/auth/\* Inertia components
    - Updated `fortify.home` redirect from `/admin/dashboard` to `/`
- [x] **6.4** Create `AppProfileController` for authenticated profile page ✅
- [x] **6.5** Create `AppIdeaController` with `create()` and `show()` methods ✅
- [x] **6.6** Register all routes in `routes/web.php` ✅
    - All routes registered in `routes/app.php` with `app.*` named routes
- [x] **6.7** Run `php artisan wayfinder:generate` to update TypeScript route helpers ✅

---

## Milestone 7: Polish & Testing

**Goal:** Final quality pass.

### Tasks

- [ ] **7.1** Visual regression check: compare each React page side-by-side with the original HTML
- [ ] **7.2** RTL verification on all pages
- [ ] **7.3** Mobile responsiveness check
- [ ] **7.4** Dark mode toggle verification
- [ ] **7.5** Run `vendor/bin/pint --dirty --format agent` on all new PHP files
- [ ] **7.6** Run `npm run build` to verify no TypeScript / build errors
- [ ] **7.7** Write Pest feature tests for each route (ensure 200 response, correct Inertia component)
- [ ] **7.8** Remove or archive `resources/static/` directory once conversion is verified

---

## Dependency Notes

- Milestone 1 must complete before Milestones 2-4 (pages depend on shared components)
- Milestone 5 should be done in parallel with Milestone 1 (design tokens needed for styling)
- Milestone 6 depends on Milestones 1-4 (routes need pages to exist)
- Milestone 7 depends on all previous milestones

---

## Conventions to Follow

- Use `<Head title="..." />` from Inertia on every page
- Use Wayfinder route functions (`@/routes/` or `@/routes/app`) for all navigation links
- Use `<Link>` from Inertia for internal navigation (not `<a>` tags)
- Follow existing admin page patterns: default export, `Page.layout` for breadcrumbs if needed
- TypeScript props interfaces for all page components
- Tailwind classes directly in JSX (no CSS modules)
- RTL-first design: use logical properties where possible (`start`/`end`, `ps`/`pe`)
