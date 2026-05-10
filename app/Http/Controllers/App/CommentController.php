<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Idea;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Idea $idea)
    {
        if ($idea->status !== 'approved') {
            abort(404);
        }

        $validated = $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $idea->comments()->create([
            'user_id' => auth()->id(),
            'body' => $validated['body'],
        ]);

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
