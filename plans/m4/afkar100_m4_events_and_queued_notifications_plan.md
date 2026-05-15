# Afkar100 M4: Events & Queued Notifications (Milestones & Tasks)

**Milestone Goal:** Automate notifications and emails triggered by key platform events with a focus on database performance, queue scalability, and RTL/Localization support.

---

## M4.1: Infrastructure & Core Architecture
*Focus: Setting up the optimized foundation for notifications.*

- [x] **Task 4.1.1: Custom Notification Channel**
    - Implement `App\Notifications\Channels\CustomDbChannel` to map Laravel notifications to the custom `notifications` table.
- [x] **Task 4.1.2: Database Pruning**
    - Add `MassPrunable` trait to `App\Models\Notification`.
    - Define pruning logic (e.g., delete read notifications > 30 days).
    - Register `model:prune` in `routes/console.php` or `AppServiceProvider`.
- [x] **Task 4.1.3: RTL-Ready Email Layout**
    - Create a base mailable layout that dynamically sets `dir="rtl"` and `lang` based on recipient locale.

## M4.2: Events & Listeners Logic
*Focus: Defining the triggers for platform activity.*

- [x] **Task 4.2.1: Idea Approval & Rejection Events**
    - Create `IdeaApproved` and `IdeaRejected` events.
    - Update Admin controllers to trigger these events upon status change.
- [x] **Task 4.2.2: Community Activity Events**
    - Create `CommentCreated` event.
    - Create `WinnerAnnounced` event.
    - Create `IdeaSubmitted` event (Admin alert).
- [x] **Task 4.2.3: Listener Mapping**
    - Register listeners in `EventServiceProvider` or via Laravel's automatic discovery.

## M4.3: High-Performance Distribution Jobs
*Focus: Scalable notification delivery for large follower sets.*

- [x] **Task 4.3.1: Idea Follower Distribution**
    - Create `NotifyIdeaFollowersJob` using `chunkById(500)` to notify everyone following a specific idea.
- [x] **Task 4.3.2: User Follower Distribution**
    - Create `NotifyUserFollowersJob` to notify followers of an idea's owner when a new idea is approved.
- [x] **Task 4.3.3: Queue Configuration**
    - Ensure jobs are dispatched to specific queues (`notifications`, `emails`).

## M4.4: Notification Classes & Localization
*Focus: Implementing the actual notification content.*

- [x] **Task 4.4.1: User Notifications (In-App & Mail)**
    - Implement `IdeaApprovedNotification`.
    - Implement `NewCommentNotification`.
    - Implement `WinnerAnnouncedNotification`.
    - Implement `IdeaStatusNotification` (Rejections).
- [x] **Task 4.4.2: Admin Notifications**
    - Implement `AdminNewIdeaNotification`.
- [x] **Task 4.4.3: Translation Strings**
    - Add necessary Arabic and English strings to `lang/ar/messages.php` and `lang/en/messages.php`.

## M4.5: Verification & Testing
*Focus: Quality assurance and performance validation.*

- [ ] **Task 4.5.1: Unit & Feature Testing**
    - Write Pest tests to verify events trigger the correct jobs.
    - Verify notifications land in the `notifications` table with correct data.
- [ ] **Task 4.5.2: Stress Testing**
    - Simulate 1,000+ followers for an idea and verify the queue handles it without memory leaks.
- [ ] **Task 4.5.3: RTL/Localization Audit**
    - Manually verify email layouts in both Arabic (RTL) and English (LTR).

---

## Deliverables
1. Optimized `CustomDbChannel`.
2. Event-Listener-Distribution Job pipeline.
3. Localized Notification suite.
4. Automated Pruning system.
