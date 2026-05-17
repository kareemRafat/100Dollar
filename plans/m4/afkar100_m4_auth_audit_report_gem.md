# Authentication System Audit Report

## 1. Executive Summary
The authentication system for **100Dollar** is robustly designed with a clear separation between the user-facing application (`web` guard) and the admin panel (`admin` guard). The implementation uses a "Context-Aware" approach to handle redirects, middleware, and sessions, ensuring that users and admins operate in isolated environments even though they share the same underlying database table.

## 2. Guard Separation
**Status: [PASSED]**

*   **Isolation Mechanism:** The system uses two distinct guards defined in `config/auth.php`.
*   **Login Logic:**
    *   **App (`web`):** Managed by Laravel Fortify. Restricted to `role = 'user'` via `FortifyServiceProvider::authenticateUsing`.
    *   **Admin (`admin`):** Managed by custom `AuthenticatedSessionController`. Restricted to `role = 'admin'` and uses the `admin` guard specifically.
*   **Observations:** Cross-guard login is impossible due to strict role filtering during the authentication phase.

## 3. Redirect Logic
**Status: [PASSED]**

*   **Context Awareness:** `App\Support\Auth\AuthContext` dynamically determines the correct login and home routes based on the request URI (`admin/*` vs others).
*   **Middleware Integration:** `bootstrap/app.php` correctly uses these context helpers for `redirectGuestsTo` and `redirectUsersTo`.
*   **Fortify Responses:** Custom responses like `AppLoginResponse` handle localized redirects and ensure admins logging into the app (if any) are redirected to the dashboard.

## 4. Fortify Configuration
**Status: [PASSED]**

*   **Scoping:** Fortify is correctly scoped to the `web` guard in `config/fortify.php`.
*   **Interference:** There is no evidence of Fortify interfering with the admin guard, as admin authentication is handled by dedicated controllers that do not rely on Fortify's internal routes.

## 5. Middleware & Protection
**Status: [PASSED with Recommendations]**

*   **Route Protection:**
    *   Admin routes use `auth:admin` and `role:admin`.
    *   App routes use `auth` (defaults to `web`) and `role:user`.
*   **Password Confirmation:** The `RequirePasswordConfirmation` middleware is context-aware, using separate session keys (`admin.auth.password_confirmed_at` vs `auth.password_confirmed_at`).
*   **Active User Check:** `EnsureActiveUser` middleware correctly validates account status for both guards and logs out inactive users across all sessions.

## 6. Session Isolation
**Status: [PASSED]**

*   **Key Separation:** Laravel naturally separates sessions by guard name (e.g., `login_web_...` and `login_admin_...`).
*   **State Leakage:** There is no risk of session bleeding because each guard checks its own specific session key. Even if a user has the same ID, their authentication state for each guard is independent.

## 7. Findings & Recommendations

### [MINOR] Missing Throttling on Admin 2FA
The admin 2FA challenge route (`admin.two-factor.store`) currently lacks rate limiting.
*   **Risk:** Potential for brute-forcing 2FA codes if an admin's password is compromised.
*   **Recommendation:** Apply `middleware('throttle:login')` or a custom rate limiter to the `admin.two-factor.store` route in `routes/admin.php`.

### [OPTIMIZATION] `EnsureActiveUser` Efficiency
The middleware loops through all guards on every request.
*   **Recommendation:** Optimize to only check the guard relevant to the current request context using `AuthContext::guard($request)`.

### [NOTE] Redundant Code in `AppLoginResponse`
The check for `role === 'admin'` in `AppLoginResponse` is effectively unreachable due to the filter in `FortifyServiceProvider`.
*   **Recommendation:** Keep it as a "defense-in-depth" measure, or remove it for clarity.

## 8. Conclusion
The authentication system is well-implemented and secure. The use of separate guards combined with role-based middleware provides strong isolation. Implementing the recommended throttling for Admin 2FA will further harden the system.
