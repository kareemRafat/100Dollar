<?php

namespace Database\Seeders;

use App\Models\Idea;
use App\Models\IdeaFollow;
use App\Models\User;
use App\Models\UserFollow;
use Illuminate\Database\Seeder;

class FollowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $ideas = Idea::where('status', 'approved')->get();

        // User follows
        foreach ($users as $user) {
            $toFollow = $users->except($user->id)->random(rand(2, 5));
            foreach ($toFollow as $followed) {
                UserFollow::create([
                    'follower_id' => $user->id,
                    'following_id' => $followed->id,
                ]);
            }
        }

        // Idea follows
        foreach ($users as $user) {
            $ideasToFollow = $ideas->random(rand(1, 3));
            foreach ($ideasToFollow as $idea) {
                IdeaFollow::create([
                    'user_id' => $user->id,
                    'idea_id' => $idea->id,
                ]);
            }
        }
    }
}
