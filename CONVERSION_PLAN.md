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

## Milestone 1: Shared Layout & Components

**Goal:** Extract repeated HTML into reusable React components and set up the app layout shell.

### Tasks

- [ ] **1.1** Create `AppLayout` component (`resources/js/layouts/app-layout.tsx`)
    - Wraps children with `<TopNavBar />` and `<Footer />`
    - Supports `<Head title>` via Inertia
    - Handles RTL `<html dir="rtl" lang="ar">` setup
- [ ] **1.2** Extract `TopNavBar` component
    - Logo link, center nav links (home, archive, sponsors, about, contact), auth buttons
    - Active link highlighting based on current route
    - Mobile hamburger menu (if needed from static)
- [ ] **1.3** Extract `Footer` component
    - 4-column grid: brand, quick links, support, social links
    - Bottom copyright bar
- [ ] **1.4** Extract `IdeaCard` component
    - Props: `title`, `description`, `category`, `budget`, `author`, `avatar`, `votes`, `progress`
    - Vote button with hover state
- [ ] **1.5** Extract `WinnerCard` component
    - Props: `name`, `idea`, `avatar`, `badge`, `prize`
    - Trophy badge overlay
- [ ] **1.6** Extract `CountdownTimer` component
    - Props: `hours`, `minutes`, `seconds` (or target date)
    - Live ticking animation
- [ ] **1.7** Extract `PinModal` component (from `pin modal.html`)
    - Props: `isOpen`, `onClose`, `onSubmit`
    - 6-digit PIN input grid
- [ ] **1.8** Extract `SideNav` component (from `profile.html` sidebar)
    - Props: `activeSection`
- [ ] **1.9** Extract `MobileBottomNav` component (from `profile.html` mobile nav)

---

## Milestone 2: Public Pages (No Auth Required)

**Goal:** Convert all publicly accessible pages.

### Tasks

- [ ] **2.1** Convert `index.html` → `app/home.tsx`
    - Hero section with particles background (tsParticles)
    - Daily sponsor + countdown timer section
    - Weekly tabs section
    - Ideas grid (using `IdeaCard`)
    - Hall of fame winners carousel (using `WinnerCard`)
- [ ] **2.2** Convert `about.html` → `app/about.tsx`
    - Hero with image
    - Mission & Vision section
    - Impact metrics counters
    - Core values grid
    - Founding story section
    - Partner logos
- [ ] **2.3** Convert `archive.html` → `app/archive.tsx`
    - Breadcrumbs
    - Page header with background image
    - Search bar
    - Filter dropdowns (category, date, month, status)
    - Ideas grid with winner badges (using `IdeaCard` variant)
    - Pagination
- [ ] **2.4** Convert `sponsores.html` → `app/sponsors.tsx`
    - Sponsor tiers grid
    - Become a sponsor CTA
- [ ] **2.5** Convert `contact-us.html` → `app/contact.tsx`
    - Contact form (name, email, subject, message)
    - Map / address section
    - Social links
- [ ] **2.6** Convert `info.html` → `app/how-it-works.tsx`
    - Step-by-step process timeline
    - FAQ accordion
    - CTA section
- [ ] **2.7** Convert `Terms and Conditions.html` → `app/terms.tsx`
    - Long-form legal content with section navigation
    - Last updated date

---

## Milestone 3: Auth Pages

**Goal:** Convert authentication pages, integrate with Laravel Fortify.

### Tasks

- [ ] **3.1** Convert `auth/login.html` → `app/auth/login.tsx`
    - Fortify `Form` integration (email, password, remember)
    - Social login buttons (if applicable)
    - Link to register / forgot password
- [ ] **3.2** Convert `auth/register.html` → `app/auth/register.tsx`
    - Fortify `Form` integration (name, email, password, confirm)
    - Terms acceptance checkbox
    - Link to login
- [ ] **3.3** Convert `auth/reset-password.html` → `app/auth/reset-password.tsx`
    - Email input form
    - Back to login link
- [ ] **3.4** Convert `auth/new-password.html` → `app/auth/new-password.tsx`
    - Password + confirm password form
    - Password strength indicator

---

## Milestone 4: Authenticated Pages

**Goal:** Convert pages that require a logged-in user.

### Tasks

- [ ] **4.1** Convert `profile.html` → `app/profile.tsx`
    - Three-section layout: personal info, password & security, protection settings
    - Side navigation + mobile bottom nav
    - Profile image upload
    - Form fields with validation
    - 2FA toggle
    - Profile visibility toggle
- [ ] **4.2** Convert `add idea.html` → `app/submit-idea.tsx`
    - Multi-step form or single form
    - Category selector, budget input, description
    - Image upload
    - Preview before submit
- [ ] **4.3** Convert `dark.html` concept → `app/ideas/show.tsx`
    - Idea detail page with full content
    - Vote section, comments, author info
    - Support both light and dark mode via Tailwind `dark:` classes

---

## Milestone 5: Tailwind Config & Design Token Consolidation

**Goal:** Move inline Tailwind config from each HTML file into the project's `tailwind.config.js` / CSS, ensuring consistent design tokens.

### Tasks

- [ ] **5.1** Merge all color tokens from `resources/static/tailwind.config.js` and each HTML's inline config into the project's `resources/css/app.css` or `tailwind.config.ts`
    - Surface hierarchy colors
    - Primary / secondary / tertiary palettes
    - Dark mode variants (from `dark.html`)
- [ ] **5.2** Add font families (Cairo, Plus Jakarta Sans, Inter) to the project's font configuration
    - Ensure Google Fonts are loaded via `<Head>` or Vite
- [ ] **5.3** Add custom utility classes
    - `.font-headline` → `fontFamily: headline`
    - `.no-scrollbar` utility
    - `.editorial-shadow` (from `about.html`)
    - `.glass-header` backdrop blur
- [ ] **5.4** Verify dark mode support works across all converted pages
    - Test `dark:` class variants
    - Ensure `dark.html` tokens are merged correctly

---

## Milestone 6: Backend Routes & Integration

**Goal:** Wire up Laravel controllers and Inertia responses for all app pages.

### Tasks

- [ ] **6.1** Create `AppHomeController` with `index()` returning Inertia render for `app/home`
- [ ] **6.2** Create `AppPageController` for static pages (about, archive, sponsors, contact, how-it-works, terms)
- [ ] **6.3** Update Fortify auth views to use `app/auth/*` pages
- [ ] **6.4** Create `ProfileController` for authenticated profile page
- [ ] **6.5** Create `IdeaController` with `create()` and `show()` methods
- [ ] **6.6** Register all routes in `routes/web.php`
- [ ] **6.7** Run `php artisan wayfinder:generate` to update TypeScript route helpers

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
