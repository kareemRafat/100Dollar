# 🚀 Ideas Directory Performance Optimization Plan

This document outlines the strategic milestones to eliminate bottlenecks and improve the response times of the Ideas Directory.

---

## 📍 Part 1: Home Page (Public Directory)
*Objective: Optimize the high-traffic landing page for maximum speed and minimum database load.*

### Milestone 1: Data Access Optimization
- [x] **Eager Loading Fix:** Add `media` to the `Idea::with()` chain to prevent N+1 queries when rendering idea thumbnails.
- [x] **Relationship Counting:** Implement `withCount('comments')` to replace manual counting inside the `IdeaResource`.
- [x] **Database Indexing:** Create a compound index on `(status, submission_day, week_number, year, votes_count)` to allow the database to return results in a single scan.

### Milestone 2: Caching & Payloads
- [ ] **Sponsor Caching:** Wrap the Sponsor query in `Cache::remember` with a 24-hour TTL, as the sponsor only changes daily.
- [ ] **Winners Caching:** Cache the `previousWinners` collection and clear the cache only when a new winner is announced.
- [ ] **Payload Reduction:** Use a `CompactIdeaResource` that excludes the full `description` and `pdf_file` data for the directory list to reduce JSON size.

---

## 📍 Part 2: Idea Show Page
*Objective: Ensure deep-dive pages load instantly and feel interactive.*

### Milestone 1: Resource Loading
- [x] **Owner/Sponsor Optimization:** Eager load `user.media` and `sponsor.media` specifically for the hero section to avoid separate queries for logos/avatars.
- [x] **Deferred Comments:** Ensure the `Inertia::defer` for comments is properly utilizing the `WhenVisible` component on the frontend to prevent loading comments until the user scrolls to them.

### Milestone 2: Perceived Performance
- [ ] **Optimistic State:** Implement Inertia v3 Optimistic Updates for the "Follow" and "Like" actions so the UI updates before the server confirmation.
- [ ] **Prefetching:** Add the `prefetch` prop to all directory cards linking to this page.

---

## 📍 Part 3: My Ideas Page (Dashboard)
*Objective: Streamline the management view for users with many submissions.*

### Milestone 1: Query Efficiency
- [x] **Global Search Index:** Ensure a full-text or composite index exists for `title` and `description` to support the dashboard search filter.
- [x] **Eager Loading:** Add `media` and `category` to the query in `IdeaController@index` to fix the N+1 issues currently present in the user dashboard.

### Milestone 2: Stats Optimization
- [ ] **Aggregated Queries:** Replace individual `count()` and `sum()` queries with a single `selectRaw` query to fetch `total_ideas`, `total_votes`, and `winning_ideas` in one trip to the database.

---

## 📍 Part 4: Global Infrastructure
*Objective: System-wide settings to prevent performance regression.*

- [ ] **Strict Loading:** Enable `Model::preventLazyLoading()` in the `AppServiceProvider` for the local environment to catch future N+1 issues during development.
- [ ] **Public User Resource:** Create a `PublicUserResource` that strictly limits shared user data to `id`, `name`, and `avatar`, removing sensitive fields like `phone` or `email` from public payloads.
- [ ] **Image Optimization:** Implement a dynamic image resizing solution (e.g., Spatie Media Library or a middleware) to serve web-optimized versions of idea images instead of full-resolution uploads.
