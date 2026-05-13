<?php

namespace App\Actions\Admin;

use App\Models\Idea;
use App\Models\PrizeRecord;
use App\Notifications\WinnerAnnouncedNotification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

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
                'status' => 'pending',
            ]);

            // 3. Trigger Notification
            $idea->user->notify(new WinnerAnnouncedNotification($idea));
            
            // 4. Create internal notification record
            \App\Models\Notification::create([
                'user_id' => $idea->user_id,
                'type' => 'winner_announced',
                'title' => __('messages.notifications.winner_announced_title'),
                'body' => __('messages.notifications.winner_announced_body', ['title' => $idea->title]),
                'data' => [
                    'idea_id' => $idea->id,
                    'amount' => 100.00,
                ],
            ]);
        });
    }
}
