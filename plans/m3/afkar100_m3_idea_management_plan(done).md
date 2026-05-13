# Afkar100 M3 Plan: Idea Management

**Source:** `plans/afkar100_project_plan.md`  
**Scope:** Milestone 3, Idea Management only  
**Milestone Goal:** The admin can review, approve, reject, and manage submitted ideas.

---

## Milestone

Deliver a complete admin workflow for reviewing pending ideas and managing approved and rejected ideas.

---

## Tasks

### 🛡️ Admin Dashboard (Metrics)
- [x] **Backend:** Add metrics data to `admin.dashboard` route (Ideas, Votes, Users, Sponsors counts)
- [x] **Frontend:** Replace placeholders in `resources/js/admin/pages/dashboard.tsx` with real metric cards

### 📋 Idea Management
- [x] **Backend: Admin Idea Controller**
    - Create `app/Http/Controllers/Admin/IdeaController.php`
    - Implement `index`: support filtering by status (pending, approved, rejected) and search
    - Implement `show`: return full idea details with media
    - Implement `updateStatus`: logic for approval (assigning `submission_day`) and rejection (recording `rejection_reason`)
- [x] **Backend: Requests & Routes**
    - Create `app/Http/Requests/Admin/UpdateIdeaStatusRequest.php`
    - Register routes in `routes/admin.php`
- [x] **Frontend: Idea Views**
    - Create `resources/js/admin/pages/ideas/index.tsx`: list view with status tabs
    - Create `resources/js/admin/pages/ideas/show.tsx`: full review page with action buttons (Approve/Reject)
- [x] **Notifications**
    - Create `app/Notifications/IdeaRejectedNotification.php`
    - Trigger notification when an idea is rejected, passing the reason

---

## Deliverables

- [x] Admin Dashboard with live metrics
- [x] `Admin/IdeaController` and associated routes
- [x] Idea listing (paginated, filtered) and review pages
- [x] Approval/Rejection workflow
- [x] User notification for rejection

---

## Done Criteria

- [x] Admin Dashboard shows correct platform stats
- [x] Admin can search and filter ideas by status
- [x] Approving an idea successfully sets the publishing day
- [x] Rejecting an idea requires a reason and triggers a notification
- [x] All idea states (pending/approved/rejected) are accessible in the admin panel
