# Afkar100 M2 Plan: Submit Idea Page

**Source:** `plans/afkar100_project_plan.md`  
**Scope:** Milestone 2, Submit Idea page only  
**Milestone Goal:** The user can submit a new idea with optional media and required legal confirmations.

---

## Milestone

Deliver a complete idea submission experience with validation, uploads, and confirmation feedback.

---

## Tasks

- [x] Build the full form with country/city, category, title, and description
- [x] Add optional idea image upload with preview before submit
- [x] Add optional supporting PDF upload
- [x] Add validation: max image size 2MB, max file size 5MB
- [x] Add 3 required agreement checkboxes
- [x] Store submitted ideas with `pending` status
- [ ] Send an internal admin notification when a new pending idea is submitted
- [x] Show a user confirmation message after submission

---

## Deliverables

- [x] Idea submission page
- [x] Upload handling for image and PDF
- [x] Validation and pending-state persistence
- [ ] Admin notification trigger
- [x] Post-submit confirmation UX

---

## Done Criteria

- [x] A user can submit a valid idea successfully
- [x] Invalid input is rejected with clear validation errors
- [x] Optional uploads work within file limits
- [x] New ideas are saved as `pending`
- [x] The user receives a success confirmation
