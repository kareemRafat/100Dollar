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
        $user = $event->idea->user;
        $user->notify((new WinnerAnnouncedNotification($event->idea))->locale($user->preferredLocale()));
    }
}
