# Afkar100 M4: Admin In-App Notifications

**Goal:** Implement a real-time notification system for the Admin Dashboard using Shadcn UI, matching the existing admin dashboard design and supporting RTL/Arabic.

---

## M4.9: Admin Notification UI Components
*Focus: Building the Shadcn-based notification interface for admins.*

- [x] **Task 4.9.1: Create Admin NotificationBell Component**
    - Create `resources/js/admin/components/notification-bell.tsx`.
    - Use Shadcn UI `DropdownMenu`, `Button`, and `ScrollArea`.
    - Enforce Arabic strings and RTL direction (Admin-only convention).
    - Implement relative time formatting in Arabic.
    - Handle admin-specific redirection (e.g., to `admin.ideas.show`).

- [x] **Task 4.9.2: Integrate Bell into Admin Header**
    - Update `resources/js/admin/components/app-header.tsx`.
    - Place the `NotificationBell` next to the user profile menu.
    - Ensure consistent spacing and alignment within the Shadcn-based header.

## M4.10: Admin Notification Management
*Focus: Providing admins with full history access and management.*

- [x] **Task 4.10.1: Define Admin Notification Routes**
    - Add admin-specific notification routes in `routes/admin.php` (if distinct management is needed).
    - Reuse `NotificationController` actions where applicable.

- [x] **Task 4.10.2: Build Admin Notifications Page**
    - Create `resources/js/admin/pages/notifications/index.tsx`.
    - Use Shadcn UI `Table` or a clean list design matching the Admin dashboard style.
    - Implement pagination and "Mark all as read" functionality.

## M4.11: Verification & UX
*Focus: Real-time behavior and data accuracy.*

- [x] **Task 4.11.1: Real-time Polling**
    - Use Inertia's `usePoll` to refresh notification counts for admins every 60 seconds.
- [x] **Task 4.11.2: End-to-End Test**
    - Submit an idea as a user.
    - Verify the notification appears in the admin bell instantly or after poll.
    - Verify clicking the notification takes the admin to the moderation page for that specific idea.

---

## Deliverables
1. Shadcn-based `NotificationBell` for Admin.
2. Integrated notifications in Admin Header.
3. Admin Notifications history page (Arabic/RTL).
