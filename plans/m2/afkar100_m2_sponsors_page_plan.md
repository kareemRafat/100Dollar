# Afkar100 M2 Plan: Sponsors & Partnership

**Source:** `plans/afkar100_project_plan.md`  
**Scope:** Milestone 2, Sponsors Directory and Become a Sponsor Page  
**Milestone Goal:** The user can view the daily sponsors and companies can apply for future sponsorship through a dedicated page.

---

## Milestone

Deliver a dual-page experience for sponsorship: a directory page for users to see who supports the platform, and a specialized application page for potential corporate partners.

---

## Tasks

### 1. Database & Backend
- [ ] Create `SponsorshipRequest` model and migration (fields: company_name, email, phone, website, message)
- [ ] Implement `App/SponsorController` with the following methods:
    - `index()`: Display the 7 daily sponsors (Directory)
    - `create()`: Display the "Become a Sponsor" application form
    - `store()`: Validate and save sponsorship applications to the database

### 2. Frontend Development
- [ ] **Sponsors Directory Page:**
    - Display 7 sponsor cards (one for each day)
    - Clearly highlight "Today's Sponsor"
    - Add "Become a Sponsor" CTA button leading to the application page
- [ ] **Become a Sponsor Page:**
    - Build a professional multi-field form using Inertia `useForm`
    - Match input styles with the "Submit Idea" page (borderless, premium tints)
    - Implement success feedback (Sonner toast + Redirect)

### 3. Localization & UX
- [ ] Add translation keys for both pages in `ar` and `en` message files
- [ ] Ensure full Dark Mode support and RTL/LTR consistency

---

## Deliverables

- [ ] `SponsorController` and `SponsorshipRequest` model
- [ ] `database/migrations/*_create_sponsorship_requests_table.php`
- [ ] `resources/js/app/pages/sponsors/index.tsx` (Directory)
- [ ] `resources/js/app/pages/sponsors/apply.tsx` (Application Form)

---

## Done Criteria

- [ ] The Sponsors Directory loads successfully and highlights the correct daily partner
- [ ] The "Become a Sponsor" button navigates to the dedicated application page
- [ ] Partnership applications are correctly saved to the `sponsorship_requests` table
- [ ] Users receive a premium success notification after submitting an application
