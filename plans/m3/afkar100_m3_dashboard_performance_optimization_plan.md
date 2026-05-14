# Afkar100 M3 Plan: Dashboard Performance Optimization

**Scope:** Milestone 3, Admin Dashboard Performance  
**Milestone Goal:** Improve initial dashboard loading time by deferring heavy data fetching and lazy-loading components.

---

## Milestone

Deliver a highly responsive dashboard where the shell and core metrics load instantly, while charts and tables load asynchronously as they become visible.

---

## Tasks

### Backend (Deferred Props)
- [x] Update `DashboardController@index` to wrap heavy queries in `Inertia::optional()`:
    - [x] `trends` (Daily ideas, votes, and weekly users)
    - [x] `top_ideas` (Top 5 most voted ideas)
    - [x] `country_distribution` (Ideas by country)

### Frontend (Lazy Loading & UX)
- [x] Update `Dashboard/index.tsx` to use Inertia v3 `<WhenVisible />`:
    - [x] Wrap `TrendsCharts` with `WhenVisible` and a skeleton fallback.
    - [x] Wrap `TopIdeas` with `WhenVisible` and a skeleton fallback.
    - [x] Wrap `CountryDistribution` with `WhenVisible` and a skeleton fallback.
- [x] Implement Skeleton components for each deferred section:
    - [x] `SkeletonTrends`
    - [x] `SkeletonTopIdeas`
    - [x] `SkeletonCountryDistribution`
- [x] Update dashboard components to handle the initial `null` state of deferred props.

### Verification
- [x] Verify that the initial page load only contains the `stats` prop.
- [x] Confirm that charts and tables trigger subsequent requests only when visible.
- [x] Ensure smooth transitions between skeleton loaders and actual data.

---

## Deliverables

- [ ] Optimized `DashboardController` with deferred props.
- [ ] Updated Dashboard page with lazy-loading triggers.
- [ ] Set of skeleton loader components for the dashboard.

---

## Done Criteria

- [ ] Dashboard shell and stats cards render in < 300ms.
- [ ] Charts and tables load asynchronously without blocking the main UI.
- [ ] No "jank" or layout shifts when deferred data arrives.
- [ ] User can interact with the sidebar and stats immediately upon navigation.
