# Project: 100Dollar (أفكار بـ 100 دولار)

A specialized platform for Arab small business ideas, allowing users to submit, browse, and vote on low-budget project ideas ($100 range). The platform features daily sponsors, weekly winners, and a robust community system with follows and notifications.

## Tech Stack

- **Backend:** PHP 8.3, Laravel 13
- **Frontend:** React 19, Inertia.js 3 (SPA), TypeScript
- **Styling:** Tailwind CSS v4 (RTL support)
- **Authentication:** Laravel Fortify (Context-aware: App/Admin)
- **Database:** MySQL (Production), SQLite (Local/Testing)
- **Testing:** Pest PHP
- **Routing:** Laravel Wayfinder (Typed frontend routes)
- **Localization:** Arabic (Primary/RTL) & English

## Key Commands

### Development
- `composer install` & `npm install`: Install dependencies.
- `composer run setup`: Automated local setup (install, env, key, migrate, build).
- `composer run dev`: Starts `artisan serve`, `queue:listen`, and `vite` concurrently.
- `php artisan db:seed`: Seeds the database with realistic Arab data.

### Quality & Testing
- `php artisan test`: Runs the Pest test suite.
- `composer run lint`: Formats PHP code with Laravel Pint.
- `npm run lint`: Checks and fixes JS/TS/React code with ESLint.
- `npm run format`: Formats frontend files with Prettier.
- `npm run types:check`: Runs TypeScript type checks.

## Architecture & Development Conventions

### Dual-Domain Structure
The project maintains a clear separation between the user-facing application and the admin dashboard within `resources/js`:
- `resources/js/app`: User-facing pages, components, and layout.
- `resources/js/admin`: Admin dashboard pages, settings, and layout.
- `resources/js/components`: Shared UI components (Radix UI, Headless UI).

### Authentication Logic
Authentication is handled by **Laravel Fortify** but is context-aware via `App\Support\Auth\AuthContext`. 
- Users are directed to either `app/pages/auth` or `admin/pages/auth` based on the URL context.
- There is a single `users` table with a `role` column (`admin` vs `user`).

### Routing
- **Backend:** Routes are split into `web.php` (localization & auth), `app.php` (user routes), and `admin.php` (admin routes).
- **Frontend:** Use Laravel Wayfinder for typed route generation. Import from `@/actions` or `@/routes`.

### Localization & RTL Support
- **Direction Awareness:** Every UI/UX change must be context-aware regarding text direction. Use logical properties (e.g., `ms-`, `me-`, `inset-inline-start`) or conditional classes based on the current locale to support both RTL (Arabic) and LTR (English) seamlessly.
- **Admin Panel (Exception):** The admin panel is **Arabic-only** and must always be **RTL**. Do NOT use localization helpers (e.g., `__()` or `lang-sync`) for the admin panel; hardcode Arabic strings directly into components and pages. Ensure all layouts and modals explicitly enforce `dir="rtl"`.
- **User App:** Continue to use localization helpers (`__()` in PHP/React) for the user-facing application to support both Arabic and English.

### Performance & Lazy Loading
For data that sits "below the fold" (e.g., comments, related items), use **Lazy Loading on Scroll** to minimize initial load time:
- **Backend:** Use `Inertia::optional(fn () => ...)` instead of `Inertia::defer`. `defer` auto-fetches on page mount, while `optional` waits for a frontend request.
- **Frontend:** Wrap the component in `<WhenVisible data="prop_name" fallback={<Skeleton />} buffer={300}>`.
- **Note:** Always ensure the child component handles the `null` state during the fetch by adding a conditional check: `{prop_name && <ChildComponent data={prop_name} />}`.

### Models & Relations
- **User:** Handles both admins and users. Uses `country_id` (foreign key to `countries`).
- **Idea:** The core entity. Belongs to a User, a Sponsor, a Category, and a Country.
- **Category:** Defines project categories (name_en, name_ar, icon).
- **Country:** Defines supported countries for users, ideas, and sponsorship requests (name_en, name_ar, code).
- **Vote:** OTP-verified votes to prevent spam.
- **Sponsor:** One unique sponsor per day of the week (0-6).
- **Notification:** In-app notification system.

## Project Structure
- `app/Actions/Fortify`: Custom authentication logic (registration, profile updates).
- `app/Http/Controllers/App`: Controllers for the user-facing application.
- `app/Http/Controllers/Admin`: Controllers for the admin dashboard.
- `plans/`: Detailed project milestones and architectural designs.
- `tests/`: Feature and Unit tests using Pest.

## Status: Milestone 2 in Progress
- **M1 (Infrastructure & Auth):** Completed. Database schema, models, factories, and context-aware auth are ready.
- **M2 (Core Pages):** Implementation started. Focus on Home page, Idea Submission, and OTP Voting.
