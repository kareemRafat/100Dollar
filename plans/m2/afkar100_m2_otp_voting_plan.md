# Afkar100 M2 Plan: OTP Voting System

**Source:** `plans/afkar100_project_plan.md`  
**Scope:** Milestone 2, OTP voting only  
**Milestone Goal:** The user can request an OTP, verify it, and cast a vote securely.

---

## Milestone

Deliver a secure OTP-based voting flow with backend validation and frontend modal UX.

---

## Tasks

- [ ] Build `VoteController@sendOtp` to send OTP to email
- [ ] Build `VoteController@verifyOtp` to verify the OTP and submit the vote
- [ ] Build a React OTP modal with two steps: email then code
- [ ] Add rate limiting: 3 OTP requests per hour per IP
- [ ] Store OTP in encrypted form in the database
- [ ] Make OTP expire after 10 minutes
- [ ] Prevent duplicate voting through a unique constraint
- [ ] Update `votes_count` on the `ideas` table after each vote

---

## Deliverables

- [ ] OTP request endpoint
- [ ] OTP verification and vote endpoint
- [ ] Frontend OTP modal
- [ ] Rate-limited and duplicate-safe voting flow

---

## Done Criteria

- [ ] A user can request an OTP successfully
- [ ] A valid OTP creates one vote only
- [ ] Invalid or expired OTP values are rejected
- [ ] Repeated votes for the same idea are blocked
- [ ] `votes_count` stays in sync after voting

