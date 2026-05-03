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
- [x] Create `SponsorshipRequest` model and migration (fields: company_name, email, phone, website, message)
- [x] Implement `App/SponsorController` with the following methods:
    - `index()`: Display the 7 daily sponsors (Directory)
    - `create()`: Display the "Become a Sponsor" application form
    - `store()`: Validate and save sponsorship applications to the database

### 2. Frontend Development
- [x] **Sponsors Directory Page:**
    - Display 7 sponsor cards (one for each day)
    - Clearly highlight "Today's Sponsor"
    - Add "Become a Sponsor" CTA button leading to the application page
- [x] **Become a Sponsor Page:**
    - Build a professional multi-field form using Inertia `useForm`
    - Match input styles with the "Submit Idea" page (borderless, premium tints)
    - Implement success feedback (Sonner toast + Redirect)

### 3. Localization & UX
- [x] Add translation keys for both pages in `ar` and `en` message files
- [x] Ensure full Dark Mode support and RTL/LTR consistency

---

## Deliverables

- [x] `SponsorController` and `SponsorshipRequest` model
- [x] `database/migrations/*_create_sponsorship_requests_table.php`
- [x] `resources/js/app/pages/sponsors/index.tsx` (Directory)
- [x] `resources/js/app/pages/sponsors/apply.tsx` (Application Form)

---

## Done Criteria

- [x] The Sponsors Directory loads successfully and highlights the correct daily partner
- [x] The "Become a Sponsor" button navigates to the dedicated application page
- [x] Partnership applications are correctly saved to the `sponsorship_requests` table
- [x] Users receive a premium success notification after submitting an application
