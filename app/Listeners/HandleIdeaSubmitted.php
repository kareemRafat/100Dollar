<?php

namespace App\Listeners;

use App\Enums\UserRole;
use App\Events\IdeaSubmitted;
use App\Models\User;
use App\Notifications\AdminNewIdeaNotification;

class HandleIdeaSubmitted
{
    /**
     * Handle the event.
     */
    public function handle(IdeaSubmitted $event): void
    {
        $admins = User::where('role', UserRole::ADMIN)->get();

        foreach ($admins as $admin) {
            $admin->notify((new AdminNewIdeaNotification($event->idea))->locale($admin->preferredLocale()));
        }
    }
}
