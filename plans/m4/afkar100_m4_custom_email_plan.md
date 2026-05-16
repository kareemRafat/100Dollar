# Afkar100 M4: Custom Email Branding & Localization

**Goal:** Replace Laravel's core email notification templates with a fully custom, branded, and localization-aware system to ensure consistent RTL support and localized salutations.

---

## M4.6: Custom Email Template Infrastructure
*Focus: Establishing the branded email foundation.*

- [ ] **Task 4.6.1: Create Base Email Layout**
    - Create `resources/views/mail/layout.blade.php`.
    - Implement RTL/LTR-aware HTML structure using `dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}"`.
    - Inject brand colors (e.g., primary orange) and base typography.

- [ ] **Task 4.6.2: Create Notification View Components**
    - Create `resources/views/mail/components/message.blade.php` for standard email structure (Greeting, Body, Action, Salutation, Subcopy).
    - Ensure all strings are fetched from `messages.php` rather than hardcoded.

## M4.7: Notification Content Migration
*Focus: Migrating notification classes to the new template system.*

- [ ] **Task 4.7.1: Update Notification Classes**
    - Refactor `toMail()` method in:
        - `IdeaApprovedNotification`
        - `IdeaRejectedNotification`
        - `WinnerAnnouncedNotification`
    - Use `->view('mail.notification', [...])` instead of `MailMessage` to ensure the template is bypassed.

- [ ] **Task 4.7.2: Finalize Localization Strings**
    - Audit all email strings in `lang/ar/messages.php` and `lang/en/messages.php`.
    - Verify keys like `regards`, `hello`, `whoops` are correctly implemented.

## M4.8: Verification & Cleanup
*Focus: Quality assurance for branding and RTL.*

- [ ] **Task 4.8.1: RTL/LTR Audit**
    - Verify emails for Arabic users have `dir="rtl"` and correct right-alignment.
    - Verify emails for English users have `dir="ltr"` and correct left-alignment.
- [ ] **Task 4.8.2: Clean Up Unused Views**
    - Remove or deprecate old vendor-published mail views if no longer needed.
- [ ] **Task 4.8.3: Final Regression Testing**
    - Confirm all notification types (Approved, Rejected, Winner) are correctly rendered using the new branded templates.
---

## Deliverables
1. Custom `resources/views/mail/` directory.
2. Fully branded, localized email notification system.
3. Consistent RTL/LTR support across all transactional emails.
