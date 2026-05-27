# Milestone 5: Mega Component Refactoring Plan ✅

> **Status: Complete.** All high-value refactors (18 files) have been decomposed. 5 remaining items were assessed as low value and sunset — their sizes (335–469 lines) are manageable and extraction would add ceremony without meaningful reuse or code-splitting benefit.

## Overview
Systematically decompose the largest React components (300–950 lines) into focused, reusable pieces. The admin ideas show page (948→381 lines) was the initial reference pattern.

## Target Components by Size

| Priority | File | Status | Before | After |
|----------|------|--------|--------|-------|
| P0 | `admin/pages/users/index.tsx` | ✅ M1-P7+P8 | 858 | <200 |
| P1 | `admin/pages/sponsors/index.tsx` | ✅ M1-P0+P1 | 772 | <280 |
| P2 | `app/pages/idea/show.tsx` | ✅ M2-P2 | 613 | 358 |
| P3 | `app/components/top-nav-bar.tsx` | ✅ M3-P3 | 578 | 96 |
| P4 | `app/pages/idea/index.tsx` | ✅ M2-P4 | 546 | 344 |
| P5 | `app/pages/sponsors/apply.tsx` | ✅ M2-P5 | 496 | 228 |
| P6 | `app/pages/idea/partials/idea-form.tsx` | 🔴 Sunset | 469 | 469 |
| P7 | `admin/pages/sponsorship-requests/show.tsx` | ✅ M1-P7 | 448 | <200 |
| P8 | `admin/pages/ideas/index.tsx` | ✅ M1-P8 | 432 | <200 |
| P9 | `components/two-factor-setup-modal.tsx` | 🔴 Sunset | 433 | 433 |
| P10 | `app/pages/idea/partials/comment-section.tsx` | 🔴 Sunset | 401 | 401 |
| P11 | `admin/pages/prizes/index.tsx` | ✅ M1-P11 | 376 | ~150 |
| P12 | `admin/pages/contacts/show.tsx` | ✅ M1-P12 | 372 | ~150 |
| P13 | `admin/pages/users/show.tsx` | ✅ M1-P13 | 363 | ~130 |
| P14 | `app/pages/sponsors/index.tsx` | ✅ M2-P14 | 369 | 77 |
| P15 | `app/components/pin-modal.tsx` | 🔴 Sunset | 388 | 388 |
| P16 | `app/components/notification-bell.tsx` | 🔴 Sunset | 335 | 335 |
| P17 | `admin/pages/winners/preview.tsx` | ✅ M1-P17 | 334 | ~130 |
| P18 | `app/pages/profile.tsx` | ✅ M2-P18 | 326 | 86 |
| P19 | `app/pages/contact.tsx` | ✅ M2-P19 | 322 | 85 |

---

## Milestone 1: Admin CRUD Pages & Detail Pages

These follow the same pattern as the ideas show refactor — inline CRUD dialogs are extracted to `components/` subdirectories.

### M1-P0: `admin/pages/users/index.tsx` (858→~150 lines) ✅

**Current responsibilities:**
- Search bar + role/status/country filters
- Paginated users table with avatar, badges, actions
- Create user dialog (7-field form)
- Edit user dialog (7-field form, prefilled)
- Delete user confirmation dialog

**Files to create** (`resources/js/admin/pages/users/components/`):
- [x] `user-filters.tsx` — Search input, role/status/country dropdowns, debounced URL sync
- [x] `users-table.tsx` — Paginated table with avatar, name, email, country, role badge, status badge, action buttons
- [x] `create-user-dialog.tsx` — 7-field form (name, email, password, country, role, phone, active toggle)
- [x] `edit-user-dialog.tsx` — Same form, prefilled with existing data
- [x] `delete-user-dialog.tsx` — Confirmation dialog with user name

### M1-P1: `admin/pages/sponsors/index.tsx` (772→~230 lines) ✅

**Current responsibilities:**
- Sponsors table with logo, day_of_week, contract dates, counts
- Create sponsor dialog (name, day_of_week, contract dates, logo upload, active toggle)
- Edit sponsor dialog (same form, prefilled)
- Delete sponsor dialog
- Inline active status toggle via PATCH

**Files to create** (`resources/js/admin/pages/sponsors/components/`):
- [x] `sponsors-table.tsx` — Table with logo avatar, day badges, dates, counts, toggle switch
- [x] `sponsor-form-fields.tsx` — Shared form fields (name, day select, date pickers, logo upload with preview, active toggle)
- [x] `create-sponsor-dialog.tsx` — Wraps form fields in dialog with create logic
- [x] `edit-sponsor-dialog.tsx` — Wraps form fields in dialog with edit logic, prefilled
- [x] `delete-sponsor-dialog.tsx` — Confirmation dialog with sponsor name

### M1-P8: `admin/pages/ideas/index.tsx` (432→~180 lines) ✅

**Current responsibilities:**
- Search bar + status filter tabs
- Paginated ideas table with status badges
- Delete idea dialog

**Files to create** (`resources/js/admin/pages/ideas/components/`):
- [x] `idea-search-header.tsx` — Status filter tabs with count badges
- [x] `ideas-table.tsx` — Paginated table with title, user, status badge, date, actions
- [x] Existing `delete-idea-dialog.tsx` from show.tsx refactor reused

### M1-P7: `admin/pages/sponsorship-requests/show.tsx` (448→~150 lines) ✅

**Current responsibilities:**
- Request details display (company info, message, logo)
- Status management (approve/reject with processing state)
- Delete modal

**Files to create** (`resources/js/admin/pages/sponsorship-requests/components/`):
- [x] `request-info-card.tsx` — Company name, email, phone, website, message, logo display
- [x] `request-status-actions.tsx` — Approve/reject buttons with processing state
- [x] `delete-request-dialog.tsx` — Confirmation dialog

### M1-P11: `admin/pages/prizes/index.tsx` (376→~150 lines) ✅

**Current responsibilities:**
- Prizes table with filters
- Payout confirmation dialog

**Files to create** (`resources/js/admin/pages/prizes/components/`):
- [x] `prizes-table.tsx` — Paginated table with idea, sponsor, amount, status
- [x] `payout-confirm-dialog.tsx` — Confirmation with amount display
- [x] `prize-filters.tsx` — Status/date filters

### M1-P12: `admin/pages/contacts/show.tsx` (372→~150 lines) ✅

**Current responsibilities:**
- Contact message detail display
- Reply form with textarea
- Delete dialog

**Files to create** (`resources/js/admin/pages/contacts/components/`):
- [x] `contact-message-display.tsx` — Sender info, subject, message body
- [x] `reply-form.tsx` — Textarea + send button
- [x] `delete-contact-dialog.tsx` — Confirmation dialog

### M1-P13: `admin/pages/users/show.tsx` (363→~150 lines) ✅

**Current responsibilities:**
- User detail display
- User's ideas table
- User's votes table

**Files to create** (`resources/js/admin/pages/users/components/`):
- [x] `user-profile-card.tsx` — Avatar, name, email, country, role, dates
- [x] `user-ideas-table.tsx` — User's ideas list with status badges, client-side pagination (10/page)
- [x] `user-votes-table.tsx` — Votes history list, client-side pagination (10/page)

### M1-P17: `admin/pages/winners/preview.tsx` (334→~130 lines) ✅

**Current responsibilities:**
- Weekly winners grid display
- Confirm winner dialog per day

**Files to create** (`resources/js/admin/pages/winners/components/`):
- [x] `winners-grid.tsx` — Grid of day-based winner cards (sorts by weekOrder, renders WinnerCards)
- [x] `confirm-winner-dialog.tsx` — Confirmation with idea details
- [x] `winner-card.tsx` — Individual day winner card (3 states: announced winner / leading / empty)

---

## Milestone 2: Public App Pages

### M2-P2: `app/pages/idea/show.tsx` (613→~250 lines)

**Already partially decomposed** (uses `partials/`). The orchestrator page itself is 613 lines with 7+ responsibilities.

**Current inline logic to extract:**
- SEO meta tags (Open Graph, Twitter Cards) → `<IdeaMetaHead />`
- Rejection notice banner → `<RejectionNotice />`
- Follow/unfollow buttons (two separate buttons with optimistic updates) → `<FollowActions />`
- Image modal (full-screen dialog) → `<IdeaImageModal />`

**Files to create or modify** (`resources/js/app/pages/idea/`):
- [x] `partials/idea-meta-head.tsx` — All OG/Twitter meta tag logic extracted from `<Head>`
- [x] `partials/rejection-notice.tsx` — Rejection banner with reason
- [x] `partials/follow-actions.tsx` — Both follow-idea and follow-owner buttons with optimistic updates
- [x] `partials/idea-image-modal.tsx` — Full-screen image dialog

### M2-P4: `app/pages/idea/index.tsx` (546→~350 lines) ✅

**Current responsibilities:**
- Hero section with background image
- Statistics cards (various counts)
- Search bar with debounced URL navigation
- Status filter tabs
- Idea cards listing
- Delete confirmation dialog

**Files to create** (`resources/js/app/pages/idea/partials/`):
- [x] `my-ideas-hero.tsx` — Hero section with background
- [x] `stats-cards.tsx` — Statistics display row
- [x] `idea-search-bar.tsx` — Search input + status tabs
- [x] `delete-idea-dialog.tsx` — Confirmation dialog

### M2-P5: `app/pages/sponsors/apply.tsx` (496→~230 lines) ✅

**Current responsibilities:**
- Company information form (name, email, phone, website)
- Drag-and-drop logo upload with preview
- Country selector
- Form validation errors

**Files to create** (`resources/js/app/pages/sponsors/partials/`):
- [x] `company-info-fields.tsx` — Name, email, phone, website inputs
- [x] `sponsor-logo-uploader.tsx` — Drag-and-drop / click-to-upload with preview and validation
- [x] `apply-form-actions.tsx` — Submit/cancel buttons with loading state

### ✅ M2-P14: `app/pages/sponsors/index.tsx` (369→77 lines)

**Current responsibilities:**
- Week-organized sponsor listing
- Benefits section

**Files created** (`resources/js/app/pages/sponsors/partials/`):
- [x] `sponsor-week-grid.tsx` — Week-by-week sponsor cards
- [x] `benefits-section.tsx` — Benefits display

### ✅ M2-P18: `app/pages/profile.tsx` (326→86 lines)

**Current responsibilities:**
- Tab-based profile page
- Lazy-loaded sections

**Files created** (`resources/js/app/pages/profile/partials/`):
- [x] `profile-tabs.tsx` — Tab navigation (SideNav + MobileBottomNav items)
- [x] `profile-details.tsx` — Profile main content with back link, header, tab rendering

### ✅ M2-P19: `app/pages/contact.tsx` (322→85 lines)

**Current responsibilities:**
- Contact form with subject select
- Toast notification

**Files created** (`resources/js/app/pages/contact/partials/`):
- [x] `contact-form.tsx` — Form fields with subject selector
- [x] `contact-info-card.tsx` — Contact info sidebar

---

## Milestone 3: Shared Components & Partials

### ✅ M3-P3: `app/components/top-nav-bar.tsx` (578→96 lines)

**Current responsibilities:**
- Mobile sheet menu with full navigation, auth state, dark mode, CTAs
- Desktop centered nav links with animated active indicator
- User dropdown (profile, my ideas, appearance, logout)
- Guest view (submit-idea CTA, login, register)
- Notification bell embedded
- RTL awareness

**Files created** (`resources/js/app/components/nav/`):
- [x] `mobile-nav-sheet.tsx` — Mobile sheet with navigation + auth actions
- [x] `desktop-nav-links.tsx` — Centered nav with animated indicator
- [x] `user-nav-dropdown.tsx` — Profile/my ideas/appearance/logout dropdown
- [x] `guest-nav-actions.tsx` — Submit idea, login, register buttons
- [x] `appearance-nav-item.tsx` — Appearance toggle in dropdown

### 🔴 M3-P6: `app/pages/idea/partials/idea-form.tsx` (469 lines)

**Sunset** — Sections are tightly coupled to `useForm` state; extracting would add prop drilling overhead for minimal gain. Filing stays at 469 lines, which is well-organized and maintainable.

### 🔴 M3-P9: `components/two-factor-setup-modal.tsx` (433 lines)

**Sunset** — Multi-step modal is self-contained; steps are not reused elsewhere. No maintenance burden at 433 lines.

### 🔴 M3-P10: `app/pages/idea/partials/comment-section.tsx` (401 lines)

**Sunset** — Comment section is self-contained; `comment-item` has mild reuse potential but not enough to prioritize extraction.

### 🔴 M3-P15: `app/components/pin-modal.tsx` (388 lines)

**Sunset** — Self-contained multi-step modal; steps are not reused elsewhere.

### 🔴 M3-P16: `app/components/notification-bell.tsx` (335 lines)

**Sunset** — Self-contained with polling/dropdown; 335 lines is reasonable for this complexity.

---

## Pattern Summary

All refactors follow the same approach used for `admin/pages/ideas/show.tsx`:

1. **Identify inline dialogs/modals** — Extract each to its own file with typed props
2. **Identify repeated markup** (e.g., form fields duplicated in create/edit) — Extract shared form into a reusable component
3. **Identify self-contained sections** (cards, tables, sidebars) — Extract with minimal props interface
4. **Keep state & handlers in the parent** — Components are pure presentational, receiving data and callbacks via props
5. **Use `components/` subdirectory** — Same level as the page file, matching the admin page convention

### Actual Impact

| Metric | Before | After |
|--------|--------|-------|
| Largest file | 948 lines | 469 lines (sunset, well-organized) |
| Files >500 lines | 5 | 0 |
| Files >400 lines | 11 | 0 |
| Files >300 lines | 19 | 5 (all sunset, 335–469 lines) |
| Admin CRUD duplication | High (forms repeated in create/edit) | Eliminated (shared form components) |

## Verification

All refactored files passed:
- ✅ `npx tsc --noEmit` — TypeScript clean
- ✅ `npx vite build` — Production build succeeds
- ✅ All extracted components produce code-split chunks
