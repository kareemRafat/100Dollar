# Afkar100 M3 Plan: Winner Management

**Source:** `plans/afkar100_project_plan.md`  
**Scope:** Milestone 3, Winner Management only  
**Milestone Goal:** The admin can confirm winners, publish announcements, and track prize delivery.

---

## Milestone

Deliver a winner management workflow that supports manual confirmation and scheduled fallback announcement logic.

---

## Tasks

- [ ] Display the expected winner for each day based on highest vote count before announcement
- [ ] Add a confirm winner action that publishes the official winner announcement
- [ ] Track prize delivery status as `pending` or `delivered`
- [ ] Send an automatic notification to the winner when confirmed
- [ ] Add Laravel Scheduler logic for automatic announcement at midnight if not manually announced

---

## Deliverables

- [ ] Winner preview view
- [ ] Winner confirmation workflow
- [ ] Prize delivery tracking
- [ ] Winner notification trigger
- [ ] Scheduled fallback announcement logic

---

## Done Criteria

- [ ] Admin can see the leading idea before announcement
- [ ] Admin can confirm the official winner
- [ ] Prize delivery state is stored and editable
- [ ] Winner notification is triggered on confirmation
- [ ] Scheduler can announce winners automatically when needed

