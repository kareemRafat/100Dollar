# Afkar100 M4 Plan: Follow System

**Source:** `plans/afkar100_project_plan.md`  
**Scope:** Milestone 4, Follow System (Users and Ideas)  
**Milestone Goal:** Allow users to follow other users and specific ideas to receive updates.

---

## Milestone
Deliver a functional follow system with optimistic UI updates and real-time counter reflecting.

---

## Tasks

### Backend (Controllers & Routes)
- [x] Implement `ProfileController@toggleFollow` to handle following/unfollowing users (Replaces `UserFollowController`).
- [x] Implement `IdeaController@toggleFollow` to handle following/unfollowing ideas (Replaces `IdeaFollowController`).
- [x] Define routes in `app.php` for follow actions.
- [x] Ensure proper validation and authorization (prevent self-following).

### Frontend (User App)
- [x] Update `IdeaShow.tsx` to display "Follow Idea" and "Follow Owner" buttons.
- [x] Implement optimistic updates for follow buttons using Inertia's request lifecycle.
- [x] Update `Profile/Index.tsx` to show "Following" and "Followers" counts.
- [x] Add a "Followers/Following" tab in the user profile to list followed entities.

### Verification
- [x] Verify that following a user/idea updates the database correctly.
- [x] Confirm that unfollowing works and removes the relationship.
- [x] Ensure UI updates instantly and handles server feedback.
- [x] Check that a user cannot follow themselves.

---

## Deliverables
- [x] `IdeaController` and `ProfileController` follow logic.
- [x] Follow/Unfollow routes.
- [x] Updated Idea Detail and Profile pages with follow functionality.

---

## Done Criteria
- [x] Users can follow/unfollow other users.
- [x] Users can follow/unfollow ideas.
- [x] Follow status is reflected in the UI across sessions.
- [x] Followers/Following lists are accessible in the profile.
