<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Http\Resources\App\SponsorResource;
use App\Models\Sponsor;
use App\Models\SponsorshipRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Inertia\Inertia;
use Inertia\Response;

class SponsorController extends Controller
{
    public function index(): Response
    {
        JsonResource::withoutWrapping();

        $sponsors = Sponsor::with('media')
            ->orderBy('day_of_week')
            ->get();

        return Inertia::render('app/pages/sponsors/index', [
            'sponsors' => SponsorResource::collection($sponsors),
            'today' => now()->dayOfWeek,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('app/pages/sponsors/apply');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'website' => ['nullable', 'url', 'max:255'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        SponsorshipRequest::create($validated);

        return redirect()->route('app.sponsors')
            ->with('success', __('messages.sponsors.application_success'));
    }
}
