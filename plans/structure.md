# Project Structure

## Routes

routes/
├─ web.php # Empty (placeholder)
├─ app.php # App routes (app._ prefix)
├─ admin.php # Admin routes (admin._ prefix, /admin URI prefix)
└─ console.php

### Route Naming Convention

| Scope   | URI Prefix      | Name Prefix       | Example                     |
| ------- | --------------- | ----------------- | --------------------------- |
| App     | /               | app.              | app.home                    |
| Admin   | /admin          | admin.            | admin.dashboard             |
| Admin   | /admin/settings | admin.settings.   | admin.settings.profile.edit |
| Fortify | /admin          | (Fortify default) | login, register, logout     |

## Backend

app/Http/Controllers/Settings/
├─ ProfileController.php
└─ SecurityController.php

## Frontend

resources/js/
├─ app.tsx
├─ actions/ # Wayfinder generated controller actions
├─ routes/ # Wayfinder generated named routes
│ ├─ index.ts # Fortify routes (login, register, logout) → /admin/_
│ ├─ admin/ # Admin custom routes
│ │ ├─ index.ts # admin.dashboard, admin.settings
│ │ └─ settings/
│ │ ├─ appearance/
│ │ ├─ password/
│ │ ├─ profile/
│ │ └─ security/
│ ├─ app/ # App custom routes
│ │ └─ index.ts # app.home
│ ├─ boost/
│ ├─ login/
│ ├─ password/
│ ├─ register/
│ ├─ storage/
│ ├─ two-factor/
│ └─ verification/
├─ wayfinder/
├─ components/
│ ├─ ui/ # shared base UI (shadcn)
│ ├─ admin/ # (future) admin-specific components
│ ├─ app/ # (future) app-specific components
│ └─ _.tsx # shared admin components (sidebar, header, etc.)
├─ hooks/
├─ lib/
├─ types/
├─ layouts/
│ ├─ admin/
│ │ ├─ admin-layout.tsx
│ │ ├─ admin-auth-layout.tsx
│ │ ├─ settings-layout.tsx
│ │ ├─ app/ # admin app sub-layouts
│ │ │ ├─ app-header-layout.tsx
│ │ │ └─ app-sidebar-layout.tsx
│ │ └─ auth/ # admin auth sub-layouts
│ │ ├─ auth-card-layout.tsx
│ │ ├─ auth-simple-layout.tsx
│ │ └─ auth-split-layout.tsx
│ └─ app/ # (future) app layouts
│ ├─ app-layout.tsx
│ └─ app-auth-layout.tsx
└─ pages/
├─ admin/
│ ├─ dashboard.tsx
│ ├─ auth/
│ │ ├─ login.tsx
│ │ ├─ register.tsx
│ │ ├─ forgot-password.tsx
│ │ ├─ reset-password.tsx
│ │ ├─ confirm-password.tsx
│ │ ├─ two-factor-challenge.tsx
│ │ └─ verify-email.tsx
│ └─ settings/
│ ├─ profile.tsx
│ ├─ security.tsx
│ └─ appearance.tsx
├─ app/ # (future) app pages
│ ├─ home.tsx
│ ├─ dashboard.tsx
│ ├─ auth/
│ │ ├─ login.tsx
│ │ ├─ register.tsx
│ │ ├─ forgot-password.tsx
│ │ └─ reset-password.tsx
│ └─ profile/
└─ welcome.tsx # temporary, will move to app/home.tsx
