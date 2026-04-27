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
        // Delayed as per user request, but route exists
        return back();
    }
}
