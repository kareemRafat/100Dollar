# Milestone 5: Idea Edit Feature for Owners

## Overview
Implement an "Edit" feature for idea owners, allowing them to modify their submissions while they are in `PENDING` or `REJECTED` status. This follows a modular approach by extracting the submission form into a reusable component.

## Goals
1. **Empower Users:** Allow creators to fix errors or improve ideas based on feedback.
2. **Code Maintainability:** Refactor the large `create.tsx` form into a reusable `IdeaForm` component.
3. **Media Management:** Correct handling of existing images and PDFs during updates (Keep vs. Replace).
4. **Controlled Access:** Only allow editing for ideas that haven't been approved or won a prize.

---

## Phase 1: Backend Development
- [ ] **Routes:** Add `edit` (GET) and `update` (PATCH/POST with `_method`) routes to `routes/app.php`.
    - *Note: Using POST with `_method=PATCH` is safer for multipart/form-data (file uploads) in Laravel.*
- [ ] **Controller:** Implement `IdeaController@edit`.
    - Authorization: Ensure only the owner can access.
    - Check Status: Only allow if status is `PENDING` or `REJECTED`.
    - Props: Pass `idea` (with media), `categories`, and `countries`.
- [ ] **Controller:** Implement `IdeaController@update`.
    - Validation: Reuse/Share validation rules with the `store` method.
    - Media Logic: 
        - If new `image` is provided: delete old image file/record and store new one.
        - If new `pdf_file` is provided: delete old PDF file/record and store new one.
    - Status Reset: If a `REJECTED` idea is edited, optionally reset it to `PENDING` for re-review.
- [ ] **Wayfinder:** Regenerate routes to include the new edit and update actions.

## Phase 2: Frontend Refactor (Form Extraction)
- [ ] **Component:** Create `resources/js/app/pages/idea/partials/idea-form.tsx`.
- [ ] **Logic Migration:** Move `useForm`, drag-and-drop state, and file processing logic from `create.tsx` into `IdeaForm`.
- [ ] **Props Interface:** Define props for categories, countries, and an optional `initialData` (for edit mode).
- [ ] **Initial State:** If `initialData` is provided, pre-fill the form and set up `imagePreview` for existing media.
- [ ] **Submit Logic:** Determine whether to call `post(ideasRoute.store())` or `post(ideasRoute.update())` based on the mode.

## Phase 3: Frontend Implementation (Pages & UI)
- [ ] **Create Page:** Update `resources/js/app/pages/idea/create.tsx` to use the new `IdeaForm`.
- [ ] **Edit Page:** Create `resources/js/app/pages/idea/edit.tsx` as a wrapper for `IdeaForm` with the idea data.
- [ ] **Dashboard Update:** Modify `resources/js/app/pages/idea/index.tsx` (My Ideas).
    - Re-add the Edit (Pencil) icon.
    - Conditional Visibility: Only show the icon if `idea.status` is `PENDING` or `REJECTED`.
    - Link to the new `ideas.edit` route.

## Phase 4: Localization & UX
- [ ] **Translations:** Add necessary strings to `lang/ar/messages.php` and `lang/en/messages.php`.
    - `edit_idea_title`, `update_button`, `edit_not_allowed`, `update_success_message`.
- [ ] **Media UI:** Ensure the `IdeaForm` clearly shows when a file is "Current" vs "Selected for replacement".

## Phase 5: Testing & Validation
- [ ] **Automated Tests:** Create `tests/Feature/App/IdeaEditTest.php`.
    - Verify owner-only access.
    - Verify status-based restrictions (cannot edit approved ideas).
    - Verify file cleanup on replacement.
- [ ] **Manual Verification:** 
    - Edit a pending idea, change the image, and verify the old file is gone from storage.
    - Verify that an approved idea has no "Edit" button in the dashboard.
