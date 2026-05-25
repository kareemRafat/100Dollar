# Milestone 5: 7-Day Voting Window & Winner Determination

## Overview
Replace the current daily per-day winner model with a 7-day voting window per idea. Each approved idea is open for voting for exactly 7 days from its `approved_at` timestamp. Winners are auto-determined once ALL ideas in the same `(submission_day, week_number, year)` group have completed their window. The admin can still manually select a winner at any time.

## Rules
1. Each idea gets **7 days of voting** from `approved_at`
2. Auto-winner is determined **only after ALL ideas** in the same day/week/year group have completed their 7-day window
3. Winner = highest `votes_count` in the group
4. If **tied** among top ideas → skip auto-selection, let admin choose manually
5. If **0 votes** (or no eligible ideas) → skip, no auto-winner
6. Admin can **manually select** any approved idea at any time regardless of voting window

---

## Files to Modify / Create

### Phase 1: Database & Model
- [ ] **Migration:** Create `database/migrations/xxxx_add_voting_ends_at_to_ideas_table.php`
    - Add nullable `voting_ends_at` timestamp
- [ ] **Model:** Edit `app/Models/Idea.php`
    - Add `voting_ends_at` to `#[Fillable]` attribute
    - Add `voting_ends_at` to `casts()` as `'datetime'`
    - Add `scopeVotingOpen()` — `where('voting_ends_at', '>', now())->orWhereNull('voting_ends_at')`
    - Add `scopeVotingClosed()` — `where('voting_ends_at', '<=', now())`
    - Add `isVotingOpen(): bool` helper method

### Phase 2: Backend Logic Changes
- [ ] **Admin Idea Approve:** Edit `app/Http/Controllers/Admin/IdeaController.php`
    - When approving, set `'voting_ends_at' => now()->addDays(7)`
- [ ] **Vote Guard:** Edit `app/Http/Controllers/App/VoteController.php`
    - In both `sendOtp()` and `verifyOtp()`, add early check:
      ```php
      if ($idea->voting_ends_at && $idea->voting_ends_at->isPast()) {
          return response()->json(['message' => 'Voting period has ended'], 400);
      }
      ```
- [ ] **Auto-Winner Command:** Rewrite `app/Console/Commands/AnnounceWinner.php`
    - Remove daily per-day logic
    - New flow:
      1. Get all approved, non-winner ideas grouped by `(submission_day, week_number, year)`
      2. Filter groups where ALL ideas have `voting_ends_at <= now()` (window closed)
      3. Filter groups where no winner has been announced yet
      4. For each qualifying group:
         a. Sort by `votes_count DESC`, then `approved_at ASC`
         b. If top idea has 0 votes → skip (no winner, log reason)
         c. If top 2+ ideas share the same `votes_count` → skip (tie, admin must decide)
         d. Else → execute `ConfirmWinner` on the top idea
    - Log results for each group (success/skip reason)

### Phase 3: Admin Panel Updates
- [ ] **Winner Preview:** Edit `app/Http/Controllers/Admin/WinnerController.php`
    - Update `index()` to include voting period status per idea:
      ```php
      'voting_status' => $leadingIdea?->voting_ends_at && $leadingIdea->voting_ends_at->isPast()
          ? 'completed'
          : 'voting_open',
      'remaining_days' => $leadingIdea?->voting_ends_at?->diffInDays(now()),
      ```
- [ ] **Admin Winners UI:** Edit `resources/js/admin/pages/winners/preview.tsx`
    - Show voting window status per idea card (e.g., "Voting open - 3 days remaining" or "Voting closed")
    - If tie exists for a day, show "Tie — admin decision required" badge
    - Disable auto-confirm buttons for tied days (admin must manually pick)

### Phase 4: Frontend Voting UX
- [ ] **Idea Resource:** Edit `app/Http/Resources/App/IdeaResource.php`
    - Expose `voting_ends_at` to the frontend
- [ ] **TypeScript Types:** Edit `resources/js/types/models.ts`
    - Add `voting_ends_at?: string` to `Idea` interface
- [ ] **Voting Card:** Edit `resources/js/app/pages/idea/partials/voting-card.tsx`
    - Add "Voting ends in X days" countdown when `voting_ends_at` is in future
    - Show "Voting has ended" state when `voting_ends_at` is past

### Phase 5: Schedule
- [ ] **Console Schedule:** Edit `routes/console.php`
    - Keep `Schedule::command('app:announce-winner')->daily()` — same command, rewritten logic

---

## Edge Cases Handled
| Case | Behavior |
|------|----------|
| Tie (same votes_count) | No auto-winner; admin manually selects |
| 0 votes for top idea | No auto-winner (not viable) |
| Partial group (some ideas still in window) | Wait until ALL complete |
| Admin override | Always works regardless of voting window |
| Already has winner for day/week/year | Skip group |
| No ideas in group | Log and skip |

## Verification
- [ ] Run `php artisan test --compact --filter=AnnounceWinner` (if tests exist, otherwise manual verification)
- [ ] Approve an idea → verify `voting_ends_at` is set to `now() + 7 days`
- [ ] Try voting on an expired idea → verify 400 response
- [ ] Run `php artisan app:announce-winner` → verify correct winner selected per group rules
- [ ] Admin manual override → verify winner announced regardless of voting window
