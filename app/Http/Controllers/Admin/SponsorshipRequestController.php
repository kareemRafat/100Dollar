<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSponsorshipRequestStatusRequest;
use App\Models\SponsorshipRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SponsorshipRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $status = $request->input('status');

        $requests = SponsorshipRequest::query()
            ->with(['country', 'media'])
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/pages/sponsorship-requests/index', [
            'requests' => $requests,
            'filters' => $request->only(['status']),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(SponsorshipRequest $sponsorshipRequest): Response
    {
        $sponsorshipRequest->load(['country', 'media']);

        return Inertia::render('admin/pages/sponsorship-requests/show', [
            'request' => $sponsorshipRequest,
        ]);
    }

    /**
     * Update the specified resource status.
     */
    public function updateStatus(UpdateSponsorshipRequestStatusRequest $request, SponsorshipRequest $sponsorshipRequest): RedirectResponse
    {
        $sponsorshipRequest->update($request->validated());

        return back()->with('status', 'request-status-updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SponsorshipRequest $sponsorshipRequest): RedirectResponse
    {
        $sponsorshipRequest->delete();

        return back()->with('status', 'request-deleted');
    }
}
