<?php

namespace Database\Seeders;

use App\Models\Idea;
use App\Models\Sponsor;
use App\Models\User;
use Illuminate\Database\Seeder;

class IdeaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role', 'user')->get();
        $sponsors = Sponsor::all();

        // 7 Approved ideas for current week (one for each day)
        for ($day = 0; $day <= 6; $day++) {
            $sponsor = $sponsors->where('day_of_week', $day)->first();
            Idea::factory()->approved()->create([
                'user_id' => $users->random()->id,
                'sponsor_id' => $sponsor?->id,
                'submission_day' => $day,
                'week_number' => now()->weekOfYear,
                'year' => now()->year,
            ]);
        }

        // 49 Archive ideas (7 per week for last 7 weeks)
        for ($week = 1; $week <= 7; $week++) {
            $targetWeek = now()->subWeeks($week);
            for ($day = 0; $day <= 6; $day++) {
                $sponsor = $sponsors->where('day_of_week', $day)->first();
                $isWinner = ($day === 0); // Mock one winner per week

                Idea::factory()->approved()->create([
                    'user_id' => $users->random()->id,
                    'sponsor_id' => $sponsor?->id,
                    'submission_day' => $day,
                    'week_number' => $targetWeek->weekOfYear,
                    'year' => $targetWeek->year,
                    'is_winner' => $isWinner,
                    'winner_announced_at' => $isWinner ? $targetWeek->endOfWeek() : null,
                ]);
            }
        }

        // 10 Pending ideas
        Idea::factory()->count(10)->pending()->create([
            'user_id' => $users->random()->id,
        ]);

        // 5 Rejected ideas
        Idea::factory()->count(5)->rejected()->create([
            'user_id' => $users->random()->id,
        ]);
    }
}
