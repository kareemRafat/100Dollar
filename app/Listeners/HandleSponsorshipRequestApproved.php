<?php

namespace App\Listeners;

use App\Events\SponsorshipRequestApproved;
use App\Notifications\SponsorshipRequestApprovedNotification;
use Illuminate\Support\Facades\Notification;

class HandleSponsorshipRequestApproved
{
    public function handle(SponsorshipRequestApproved $event): void
    {
        $request = $event->sponsorshipRequest;

        Notification::route('mail', $request->email)
            ->notify(
                (new SponsorshipRequestApprovedNotification($request))
                    ->locale($request->locale ?? app()->getLocale())
            );
    }
}
