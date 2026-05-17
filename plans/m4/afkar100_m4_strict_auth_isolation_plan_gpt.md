# Afkar100 M4: Strict Authentication Isolation Plan

**Goal:** Strengthen the separation between the main app (`web` guard) and admin panel (`admin` guard) so they behave as distinct authentication areas with clear redirects, guard boundaries, and reduced shared-session risk.

---

## M4.9: Isolation Strategy & Scope
*Focus: Define the target security model before changing auth behavior.*

- [ ] **Task 4.9.1: Confirm Isolation Model**
    - Decide whether strict isolation means separate browser sessions, forced single-area login, or separate admin subdomain/session cookie.
    - Recommended target: admin on a dedicated subdomain or clearly separated path with a dedicated session cookie strategy.
    - Document expected behavior when a user is already logged into one guard and visits the other guard's login page.

- [ ] **Task 4.9.2: Define Redirect Rules**
    - Define app-authenticated user behavior on `/admin/login`.
    - Define admin-authenticated user behavior on `/login`, `/register`, `/forgot-password`, and `/two-factor-challenge`.
    - Define logout behavior when both guards are authenticated in the same browser session.

- [ ] **Task 4.9.3: Define Test Matrix**
    - List all expected combinations for guest, app user, admin user, inactive user, unverified app user, and 2FA-pending user.
    - Include redirect expectations for localized app routes and non-localized admin routes.

## M4.10: Cross-Guard Access Hardening
*Focus: Prevent one authenticated area from behaving as a guest in the other area unless explicitly allowed.*

- [ ] **Task 4.10.1: Harden Guest Route Behavior**
    - Update app guest routes so authenticated admins are redirected to the admin dashboard or logged out before viewing app auth pages.
    - Update admin guest routes so authenticated app users are redirected to the app home/profile or logged out before viewing admin auth pages.
    - Replace current tests that expect cross-guard guest access with tests that expect strict separation.

- [ ] **Task 4.10.2: Review `AuthContext` Rules**
    - Audit `App\Support\Auth\AuthContext` for path-based assumptions.
    - Ensure login/home route resolution is explicit for `web` and `admin` contexts.
    - Avoid using the wrong guard's authenticated user when calculating redirects.

- [ ] **Task 4.10.3: Validate Protected Route Boundaries**
    - Confirm app protected routes require `auth`, `verified`, and `role:user`.
    - Confirm admin protected routes require `auth:admin` and `role:admin`.
    - Add regression tests proving a `web` user cannot access admin protected routes and an `admin` user cannot access app protected routes.

## M4.11: Session Isolation Improvements
*Focus: Reduce session bleed and make guard state easier to reason about.*

- [ ] **Task 4.11.1: Choose Session Separation Approach**
    - Option A: Keep one session cookie, but enforce single active guard per session.
    - Option B: Move admin to a subdomain and configure a separate session cookie/domain strategy.
    - Option C: Keep shared session storage but strictly namespace all temporary auth state and clear conflicting guard keys during login.
    - Recommended: Option B for strongest long-term isolation.

- [ ] **Task 4.11.2: Prevent Dual-Guard Login State**
    - On successful app login, decide whether to clear admin guard state.
    - On successful admin login, decide whether to clear web guard state.
    - Update logout tests to match the selected isolation model.

- [ ] **Task 4.11.3: Narrow Active User Checks**
    - Update `EnsureActiveUser` behavior to check only the guard relevant to the current request context.
    - Ensure an inactive app account does not unexpectedly invalidate an active admin request unless the chosen model requires full session invalidation.
    - Add tests for inactive users under both guards.

## M4.12: Admin Auth Feature Cleanup
*Focus: Align implemented routes with intended admin authentication features.*

- [ ] **Task 4.12.1: Resolve Admin Password Reset Decision**
    - Decide whether admin forgot/reset password should be supported.
    - If supported, register admin password reset routes and wire existing admin reset controllers.
    - If unsupported, remove or clearly deprecate unused admin reset controllers and keep tests proving admin reset routes are absent.

- [ ] **Task 4.12.2: Harden Admin 2FA Challenge**
    - Add rate limiting to `admin.two-factor.store`.
    - Confirm pending admin 2FA state uses only `admin_login.*` session keys.
    - Add tests for failed admin 2FA attempts and missing pending challenge state.

- [ ] **Task 4.12.3: Review Fortify Response Scope**
    - Confirm Fortify remains scoped to `web` only.
    - Remove unreachable admin branches from app/Fortify responses if no longer needed.
    - Ensure app password reset, confirmation, registration, verification, and 2FA redirects never target admin routes.

## M4.13: Verification & Regression Testing
*Focus: Prove the new isolation model works and stays stable.*

- [ ] **Task 4.13.1: Update Auth Separation Tests**
    - Update `AuthSeparationTest` to reflect strict isolation expectations.
    - Update `GuardAuthenticationTest` for selected logout/session behavior.
    - Add tests for authenticated cross-area guest route access.

- [ ] **Task 4.13.2: Run Focused Test Suite**
    - Run auth-related feature tests only first.
    - Run admin auth and settings/security tests.
    - Run the full test suite after focused tests pass.

- [ ] **Task 4.13.3: Manual QA Checklist**
    - Verify app login, register, forgot password, reset password, 2FA challenge, email verification, and logout.
    - Verify admin login, admin 2FA challenge, password confirmation, password change, and logout.
    - Verify redirects for unauthenticated, app-authenticated, admin-authenticated, inactive, and unverified users.

---

## Deliverables
1. A clear strict-auth isolation decision and documented redirect matrix.
2. Updated guard and guest-route behavior matching the selected isolation model.
3. Reduced or eliminated dual-guard session state in one browser session.
4. Admin auth routes aligned with intended feature scope.
5. Regression tests covering cross-guard access, redirects, 2FA, logout, and inactive-user handling.
