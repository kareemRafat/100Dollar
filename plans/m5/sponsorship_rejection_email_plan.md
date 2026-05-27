# Milestone 5: Sponsorship Request Status Email Notifications

## Overview
Send a localized email notification to the applicant whenever an admin updates the status of a sponsorship request — whether **approved** or **rejected**. Emails are sent in the applicant's language (captured on submission) using the `mail.notification` blade template, following the **Idea status change pattern** (Events + Listeners + Mailables).

---

## Phase 1: Database & Model
- [ ] **Migration:** Create `database/migrations/xxxx_add_rejection_reason_and_locale_to_sponsorship_requests_table.php`
    - Add nullable `text` column `rejection_reason`
    - Add nullable `string` column `locale` (length 10)
- [ ] **Model:** Edit `app/Models/SponsorshipRequest.php`
    - Add `'rejection_reason'` and `'locale'` to `#[Fillable]` attribute

## Phase 2: Events & Listeners
- [ ] **Event:** Create `app/Events/SponsorshipRequestApproved.php`
    - Follow `IdeaApproved` pattern: `Dispatchable`, `InteractsWithSockets`, `SerializesModels`
    - Constructor takes `SponsorshipRequest $sponsorshipRequest`
- [ ] **Event:** Create `app/Events/SponsorshipRequestRejected.php`
    - Follow `IdeaRejected` pattern: same traits
    - Constructor takes `SponsorshipRequest $sponsorshipRequest` and `string $reason`
- [ ] **Listener:** Create `app/Listeners/HandleSponsorshipRequestApproved.php`
    - Follow `HandleIdeaApproved` pattern
    - Send `SponsorshipRequestApprovedMail` via `Mail::to($request->email)->send(...)` with `$request->locale`
- [ ] **Listener:** Create `app/Listeners/HandleSponsorshipRequestRejected.php`
    - Follow `HandleIdeaRejected` pattern
    - Send `SponsorshipRequestRejectedMail` via `Mail::to($request->email)->send(...)` with `$request->locale` and reason

## Phase 3: Backend Logic
- [ ] **Capture locale on submit:** Edit `app/Http/Controllers/App/SponsorController.php`
    - Save `'locale' => app()->getLocale()` when creating the sponsorship request
- [ ] **Form Request:** Edit `app/Http/Requests/Admin/UpdateSponsorshipRequestStatusRequest.php`
    - Add `'rejection_reason' => ['required_if:status,rejected', 'string', 'max:1000']` to rules
- [ ] **Controller:** Edit `app/Http/Controllers/Admin/SponsorshipRequestController.php`
    - Update `updateStatus()` to dispatch events instead of sending mail directly:
        - `event(new SponsorshipRequestApproved($sponsorship_request))` when status is `approved`
        - `event(new SponsorshipRequestRejected($sponsorship_request, $validated['rejection_reason']))` when status is `rejected`
    - Add imports for events

## Phase 4: Mailables
- [ ] **Mailable:** Create `app/Mail/SponsorshipRequestApprovedMail.php`
    - `Mailable implements ShouldQueue`
    - Accept `SponsorshipRequest` and optional `?string $preferredLocale`
    - Set locale via `$this->locale($preferredLocale ?? app()->getLocale())`
    - Use `mail.notification` / `mail.notification-text` views
    - Content: `subject`, `greeting` (with `:company`), `lines`, `salutation`
- [ ] **Mailable:** Create `app/Mail/SponsorshipRequestRejectedMail.php`
    - `Mailable implements ShouldQueue`
    - Accept `SponsorshipRequest`, `string $reason`, and optional `?string $preferredLocale`
    - Set locale via `$this->locale($preferredLocale ?? app()->getLocale())`
    - Use `mail.notification` / `mail.notification-text` views
    - Content: `subject`, `greeting`, `lines`, `panelLabel`, `panelValue` (reason), `panelType` (`'panel-rejected'`), `salutation`

## Phase 5: Translations
- [ ] **English:** Add to `lang/en/messages.php` under `'notifications'`:
    - Approved:
        - `sponsorship_approved_mail_subject` = 'Sponsorship Request Approved'
        - `sponsorship_approved_mail_greeting` = 'Dear :company,'
        - `sponsorship_approved_mail_line1` = 'Congratulations! Your sponsorship request for :company has been approved.'
        - `sponsorship_approved_mail_line2` = 'You can now access your sponsor dashboard and start managing your presence on our platform.'
    - Rejected:
        - `sponsorship_rejected_mail_subject` = 'Update Regarding Your Sponsorship Request'
        - `sponsorship_rejected_mail_greeting` = 'Dear :company,'
        - `sponsorship_rejected_mail_line1` = 'Thank you for your interest. We have reviewed your application from :company.'
        - `sponsorship_rejected_mail_line2` = 'Unfortunately, your request does not meet our current requirements for the following reason:'
        - `sponsorship_rejected_mail_reason_label` = 'Reason for Rejection'
- [ ] **Arabic:** Add to `lang/ar/messages.php` under `'notifications'`:
    - Approved:
        - `sponsorship_approved_mail_subject` = 'تم قبول طلب الرعاية'
        - `sponsorship_approved_mail_greeting` = 'عزيزي :company،'
        - `sponsorship_approved_mail_line1` = 'تهانينا! تم قبول طلب الرعاية الخاص بـ :company.'
        - `sponsorship_approved_mail_line2` = 'يمكنك الآن الوصول إلى لوحة تحكم الراعي والبدء في إدارة تواجدك على المنصة.'
    - Rejected:
        - `sponsorship_rejected_mail_subject` = 'تحديث بخصوص طلب الرعاية الخاص بك'
        - `sponsorship_rejected_mail_greeting` = 'عزيزي :company،'
        - `sponsorship_rejected_mail_line1` = 'شكراً لاهتمامك بالرعاية على منصتنا. لقد راجعنا طلبك المقدم من :company.'
        - `sponsorship_rejected_mail_line2` = 'للأسف، لا يستوفي طلب الرعاية الخاص بك متطلباتنا الحالية للسبب التالي:'
        - `sponsorship_rejected_mail_reason_label` = 'سبب الرفض'

## Phase 6: Frontend
- [ ] **Types:** Edit `resources/js/types/models.ts`
    - Add `rejection_reason?: string` and `locale?: string` to `SponsorshipRequest` interface
- [ ] **Rejection dialog:** Edit `resources/js/admin/pages/sponsorship-requests/show.tsx`
    - Add `rejectionReason` state and `isRejectDialogOpen` state
    - Open dialog instead of directly patching when status is `rejected`
    - Add a `<Dialog>` with `<Textarea>` for the rejection reason
    - Confirm button sends `{ status: 'rejected', rejection_reason }`
- [ ] **Approval:** No extra frontend changes needed (approval sends immediately without additional input)

## Phase 7: Verification
- [ ] Run `php artisan test --compact --filter=SponsorshipRequest` (if tests exist)
- [ ] Submit a sponsorship request (locale captured)
- [ ] Approve it from admin — verify email received with correct language and content
- [ ] Create another request, reject it with a reason — verify email received with rejection reason displayed in correct language

---

## Flow

```
SponsorshipRequest submitted (locale captured)
  → Admin updates status
    → Controller dispatches event
      → Listener sends Mailable via Mail::to(applicant.email)->send(...)
        → Applicant receives HTML + plain-text email in their language
```

### Approved
```
SponsorshipRequestApproved event
  → HandleSponsorshipRequestApproved listener
    → SponsorshipRequestApprovedMail (congratulations, no panel)
```

### Rejected
```
SponsorshipRequestRejected event
  → HandleSponsorshipRequestRejected listener
    → SponsorshipRequestRejectedMail (reason in panel-rejected)
```
