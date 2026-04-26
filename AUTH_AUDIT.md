# Authentication Audit

## Scope

This review covers the current authentication setup for:

- `App`: localized public application
- `Admin`: non-localized admin dashboard

The project currently uses:

- Laravel Fortify
- A single `users` table
- A `role` column to distinguish `user` vs `admin`
- One shared `web` guard

## Executive Summary

The current implementation shows a clear intent to separate `App` and `Admin`, but the separation is only partial.

The frontend entry points are split, and the redirect logic is role-aware, but both areas still share one Fortify backend, one guard, and one session-driven auth context model.

This approach can work in a small system, but only if the boundary is enforced strictly. Right now there are gaps that weaken the separation.

## Key Findings

### 1. Disabled accounts are not blocked from logging in

Severity: High

The `users` table contains an `is_active` flag, but login does not enforce it.

Current login validation in:

- [app/Providers/FortifyServiceProvider.php](C:\Users\Kareem\Desktop\Projects\100dollar\app\Providers\FortifyServiceProvider.php:127)

The authentication callback checks:

- email
- role
- password

It does **not** check:

- `is_active`

Impact:

- A disabled user can still log in
- A disabled admin can still log in
- Existing sessions are not invalidated based on account status

Recommendation:

- Add an `is_active` check inside `Fortify::authenticateUsing()`
- Add middleware to block or log out inactive users on future requests

### 2. Normal users can update `is_active` from the App profile

Severity: High

The App profile flow allows a user to submit `is_active`, and the controller persists it.

Relevant files:

- [app/Http/Controllers/App/ProfileController.php](C:\Users\Kareem\Desktop\Projects\100dollar\app\Http\Controllers\App\ProfileController.php:49)
- [resources/js/app/pages/profile/partials/protection-settings.tsx](C:\Users\Kareem\Desktop\Projects\100dollar\resources\js\app\pages\profile\partials\protection-settings.tsx:59)

Impact:

- If `is_active` is intended as an admin-controlled account status field, a user can reactivate themselves
- This breaks the App/Admin boundary around account control

Recommendation:

- Remove `is_active` from the App profile update request
- Remove the App UI control for it
- Reserve `is_active` for admin-only account management

### 3. App and Admin are not fully independent auth systems

Severity: Medium

The current architecture is not two independent authentication systems. It is one shared Fortify backend with context switching.

Shared pieces include:

- one `web` guard
- one Fortify route set
- one session context key
- one `users` table

The split is currently implemented through:

- separate App/Admin login pages
- `_auth_context`
- route/path inference
- role-aware response classes

Relevant files:

- [app/Support/Auth/AuthContext.php](C:\Users\Kareem\Desktop\Projects\100dollar\app\Support\Auth\AuthContext.php:14)
- [routes/web.php](C:\Users\Kareem\Desktop\Projects\100dollar\routes\web.php:48)
- [routes/admin.php](C:\Users\Kareem\Desktop\Projects\100dollar\routes\admin.php:11)

What is actually separate:

- login page UI
- forgot-password page UI
- some redirect behavior

What is still shared:

- login POST
- logout POST
- password reset POST
- verification routes
- two-factor challenge route
- password confirmation backend flow

Conclusion:

- The UI is partly separated
- The auth backend is not fully separated

### 4. Password confirmation fallback is not admin-safe

Severity: Medium

The fallback in:

- [app/Http/Responses/RoleAwarePasswordConfirmedResponse.php](C:\Users\Kareem\Desktop\Projects\100dollar\app\Http\Responses\RoleAwarePasswordConfirmedResponse.php:25)

always builds a localized URL through `LaravelLocalization::getLocalizedURL(...)`.

This is correct for `App`, but wrong as a fallback strategy for `Admin`, because admin intentionally has no localized URL structure.

Impact:

- Admin password-confirm flows may behave incorrectly when no intended URL exists in session

Recommendation:

- Branch explicitly by context or role
- Use localized URLs only for `App`
- Use plain `route('admin.dashboard')` fallback for `Admin`

### 5. Wrong-role handling is inconsistent

Severity: Medium

The role middleware aborts with `403`:

- [app/Http/Middleware/EnsureUserRole.php](C:\Users\Kareem\Desktop\Projects\100dollar\app\Http\Middleware\EnsureUserRole.php:15)

But the tests expect standard users hitting admin routes to be redirected to the App home page:

- [tests/Feature/DashboardTest.php](C:\Users\Kareem\Desktop\Projects\100dollar\tests\Feature\DashboardTest.php:18)

This is not a direct vulnerability, but it shows the intended UX and the real implementation are not aligned.

Recommendation:

- Decide the expected behavior explicitly
- If the desired behavior is redirect, implement it consistently
- If the desired behavior is `403`, update tests and keep it consistent everywhere

### 6. The auth-related test suite is not reliable right now

Severity: Medium

The current test suite does not provide a dependable safety net for auth changes.

Example:

- [tests/Feature/Auth/AuthenticationTest.php](C:\Users\Kareem\Desktop\Projects\100dollar\tests\Feature\Auth\AuthenticationTest.php:7) disables middleware globally

That causes false assumptions in session-dependent auth pages and hides actual route behavior.

I ran:

```bash
php artisan test --compact tests/Feature/Auth tests/Feature/DashboardTest.php tests/Feature/Settings/SecurityTest.php tests/Feature/Settings/ProfileUpdateTest.php
```

Result:

- `29 failed`
- `20 passed`

Observed issues included:

- session-dependent pages failing when middleware is disabled
- incorrect expected Inertia component names in tests
- localization-aware redirects not matching test expectations
- role/redirect expectations not matching real middleware behavior

Recommendation:

- Fix the auth tests before relying on them for future changes
- Avoid blanket `withoutMiddleware()` in auth feature tests

## What Is Working Well

The current implementation does have some solid foundations:

- Admin is intentionally kept non-localized
- App is intentionally localized
- Guest redirects are aware of `/admin` vs public routes
- Admin registration is not exposed in the UI
- Registration creates users with `role = user`
- Role-aware response classes already exist for several Fortify flows

Relevant files:

- [bootstrap/app.php](C:\Users\Kareem\Desktop\Projects\100dollar\bootstrap\app.php:49)
- [app/Actions/Fortify/CreateNewUser.php](C:\Users\Kareem\Desktop\Projects\100dollar\app\Actions\Fortify\CreateNewUser.php:24)

## Separation Assessment

### Current State

The current system is **partially separated**, not fully separated.

### App

- localized URLs
- public registration enabled
- user-facing auth UI

### Admin

- non-localized URLs
- registration hidden in UI
- admin-facing auth UI

### Shared Backend

- same guard
- same Fortify backend
- same user provider
- same user table
- same session-driven auth context

Conclusion:

- `App` and `Admin` are visually separated
- They are not fully independent authentication systems

## Recommended Architecture

## Option 1: Best simple architecture

Recommended.

Keep:

- one `users` table
- one guard if you want to keep operations simple
- one `role` column

Change:

- keep Fortify for the public App auth flow
- use a dedicated admin auth flow under `/admin/*`
- keep admin route handlers and redirects fully separate from localized app auth behavior

This gives you:

- simpler reasoning
- clearer route ownership
- less fragile context switching
- better long-term maintainability

This is the best balance between:

- security
- simplicity
- maintainability

## Option 2: Keep Fortify shared, but enforce hard separation

Acceptable, but more fragile.

If you keep the current design:

- stop trusting `_auth_context` as the main boundary
- derive context from route group/path first
- create explicit admin-prefixed auth endpoints where needed
- ensure every response class branches correctly for admin vs app
- ensure every sensitive field is owned by the correct area only

This can work, but it will always require more discipline than Option 1.

## Practical Changes to Apply First

These are the highest-value changes with the lowest complexity:

1. Remove `is_active` from the App profile update flow
2. Enforce `is_active` during login
3. Add middleware that blocks inactive authenticated users
4. Fix `RoleAwarePasswordConfirmedResponse` so admin never falls back to localized URLs
5. Decide whether wrong-role access should redirect or return `403`, then standardize it
6. Repair the auth test suite so it reflects the real routing and localization behavior

## Security Best Practices

- Keep admin-only account state fully server-controlled
- Do not expose authorization boundary fields in user-editable forms
- Do not rely on client-submitted context fields as the main security boundary
- Prefer route structure and middleware over UI assumptions
- Keep localized and non-localized auth flows explicitly separated
- Test login, logout, reset-password, verify-email, 2FA, and password-confirm flows for both App and Admin

## Final Assessment

The current implementation is close to a workable setup, but it is not yet cleanly separated enough to be considered robust.

The main concerns are:

- inactive accounts are not enforced
- users can currently write a boundary-sensitive field
- App/Admin separation depends too heavily on shared Fortify routes and mutable auth context

The system can be improved without unnecessary complexity.

The most practical path is:

- keep one `users` table
- keep the role model simple
- separate admin auth flow more explicitly
- remove mixed ownership of auth/account-status fields
- rebuild the auth tests as a trustworthy safety net

## Assumption

This review assumes `is_active` is intended to be an admin-controlled account status field, not a user-controlled profile visibility setting.

If that assumption is incorrect, the field should be renamed immediately, because the current implementation mixes two different responsibilities under one name.
