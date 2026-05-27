<?php

namespace App\Listeners;

use App\Events\SponsorshipRequestRejected;
use App\Notifications\SponsorshipRequestRejectedNotification;
use Illuminate\Support\Facades\Notification;

class HandleSponsorshipRequestRejected
{
    public function handle(SponsorshipRequestRejected $event): void
    {
        $request = $event->sponsorshipRequest;

        Notification::route('mail', $request->email)
            ->notify(
                (new SponsorshipRequestRejectedNotification($request, $event->reason))
                    ->locale($request->locale ?? app()->getLocale())
            );
    }
}
