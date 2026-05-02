# Afkar100 M2 Performance: Idea Detail Optimization Plan

**Scope:** Performance, Payload, and UX refinement for the Idea Detail page.
**Goal:** Improve Core Web Vitals (LCP, CLS) and provide an "instant" feel for social interactions.

---

## 1. Backend: Data & Payload Optimization
Reduce the initial JSON payload and optimize database queries.

- [x] **Create Eloquent Resources:**
    - Implement `IdeaResource` to strictly control fields sent to the frontend.
    - Implement `CommentResource` to standardize the comment payload.
- [x] **Optimize Eager Loading:**
    - Update `IdeaController@show` to use selective column selection for relationships (e.g., `user:id,name`).
- [x] **Expand Deferred Props:**
    - Use `Inertia::defer` for `isFollowingIdea` and `isFollowingOwner` to unblock the main page paint.
- [x] **Database Indexing:**
    - Verify/Add composite indexes for `user_follows` and `idea_follows` tables.

---

## 2. Frontend: Component Architecture (Page-Scoped Partials)
Modularize the React code to prevent unnecessary re-renders and improve maintainability.

- [x] **Restructure Directory:**
    - Move `resources/js/app/pages/idea/show.tsx` into a dedicated folder.
    - Create a `partials/` directory for page-specific components.
    - **Target Structure:**
      ```text
      resources/js/app/pages/idea/
      ├── show.tsx
      └── partials/
          ├── hero-section.tsx
          ├── voting-card.tsx
          ├── social-share.tsx
          └── comment-section.tsx
      ```
- [x] **Atomize & Extract:**
    - Extract logic and JSX for each section into its respective partial.
    - Pass data and action handlers (e.g., `onVote`, `onFollow`) as typed props.
- [x] **Implement Optimization Wrappers:**
    - Wrap static sections (Hero, Share) in `React.memo` to skip reconciliation on state changes.
- [x] **Lazy Loading:**
    - Refactor `PinModal` to use `React.lazy()` for dynamic import upon interaction.

---

## 3. UX & Perceived Performance
Improve the feel of interactions and visual stability.

- [x] **Optimistic UI Updates:**
    - Refactor Follow/Unfollow logic to update local state immediately before the Inertia visit.
- [ ] **Image Optimization:**
    - Integrate responsive image generation (WebP) for the Hero background.
    - Add `fetchpriority="high"` to the main Hero image.
- [x] **Skeleton States:**
    - Design and implement skeleton loaders for deferred props (Comments, Follow status).

---

## Done Criteria
- [x] Idea Show page payload size reduced by >30%.
- [x] Following/Unfollowing feels instant (no wait for server roundtrip).
- [x] Page score (Lighthouse) shows improvement in TTI and FCP.
- [x] No layout shifts (CLS) when icons or deferred content load.
