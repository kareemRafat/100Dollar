<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Idea;
use Inertia\Inertia;
use Inertia\Response;

class IdeaController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('app/pages/my-ideas');
    }

    public function create(): Response
    {
        return Inertia::render('app/pages/submit-idea');
    }

    public function show(Idea $idea): Response
    {
        $idea->load(['user', 'sponsor']);
        $idea->loadCount('votes');

        $comments = $idea->comments()
            ->with(['user'])
            ->withCount('likes')
            ->latest()
            ->paginate(10);

        return Inertia::render('app/pages/idea/show', [
            'idea' => $idea,
            'comments' => [
                'data' => $comments->items(),
                'links' => [
                    'first' => $comments->url(1),
                    'last' => $comments->url($comments->lastPage()),
                    'prev' => $comments->previousPageUrl(),
                    'next' => $comments->nextPageUrl(),
                ],
                'meta' => [
                    'current_page' => $comments->currentPage(),
                    'from' => $comments->firstItem(),
                    'last_page' => $comments->lastPage(),
                    'path' => $comments->path(),
                    'per_page' => $comments->perPage(),
                    'to' => $comments->lastItem(),
                    'total' => $comments->total(),
                ],
            ],
            'isFollowingIdea' => auth()->check() ? auth()->user()->followedIdeas()->where('idea_id', $idea->id)->exists() : false,
            'isFollowingOwner' => auth()->check() ? auth()->user()->following()->where('following_id', $idea->user_id)->exists() : false,
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
