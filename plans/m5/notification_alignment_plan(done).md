# Plan: Locale-Aware Email Notifications for Contact Messages

## Objective
Enable email delivery for `NewContactMessageNotification` for admins. The email must use the system's standard layout (`mail.notification`), respect the visitor's locale (stored in the `contact_messages` table), and provide localized content for both Arabic and English.

---

## Implementation Steps

### 1. Database & Model Preparation
- [x] **Migration:** The migration `database/migrations/2026_05_24_105235_add_locale_to_contact_messages_table.php` already exists.
- [x] **Run Migration:** Migration applied to ensure the `locale` column is added to `contact_messages`.
- [x] **Model:** Updated `app/Models/ContactMessage.php` to include `locale` in the `$fillable` array.
- [x] **Controller:** Updated `app/Http/Controllers/App/ContactController@store` to save `app()->getLocale()` in the `locale` field.

### 2. Translation Preparation
- [x] **English Files:** Added localized keys to `lang/en/messages.php` for email content.
- [x] **Arabic Files:** Added localized keys to `lang/ar/messages.php` for email content.

### 3. Notification System Update
- [x] **`NewContactMessageNotification`:**
    - [x] Updated `via()` method to include the `'mail'` channel.
    - [x] Implemented `toMail(object $notifiable)`:
        - [x] Used renaming to `mail_locale` to avoid variable shadowing in the layout component.
        - [x] Used `view(['mail.notification', 'mail.notification-text'], [...])` to apply the project's standard email design.
        - [x] Passed localized strings for `subject`, `greeting`, `lines`, `actionText`, and `actionUrl`.

### 4. Verification
- [x] **Bug Fix:** Fixed text direction issue by passing `mail_locale` explicitly to the layout component.
- [x] **Manual Verification:** Verified that English submissions result in LTR emails and Arabic submissions result in RTL emails.
---
