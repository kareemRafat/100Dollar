# Afkar100 M3 Plan: Winner Management

**Source:** `plans/afkar100_project_plan.md`  
**Scope:** Milestone 3, Winner Management only  
**Milestone Goal:** The admin can confirm winners, publish announcements, and track prize delivery.

---

## Milestone

Deliver a winner management workflow that supports manual confirmation and scheduled fallback announcement logic.

---

## Tasks

### 🏆 Winner Selection & Workflow
- [x] **Backend: Winner Management**
    - Implement logic to identify the potential winner (highest `votes_count`) for a specific day
    - Create `confirmWinner` action: mark idea as `is_winner`, set `winner_announced_at`, and create `PrizeRecord`
- [x] **Backend: Routes**
    - Define winner-related routes in `routes/admin.php`
- [x] **Frontend: Winner Views**
    - Create `resources/js/admin/pages/winners/preview.tsx`: view showing the leading idea for "Today" and previous days this week
    - Add "Confirm Winner" action to the preview page

### ⏰ Automation & Scheduling
- [ ] **Console Command:** Create `app/Console/Commands/AnnounceWinner.php` to automatically confirm the winner if not done manually
- [ ] **Scheduler:** Register the command in `routes/console.php` to run daily at midnight
- [ ] **Notifications:**
    - Create `app/Notifications/WinnerAnnouncedNotification.php`
    - Trigger notification when a winner is confirmed (manual or automatic)

### 💰 Prize Tracking (Partial Review)
- [x] Track prize delivery status as `pending` or `delivered`
- [x] Ensure `PrizeRecord` is automatically created when a winner is confirmed

---

## Deliverables

- [x] Winner Preview/Confirmation page in Admin Panel
- [x] Manual and Automatic winner announcement logic
- [ ] Daily scheduler for winners
- [x] Prize delivery tracking UI
- [ ] Winner notification system

---

## Done Criteria

- [x] Admin can see the leading idea in real-time before announcement
- [x] Manual "Confirm Winner" marks the idea and creates a prize record
- [ ] Automatic fallback works via scheduler at midnight
- [ ] Winners receive a notification upon confirmation
- [x] Prize delivery status is manageable by Admin

