<?php

namespace App\Http\Controllers\App;

use App\Http\Resources\App\CommentResource;
use App\Http\Resources\App\IdeaResource;
use App\Http\Controllers\Controller;
use App\Models\Idea;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class IdeaController extends Controller
{
    public function index(Request $request): Response
    {
        $user = auth()->user();
        $query = $user->ideas()
            ->latest()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->status, function ($query, $status) {
                if ($status === 'winner') {
                    $query->where('is_winner', true);
                } else {
                    $query->where('status', $status);
                }
            });

        $ideas = $query->get();

        $stats = [
            [
                'label' => __('messages.my_ideas.stats_total_ideas'),
                'value' => (string) $user->ideas()->count(),
                'unit' => __('messages.my_ideas.unit_idea'),
                'icon' => 'lightbulb',
            ],
            [
                'label' => __('messages.my_ideas.stats_total_votes'),
                'value' => number_format($user->ideas()->sum('votes_count')),
                'unit' => __('messages.my_ideas.unit_vote'),
                'icon' => 'vote',
            ],
            [
                'label' => __('messages.my_ideas.stats_winning_ideas'),
                'value' => str_pad($user->ideas()->where('is_winner', true)->count(), 2, '0', STR_PAD_LEFT),
                'unit' => __('messages.my_ideas.unit_prizes'),
                'icon' => 'emoji_events',
            ],
        ];

        return Inertia::render('app/pages/idea/index', [
            'ideas' => IdeaResource::collection($ideas),
            'filters' => $request->only(['search', 'status']),
            'stats' => $stats,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('app/pages/idea/create', [
            'categories' => Category::all(),
            'countries' => __('messages.countries'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'category_id' => ['required', 'exists:categories,id'],
            'country' => ['required', 'string'],
            'city' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:2048'], // 2MB
            'pdf_file' => ['nullable', 'file', 'mimes:pdf', 'max:5120'], // 5MB
            'agreed_terms' => ['required', 'accepted'],
            'agreed_privacy' => ['required', 'accepted'],
            'agreed_legal' => ['required', 'accepted'],
        ]);

        $idea = DB::transaction(function () use ($validated, $request) {
            /** @var Idea $idea */
            $idea = auth()->user()->ideas()->create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'category_id' => $validated['category_id'],
                'country' => $validated['country'],
                'city' => $validated['city'],
                'status' => 'pending',
                'submission_day' => now()->dayOfWeek,
                'week_number' => now()->weekOfYear,
                'year' => now()->year,
            ]);

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('ideas/images', 'public');
                $idea->media()->create([
                    'file_path' => $path,
                    'mime_type' => $request->file('image')->getMimeType(),
                    'file_size' => $request->file('image')->getSize(),
                    'collection_name' => 'image',
                    'disk' => 'public',
                ]);
            }

            if ($request->hasFile('pdf_file')) {
                $path = $request->file('pdf_file')->store('ideas/pdfs', 'public');
                $idea->media()->create([
                    'file_path' => $path,
                    'mime_type' => $request->file('pdf_file')->getMimeType(),
                    'file_size' => $request->file('pdf_file')->getSize(),
                    'collection_name' => 'pdf',
                    'disk' => 'public',
                ]);
            }

            return $idea;
        });

        // TODO: Send internal admin notification
        // $adminUsers = User::where('role', 'admin')->get();
        // Notification::send($adminUsers, new NewIdeaSubmitted($idea));

        return redirect()->route('app.ideas.index')
            ->with('success', __('messages.idea_submitted_successfully'));
    }

    public function show(Idea $idea): Response
    {
        JsonResource::withoutWrapping();

        $idea->load(['user.media', 'sponsor.media']);
        $idea->loadCount(['votes', 'comments']);

        return Inertia::render('app/pages/idea/show', [
            'idea' => new IdeaResource($idea),
            'comments' => Inertia::defer(fn () => Inertia::scroll(fn () => CommentResource::collection(
                $idea->comments()
                    ->with(['user.media'])
                    ->withCount('likes')
                    ->latest('id')
                    ->cursorPaginate(7)
            ))),
            'isFollowingIdea' => auth()->check() 
                ? auth()->user()->followedIdeas()->where('idea_id', $idea->id)->exists() 
                : false,
            'isFollowingOwner' => auth()->check() 
                ? auth()->user()->following()->where('following_id', $idea->user_id)->exists() 
                : false,
        ]);
    }

    public function toggleFollow(Idea $idea)
    {
        $user = auth()->user();
        $follow = $user->followedIdeas()->where('idea_id', $idea->id)->first();

        if ($follow) {
            $follow->delete();
        } else {
            $user->followedIdeas()->create(['idea_id' => $idea->id]);
        }

        return back();
    }
}
