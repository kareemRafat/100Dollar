# Voting System Fix Plan

## Milestone 1: Hide Non-Approved Ideas from Public App

**Goal:** Non-approved ideas (pending, rejected) must not be visible or interactable anywhere in `/app` by the public.

- [x] **T1.1** Add status check in `IdeaController::show` — return 404 if `$idea->status !== 'approved'` (owner can still see via "My Ideas" which uses a separate route)
- [x] **T1.2** Add defense-in-depth status check in `VoteController::sendOtp` — return 404 (not 400) if idea is not approved, to avoid confirming the idea exists via API bypass
- [x] **T1.3** Add defense-in-depth status check in `VoteController::verifyOtp` — return 404 (not 400) if idea is not approved, same reason as T1.2
- [x] **T1.4** Add defense-in-depth status check in `IdeaController::toggleFollow` — return 404 if idea is not approved
- [x] **T1.5** Add defense-in-depth status check in `CommentController::store` — return 404 if idea is not approved
- [x] **T1.6** Verify "My Ideas" page still shows all statuses for the owner

## Milestone 2: Race Condition & Data Integrity Fixes

**Goal:** Eliminate race conditions and ensure `votes_count` stays accurate.

- [x] **T2.1** Wrap `VoteController::verifyOtp` logic (verification + timestamp update + increment) in `DB::transaction()`
- [x] **T2.2** Fix `sendOtp` race: Change `updateOrCreate` to check if a verified vote exists _first_ and return early. This prevents resetting `otp_verified_at` for an existing vote.
- [x] **T2.3** Use pessimistic locking: Add `lockForUpdate()` when retrieving the `Vote` record in `verifyOtp` to prevent concurrent verification attempts for the same record.
- [x] **T2.4** Add `lockForUpdate()` on the `Idea` row within the `verifyOtp` transaction to ensure atomic increment of `votes_count`.

## Milestone 3: Prevent Voting for Own Idea

**Goal:** Users cannot vote for their own ideas.

- [x] **T3.1** Add check in `sendOtp`: if `$idea->user_id === $user?->id` or `$idea->user->email === $email` (for guests), return 400
- [x] **T3.2** Add the same check in `verifyOtp` as defense-in-depth

## Milestone 4: OTP Security Hardening

**Goal:** Fix OTP generation, storage, and delivery weaknesses.

- [x] **T4.1** Replace `rand(100000, 999999)` with `random_int(100000, 999999)` in `VoteController::sendOtp`
- [x] **T4.2** Remove OTP from email subject in `OtpVerificationMail` — move to body only. Change subject to generic text (e.g., "Verification Code")

## Milestone 5: Rate Limiting Fixes

**Goal:** Fix rate limiter key inconsistencies, separate send/verify limits, and scope blocks appropriately.

**Rate limit tiers:**

| Tier                    | Key Format                                   | Max | Decay  | Scope                | Purpose                                                                |
| ----------------------- | -------------------------------------------- | --- | ------ | -------------------- | ---------------------------------------------------------------------- |
| Failed OTP verification | `vote-verify:idea:{ideaId}:email:{email}`    | 5   | 10 min | Per idea + per email | Block brute-force on one idea only; user can still vote on other ideas |
| OTP send requests       | `vote-send:user:{id}` or `vote-send:ip:{ip}` | 10  | 10 min | Per user/IP globally | Prevent mass OTP spam across all ideas                                 |
| Total vote actions      | `vote-global:ip:{ip}`                        | 20  | 10 min | Per IP globally      | Bot prevention — blocks everything if sustained abuse                  |

- [ ] **T5.1** Implement three-tier rate limiting in `VoteController::sendOtp`: check `vote-send` and `vote-global` keys; hit `vote-send` on each request, hit `vote-global` on each request
- [ ] **T5.2** Implement three-tier rate limiting in `VoteController::verifyOtp`: check `vote-verify`, `vote-send`, and `vote-global` keys; hit `vote-verify:idea:{ideaId}:email:{email}` on failed verification, hit `vote-global` on each attempt
- [ ] **T5.3** Successful vote clears `vote-send` and `vote-global` keys but NOT `vote-verify` (no longer relevant after voting; no need to allow retrying the same idea)
- [ ] **T5.4** Fix test `VoteOtpTest::beforeEach` — clear the new key formats (`vote-send:ip:127.0.0.1`, `vote-global:ip:127.0.0.1`, `vote-verify:idea:*:email:*`)
- [ ] **T5.5** Update `HandleInertiaRequests` shared props to check `vote-global:ip:{ip}` (or `vote-send:user:{id}`) for frontend block status — this is the key that blocks all voting
- [ ] **T5.6** Write test: failing 5 verifications on Idea A does NOT block voting on Idea B
- [ ] **T5.7** Write test: global IP limit (20) still prevents bot abuse across many ideas
- [ ] **T5.8** Run existing vote tests to confirm no regressions

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
