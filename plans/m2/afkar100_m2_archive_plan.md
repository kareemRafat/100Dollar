# Afkar100 M2 Plan: Archive Page (Modular & High-Performance)

**Goal:** Deliver a snappy, modular archive for approved ideas using Inertia v3 "Magic".

---

## 🏁 Milestones

### 🏗️ Milestone 1: Backend Infrastructure & Data Provider
*Focus: Efficient data fetching, filtering logic, and lazy loading.*

- [x] **Create Controller:** Create `App\Http\Controllers\App\ArchiveController`.
- [x] **Implement Filtering Logic:**
    - [x] Search (Title/Description).
    - [x] Category (via `category_id`).
    - [x] Day of Week (via `submission_day` 0-6).
    - [x] Winner Status (`is_winner`).
- [x] **Implement Sorting:** Default to "Newest", with "Most Voted" option.
- [x] **Inertia Magic (Performance):**
    - [x] Wrap ideas in `Inertia::optional` for lazy loading.
    - [x] Use `paginate(12)` for infinite scroll support.
    - [x] Eager load relations: `user`, `category`, `media`.
- [x] **Route Update:** Update `routes/app.php` to point `/archive` to `ArchiveController@index`.

---

### 🧱 Milestone 2: Modular Frontend Architecture
*Focus: Breaking the UI into small, maintainable components.*

- [x] **Directory Setup:** Create `resources/js/app/pages/archive/index.tsx` and a `components/` subfolder.
- [x] **Sub-Component Implementation:**
    - [x] `ArchiveHero.tsx`: Visual header and branding.
    - [x] `ArchiveSearch.tsx`: Search input with internal state.
    - [x] `ArchiveFilters.tsx`: Category, Day, and Status selects.
    - [x] `ArchiveSort.tsx`: Sorting dropdown.
    - [x] `IdeaList.tsx`: Smart container for the grid and infinite scroll.
- [x] **Smart Component Logic:**
    - [x] Integrate `<WhenVisible data="ideas">` in `IdeaList`.
    - [x] Add Skeleton loaders for the initial loading state.
    - [x] Handle empty states for "No results found".

---

### ⚡ Milestone 3: Integration & UX Polish
*Focus: Connecting pieces, debouncing, and final touches.*

- [x] **State Orchestration:** Connect all components in `archive/index.tsx` using Inertia `router`.
- [x] **Performance Optimization:**
    - [x] Implement 300ms debounce for search.
    - [x] Use `only: ['ideas']` and `preserveScroll: true` for partial reloads.
- [x] **UI Feedback:**
    - [x] Add "Results count" indicator.
    - [x] Functional "Clear All Filters" button.
- [x] **Cleanup:** Remove the old `resources/js/app/pages/archive.tsx` file.

---

## ✅ Done Criteria

- [ ] Page skeleton and filters load instantly; ideas stream in (Lazy Loading).
- [ ] Filtering and searching only refresh the idea list (Partial Reloads).
- [ ] Scrolling down fetches the next page automatically (Infinite Scroll).
- [ ] Code is clean, modular, and easy to maintain.
