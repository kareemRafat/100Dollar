# Dual-Context Authentication Architecture (App vs. Admin)

## Overview
This plan outlines a streamlined approach to handle authentication for both the **Admin Panel** and the **User App** using Laravel Fortify. Instead of duplicating logic or using separate guards, we leverage Fortify's flexibility to create a "Role-Aware" system that handles redirects, views, and actions based on the user's role and the request context.

### The Strategy: "Single Guard, Smart Logic"
1.  **Single Guard:** Use the default `web` guard for both Admin and App (simplifies sessions).
2.  **Response Contracts:** Override Fortify's internal response classes to redirect users based on their role (`admin` -> `/admin`, `user` -> `/home`).
3.  **Contextual Views:** Use the `FortifyServiceProvider` to detect the URL context (`/admin/login` vs `/login`) and render the appropriate React page.
4.  **Role Middleware:** Protect the Admin area using a strict `EnsureRole:admin` middleware.

---

## Milestones

### M1: Middleware & Route Protection
**Goal:** Ensure users are restricted to their authorized areas.

- [x] **Create `EnsureRole` Middleware:** A generic middleware that checks if `auth()->user()->role === $role`.
- [x] **Register Middleware:** Add it to `bootstrap/app.php` as an alias (e.g., `role`).
- [x] **Update Admin Routes:** Apply `middleware(['auth', 'verified', 'role:admin'])` to all routes in `routes/admin.php`.
- [x] **Update App Routes:** Ensure standard user routes use `auth` and `verified` middlewares.

### M2: Role-Aware Responses (The Redirect Logic)
**Goal:** Automatically send users to the right place after Login, Register, or Logout.

- [x] **Create `RoleAwareLoginResponse`:** Implementation of `Laravel\Fortify\Contracts\LoginResponse`.
- [x] **Create `RoleAwareRegisterResponse`:** Implementation of `Laravel\Fortify\Contracts\RegisterResponse`.
- [x] **Create `RoleAwareLogoutResponse`:** Implementation of `Laravel\Fortify\Contracts\LogoutResponse`.
- [x] **Bind Contracts:** Register these classes in `FortifyServiceProvider` using `$this->app->singleton()`.

### M3: Contextual View Routing
**Goal:** Use the same Fortify routes but show different React components based on the URL.

- [x] **Refactor `FortifyServiceProvider`:** 
    - In `loginView`, check `request()->is('admin/*')`.
    - Correctly renders `admin/auth/login` or `app/auth/login`.
- [x] **Duplicate for other views:** Applied logic for `registerView`, `requestPasswordResetLinkView`, etc.

### M4: Refined Actions
**Goal:** Ensure registration and profile updates handle the `role` and custom fields correctly.

- [x] **Update `CreateNewUser` Action:**
    - Detect context via hidden input `_auth_context` (handled via `AuthContext` helper).
    - Map custom fields (phone, country, nationality).
- [x] **Update `UpdateUserProfileInformation`:** Ensure secure updates.

### M5: Handling "Redirect If Authenticated"
**Goal:** Prevent logged-in users from seeing login pages, and ensure they go to the *right* dashboard.

- [x] **Modify `Guest` Middleware logic:** Updated `bootstrap/app.php` to use `redirectGuestsTo` and `redirectUsersTo` with role-aware logic.

---

## Technical Details

### Contract Binding Example
Implemented in `FortifyServiceProvider@register`.

### Middleware Logic Example
Implemented in `EnsureUserRole` middleware.

---

## Expected Outcome
- **Zero code duplication** in controllers.
- **Clean separation** of UI.
- **High Security.**
- **Improved UX.**
