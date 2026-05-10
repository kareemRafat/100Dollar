# Voting System Fix Plan

## Milestone 1: Hide Non-Approved Ideas from Public App

**Goal:** Non-approved ideas (pending, rejected) must not be visible or interactable anywhere in `/app` by the public.

- [ ] **T1.1** Add status check in `IdeaController::show` — return 404 if `$idea->status !== 'approved'` (owner can still see via "My Ideas" which uses a separate route)
- [ ] **T1.2** Add status check in `VoteController::sendOtp` — return 400 with message if idea is not approved
- [ ] **T1.3** Add status check in `VoteController::verifyOtp` — return 400 with message if idea is not approved
- [ ] **T1.4** Add status check in `IdeaController::toggleFollow` — return 404 if idea is not approved
- [ ] **T1.5** Add status check in `CommentController::store` — return 404 if idea is not approved
- [ ] **T1.6** Write test: cannot view non-approved idea show page (404)
- [ ] **T1.7** Write test: voting on non-approved idea returns error
- [ ] **T1.8** Write test: following non-approved idea returns 404
- [ ] **T1.9** Write test: commenting on non-approved idea returns 404
- [ ] **T1.10** Verify "My Ideas" page still shows all statuses for the owner

## Milestone 2: Race Condition & Data Integrity Fixes

**Goal:** Eliminate race conditions and ensure `votes_count` stays accurate.

- [ ] **T2.1** Wrap `VoteController::verifyOtp` vote verification + `$idea->increment('votes_count')` in `DB::transaction()`
- [ ] **T2.2** Fix `updateOrCreate` in `sendOtp` — skip entirely if a verified vote already exists (move the check before `updateOrCreate` and return early; closes the TOCTOU window where `updateOrCreate` resets `otp_verified_at` to null)
- [ ] **T2.3** Add `lockForUpdate()` on the idea row within the transaction to prevent concurrent increments
- [ ] **T2.4** Write test: concurrent vote verification does not cause duplicate or lost vote counts

## Milestone 3: Prevent Voting for Own Idea

**Goal:** Users cannot vote for their own ideas.

- [ ] **T3.1** Add check in `sendOtp`: if `$idea->user_id === $user?->id` or `$idea->user->email === $email` (for guests), return 400
- [ ] **T3.2** Add the same check in `verifyOtp` as defense-in-depth
- [ ] **T3.3** Write test: idea owner cannot vote for their own idea
- [ ] **T3.4** Write test: idea owner cannot request OTP for their own idea

## Milestone 4: OTP Security Hardening

**Goal:** Fix OTP generation, storage, and delivery weaknesses.

- [ ] **T4.1** Replace `rand(100000, 999999)` with `random_int(100000, 999999)` in `VoteController::sendOtp`
- [ ] **T4.2** Remove OTP from email subject in `OtpVerificationMail` — move to body only. Change subject to generic text (e.g., "Verification Code")
- [ ] **T4.3** Write test: OTP is not present in email subject line

## Milestone 5: Rate Limiting Fixes

**Goal:** Fix rate limiter key inconsistencies and separate send/verify limits.

- [ ] **T5.1** Use separate rate limit keys for `sendOtp` and `verifyOtp` (e.g., `vote-send:...` and `vote-verify:...`)
- [ ] **T5.2** Fix test `VoteOtpTest::beforeEach` — rate limiter keys should match actual format
- [ ] **T5.3** Update `HandleInertiaRequests` shared props to reflect the new key format for block status
- [ ] **T5.4** Write test: failed verifications don't block OTP sending and vice versa
- [ ] **T5.5** Run existing vote tests to confirm no regressions

## Milestone 6: IP-Based Fraud Mitigation

**Goal:** Add basic IP-based limits to prevent mass email voting from a single source.

- [ ] **T6.1** Add an IP-based limit: max N votes per IP per competition day (e.g., 5) in both `sendOtp` and `verifyOtp`
- [ ] **T6.2** Use the already-stored IP for counting existing votes from that IP on the same competition day
- [ ] **T6.3** Write test: IP is blocked from voting after N votes on the same competition day
- [ ] **T6.4** Write test: different IPs can still vote independently

## Milestone 7: Audit Logging & Monitoring

**Goal:** Create an audit trail for vote events for fraud investigation.

- [ ] **T7.1** Add a `VoteAuditLog` model + migration (columns: `vote_id`, `event`, `ip_address`, `user_agent`, `metadata`, timestamps)
- [ ] **T7.2** Log events: `otp_requested`, `otp_verified`, `otp_expired`, `otp_failed`, `already_voted`
- [ ] **T7.3** Write test: audit log entries are created for each vote event
