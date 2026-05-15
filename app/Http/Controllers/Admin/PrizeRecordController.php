<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\PrizeRecordResource;
use App\Models\PrizeRecord;
use App\Models\Sponsor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PrizeRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $status = $request->input('status');
        $sponsorId = $request->input('sponsor_id');

        $prizes = PrizeRecord::query()
            ->with(['sponsor.media', 'idea.user.media', 'idea.media'])
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($sponsorId, function ($query, $sponsorId) {
                $query->where('sponsor_id', $sponsorId);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/pages/prizes/index', [
            'prizes' => PrizeRecordResource::collection($prizes),
            'sponsors' => Sponsor::with('media')->get(),
            'filters' => $request->only(['status', 'sponsor_id']),
        ]);
    }

    /**
     * Update the prize status.
     */
    public function updateStatus(Request $request, PrizeRecord $prizeRecord): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string'], // e.g., 'pending', 'paid'
            'delivered_at' => ['nullable', 'date'],
        ]);

        if ($validated['status'] === 'paid' && ! $prizeRecord->delivered_at) {
            $validated['delivered_at'] = now();
        }

        $prizeRecord->update($validated);

        return back()->with('status', 'prize-updated');
    }
}
