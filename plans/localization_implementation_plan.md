# Multi-Language Implementation Plan (English & Arabic)

This plan outlines the steps to implement a dual-language (EN/AR) system using `mcamara/laravel-localization` for URL prefixing and `laravel-lang-sync-inertia` for frontend translation synchronization.

## 1. Prerequisites & Installation

### Backend Packages
- [x] Install `mcamara/laravel-localization`: `composer require mcamara/laravel-localization`
- [x] Install `laravel-lang-sync-inertia`: `composer require erag/laravel-lang-sync-inertia`
- [x] Publish configurations:
    - `php artisan vendor:publish --provider="Mcamara\LaravelLocalization\LaravelLocalizationServiceProvider"`

### Frontend Packages
- [x] Install frontend bridge: `npm install @erag/lang-sync-inertia`

---

## 2. Backend Configuration (`mcamara/laravel-localization`)

- [x] **Configure Locales:** Update `config/laravellocalization.php` to include only `en` and `ar`.
- [x] **Middleware Setup:** Add the following to `app/Http/Kernel.php` (or `bootstrap/app.php` in Laravel 11+):
    - `LaravelLocalizationRoutes`
    - `LocalizationRedirectFilter`
    - `LocaleSessionRedirect`
- [x] **Route Grouping:** Wrap all web routes (except API/Webhooks) in the `LaravelLocalization` route group:
    ```php
    Route::group(['prefix' => LaravelLocalization::setLocale(), 'middleware' => [ 'localeSessionRedirect', 'localizationRedirect', 'localeViewPath' ]], function() {
        // Your routes here
    });
    ```

---

## 3. Translation Synchronization (`laravel-lang-sync-inertia`)

- [x] **Middleware Integration:** Update `HandleInertiaRequests.php` to share the current locale and sync translation files.
    - Add `use EramitGupta\LaravelLangSyncInertia\Facades\LangSync;` (Note: Used global helper `syncLangFiles` instead)
    - In the `share` method, add:
        ```php
        'locale' => app()->getLocale(),
        'translations' => syncLangFiles(['auth', 'pagination', 'passwords', 'validation']), // Define files to sync
        ```

---

## 4. Frontend Implementation (React)

- [x] **Setup Helper:** Create/Update a helper file (e.g., `resources/js/lib/i18n.ts`) to initialize the `__()` and `trans()` functions using the data shared by Inertia. (Note: Used `@erag/lang-sync-inertia/react` directly)
- [x] **Layout Integration:** 
    - Wrap the application or main layout to react to locale changes.
    - Dynamically update the `dir` attribute on the `<html>` or main wrapper (`ltr` for EN, `rtl` for AR).

---

## 5. RTL & Styling (Tailwind v4)

- [x] **Logical Properties:** Audit existing CSS/Tailwind classes to ensure use of logical properties:
    - Replace `ml-*` / `mr-*` with `ms-*` (margin-start) and `me-*` (margin-end).
    - Replace `pl-*` / `pr-*` with `ps-*` and `pe-*`.
    - Replace `left-*` / `right-*` with `inset-inline-start-*` / `inset-inline-end-*`.
- [x] **Font Handling:** Define specific fonts for Arabic (e.g., Vazirmatn or IBM Plex Sans Arabic) in `tailwind.config.js` or CSS variables. (Note: 'Cairo' is already configured)

---

## 6. Language Switcher Component

- [x] **Component Creation:** Create a `LanguageSwitcher` React component.
- [x] **Logic:** Use the `LaravelLocalization` helper URLs to generate links that switch the language while preserving the current path.

---

## 7. Translation File Organization

- [x] **PHP Files:** Ensure `lang/en/` and `lang/ar/` directories exist.
- [x] **Structure:** Mirror file names (e.g., `lang/en/messages.php` and `lang/ar/messages.php`) to ensure proper syncing.

---

## 8. Testing & Validation

- [x] Verify `/en/` and `/ar/` prefixes redirect correctly.
- [x] Confirm `App::getLocale()` matches the URL segment.
- [x] Validate that `__('key')` in React renders the correct translation for both languages.
- [x] Check layout flip (RTL) when switching to Arabic.
