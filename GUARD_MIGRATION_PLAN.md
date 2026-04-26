# Guard Migration Plan

## Goal

Migrate the project from a shared context-based authentication model to two explicit session guards:

- `web` for the localized `App`
- `admin` for the non-localized `Admin`

Both guards will continue using the same `users` table and the same `User` model, with `role` used to restrict which accounts may authenticate into the admin area.

## Target Outcome

At the end of this migration:

- App authentication uses the `web` guard only
- Admin authentication uses the `admin` guard only
- Admin auth no longer depends on `_auth_context`
- Admin auth no longer depends on app-localized Fortify behavior
- Guest redirects, password confirmation, logout, and protected routes are guard-aware
- Auth tests assert behavior per guard

## Principles

- Keep one `users` table
- Keep one `User` model unless a second model becomes clearly necessary
- Separate auth flow by guard, not by request context field
- Keep admin non-localized
- Keep the rollout incremental and testable
- Remove mixed ownership of sensitive fields like `is_active`

## Milestone 1: Define the Auth Boundary

### Objective

Prepare the configuration and architecture decisions before changing behavior.

### Tasks

- Add an `admin` session guard in `config/auth.php`
- Decide whether `admin` uses the same `users` provider or a dedicated provider pointing to the same model
- Keep `web` as the default App guard
- Document the intended route ownership:
  - App auth routes belong to `web`
  - Admin auth routes belong to `admin`
- Decide final behavior for wrong-role access:
  - redirect to the correct area
  - or return `403`
- Confirm ownership of `is_active` as an admin-only account status field

### Deliverables

- Updated guard configuration
- Written decision on wrong-role behavior
- Written decision on `is_active`

## Milestone 2: Lock Down Sensitive Account State

### Objective

Fix the current auth boundary issues before or during the guard split.

### Tasks

- Remove `is_active` from App profile update validation
- Remove App UI controls that allow users to edit `is_active`
- Enforce `is_active = true` during authentication
- Add middleware to block or log out inactive users for both guards
- Review any other user-editable fields that affect authorization or account state

### Deliverables

- Users can no longer reactivate themselves
- Disabled accounts cannot sign in
- Disabled authenticated accounts cannot keep using protected areas

## Milestone 3: Introduce the `admin` Guard

### Objective

Create the new guard without fully switching all admin routes at once.

### Tasks

- Add `admin` guard definition in `config/auth.php`
- Decide session cookie behavior:
  - shared session cookie with separate guard state
  - or dedicated admin session strategy if later needed
- Update admin route protection from generic `auth` to `auth:admin`
- Review guest redirects in `bootstrap/app.php` so unauthenticated admin requests go to `admin.login`
- Review logout behavior so admin logout affects the `admin` guard cleanly
- Add targeted tests using:
  - `assertAuthenticatedAs($user, 'admin')`
  - `assertGuest('admin')`

### Deliverables

- Admin protected routes use `auth:admin`
- Admin guest redirection is guard-aware
- Basic admin guard auth tests exist

## Milestone 4: Separate Admin Login Flow

### Objective

Move admin login off the shared context-switching model.

### Tasks

- Replace `_auth_context = admin` login behavior with explicit `admin` guard authentication
- Create or refactor an admin login controller/action dedicated to the `admin` guard
- Restrict admin login to `role = admin`
- Enforce `is_active = true` for admin login
- Review remember-me behavior under the `admin` guard
- Remove any admin login dependency on `AuthContext`
- Update admin login page to post to the new admin-auth endpoint

### Deliverables

- Admin login authenticates through `admin`
- Non-admin users cannot sign in through the admin login flow
- `_auth_context` is no longer required for admin login

## Milestone 5: Separate Admin Logout and Guest Flow

### Objective

Make admin session handling explicit and independent.

### Tasks

- Create guard-aware admin logout handling
- Ensure admin logout only targets the intended guard behavior
- Verify App logout still behaves correctly for `web`
- Remove shared logout branching that depends on request context when possible
- Simplify guest redirect logic to use route area plus guard behavior rather than session context

### Deliverables

- Admin logout is explicit
- App logout is explicit
- Guest redirect logic is simpler and more predictable

## Milestone 6: Separate Admin Password Reset Flow

### Objective

Stop sending admin password reset behavior through the shared app-centered flow.

### Tasks

- Create admin-specific forgot-password entry point
- Create admin-specific reset-password display flow
- Ensure admin reset redirects return to `admin.login`
- Ensure admin reset pages remain non-localized
- Review whether password broker can remain shared or should be separated logically
- Remove reliance on `_auth_context` for reset-password behavior

### Deliverables

- Admin password reset works independently of app localization
- Reset redirects are guard-correct

## Milestone 7: Separate Admin Password Confirmation and Security Pages

### Objective

Make password confirmation and security-sensitive admin actions fully guard-aware.

### Tasks

- Replace context-driven password confirmation logic with admin-guard-aware logic
- Ensure admin confirmation pages do not fall back to localized URLs
- Review `password.confirm` middleware behavior for both areas
- Review security settings routes under `auth:admin`
- Verify admin two-factor settings continue to work correctly after guard separation

### Deliverables

- Admin confirm-password flow is independent from App localization
- Security pages work correctly under `auth:admin`

## Milestone 8: Review Email Verification and 2FA Strategy

### Objective

Decide how shared Fortify features should behave once guards are split.

### Tasks

- Decide whether App continues to use Fortify for:
  - registration
  - password reset
  - email verification
  - two-factor authentication
- Decide whether Admin should:
  - keep using Fortify with careful guard-specific integration
  - or move selected flows to explicit admin controllers
- Verify email verification redirects are correct for both areas
- Verify two-factor challenge flow is correct for both guards
- Ensure admin verification pages remain non-localized

### Deliverables

- Clear ownership map for Fortify features per area
- No guard confusion in verification or 2FA flows

## Milestone 9: Remove `AuthContext` as a Security Dependency

### Objective

Reduce or remove the old context-switching layer.

### Tasks

- Identify all usages of:
  - `AuthContext`
  - `_auth_context`
  - session `auth_context`
  - role-aware response classes that branch on request context
- Remove usages no longer needed after guard separation
- Keep only the minimum logic required for harmless UI decisions, if any
- Refactor redirect/response classes to be guard-aware or area-specific

### Deliverables

- `AuthContext` is no longer part of the main security boundary
- Request context fields are no longer required for admin auth flows

## Milestone 10: Clean Up Routes and Middleware

### Objective

Make the routing structure reflect the new architecture clearly.

### Tasks

- Review `routes/web.php` for App-only auth ownership
- Review `routes/admin.php` for Admin-only auth ownership
- Ensure admin routes remain non-localized
- Ensure App auth routes remain compatible with localized URLs
- Review `redirectGuestsTo` behavior in `bootstrap/app.php`
- Review role middleware usage after guards are introduced
- Remove redundant role checks where guard restrictions already make intent explicit

### Deliverables

- Route ownership is clear
- Middleware usage is simpler
- Admin and App auth routes are easier to reason about

## Milestone 11: Rebuild the Test Safety Net

### Objective

Make the auth test suite reflect the real architecture.

### Tasks

- Remove blanket `withoutMiddleware()` from auth tests
- Fix route expectations for localized App auth pages
- Fix component expectations so they match real Inertia component paths
- Add tests for `web` guard login/logout
- Add tests for `admin` guard login/logout
- Add tests for wrong-role access behavior
- Add tests for inactive user denial
- Add tests for admin password reset
- Add tests for admin password confirmation
- Add tests for admin email verification behavior if retained
- Use guard-specific assertions:
  - `assertAuthenticated('web')`
  - `assertAuthenticated('admin')`
  - `assertGuest('web')`
  - `assertGuest('admin')`

### Deliverables

- Auth tests match actual route behavior
- Guard-specific behavior is covered
- The suite becomes a reliable migration safety net

## Milestone 12: Final Cleanup

### Objective

Remove leftovers from the old design and stabilize the new one.

### Tasks

- Remove dead code tied to shared context auth
- Remove unused response classes
- Remove unused request fields from frontend forms
- Review naming for clarity
- Run focused auth and settings test suites
- Run formatting for modified PHP files with Pint

### Deliverables

- No stale `_auth_context` dependencies
- No stale context-based redirect logic
- Final auth architecture is consistent and maintainable

## Suggested Execution Order

1. Milestone 1: Define the auth boundary
2. Milestone 2: Lock down sensitive account state
3. Milestone 3: Introduce the `admin` guard
4. Milestone 4: Separate admin login flow
5. Milestone 5: Separate admin logout and guest flow
6. Milestone 6: Separate admin password reset flow
7. Milestone 7: Separate admin password confirmation and security pages
8. Milestone 8: Review email verification and 2FA strategy
9. Milestone 9: Remove `AuthContext` as a security dependency
10. Milestone 10: Clean up routes and middleware
11. Milestone 11: Rebuild the test safety net
12. Milestone 12: Final cleanup

## Recommended First Implementation Slice

If you want the safest low-risk first slice, do this first:

1. Add the `admin` guard
2. Move admin protected routes to `auth:admin`
3. Implement admin login on the `admin` guard
4. Remove App control over `is_active`
5. Enforce `is_active` during authentication
6. Add tests for admin login and inactive-user denial

This gives the highest security value early without requiring the whole auth system to be rewritten at once.

## Definition of Done

The migration is complete when:

- App auth uses `web` only
- Admin auth uses `admin` only
- Admin no longer depends on `_auth_context`
- Admin auth is fully non-localized
- Sensitive account state is not user-editable from App
- Inactive accounts are denied access consistently
- Auth tests pass with real middleware behavior
- The codebase no longer relies on shared context-switching as the main auth boundary
