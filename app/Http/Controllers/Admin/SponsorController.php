<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sponsor;
use App\Http\Requests\Admin\StoreSponsorRequest;
use App\Http\Requests\Admin\UpdateSponsorRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SponsorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $sponsors = Sponsor::query()
            ->with(['media'])
            ->withCount(['ideas', 'prizeRecords'])
            ->orderBy('day_of_week')
            ->get();

        return Inertia::render('admin/pages/sponsors/index', [
            'sponsors' => $sponsors,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSponsorRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request) {
            $sponsor = Sponsor::create($request->validated());

            if ($request->hasFile('logo')) {
                $file = $request->file('logo');
                $path = $file->store('sponsors/logos', 'public');

                $sponsor->media()->create([
                    'file_path' => $path,
                    'mime_type' => $file->getMimeType(),
                    'file_size' => $file->getSize(),
                    'collection_name' => 'logo',
                    'disk' => 'public',
                ]);
            }
        });

        return back()->with('status', 'sponsor-created');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSponsorRequest $request, Sponsor $sponsor): RedirectResponse
    {
        DB::transaction(function () use ($request, $sponsor) {
            $sponsor->update($request->validated());

            if ($request->hasFile('logo')) {
                // Delete old logo
                $oldLogo = $sponsor->singleMedia('logo')->first();
                if ($oldLogo) {
                    Storage::disk($oldLogo->disk)->delete($oldLogo->file_path);
                    $oldLogo->delete();
                }

                $file = $request->file('logo');
                $path = $file->store('sponsors/logos', 'public');

                $sponsor->media()->create([
                    'file_path' => $path,
                    'mime_type' => $file->getMimeType(),
                    'file_size' => $file->getSize(),
                    'collection_name' => 'logo',
                    'disk' => 'public',
                ]);
            }
        });

        return back()->with('status', 'sponsor-updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sponsor $sponsor): RedirectResponse
    {
        DB::transaction(function () use ($sponsor) {
            $logo = $sponsor->singleMedia('logo')->first();
            if ($logo) {
                Storage::disk($logo->disk)->delete($logo->file_path);
                $logo->delete();
            }
            $sponsor->delete();
        });

        return back()->with('status', 'sponsor-deleted');
    }

    /**
     * Toggle active status.
     */
    public function toggleStatus(Sponsor $sponsor): RedirectResponse
    {
        $sponsor->update(['is_active' => !$sponsor->is_active]);

        return back()->with('status', 'sponsor-status-updated');
    }
}
