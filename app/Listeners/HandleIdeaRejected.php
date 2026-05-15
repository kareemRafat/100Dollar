<?php

namespace App\Listeners;

use App\Events\IdeaRejected;
use App\Notifications\IdeaRejectedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class HandleIdeaRejected
{
    /**
     * Handle the event.
     */
    public function handle(IdeaRejected $event): void
    {
        $event->idea->user->notify(new IdeaRejectedNotification($event->idea, $event->reason));
    }
}
