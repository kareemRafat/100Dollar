<?php

namespace App\Listeners;

use App\Events\IdeaRejected;
use App\Notifications\IdeaRejectedNotification;

class HandleIdeaRejected
{
    /**
     * Handle the event.
     */
    public function handle(IdeaRejected $event): void
    {
        $user = $event->idea->user;
        $user->notify((new IdeaRejectedNotification($event->idea, $event->reason))->locale($user->preferredLocale()));
    }
}
