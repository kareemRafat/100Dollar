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
- [ ] Create `NotificationController` with methods for `index`, `markAsRead`, and `markAllAsRead`.
- [ ] Ensure `User` model is correctly using `Notifiable` trait.
- [ ] Define routes for notification management.

### Frontend (UI Components)
- [ ] Build a `NotificationBell` component in the `Navbar`.
- [ ] Implement a `NotificationDropdown` showing the last 10 notifications with relative time.
- [ ] Add an unread counter to the bell.
- [ ] Build a "All Notifications" page in the user profile (`Profile/Notifications.tsx`) with pagination.

### UX & Logic
- [ ] Implement "Mark as Read" when clicking a notification.
- [ ] Implement "Mark All as Read" functionality.
- [ ] Add real-time updates (using Inertia's `usePoll` or manual refresh triggers).

### Verification
- [ ] Confirm notifications are listed in the dropdown and full page.
- [ ] Verify unread counter updates correctly.
- [ ] Check that clicking a notification marks it as read and redirects to the relevant target.
- [ ] Verify "Mark All as Read" clears all unread states.

---

## Deliverables
- [ ] `NotificationController` and routes.
- [ ] `NotificationBell` and `NotificationDropdown` components.
- [ ] Full Notifications management page.

---

## Done Criteria
- [ ] Users receive and can view in-app notifications.
- [ ] Unread notifications are clearly distinguished.
- [ ] Notifications lead to their respective targets (e.g., specific Idea or Comment).
- [ ] Users can manage their notification history.
