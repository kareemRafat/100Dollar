<?php

namespace App\Events;

use App\Models\SponsorshipRequest;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SponsorshipRequestApproved
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public SponsorshipRequest $sponsorshipRequest
    ) {}
}
