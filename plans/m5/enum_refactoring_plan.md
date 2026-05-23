# Milestone 5: Laravel Enum Refactoring Plan

## Overview
Transition the project from hardcoded string statuses and roles to **Native PHP Backed Enums**. This improves type safety, eliminates "magic strings," and provides a central location for domain logic related to these values.

## Goals
1. **Type Safety:** Ensure only valid states can be assigned to models.
2. **Centralized Logic:** Add helper methods to Enums (e.g., `label()`, `color()`, `isFinal()`).
3. **Frontend Consistency:** Sync Enum values with TypeScript definitions.

---

## Phase 1: Enum Definitions
Create the following Enums in `app/Enums`:

- [x] **`UserRole`**: `user`, `admin`.
- [x] **`IdeaStatus`**: `pending`, `approved`, `rejected`.
- [x] **`PrizeStatus`**: `pending`, `delivered`.
- [x] **`SponsorshipStatus`**: `pending`, `approved`, `rejected`.

## Phase 2: Model Integration
Apply Laravel Enum casting to the respective models:

- [x] **`User`**: Cast `role` to `UserRole`.
- [x] **`Idea`**: Cast `status` to `IdeaStatus`.
- [x] **`PrizeRecord`**: Cast `status` to `PrizeStatus`.
- [x] **`SponsorshipRequest`**: Cast `status` to `SponsorshipStatus`.

## Phase 3: Logic & Controller Refactoring
Update backend logic to use Enum cases instead of strings:

- [x] **Controllers:** Update `IdeaController`, `Admin\IdeaController`, etc.
- [x] **Actions:** Update `CreateNewUser`, `IdeaSubmission` logic.
- [x] **Queries:** Use `IdeaStatus::Approved` instead of `'approved'` in Eloquent queries.
- [x] **Validation:** Update FormRequests and validation rules to use `Rule::enum()`.

## Phase 4: Frontend Synchronization
Ensure the React/TypeScript layer is aware of these Enums:

- [x] **TS Types:** Create/Update TypeScript enums or union types in `resources/js/types`.
- [x] **Inertia Props:** Ensure Enums are serialized correctly to the frontend (Laravel does this automatically via Backed Enums).

## Phase 5: Testing & Validation
- [ ] **Unit Tests:** Verify that invalid status assignments throw errors.
- [ ] **Feature Tests:** Update existing tests that use strings to use Enum cases.
- [x] **Database Integrity:** (Optional) Create a migration to update column comments or defaults if they significantly differ from the new Enum values.
