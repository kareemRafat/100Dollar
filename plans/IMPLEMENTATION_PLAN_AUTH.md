# Implementation Plan: Admin & App Separation

This plan outlines the steps to restructure the `resources/js` directory and refine the Fortify authentication logic for a clean separation between the Admin panel and the User Application.

## Milestone 1: JS Directory Restructuring
Goal: Fully isolate Admin and App assets to prevent design "leakage."

- [x] **Task 1.1: Create New Directory Structure**
    - [x] Create `resources/js/admin/` (with subfolders: `components`, `hooks`, `layouts`, `pages`).
    - [x] Create `resources/js/app/` (with subfolders: `components`, `hooks`, `layouts`, `pages`).
- [x] **Task 1.2: Migrate Admin Assets**
    - [x] Move `resources/js/pages/admin/*` to `resources/js/admin/pages/`.
    - [x] Move `resources/js/layouts/admin/*` to `resources/js/admin/layouts/`.
    - [x] Identify and move Admin-only components from `resources/js/components/` to `resources/js/admin/components/`.
- [x] **Task 1.3: Migrate App Assets**
    - [x] Move `resources/js/pages/app/*` to `resources/js/app/pages/`.
    - [x] Move `resources/js/layouts/app/*` to `resources/js/app/layouts/`.
    - [x] Move Dashboard shell components (`app-*`) to `resources/js/admin/components/`.
    - [x] Organize User-facing components in `resources/js/app/components/`.
- [x] **Task 1.4: Organize Shared Assets**
    - [x] Keep `resources/js/components/ui/` for shared Shadcn primitives.
    - [x] Keep `resources/js/hooks/` and `resources/js/lib/` for truly global utilities (e.g., `use-appearance.ts`, `utils.ts`).
- [x] **Task 1.5: Update Entry Point & Imports**
    - [x] Update `resources/js/app.tsx` to resolve pages from the new locations.
    - [x] Perform a project-wide search and replace for import aliases (e.g., updating `@/layouts/admin/...` to `@/admin/layouts/...`).

## Milestone 2: Fortify Logic Refinement
Goal: Ensure robust, context-aware authentication and redirection.

- [x] **Task 2.1: Implement Context Middleware**
    - [x] Create a middleware to detect if a request is for `admin/*` or the main `app`.
    - [x] Store this context in the request/session to simplify logic in `AuthContext` and `FortifyServiceProvider`.
- [x] **Task 2.2: Refine Logout Logic**
    - [x] Update `RoleAwareLogoutResponse` to check the `User` model's role *before* the session is cleared to determine the correct redirect route (`admin.login` vs `login`).
- [x] **Task 2.3: Strengthen Authentication Hook**
    - [x] Ensure `Fortify::authenticateUsing` in `FortifyServiceProvider` strictly validates that a user's role matches the intended login portal.
- [x] **Task 2.4: Update Password Reset Logic**
    - [x] Ensure the `ResetPassword::createUrlUsing` in `AppServiceProvider` correctly appends the `auth_context` so the user is returned to the correct Reset Password design.

## Milestone 3: Validation & Cleanup
Goal: Verify that both "worlds" work independently and correctly.

- [x] **Task 3.1: Verify Page Resolution**
    - [x] Test that all Admin routes render using the new directory structure.
    - [x] Test that all App routes render using the new directory structure.
- [x] **Task 3.2: Auth Flow Testing**
    - [x] Verify Admin Login -> Dashboard redirect.
    - [x] Verify App Login -> App Home redirect.
    - [x] Verify Logout redirects to the correct login page based on the previous context.
- [x] **Task 3.3: Linting & Formatting**
    - [x] Run `vendor/bin/pint` and `npm run lint` to ensure code consistency across the new structure.
