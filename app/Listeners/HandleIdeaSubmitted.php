<?php

namespace App\Listeners;

use App\Events\IdeaSubmitted;
use App\Models\User;
use App\Notifications\AdminNewIdeaNotification;
use Illuminate\Support\Facades\Notification;

class HandleIdeaSubmitted
{
    /**
     * Handle the event.
     */
    public function handle(IdeaSubmitted $event): void
    {
        $admins = User::where('role', 'admin')->get();

        if ($admins->isNotEmpty()) {
            Notification::send($admins, new AdminNewIdeaNotification($event->idea));
        }
    }
}
