# Milestone 5: Mega Component Refactoring Plan

## Overview
Systematically decompose the largest React components (300–950 lines) into focused, reusable pieces. The admin ideas show page (948→381 lines) is already done as a reference pattern. This plan covers the remaining 15+ files.

## Target Components by Size

| Priority | File | Lines | Type |
|----------|------|-------|------|
| P0 | `admin/pages/users/index.tsx` | 858 | Admin CRUD |
| P1 | `admin/pages/sponsors/index.tsx` | 772 | Admin CRUD |
| P2 | `app/pages/idea/show.tsx` | 613 | Public page |
| P3 | `app/components/top-nav-bar.tsx` | 578 | Shared component |
| P4 | `app/pages/idea/index.tsx` | 546 | Public page |
| P5 | `app/pages/sponsors/apply.tsx` | 496 | Public page |
| P6 | `app/pages/idea/partials/idea-form.tsx` | 469 | Shared partial |
| P7 | `admin/pages/sponsorship-requests/show.tsx` | 448 | Admin page |
| P8 | `admin/pages/ideas/index.tsx` | 432 | Admin CRUD |
| P9 | `components/two-factor-setup-modal.tsx` | 433 | Shared component |
| P10 | `app/pages/idea/partials/comment-section.tsx` | 401 | Shared partial |
| P11 | `admin/pages/prizes/index.tsx` | 376 | Admin page |
| P12 | `admin/pages/contacts/show.tsx` | 372 | Admin page |
| P13 | `admin/pages/users/show.tsx` | 363 | Admin page |
| P14 | `app/pages/sponsors/index.tsx` | 369 | Public page |
| P15 | `app/components/pin-modal.tsx` | 388 | Shared component |
| P16 | `app/components/notification-bell.tsx` | 335 | Shared component |
| P17 | `admin/pages/winners/preview.tsx` | 334 | Admin page |
| P18 | `app/pages/profile.tsx` | 326 | Public page |
| P19 | `app/pages/contact.tsx` | 322 | Public page |

---

## Milestone 1: Admin CRUD Pages & Detail Pages

These follow the same pattern as the ideas show refactor — inline CRUD dialogs are extracted to `components/` subdirectories.

### M1-P0: `admin/pages/users/index.tsx` (858→~300 lines)

**Current responsibilities:**
- Search bar + role/status/country filters
- Paginated users table with avatar, badges, actions
- Create user dialog (7-field form)
- Edit user dialog (7-field form, prefilled)
- Delete user confirmation dialog

**Files to create** (`resources/js/admin/pages/users/components/`):
- [ ] `user-filters.tsx` — Search input, role/status/country dropdowns, debounced URL sync
- [ ] `users-table.tsx` — Paginated table with avatar, name, email, country, role badge, status badge, action buttons
- [ ] `create-user-dialog.tsx` — 7-field form (name, email, password, country, role, phone, active toggle)
- [ ] `edit-user-dialog.tsx` — Same form, prefilled with existing data
- [ ] `delete-user-dialog.tsx` — Confirmation dialog with user name

### M1-P1: `admin/pages/sponsors/index.tsx` (772→~300 lines)

**Current responsibilities:**
- Sponsors table with logo, day_of_week, contract dates, counts
- Create sponsor dialog (name, day_of_week, contract dates, logo upload, active toggle)
- Edit sponsor dialog (same form, prefilled)
- Delete sponsor dialog
- Inline active status toggle via PATCH

**Files to create** (`resources/js/admin/pages/sponsors/components/`):
- [ ] `sponsors-table.tsx` — Table with logo avatar, day badges, dates, counts, toggle switch
- [ ] `sponsor-form-fields.tsx` — Shared form fields (name, day select, date pickers, logo upload with preview, active toggle)
- [ ] `create-sponsor-dialog.tsx` — Wraps form fields in dialog with create logic
- [ ] `edit-sponsor-dialog.tsx` — Wraps form fields in dialog with edit logic, prefilled
- [ ] `delete-sponsor-dialog.tsx` — Confirmation dialog with sponsor name

### M1-P8: `admin/pages/ideas/index.tsx` (432→~200 lines)

**Current responsibilities:**
- Search bar + status filter tabs
- Paginated ideas table with status badges
- Delete idea dialog

**Files to create** (`resources/js/admin/pages/ideas/components/`):
- [ ] `idea-search-header.tsx` — Search input + status filter tabs (shared with existing)
- [ ] `ideas-table.tsx` — Paginated table with title, user, status badge, date, actions
- [ ] Existing `delete-idea-dialog.tsx` from show.tsx refactor can be reused

### M1-P7: `admin/pages/sponsorship-requests/show.tsx` (448→~200 lines)

**Current responsibilities:**
- Request details display (company info, message, logo)
- Status management (approve/reject with processing state)
- Delete modal

**Files to create** (`resources/js/admin/pages/sponsorship-requests/components/`):
- [ ] `request-info-card.tsx` — Company name, email, phone, website, message, logo display
- [ ] `request-status-actions.tsx` — Approve/reject buttons with processing state
- [ ] `delete-request-dialog.tsx` — Confirmation dialog

### M1-P11: `admin/pages/prizes/index.tsx` (376→~200 lines)

**Current responsibilities:**
- Prizes table with filters
- Payout confirmation dialog

**Files to create** (`resources/js/admin/pages/prizes/components/`):
- [ ] `prizes-table.tsx` — Paginated table with idea, sponsor, amount, status
- [ ] `payout-confirm-dialog.tsx` — Confirmation with amount display
- [ ] `prize-filters.tsx` — Status/date filters

### M1-P12: `admin/pages/contacts/show.tsx` (372→~200 lines)

**Current responsibilities:**
- Contact message detail display
- Reply form with textarea
- Delete dialog

**Files to create** (`resources/js/admin/pages/contacts/components/`):
- [ ] `contact-message-display.tsx` — Sender info, subject, message body
- [ ] `reply-form.tsx` — Textarea + send button
- [ ] `delete-contact-dialog.tsx` — Confirmation dialog

### M1-P13: `admin/pages/users/show.tsx` (363→~200 lines)

**Current responsibilities:**
- User detail display
- User's ideas table
- User's votes table

**Files to create** (`resources/js/admin/pages/users/components/`):
- [ ] `user-profile-card.tsx` — Avatar, name, email, country, role, dates
- [ ] `user-ideas-table.tsx` — User's ideas list with status badges
- [ ] `user-votes-table.tsx` — Votes history list

### M1-P17: `admin/pages/winners/preview.tsx` (334→~180 lines)

**Current responsibilities:**
- Weekly winners grid display
- Confirm winner dialog per day

**Files to create** (`resources/js/admin/pages/winners/components/`):
- [ ] `winners-grid.tsx` — Grid of day-based winner cards
- [ ] `confirm-winner-dialog.tsx` — Confirmation with idea details
- [ ] `winner-card.tsx` — Individual day winner card (extract from inline)

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
- [ ] `partials/idea-meta-head.tsx` — All OG/Twitter meta tag logic extracted from `<Head>`
- [ ] `partials/rejection-notice.tsx` — Rejection banner with reason
- [ ] `partials/follow-actions.tsx` — Both follow-idea and follow-owner buttons with optimistic updates
- [ ] `partials/idea-image-modal.tsx` — Full-screen image dialog

### M2-P4: `app/pages/idea/index.tsx` (546→~250 lines)

**Current responsibilities:**
- Hero section with background image
- Statistics cards (various counts)
- Search bar with debounced URL navigation
- Status filter tabs
- Idea cards listing
- Delete confirmation dialog

**Files to create** (`resources/js/app/pages/idea/components/` or `partials/`):
- [ ] `partials/my-ideas-hero.tsx` — Hero section with background
- [ ] `partials/stats-cards.tsx` — Statistics display row
- [ ] `partials/idea-search-bar.tsx` — Search input + status tabs
- [ ] `delete-idea-dialog.tsx` — Confirmation dialog (can share with admin version)

### M2-P5: `app/pages/sponsors/apply.tsx` (496→~300 lines)

**Current responsibilities:**
- Company information form (name, email, phone, website)
- Drag-and-drop logo upload with preview
- Country selector
- Form validation errors

**Files to create** (`resources/js/app/pages/sponsors/components/`):
- [ ] `company-info-fields.tsx` — Name, email, phone, website inputs
- [ ] `sponsor-logo-uploader.tsx` — Drag-and-drop / click-to-upload with preview and validation
- [ ] `apply-form-actions.tsx` — Submit/cancel buttons with loading state

### M2-P14: `app/pages/sponsors/index.tsx` (369→~200 lines)

**Current responsibilities:**
- Week-organized sponsor listing
- Benefits section

**Files to create** (`resources/js/app/pages/sponsors/components/`):
- [ ] `sponsor-week-grid.tsx` — Week-by-week sponsor cards
- [ ] `benefits-section.tsx` — Benefits display

### M2-P18: `app/pages/profile.tsx` (326→~200 lines)

**Current responsibilities:**
- Tab-based profile page
- Lazy-loaded sections

**Files to create** (`resources/js/app/pages/profile/`):
- [ ] `partials/profile-tabs.tsx` — Tab navigation
- [ ] `partials/profile-details.tsx` — Profile info display/edit

### M2-P19: `app/pages/contact.tsx` (322→~180 lines)

**Current responsibilities:**
- Contact form with subject select
- Toast notification

**Files to create** (`resources/js/app/pages/contact/components/`):
- [ ] `contact-form.tsx` — Form fields with subject selector
- [ ] `contact-info-card.tsx` — Contact info sidebar

---

## Milestone 3: Shared Components & Partials

### M3-P3: `app/components/top-nav-bar.tsx` (578→~250 lines)

**Current responsibilities:**
- Mobile sheet menu with full navigation, auth state, dark mode, CTAs
- Desktop centered nav links with animated active indicator
- User dropdown (profile, my ideas, appearance, logout)
- Guest view (submit-idea CTA, login, register)
- Notification bell embedded
- RTL awareness

**Files to create** (`resources/js/app/components/`):
- [ ] `mobile-nav-sheet.tsx` — Mobile sheet with navigation + auth actions
- [ ] `desktop-nav-links.tsx` — Centered nav with animated indicator
- [ ] `user-nav-dropdown.tsx` — Profile/my ideas/appearance/logout dropdown
- [ ] `guest-nav-actions.tsx` — Submit idea, login, register buttons
- [ ] `appearance-nav-item.tsx` — Appearance toggle in dropdown

### M3-P6: `app/pages/idea/partials/idea-form.tsx` (469→~250 lines)

**Already a partial, but still large. Current responsibilities:**
- Category selector with icons
- Country select
- Multi-select for target audience
- Multi-select for marketing channels
- Image uploader
- PDF uploader
- Budget/prize section

**Files to create** (`resources/js/app/pages/idea/partials/`):
- [ ] `category-selector.tsx` — Category picker with icons
- [ ] `audience-multi-select.tsx` — Target audience multi-select
- [ ] `channel-multi-select.tsx` — Marketing channel multi-select
- [ ] `media-uploaders.tsx` — Image + PDF upload sections
- [ ] `budget-section.tsx` — Budget/prize breakdown

### M3-P9: `components/two-factor-setup-modal.tsx` (433→~200 lines)

**Current responsibilities:**
- QR code SVG rendering
- Recovery codes display with copy-to-clipboard
- OTP input verification
- Multi-step state management

**Files to create** (`resources/js/components/` or `resources/js/admin/components/`):
- [ ] `two-factor/scan-step.tsx` — QR code + secret display
- [ ] `two-factor/recovery-codes-step.tsx` — Codes with copy-all button
- [ ] `two-factor/verify-step.tsx` — OTP input with confirmation

### M3-P10: `app/pages/idea/partials/comment-section.tsx` (401→~200 lines)

**Current responsibilities:**
- Infinite scroll pagination (`WhenVisible`)
- Comment form submission
- Reply/like toggles
- Auth guard redirects

**Files to create** (`resources/js/app/pages/idea/partials/`):
- [ ] `comment-form.tsx` — Comment input + submit
- [ ] `comment-item.tsx` — Single comment display with reply/like/delete

### M3-P15: `app/components/pin-modal.tsx` (388→~200 lines)

**Current responsibilities:**
- Multi-step OTP modal
- Resend timer
- Email/pin input flow

**Files to create** (`resources/js/app/components/`):
- [ ] `pin/email-step.tsx` — Email input for OTP
- [ ] `pin/otp-step.tsx` — OTP input with resend timer

### M3-P16: `app/components/notification-bell.tsx` (335→~180 lines)

**Current responsibilities:**
- Polling for new notifications
- Dropdown with notification list
- Inline read/unread state management

**Files to create** (`resources/js/app/components/`):
- [ ] `notification-list.tsx` — Dropdown list with read/unread badges
- [ ] `notification-item.tsx` — Single notification row

---

## Pattern Summary

All refactors follow the same approach used for `admin/pages/ideas/show.tsx`:

1. **Identify inline dialogs/modals** — Extract each to its own file with typed props
2. **Identify repeated markup** (e.g., form fields duplicated in create/edit) — Extract shared form into a reusable component
3. **Identify self-contained sections** (cards, tables, sidebars) — Extract with minimal props interface
4. **Keep state & handlers in the parent** — Components are pure presentational, receiving data and callbacks via props
5. **Use `components/` subdirectory** — Same level as the page file, matching the admin page convention

### Expected Impact

| Metric | Before | After |
|--------|--------|-------|
| Largest file | 948 lines | ~380 lines (already done) |
| Files >500 lines | 5 | 0 |
| Files >400 lines | 11 | 0 |
| Files >300 lines | 19 | ~0 |
| Admin CRUD duplication | High (forms repeated in create/edit) | Eliminated (shared form components) |

## Verification

After each file refactor:
- [ ] Run `npx tsc --noEmit` — TypeScript must pass cleanly
- [ ] Run `npx vite build` — Production build must succeed
- [ ] Manually check the page renders correctly in the browser
