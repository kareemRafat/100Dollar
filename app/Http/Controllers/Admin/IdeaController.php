<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateIdeaStatusRequest;
use App\Models\Idea;
use App\Notifications\IdeaRejectedNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IdeaController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->input('status', 'pending');
        $search = $request->input('search');

        $ideas = Idea::with(['user.media', 'category', 'country', 'media'])
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhereHas('user', function ($qu) use ($search) {
                            $qu->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/pages/ideas/index', [
            'ideas' => $ideas,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    public function show(Idea $idea): Response
    {
        $idea->load(['user.media', 'category', 'country', 'media']);

        return Inertia::render('admin/pages/ideas/show', [
            'idea' => $idea,
        ]);
    }

    public function updateStatus(UpdateIdeaStatusRequest $request, Idea $idea): RedirectResponse
    {
        $validated = $request->validated();

        if ($validated['status'] === 'approved') {
            $idea->update([
                'status' => 'approved',
                'submission_day' => $validated['submission_day'],
                'approved_at' => now(),
            ]);

            return back()->with('status', 'idea-approved');
        }

        if ($validated['status'] === 'rejected') {
            $idea->update([
                'status' => 'rejected',
                'rejection_reason' => $validated['rejection_reason'],
            ]);

            $idea->user->notify(new IdeaRejectedNotification($idea, $validated['rejection_reason']));

            return back()->with('status', 'idea-rejected');
        }

        return back();
    }
}
