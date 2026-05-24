<?php

namespace App\Http\Controllers\App;

use App\Enums\IdeaStatus;
use App\Events\IdeaSubmitted;
use App\Http\Controllers\Controller;
use App\Http\Requests\App\IdeaRequest;
use App\Http\Resources\App\CommentResource;
use App\Http\Resources\App\IdeaResource;
use App\Models\Category;
use App\Models\Country;
use App\Models\Idea;
use App\Models\Vote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class IdeaController extends Controller
{
    public function index(Request $request): Response
    {
        $user = auth()->user();
        $query = $user->ideas()
            ->with(['media', 'category', 'country'])
            ->withCount(['comments'])
            ->latest()
            ->when($request->search, function ($query, $search) {
                $query->whereFullText(['title', 'description'], $search);
            })
            ->when($request->status, function ($query, $status) {
                if ($status === 'winner') {
                    $query->where('is_winner', true);
                } else {
                    $query->where('status', $status);
                }
            });

        $maxVotesCount = (int) ((clone $query)->max('votes_count') ?? 0);
        $request->attributes->set('idea_max_votes', $maxVotesCount);

        $ideas = $query->get();

        $userStats = $user->ideas()
            ->selectRaw('count(*) as total_ideas, coalesce(sum(votes_count), 0) as total_votes, sum(is_winner) as winning_ideas')
            ->first();

        $stats = [
            [
                'label' => __('messages.my_ideas.stats_total_ideas'),
                'value' => (string) ($userStats->total_ideas ?? 0),
                'unit' => __('messages.my_ideas.unit_idea'),
                'icon' => 'lightbulb',
            ],
            [
                'label' => __('messages.my_ideas.stats_total_votes'),
                'value' => number_format($userStats->total_votes ?? 0),
                'unit' => __('messages.my_ideas.unit_vote'),
                'icon' => 'vote',
            ],
            [
                'label' => __('messages.my_ideas.stats_winning_ideas'),
                'value' => str_pad($userStats->winning_ideas ?? 0, 2, '0', STR_PAD_LEFT),
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
            'countries' => Country::all(),
        ]);
    }

    public function store(IdeaRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $idea = DB::transaction(function () use ($validated, $request) {
            /** @var Idea $idea */
            $idea = auth()->user()->ideas()->create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'category_id' => $validated['category_id'],
                'country_id' => $validated['country_id'],
                'city' => $validated['city'],
                'marketing_channel' => $validated['marketing_channel'],
                'target_audience' => $validated['target_audience'],
                'implementation_time' => $validated['implementation_time'],
                'status' => IdeaStatus::PENDING,
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

        event(new IdeaSubmitted($idea));

        return redirect()->route('app.ideas.index')
            ->with('success', __('messages.idea_submitted_successfully'));
    }

    public function edit(Idea $idea): Response|RedirectResponse
    {
        if (auth()->id() !== $idea->user_id) {
            abort(403);
        }

        if (! in_array($idea->status, [IdeaStatus::PENDING, IdeaStatus::REJECTED])) {
            return redirect()->route('app.ideas.index')->with('error', __('messages.edit_not_allowed'));
        }

        return Inertia::render('app/pages/idea/edit', [
            'idea' => (new IdeaResource($idea->load(['media', 'category', 'country'])))->resolve(),
            'categories' => Category::all(),
            'countries' => Country::all(),
        ]);
    }

    public function update(IdeaRequest $request, Idea $idea): RedirectResponse
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated, $request, $idea) {
            $idea->update([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'category_id' => $validated['category_id'],
                'country_id' => $validated['country_id'],
                'city' => $validated['city'],
                'marketing_channel' => $validated['marketing_channel'],
                'target_audience' => $validated['target_audience'],
                'implementation_time' => $validated['implementation_time'],
                'status' => IdeaStatus::PENDING, // Reset to pending
            ]);

            if ($request->hasFile('image')) {
                // Delete old image explicitly to trigger model hooks
                $idea->media()->where('collection_name', 'image')->get()->each->delete();

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
                // Delete old PDF explicitly to trigger model hooks
                $idea->media()->where('collection_name', 'pdf')->get()->each->delete();

                $path = $request->file('pdf_file')->store('ideas/pdfs', 'public');
                $idea->media()->create([
                    'file_path' => $path,
                    'mime_type' => $request->file('pdf_file')->getMimeType(),
                    'file_size' => $request->file('pdf_file')->getSize(),
                    'collection_name' => 'pdf',
                    'disk' => 'public',
                ]);
            }
        });

        return redirect()->route('app.ideas.index')
            ->with('success', __('messages.idea_updated_successfully'));
    }

    public function show(Request $request, Idea $idea): Response
    {
        if ($idea->status !== IdeaStatus::APPROVED && auth()->id() !== $idea->user_id) {
            abort(404);
        }

        JsonResource::withoutWrapping();

        $idea->load(['user.media', 'sponsor.media', 'country', 'category', 'media']);
        $idea->loadCount(['votes', 'comments']);

        $maxVotesCount = (int) (Idea::query()
            ->where('submission_day', $idea->submission_day)
            ->where('week_number', $idea->week_number)
            ->where('year', $idea->year)
            ->where('status', IdeaStatus::APPROVED)
            ->max('votes_count') ?? 0);
        $request->attributes->set('idea_max_votes', $maxVotesCount);

        $shareDescription = Str::limit(trim((string) $idea->description), 160, '');
        $shareUrl = $request->fullUrl();
        $shareImage = $idea->image;
        $shareImageType = $idea->media->where('collection_name', 'image')->first()?->mime_type;

        $shareMeta = [
            'title' => $idea->title,
            'description' => $shareDescription,
            'url' => $shareUrl,
            'image' => $shareImage,
            'image_type' => $shareImageType,
        ];

        // Find if user/IP already voted for an idea in this competition day
        $votedIdeaId = null;
        $voterEmail = auth()->check() ? auth()->user()->email : null;

        $votedIdeaId = Vote::whereNotNull('otp_verified_at')
            ->when($voterEmail, fn ($q) => $q->where('voter_email', $voterEmail), fn ($q) => $q->where('ip_address', request()->ip()))
            ->whereHas('idea', function ($query) use ($idea) {
                $query->where('submission_day', $idea->submission_day)
                    ->where('week_number', $idea->week_number)
                    ->where('year', $idea->year);
            })
            ->value('idea_id');

        return Inertia::render('app/pages/idea/show', [
            'idea' => new IdeaResource($idea),
            'shareMeta' => $shareMeta,
            'comments' => Inertia::optional(fn () => Inertia::scroll(fn () => CommentResource::collection(
                $idea->comments()
                    ->withTrashed()
                    ->with(['user.media'])
                    ->withCount('likes')
                    ->when(auth()->check(), fn ($q) => $q->withExists(['likes as is_liked' => fn ($f) => $f->where('user_id', auth()->id())]))
                    ->latest('id')
                    ->cursorPaginate(7)
            ))),
            'isFollowingIdea' => auth()->check()
                ? (bool) auth()->user()->followedIdeas()->where('idea_id', $idea->id)->exists()
                : false,
            'isFollowingOwner' => auth()->check()
                ? (bool) auth()->user()->following()->where('following_id', $idea->user_id)->exists()
                : false,
            'votedIdeaId' => (int) $votedIdeaId ?: null,
        ])->withViewData([
            'shareMeta' => $shareMeta,
        ]);
    }

    public function toggleFollow(Idea $idea)
    {
        if ($idea->status !== IdeaStatus::APPROVED) {
            abort(404);
        }

        $user = auth()->user();

        if ($user->id === $idea->user_id) {
            return back();
        }

        $follow = $user->followedIdeas()->where('idea_id', $idea->id)->first();

        if ($follow) {
            $follow->delete();
        } else {
            $user->followedIdeas()->create(['idea_id' => $idea->id]);
        }

        return back();
    }

    public function destroy(Idea $idea): RedirectResponse
    {
        if (auth()->id() !== $idea->user_id) {
            abort(403);
        }

        if ($idea->is_winner) {
            return back()->with('error', __('messages.idea_deletion_error_winner'));
        }

        // Deleting the idea will trigger the Media deleting hook via the relationship
        // and database cascade for other relationships.
        $idea->delete();

        return redirect()->route('app.ideas.index')
            ->with('success', __('messages.idea_deleted_successfully'));
    }
}
