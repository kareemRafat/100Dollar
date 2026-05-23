<?php

namespace App\Actions\Admin;

use App\Enums\PrizeStatus;
use App\Events\WinnerAnnounced;
use App\Models\Idea;
use App\Models\PrizeRecord;
use Illuminate\Support\Facades\DB;

class ConfirmWinner
{
    /**
     * Confirm an idea as the official winner.
     */
    public function execute(Idea $idea): void
    {
        if ($idea->is_winner) {
            return;
        }

        DB::transaction(function () use ($idea) {
            // 1. Mark as winner
            $idea->update([
                'is_winner' => true,
                'winner_announced_at' => now(),
            ]);

            // 2. Create Prize Record
            PrizeRecord::create([
                'idea_id' => $idea->id,
                'sponsor_id' => $idea->sponsor_id,
                'amount' => 100.00, // Default prize amount
                'status' => PrizeStatus::PENDING,
            ]);

            // 3. Trigger Event
            event(new WinnerAnnounced($idea));
        });
    }
}
