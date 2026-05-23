<?php

namespace App\Http\Controllers\App;

use App\Enums\IdeaStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\App\IdeaResource;
use App\Models\Category;
use App\Models\Idea;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArchiveController extends Controller
{
    public function index(Request $request): Response
    {
        $ideasQuery = Idea::query()
            ->with(['user.media', 'category', 'country', 'media'])
            ->withCount('comments')
            ->where('status', IdeaStatus::APPROVED)
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->category && $request->category !== 'all', function ($query) use ($request) {
                $query->where('category_id', $request->category);
            })
            ->when($request->day !== null && $request->day !== '' && $request->day !== 'all', function ($query) use ($request) {
                $query->where('submission_day', $request->day);
            })
            ->when($request->month && $request->month !== 'all', function ($query) use ($request) {
                $query->whereMonth('approved_at', $request->month);
            })
            ->when($request->status === 'winner', function ($query) {
                $query->where('is_winner', true);
            })
            ->when($request->status === 'non_winner', function ($query) {
                $query->where('is_winner', false);
            });

        $maxVotesCount = (int) ((clone $ideasQuery)->max('votes_count') ?? 0);
        $request->attributes->set('idea_max_votes', $maxVotesCount);

        $ideas = $ideasQuery
            ->when($request->sort === 'popular', function ($query) {
                $query->orderBy('votes_count', 'desc');
            }, function ($query) {
                $query->latest();
            })
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('app/pages/archive/index', [
            'filters' => $request->only(['search', 'category', 'day', 'month', 'status', 'sort']),
            'categories' => Category::select(['id', 'name_ar', 'name_en', 'icon'])->get(),
            'ideas' => IdeaResource::collection($ideas),
        ]);
    }
}
