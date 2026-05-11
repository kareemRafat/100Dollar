<?php

namespace App\Http\Controllers\App;

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
        return Inertia::render('app/pages/archive/index', [
            'filters' => $request->only(['search', 'category', 'day', 'month', 'status', 'sort']),
            'categories' => Category::select(['id', 'name_ar', 'name_en', 'icon'])->get(),
            'ideas' => Inertia::optional(function () use ($request) {
                $ideas = Idea::query()
                    ->with(['user.media', 'category', 'country', 'media'])
                    ->where('status', 'approved')
                    ->when($request->search, function ($query, $search) {
                        $query->where(function ($q) use ($search) {
                            $q->where('title', 'like', "%{$search}%")
                                ->orWhere('description', 'like', "%{$search}%");
                        });
                    })
                    ->when($request->category, function ($query, $category) {
                        $query->where('category_id', $category);
                    })
                    ->when($request->day !== null && $request->day !== '', function ($query) use ($request) {
                        $query->where('submission_day', $request->day);
                    })
                    ->when($request->month, function ($query, $month) {
                        $query->whereMonth('approved_at', $month);
                    })
                    ->when($request->status === 'winner', function ($query) {
                        $query->where('is_winner', true);
                    })
                    ->when($request->status === 'non_winner', function ($query) {
                        $query->where('is_winner', false);
                    })
                    ->when($request->sort === 'popular', function ($query) {
                        $query->orderBy('votes_count', 'desc');
                    }, function ($query) {
                        $query->latest();
                    })
                    ->paginate(12)
                    ->withQueryString();

                return Inertia::scroll(IdeaResource::collection($ideas));
            }),
        ]);
    }
}
