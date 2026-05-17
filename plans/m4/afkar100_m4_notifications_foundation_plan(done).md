# Afkar100 M4 Plan: In-App Notifications

**Source:** `plans/afkar100_project_plan.md`  
**Scope:** Milestone 4, In-App Notifications UI and Backend  
**Milestone Goal:** Provide users with a real-time notification system within the application.

---

## Milestone
Deliver a notification bell in the navigation bar with a dropdown for recent notifications and a dedicated management page.

---

## Tasks

### Backend (Infrastructure)
- [x] Create `NotificationController` with methods for `index`, `markAsRead`, and `markAllAsRead`.
- [x] Ensure `User` model is correctly using `Notifiable` trait.
- [x] Define routes for notification management.

### Frontend (UI Components)
- [x] Build a `NotificationBell` component in the `Navbar`.
- [x] Implement a `NotificationDropdown` showing the last 10 notifications with relative time.
- [x] Add an unread counter to the bell.
- [x] Build a "All Notifications" page in the user profile (`Profile/Notifications.tsx`) with pagination.

### UX & Logic
- [x] Implement "Mark as Read" when clicking a notification.
- [x] Implement "Mark All as Read" functionality.
- [x] Add real-time updates (using Inertia's `usePoll` or manual refresh triggers).

### Verification
- [x] Confirm notifications are listed in the dropdown and full page.
- [x] Verify unread counter updates correctly.
- [x] Check that clicking a notification marks it as read and redirects to the relevant target.
- [x] Verify "Mark All as Read" clears all unread states.

---

## Deliverables
- [x] `NotificationController` and routes.
- [x] `NotificationBell` and `NotificationDropdown` components.
- [x] Full Notifications management page.

---

## Done Criteria
- [x] Users receive and can view in-app notifications.
- [x] Unread notifications are clearly distinguished.
- [x] Notifications lead to their respective targets (e.g., specific Idea or Comment).
- [x] Users can manage their notification history.
