# Auth Structure

## What I changed

- Kept a single Fortify backend and made it role-aware instead of building two separate auth systems.
- Added a `role` column to `users` with two expected values:
  - `admin`
  - `user`
- Made new registrations always create `user` accounts.
- Added middleware so `/admin/*` protected routes only allow `admin` users.
- Added context-aware Fortify responses so redirects now follow the authenticated role:
  - `admin` -> `admin.dashboard`
  - `user` -> `app.home`
- Added dedicated admin entry routes:
  - `/admin/login`
  - `/admin/forgot-password`
- Kept the normal Fortify routes for the app/user side:
  - `/login`
  - `/register`
  - `/forgot-password`
  - `/reset-password/{token}`
- Made the Fortify views choose the correct Inertia page set based on auth context.
- Added password reset URL customization so reset emails preserve the correct auth context.
- Updated tests for role-based auth behavior.

## Main idea

Use one `users` table and one Fortify setup.

- The `role` column decides access.
- The auth page the user uses decides the required role during login.
- Admin pages authenticate only `admin` users.
- App pages authenticate only `user` users.

This is the cleanest approach here because:

- session auth stays standard Laravel/Fortify
- password reset / verification / 2FA stay in one place
- you avoid maintaining duplicated controllers and guards
- React pages stay split by UX, not by backend auth implementation

## Recommended auth rules

- Public user registration is only for `user` accounts.
- Admin accounts should be created manually, by seeder, or from an internal admin-management flow later.
- Do not expose public admin registration when role is the main distinction.

## `resources/js` structure

```text
resources/js
├─ layouts
│  ├─ admin
│  │  ├─ admin-auth-layout.tsx
│  │  └─ ...
│  └─ app
│     ├─ app-layout.tsx
│     └─ auth
│        └─ auth-layout.tsx
├─ pages
│  ├─ admin
│  │  ├─ auth
│  │  │  ├─ confirm-password.tsx
│  │  │  ├─ forgot-password.tsx
│  │  │  ├─ login.tsx
│  │  │  ├─ reset-password.tsx
│  │  │  ├─ two-factor-challenge.tsx
│  │  │  └─ verify-email.tsx
│  │  ├─ dashboard.tsx
│  │  └─ settings
│  └─ app
│     ├─ auth
│     │  ├─ confirm-password.tsx
│     │  ├─ forgot-password.tsx
│     │  ├─ login.tsx
│     │  ├─ register.tsx
│     │  ├─ reset-password.tsx
│     │  ├─ two-factor-challenge.tsx
│     │  └─ verify-email.tsx
│     └─ ...
└─ routes
   ├─ admin
   ├─ app
   └─ ...
```

## Backend pieces added or updated

- `app/Providers/FortifyServiceProvider.php`
  - role-aware Fortify views
  - role-aware authentication
  - role-aware redirect bindings
- `app/Support/Auth/AuthContext.php`
  - central auth context helper
- `app/Http/Middleware/EnsureUserRole.php`
  - route protection by role
- `app/Http/Responses/*`
  - custom Fortify redirect responses
- `routes/admin.php`
  - admin login and forgot-password entry pages
- `routes/app.php`
  - app protected routes limited to `user`
- `app/Models/User.php`
  - `role` added
  - email verification contract enabled
- `app/Actions/Fortify/CreateNewUser.php`
  - forces `role = user`
- `app/Providers/AppServiceProvider.php`
  - password reset links now preserve auth context

## Notes for you

- Existing users default to `user` after migration.
- You must manually promote admins by setting `role = admin`.
- If you want an admin creation flow later, build that separately from public registration.

## Verification

- Ran `php artisan wayfinder:generate --with-form --no-interaction`
- Ran `npm run build`
- Ran `vendor/bin/pint --dirty --format agent`
- Ran:

```bash
php artisan test --compact tests/Feature/Auth tests/Feature/DashboardTest.php tests/Feature/Settings
```

Result: `49 passed`
