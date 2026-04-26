# Afkar100 M2 Plan: Submit Idea Page

**Source:** `plans/afkar100_project_plan.md`  
**Scope:** Milestone 2, Submit Idea page only  
**Milestone Goal:** The user can submit a new idea with optional media and required legal confirmations.

---

## Milestone

Deliver a complete idea submission experience with validation, uploads, and confirmation feedback.

---

## Tasks

- [ ] Build the full form with country/city, category, title, and description
- [ ] Add optional idea image upload with preview before submit
- [ ] Add optional supporting PDF upload
- [ ] Add validation: max image size 2MB, max file size 5MB
- [ ] Add 3 required agreement checkboxes
- [ ] Store submitted ideas with `pending` status
- [ ] Send an internal admin notification when a new pending idea is submitted
- [ ] Show a user confirmation message after submission

---

## Deliverables

- [ ] Idea submission page
- [ ] Upload handling for image and PDF
- [ ] Validation and pending-state persistence
- [ ] Admin notification trigger
- [ ] Post-submit confirmation UX

---

## Done Criteria

- [ ] A user can submit a valid idea successfully
- [ ] Invalid input is rejected with clear validation errors
- [ ] Optional uploads work within file limits
- [ ] New ideas are saved as `pending`
- [ ] The user receives a success confirmation

