# Afkar100 M4: Custom Email Branding & Localization

**Goal:** Wrap every email sent by the site in one custom Afkar100 email design with consistent branding, RTL/LTR support, localization, and safe dynamic content rendering.

---

## M4.6: Email Design System
*Focus: Build one reusable email foundation for all site emails.*

- [ ] **Task 4.6.1: Create Custom Base Layout**
    - Create `resources/views/mail/layout.blade.php` as the single HTML wrapper for site emails.
    - Set `lang` and `dir` from the active locale.
    - Add Afkar100 branding, logo/header, footer, colors, typography, button styles, and mobile-safe table layout.
    - Support Arabic right alignment and English left alignment.

- [ ] **Task 4.6.2: Create Shared Email Partials**
    - Create reusable partials under `resources/views/mail/partials/` for header, footer, button, panel, and optional subcopy.
    - Keep the partials simple and email-client friendly.
    - Escape dynamic content by default with `{{ }}`.

- [ ] **Task 4.6.3: Create Standard Message Views**
    - Create `resources/views/mail/notification.blade.php` for HTML notification emails.
    - Create `resources/views/mail/notification-text.blade.php` for plain-text notification emails.
    - Use a consistent data contract: `greeting`, `lines`, `actionText`, `actionUrl`, `salutation`, and optional `subcopy`.

## M4.7: Email Migration
*Focus: Move every site email into the new design without breaking existing behavior.*

- [ ] **Task 4.7.1: Migrate Idea Notification Emails**
    - Update `IdeaApprovedNotification`, `IdeaRejectedNotification`, and `WinnerAnnouncedNotification`.
    - Keep returning `MailMessage` from `toMail()`.
    - Use `subject(...)` and `view(['mail.notification', 'mail.notification-text'], [...])`.
    - Preserve queued notification behavior and user locale behavior.

- [ ] **Task 4.7.2: Migrate OTP Email**
    - Update `OtpVerificationMail` to use the custom email design.
    - Keep the OTP code prominent and readable in both Arabic and English.
    - Keep the existing locale handling behavior.

- [ ] **Task 4.7.3: Migrate Auth Emails**
    - Customize password reset and email verification emails so they use the same Afkar100 design.
    - Preserve signed URLs, reset tokens, queues, and security-sensitive behavior.
    - Keep Fortify/Laravel auth behavior intact.

- [ ] **Task 4.7.4: Centralize Email Translations**
    - Move email UI strings and message text into `lang/en/messages.php` and `lang/ar/messages.php`.
    - Include shared keys such as `hello`, `whoops`, `regards`, `all_rights_reserved`, and email footer text.
    - Avoid hardcoded Arabic or English strings in email Blade views and notification classes.

## M4.8: Verification & Safety
*Focus: Prove every email renders correctly in both languages.*

- [ ] **Task 4.8.1: Add Email Rendering Tests**
    - Add Pest tests for approved, rejected, winner, OTP, password reset, and email verification emails.
    - Assert each email renders with the custom layout.
    - Assert Arabic emails include `dir="rtl"` and English emails include `dir="ltr"`.
    - Assert translated subjects, greetings, body lines, buttons, and salutations are present.

- [ ] **Task 4.8.2: Add Security Assertions**
    - Test that dynamic values such as user names, idea titles, rejection reasons, and URLs are escaped unless explicitly trusted.
    - Verify password reset and verification links still work as signed/tokenized links.

- [ ] **Task 4.8.3: Manual Email Preview Audit**
    - Preview the main email types in Arabic and English.
    - Check desktop and mobile widths.
    - Check button alignment, text direction, spacing, and footer branding.

- [ ] **Task 4.8.4: Cleanup**
    - Keep `resources/views/vendor/mail` until all markdown-based emails no longer depend on it.
    - Remove only unused placeholder views after tests confirm no email references them.
    - Run `vendor/bin/pint --dirty --format agent` after PHP changes.
    - Run the targeted Pest tests for all migrated email types.

---

## Deliverables
1. One reusable custom Afkar100 email layout.
2. HTML and plain-text email views.
3. All site emails wrapped in the same branded design.
4. Localized Arabic and English email copy.
5. Consistent RTL/LTR support across transactional emails.
6. Pest coverage proving rendering, localization, and security behavior.
