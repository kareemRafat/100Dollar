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
        $idea->loadCount(['votes', 'comments']);

        $comments = $idea->comments()
            ->with(['user:id,name,avatar'])
            ->withCount('likes')
            ->latest()
            ->paginate(8);

        return Inertia::render('app/pages/idea/show', [
            'idea' => $idea,
            'comments' => Inertia::scroll($comments),
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
