# Afkar100 M4 Plan: Events & Queued Notifications

**Source:** `plans/afkar100_project_plan.md`  
**Scope:** Milestone 4, Logic for Events, Listeners, and Queued Emails  
**Milestone Goal:** Automate notifications and emails triggered by key platform events.

---

## Milestone
Implement the logic to trigger in-app and email notifications for Idea Approval, Comments, Winner Announcements, and Admin Alerts.

---

## Tasks

### Events & Listeners
- [ ] Create and trigger `IdeaApproved` event when an admin approves an idea.
- [ ] Create and trigger `CommentCreated` event when a user comments on an idea.
- [ ] Create and trigger `WinnerAnnounced` event.
- [ ] Create and trigger `IdeaSubmitted` event (for Admin notification - M2 TODO).

### Notifications (Laravel Database & Mail)
- [ ] Implement `IdeaApprovedNotification` (to owner and followers of owner).
- [ ] Implement `NewCommentNotification` (to idea owner and followers of the idea).
- [ ] Implement `WinnerAnnouncedNotification` (to the winner).
- [ ] Implement `IdeaStatusNotification` (for Rejections).
- [ ] Implement `AdminNewIdeaNotification` (Internal admin alert).

### Queuing (Laravel Queue)
- [ ] Configure `ShouldQueue` on all notification classes.
- [ ] Set up mailables for each notification type with RTL/Arabic support.
- [ ] Ensure `is_email_sent` (or similar tracking) works if needed (default Laravel behavior is sufficient for most).

### Verification
- [ ] Test `IdeaApproved` triggers notifications to followers.
- [ ] Test `CommentCreated` notifies the idea owner.
- [ ] Test `WinnerAnnounced` sends both in-app and email notifications.
- [ ] Verify jobs are correctly dispatched to the queue and processed.

---

## Deliverables
- [ ] Set of Event and Listener classes.
- [ ] Set of Notification classes (Database + Mail).
- [ ] Styled Email templates in Arabic and English.

---

## Done Criteria
- [ ] Automated notifications are triggered by platform activities.
- [ ] Emails are sent asynchronously via queues.
- [ ] All notifications are correctly localized.
- [ ] Admins receive alerts for new idea submissions.
