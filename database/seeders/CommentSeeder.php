<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\CommentLike;
use App\Models\Idea;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ideas = Idea::where('status', 'approved')->get();
        $users = User::all();

        foreach ($ideas as $idea) {
            $comments = Comment::factory()->count(rand(3, 8))->create([
                'idea_id' => $idea->id,
                'user_id' => $users->random()->id,
            ]);

            foreach ($comments as $comment) {
                // Add random likes to each comment
                $likesCount = rand(0, 20);
                $likers = $users->random($likesCount);
                
                foreach ($likers as $liker) {
                    CommentLike::create([
                        'comment_id' => $comment->id,
                        'user_id' => $liker->id,
                    ]);
                }
                $comment->update(['likes_count' => $likers->count()]);
            }
        }
    }
}
