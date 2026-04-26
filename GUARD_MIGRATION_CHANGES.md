# Guard Migration Changes

## Purpose

This file explains the guard migration work that has been completed around `GUARD_MIGRATION_PLAN.md`, what changed in the codebase, and why each change was necessary.

## Core Direction

The migration moved the project away from shared request/session auth context switching and toward explicit guard ownership:

- `web` owns App authentication flows
- `admin` owns Admin authentication flows
- both guards still use the same `users` table and `User` model
- `role` and `is_active` now enforce access boundaries instead of context flags

## Main Changes

### 1. Added an explicit `admin` session guard

Files:

- `config/auth.php`

Reason:

- Admin authentication needed its own guard state instead of piggybacking on `web`
- this makes middleware, redirects, logout behavior, and tests guard-specific

### 2. Replaced context-driven admin auth flows with admin-owned controllers

Files:

- `app/Http/Controllers/Admin/Auth/AuthenticatedSessionController.php`
- `app/Http/Controllers/Admin/Auth/ConfirmablePasswordController.php`
- `app/Http/Controllers/Admin/Auth/EmailVerificationController.php`
- `app/Http/Controllers/Admin/Auth/NewPasswordController.php`
- `app/Http/Controllers/Admin/Auth/PasswordResetLinkController.php`
- `app/Http/Controllers/Admin/Auth/TwoFactorController.php`
- `routes/admin.php`

Reason:

- admin login, logout, password reset, password confirmation, verification, and 2FA challenge needed to stop depending on shared Fortify context branching
- admin routes also needed to remain non-localized and always redirect back into the admin area

### 3. Restricted authentication by role and active state

Files:

- `app/Providers/FortifyServiceProvider.php`
- `app/Http/Controllers/Admin/Auth/AuthenticatedSessionController.php`
- `app/Http/Middleware/EnsureActiveUser.php`

Reason:

- App login should only authenticate `role = user`
- Admin login should only authenticate `role = admin`
- inactive users must be blocked both at sign-in time and while already authenticated

### 4. Removed App-side control over sensitive account state

Files:

- `app/Http/Controllers/App/ProfileController.php`
- `resources/js/app/pages/profile.tsx`
- `resources/js/app/pages/profile/partials/protection-settings.tsx`
- `tests/Feature/App/ProfileUpdateTest.php`

Reason:

- normal users should not be able to reactivate themselves or escalate their own authority
- this pass also re-checked other profile-submitted fields and added a regression test proving `role` cannot be changed through the App profile form

### 5. Replaced role-aware Fortify response branching with App-only response classes

Files:

- `app/Http/Responses/AppLoginResponse.php`
- `app/Http/Responses/AppLogoutResponse.php`
- `app/Http/Responses/AppPasswordConfirmedResponse.php`
- `app/Http/Responses/AppPasswordResetResponse.php`
- `app/Http/Responses/AppRegisterResponse.php`
- `app/Http/Responses/AppTwoFactorLoginResponse.php`
- `app/Http/Responses/AppVerifyEmailResponse.php`
- `app/Providers/FortifyServiceProvider.php`

Removed:

- `app/Http/Responses/RoleAwareLoginResponse.php`
- `app/Http/Responses/RoleAwareLogoutResponse.php`
- `app/Http/Responses/RoleAwarePasswordConfirmedResponse.php`
- `app/Http/Responses/RoleAwarePasswordResetResponse.php`
- `app/Http/Responses/RoleAwareRegisterResponse.php`
- `app/Http/Responses/RoleAwareTwoFactorLoginResponse.php`
- `app/Http/Responses/RoleAwareVerifyEmailResponse.php`

Reason:

- after the guard split, App Fortify responses no longer needed to inspect auth context to guess which area owned the request
- simpler response ownership reduces auth boundary mistakes

### 6. Removed `AuthContext` from the security boundary

Removed:

- `app/Support/Auth/AuthContext.php`
- `app/Http/Middleware/SetAuthContext.php`

Reason:

- admin authentication is now guard-owned, so request/session context flags are no longer required to make security decisions
- this lowers coupling between routing, middleware, and Fortify response behavior

### 7. Made logout behavior guard-safe

Files:

- `app/Http/Controllers/App/Auth/AuthenticatedSessionController.php`
- `routes/web.php`
- `tests/Feature/Auth/AuthenticationTest.php`

Reason:

- the default Fortify logout controller invalidates the whole session
- because `web` and `admin` share the same session cookie, that behavior could clear the admin guard unintentionally
- the new App logout controller only logs out `web`, clears Fortify’s web login session keys, regenerates the session ID, and leaves `admin` authenticated

### 8. Centralized area-aware guest redirects and route protection

Files:

- `bootstrap/app.php`
- `routes/admin.php`
- `routes/web.php`
- `app/Http/Middleware/RequirePasswordConfirmation.php`
- `app/Http/Middleware/EnsureUserRole.php`

Reason:

- guest redirects should be based on route area, not session auth context
- admin protected routes should always use `auth:admin`
- role middleware remains in admin areas as defense-in-depth, even after guard restrictions

### 9. Updated tests to assert guard ownership directly

Files:

- `tests/Feature/Admin/GuardAuthenticationTest.php`
- `tests/Feature/Admin/EmailVerificationTest.php`
- `tests/Feature/Admin/TwoFactorAuthenticationTest.php`
- `tests/Feature/Auth/AuthenticationTest.php`
- `tests/Feature/Auth/InactiveUserAccessTest.php`
- `tests/Feature/DashboardTest.php`
- `tests/Feature/App/ProfileUpdateTest.php`

Reason:

- the migration needed test coverage for:
  - admin guard login/logout
  - web guard login/logout
  - inactive-user denial
  - wrong-role access behavior
  - profile-field boundary enforcement

## Verification Performed

- Ran `vendor/bin/pint --dirty --format agent`
- Ran targeted auth/profile regression tests:
  - `users can authenticate using the app login screen`
  - `users can logout to the app login page`
  - `app logout clears only the web guard session`
  - `admins can authenticate through the admin guard login flow`
  - `admin logout clears only the admin guard session`
  - `users can update their app profile without changing account status`
  - `users cannot escalate their role through the app profile update`

## Important Note

The guard migration itself is now substantially complete, but one test-suite cleanup item is still open in `GUARD_MIGRATION_PLAN.md`:

- localized App auth page route expectations in PHPUnit are still inconsistent with how the localization package bootstraps routes during tests

That is a test-environment cleanup concern, not a remaining `AuthContext` security dependency.
