<?php

namespace App\Http\Controllers\Admin;

use App\Enums\SponsorshipStatus;
use App\Events\SponsorshipRequestApproved;
use App\Events\SponsorshipRequestRejected;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSponsorshipRequestStatusRequest;
use App\Http\Resources\Admin\SponsorshipRequestResource;
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
            'requests' => SponsorshipRequestResource::collection($requests),
            'filters' => $request->only(['status']),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(SponsorshipRequest $sponsorship_request): Response
    {
        $sponsorship_request->load(['country', 'media']);

        return Inertia::render('admin/pages/sponsorship-requests/show', [
            'request' => $sponsorship_request,
        ]);
    }

    /**
     * Update the specified resource status.
     */
    public function updateStatus(UpdateSponsorshipRequestStatusRequest $request, SponsorshipRequest $sponsorship_request): RedirectResponse
    {
        $validated = $request->validated();

        if ($validated['status'] === SponsorshipStatus::APPROVED->value) {
            $sponsorship_request->update([
                'status' => SponsorshipStatus::APPROVED,
                'rejection_reason' => null,
            ]);

            event(new SponsorshipRequestApproved($sponsorship_request));

            return back()->with('status', 'request-approved');
        }

        if ($validated['status'] === SponsorshipStatus::REJECTED->value) {
            $sponsorship_request->update([
                'status' => SponsorshipStatus::REJECTED,
                'rejection_reason' => $validated['rejection_reason'],
            ]);

            event(new SponsorshipRequestRejected($sponsorship_request, $validated['rejection_reason']));

            return back()->with('status', 'request-rejected');
        }

        $sponsorship_request->update([
            'status' => SponsorshipStatus::PENDING,
            'rejection_reason' => null,
        ]);

        return back()->with('status', 'request-status-updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SponsorshipRequest $sponsorship_request): RedirectResponse
    {
        $sponsorship_request->delete();

        return redirect()->route('admin.sponsorship-requests.index')->with('status', 'request-deleted');
    }
}
