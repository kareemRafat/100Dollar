<?php

namespace Database\Seeders;

use App\Enums\PrizeStatus;
use App\Models\Idea;
use App\Models\PrizeRecord;
use Illuminate\Database\Seeder;

class PrizeRecordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $winningIdeas = Idea::where('is_winner', true)->get();

        foreach ($winningIdeas as $idea) {
            PrizeRecord::factory()->create([
                'idea_id' => $idea->id,
                'sponsor_id' => $idea->sponsor_id,
                'status' => rand(0, 1) ? PrizeStatus::DELIVERED : PrizeStatus::PENDING,
                'delivered_at' => null, // Factory state handled it but I can override
            ]);
        }
    }
}
