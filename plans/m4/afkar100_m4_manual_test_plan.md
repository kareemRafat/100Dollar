# M4 Manual Test Plan: Events & Queued Notifications

This document outlines the manual verification steps for the event-driven notification system and background job processing implemented in M4.

## 1. Idea Submission (Admin Notification)
- **Action:** Submit a new idea as a regular user.
- **Expected Outcome:**
  - `IdeaSubmitted` event is fired.
  - `AdminNewIdeaNotification` is queued.
  - Admin receives in-app notification (if logged in as admin).
  - Queue `notifications` processes the job.

## 2. Idea Approval (Approval Notification)
- **Action:** As an Admin, approve a pending idea.
- **Expected Outcome:**
  - `IdeaApproved` event is fired.
  - `NotifyIdeaFollowersJob` is dispatched to the `notifications` queue.
  - `IdeaApprovedNotification` is created for the Idea owner and all followers.
  - Notification appears in the user's notification list.
  - If configured, an email is sent to the user   /  followers.

## 3. Idea Rejection (Rejection Notification)
- **Action:** As an Admin, reject a pending idea.
- **Expected Outcome:**
  - `IdeaRejected` event is fired.
  - `IdeaRejectedNotification` is created for the Idea owner.
  - Notification appears in the user's notification list.

## 4. New Comment (Notification)
- **Action:** Post a comment on an idea you are following or that you own.
- **Expected Outcome:**
  - `CommentCreated` event is fired.
  - `NewCommentNotification` is created for the Idea owner.
  - Notification appears in the owner's notification list.

## 5. Winner Announcement
- **Action:** As an Admin, trigger the "Winner Announced" action for a week.
- **Expected Outcome:**
  - `WinnerAnnounced` event is fired.
  - `WinnerAnnouncedNotification` is created for the winner.
  - Notification appears in the winner's notification list.

## 6. RTL/Localization Audit
- **Action:** Perform steps 1-5 while the application locale is set to Arabic (`ar`).
- **Expected Outcome:**
  - Notifications display text in Arabic.
  - Email layout respects `dir="rtl"`.

## 7. Performance & Queue Verification
- **Action:** Create an idea with 50+ followers and trigger an approval.
- **Expected Outcome:**
  - Ensure the queue processes the `NotifyIdeaFollowersJob` in chunks.
  - Verify no memory spikes.
  - Verify all followers receive the notification.
