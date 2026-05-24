<?php

namespace App\Http\Controllers\App;

use App\Enums\IdeaStatus;
use App\Events\CommentCreated;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Idea;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Idea $idea)
    {
        if ($idea->status !== IdeaStatus::APPROVED && auth()->id() !== $idea->user_id) {
            abort(404);
        }

        $validated = $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $comment = $idea->comments()->create([
            'user_id' => auth()->id(),
            'body' => $validated['body'],
        ]);

        event(new CommentCreated($comment));

        return back();
    }

    public function toggleLike(Comment $comment)
    {
        $user = auth()->user();
        $like = $comment->likes()->where('user_id', $user->id)->first();

        if ($like) {
            $like->delete();
            $comment->decrement('likes_count');
        } else {
            $comment->likes()->create(['user_id' => $user->id]);
            $comment->increment('likes_count');
        }

        return back();
    }
}
