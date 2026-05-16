<?php

namespace App\Listeners;

use App\Events\WinnerAnnounced;
use App\Notifications\WinnerAnnouncedNotification;

class HandleWinnerAnnounced
{
    /**
     * Handle the event.
     */
    public function handle(WinnerAnnounced $event): void
    {
        $event->idea->user->notify(new WinnerAnnouncedNotification($event->idea));
    }
}
