<?php

namespace App\Listeners;

use App\Events\IdeaApproved;
use App\Jobs\NotifyUserFollowersJob;
use App\Notifications\IdeaApprovedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class HandleIdeaApproved
{
    /**
     * Handle the event.
     */
    public function handle(IdeaApproved $event): void
    {
        // 1. Notify the owner directly
        $event->idea->user->notify(new IdeaApprovedNotification($event->idea));

        // 2. Dispatch distribution job to notify followers of the owner
        NotifyUserFollowersJob::dispatch(
            $event->idea->user,
            IdeaApprovedNotification::class,
            ['idea' => $event->idea]
        );
    }
}
