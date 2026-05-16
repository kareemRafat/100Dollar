<?php

namespace App\Listeners;

use App\Events\IdeaApproved;
use App\Jobs\NotifyIdeaFollowersJob;
use App\Jobs\NotifyUserFollowersJob;
use App\Notifications\IdeaApprovedNotification;

class HandleIdeaApproved
{
    /**
     * Handle the event.
     */
    public function handle(IdeaApproved $event): void
    {
        // 1. Notify the owner directly (Email + Site)
        $event->idea->user->notify(new IdeaApprovedNotification($event->idea));

        // 2. Notify followers of the idea (Site Only)
        NotifyIdeaFollowersJob::dispatch(
            $event->idea,
            IdeaApprovedNotification::class,
            ['idea' => $event->idea, 'onlyDb' => true],
            $event->idea->user_id // Exclude owner
        );

        // 3. Notify followers of the user (Site Only)
        NotifyUserFollowersJob::dispatch(
            $event->idea->user,
            IdeaApprovedNotification::class,
            ['idea' => $event->idea, 'onlyDb' => true]
        );
    }
}
