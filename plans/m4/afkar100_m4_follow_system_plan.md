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
- [ ] Implement `UserFollowController@toggle` to handle following/unfollowing users.
- [ ] Implement `IdeaFollowController@toggle` to handle following/unfollowing ideas.
- [ ] Define routes in `app.php` for follow actions.
- [ ] Ensure proper validation and authorization (prevent self-following).

### Frontend (User App)
- [ ] Update `IdeaShow.tsx` to display "Follow Idea" and "Follow Owner" buttons.
- [ ] Implement optimistic updates for follow buttons using Inertia's `router.optimistic()`.
- [ ] Update `Profile/Index.tsx` to show "Following" and "Followers" counts.
- [ ] Add a "Followers/Following" tab in the user profile to list followed entities.

### Verification
- [ ] Verify that following a user/idea updates the database correctly.
- [ ] Confirm that unfollowing works and removes the relationship.
- [ ] Ensure UI updates instantly and rolls back on server failure.
- [ ] Check that a user cannot follow themselves.

---

## Deliverables
- [ ] `UserFollowController` and `IdeaFollowController`.
- [ ] Follow/Unfollow routes.
- [ ] Updated Idea Detail and Profile pages with follow functionality.

---

## Done Criteria
- [ ] Users can follow/unfollow other users.
- [ ] Users can follow/unfollow ideas.
- [ ] Follow status is reflected in the UI across sessions.
- [ ] Followers/Following lists are accessible in the profile.
