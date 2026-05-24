# Milestone 5: Admin Contact Messages & Reply System

## Overview
Implement a management system for contact messages within the admin panel. This includes listing incoming messages, viewing details, sending a single admin reply to the visitor by email, storing that reply on the original message, and receiving real-time in-app notifications.

## Goals
1. **Centralized Management:** A dedicated admin area to track and manage all visitor inquiries.
2. **Direct Communication:** Enable admins to reply to messages directly from the dashboard.
3. **Real-time Awareness:** Notify admins immediately when a new message is received.
4. **Reply Record:** Store the one-time admin reply and timestamp on the contact message for reference.
5. **Clear Visitor Flow:** If a visitor wants to continue the conversation, they submit a new message through the Contact Us form.

---

## Phase 1: Database & Model Preparation
- [ ] **Migration:** Create migration to add `replied_at` (timestamp) and `reply_body` (text) to `contact_messages`.
- [ ] **Model:** Update `app/Models/ContactMessage.php` with new fillable fields.
- [ ] **Model:** Add `is_replied` attribute/accessor to the model.
- [ ] **Rule:** Treat replies as one-time only; do not create a separate replies/history table.

## Phase 2: Notifications & Emailing
- [ ] **Notification:** Create `app/Notifications/NewContactMessageNotification.php` using `CustomDbChannel`.
- [ ] **Mailable:** Create `app/Mail/ContactMessageReplyMail.php` for sending responses.
- [ ] **Logic:** Update `app/Http/Controllers/App/ContactController@store` to notify all admins.

## Phase 3: Admin Backend Development
- [ ] **Resource:** Create `app/Http/Resources/Admin/ContactMessageResource.php`.
- [ ] **Controller:** Create `app/Http/Controllers/Admin/ContactController.php` with `index`, `show`, `reply`, and `destroy` methods.
- [ ] **Reply Logic:** Validate `reply_body`, send `ContactMessageReplyMail` to the original message email, then save `reply_body` and `replied_at` on the message.
- [ ] **Reply Guard:** Prevent overwriting an existing reply unless a later requirement explicitly allows editing.
- [ ] **Routes:** Register contact management routes in `routes/admin.php`.
- [ ] **Wayfinder:** Regenerate Wayfinder actions/routes after adding admin contact routes.

## Phase 4: Admin Frontend Implementation
- [ ] **Sidebar:** Add "رسائل التواصل" to `resources/js/admin/components/app-sidebar.tsx` (under Prizes).
- [ ] **Notifications:** Update `resources/js/admin/components/notification-bell.tsx` to handle contact message redirects.
- [ ] **Listing Page:** Create `resources/js/admin/pages/contacts/index.tsx` with status badges.
- [ ] **Detail Page:** Create `resources/js/admin/pages/contacts/show.tsx` with message details and the stored reply state.
- [ ] **Reply Form:** Use an Inertia form (`<Form>` or `useForm`) wired through Wayfinder for the admin reply action.
- [ ] **Toasts:** Fire success/error toast feedback for contact forms, especially after admin reply submission.
- [ ] **Replied State:** Hide or disable the reply form once `is_replied` is true and show the saved reply body/timestamp instead.

## Phase 5: Localization & Testing
- [ ] **Translations:** Add required Arabic strings to `lang/ar/messages.php`.
- [ ] **Automated Tests:** Create `tests/Feature/Admin/ContactMessageTest.php` covering list/detail access, admin reply persistence, reply email sending, one-time reply guard, destroy behavior, and authorization.
- [ ] **Manual Verification:** Smoke test the entire flow from submission to reply.
