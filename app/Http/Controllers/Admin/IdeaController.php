<?php

namespace App\Http\Controllers\Admin;

use App\Enums\IdeaStatus;
use App\Events\IdeaApproved;
use App\Events\IdeaRejected;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateIdeaStatusRequest;
use App\Http\Resources\Admin\IdeaResource;
use App\Models\Idea;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IdeaController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->input('status', IdeaStatus::PENDING->value);
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
            'ideas' => IdeaResource::collection($ideas),
            'filters' => $request->only(['status', 'search', 'page']),
            'counts' => Inertia::optional(function () {
                $counts = Idea::query()
                    ->selectRaw("
                        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
                        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
                        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected
                    ")
                    ->first();

                return [
                    'pending' => (int) ($counts->pending ?? 0),
                    'approved' => (int) ($counts->approved ?? 0),
                    'rejected' => (int) ($counts->rejected ?? 0),
                ];
            }),
        ]);
    }

    public function show(Request $request, Idea $idea): Response
    {
        $idea->load(['user.media', 'category', 'country', 'media']);

        return Inertia::render('admin/pages/ideas/show', [
            'idea' => $idea,
            'filters' => $request->only(['status', 'search', 'page']),
            'comments' => Inertia::optional(fn () => $idea->comments()
                ->with('user.media')
                ->withTrashed()
                ->latest()
                ->get()
            ),
        ]);
    }

    public function updateStatus(UpdateIdeaStatusRequest $request, Idea $idea): RedirectResponse
    {
        $validated = $request->validated();

        if ($validated['status'] === IdeaStatus::APPROVED->value) {
            $idea->update([
                'status' => IdeaStatus::APPROVED,
                'submission_day' => $validated['submission_day'],
                'approved_at' => now(),
                'voting_ends_at' => now()->addDays(7),
                'rejection_reason' => null,
            ]);

            event(new IdeaApproved($idea));

            return back()->with('status', 'idea-approved');
        }

        if ($validated['status'] === IdeaStatus::REJECTED->value) {
            $idea->update([
                'status' => IdeaStatus::REJECTED,
                'rejection_reason' => $validated['rejection_reason'],
                'approved_at' => null,
                'submission_day' => 0,
            ]);

            event(new IdeaRejected($idea, $validated['rejection_reason']));

            return back()->with('status', 'idea-rejected');
        }

        return back();
    }

    public function destroy(Idea $idea): RedirectResponse
    {
        $idea->delete();

        return to_route('admin.ideas.index')->with('status', 'idea-deleted');
    }
}
