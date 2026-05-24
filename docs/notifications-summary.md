# 100Dollar Notification System Summary

## Admin Notifications
These are sent to all users with the `admin` role.

| Notification | Trigger Condition | In-App | Email |
| :--- | :--- | :---: | :---: |
| **New Idea Submitted** | When a user submits a new project idea. | ✅ | ❌ |
| **New Contact Message** | When a visitor sends a message via the Contact Us form. | ✅ | ✅ |

---

## User Notifications
These are sent to regular users based on their activity and submissions.

| Notification | Trigger Condition | In-App | Email |
| :--- | :--- | :---: | :---: |
| **Idea Approved** | When an admin approves a pending idea. | ✅ | ✅ |
| **Idea Rejected** | When an admin rejects an idea (includes reason). | ✅ | ✅ |
| **Winner Announced** | When an idea is selected as the $100 prize winner. | ✅ | ✅ |
| **New Comment** | When someone comments on the user's idea. | ✅ | ✅* |
| **New Follower** | When another user follows the user's profile. | ✅ | ❌ |

---

## Technical Notes
- **Email Delivery:** Handled via queued jobs (`ShouldQueue`) to ensure fast performance.
- **In-App:** Stored in the `notifications` table and resolved dynamically for RTL/Localization.
- **Locale Persistence:** Contact messages store the visitor's locale to ensure admin notifications and replies match the original submission's language and direction (RTL/LTR).
- **New Comment Emails:** (*) Email notifications for new comments are sent **only to the idea owner** to keep them informed without over-notifying followers.
- **Admin Panel:** Always redirects to moderation/dashboard views.
- **App Panel:** Redirects to the specific idea or profile page.
