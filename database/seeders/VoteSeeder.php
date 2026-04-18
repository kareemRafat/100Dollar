<?php

namespace Database\Seeders;

use App\Models\Idea;
use App\Models\Vote;
use Illuminate\Database\Seeder;

class VoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ideas = Idea::where('status', 'approved')->get();

        foreach ($ideas as $idea) {
            $votesCount = rand(5, 20);
            Vote::factory()->count($votesCount)->create([
                'idea_id' => $idea->id,
            ]);

            $idea->update(['votes_count' => $votesCount]);
        }
    }
}
