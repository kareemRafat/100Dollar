# Milestone 3: Admin Ideas Performance & Comment Moderation

This milestone focuses on optimizing the admin experience for managing ideas and providing tools for comment moderation while maintaining high performance.

## Objectives
1. **Performance:** Reduce initial load times for admin idea pages using Inertia v3 features.
2. **Moderation:** Allow admins to soft-delete comments that violate terms, showing a placeholder in the public app.
3. **Responsiveness:** Use partial reloads and prefetching to make the admin UI feel instantaneous.

---

## Milestone 1: Database & Model Foundation
- [ ] **Task 1.1: Migration for Soft Deletes**
    - Create a migration to add `deleted_at` to the `comments` table.
    - **Performance:** Add a database index to the `deleted_at` column to ensure no impact on query speed.
- [ ] **Task 1.2: Model Configuration**
    - Add `SoftDeletes` trait to the `Comment` model.
    - Ensure relations are properly handled when comments are trashed.

## Milestone 2: Backend Logic & Optimization
- [ ] **Task 2.1: Admin Idea Index Optimization**
    - Update `Admin/IdeaController@index` to support partial reloads for filters.
- [ ] **Task 2.2: Deferred Comments Loading**
    - Update `Admin/IdeaController@show` to wrap `comments` in `Inertia::optional()`.
    - Include `withTrashed()` in the admin comments query so admins can see moderated content.
- [ ] **Task 2.3: Comment Moderation Route & Action**
    - Create `Admin/CommentController` with a `destroy` method.
    - Define `DELETE /admin/comments/{comment}` route.
- [ ] **Task 2.4: App-Side Moderation Logic**
    - Update `App/IdeaController@show` to include `withTrashed()` comments.
    - Update `CommentResource` to replace the body of trashed comments with: *"هذا التعليق تم حذفه لمخالفته شروط الاستخدام"*.

## Milestone 3: Frontend Implementation (Admin)
- [ ] **Task 3.1: Index Page Performance**
    - Implement `prefetch` on "Review" links.
    - Update filters to use `only: ['ideas', 'filters']` for partial reloads.
- [ ] **Task 3.2: Show Page "Click to Load" Comments**
    - Add a "Comments" section with a "Show Comments" button.
    - Implement the `router.reload({ only: ['comments'] })` trigger with a loading spinner.
- [ ] **Task 3.3: Moderation UI**
    - Add a "Delete" button for active comments.
    - Add a "Deleted" status badge for moderated comments.
    - Implement confirmation dialog for deletion.

## Milestone 4: Frontend Implementation (App)
- [ ] **Task 4.1: Public Comment Styling**
    - Update `CommentSection.tsx` to handle the `is_deleted` flag.
    - Style moderated comments with a subtle, non-interactive appearance to indicate removal.

---

## Verification Checklist
- [ ] Verify `deleted_at` index exists in the database.
- [ ] Initial admin idea page load does NOT fetch comments (check Network tab).
- [ ] Clicking "Show Comments" fetches data successfully.
- [ ] Deleting a comment as admin soft-deletes the record.
- [ ] Public users see the "Violation" notice instead of the original text.
- [ ] Admins can still see the original text (marked as deleted) for audit purposes.
