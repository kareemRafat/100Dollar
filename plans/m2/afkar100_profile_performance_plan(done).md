# Milestone: Profile Page Performance Optimization

This plan outlines the steps required to optimize the Profile page (`resources/js/app/pages/profile.tsx`) and its backend controller (`ProfileController.php`) to ensure scalability and a smooth user experience.

## Goal
Reduce initial page load time (LCP/TTI), minimize JSON payload size for active users, and provide a seamless "SPA feel" during tab navigation.

---

## Milestone 1: Backend Data Optimization
**Objective:** Reduce database load and payload size.

- [x] **1.1 Implement Pagination**
    - Update `ProfileController::edit` to use `->paginate(10)` instead of `->get()` for:
        - `votedIdeas`
        - `followedIdeas`
        - `followedPeople`
        - `notifications`
- [x] **1.2 Leverage Inertia Deferred Props**
    - Wrap the activity lists in `Inertia::defer()` so the sidebar and basic user info load immediately while lists load in the background.
- [x] **1.3 Partial Reload Optimization**
    - Ensure `UserResource` only includes essential fields for the profile view.

## Milestone 2: Frontend Bundle & Code Splitting
**Objective:** Reduce initial JavaScript bundle size.

- [x] **2.1 Lazy Loading Tab Components**
    - Refactor `profile.tsx` to use `React.lazy()` for:
        - `PersonalInfoForm`
        - `VotedIdeas`
        - `FollowedIdeas`
        - `FollowedPeople`
        - `Notifications`
        - `SecurityAndProtection`
- [x] **2.2 Suspense & Skeletons**
    - Implement a `Suspense` wrapper with a loading skeleton that matches the layout of the tabs to prevent layout shifts.

## Milestone 3: Architectural & UX Refinement
**Objective:** Improve navigation speed and rendering efficiency.

- [x] **3.1 Persistent Layout Pattern**
    - Move `AppLayout` from the render return to `Profile.layout` to prevent the layout from re-mounting when switching tabs.
- [x] **3.2 Component Memoization**
    - Wrap heavy list components (`VotedIdeas`, `Notifications`) in `React.memo`.
    - Use `useMemo` for the `sideNavItems` and `mobileNavItems` arrays.
- [x] **3.3 Explicit Partial Reloads**
    - Update the tab navigation links to use the `only` property, requesting only the specific data needed for the target tab (e.g., `only: ['notifications']`).

## Milestone 4: Verification
**Objective:** Ensure no regressions and validate gains.

- [ ] **4.1 Functional Testing**
    - Verify that pagination links work correctly across all tabs.
    - Confirm that 2FA status and profile updates still function as expected.
- [ ] **4.2 Performance Benchmarking**
    - Run Lighthouse audits before and after.
    - Target: < 2s Time to Interactive (TTI) on mobile.
