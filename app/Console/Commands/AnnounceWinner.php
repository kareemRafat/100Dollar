<?php

namespace App\Console\Commands;

use App\Actions\Admin\ConfirmWinner;
use App\Enums\IdeaStatus;
use App\Models\Idea;
use Illuminate\Console\Command;

class AnnounceWinner extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:announce-winner {day? : The day of week (0-6) to announce for. Defaults to yesterday.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Automatically announce the winner for a specific day based on highest votes.';

    /**
     * Execute the console command.
     */
    public function handle(ConfirmWinner $confirmWinner): int
    {
        $day = $this->argument('day');

        // If no day provided, default to yesterday
        if ($day === null) {
            $day = now()->subDay()->dayOfWeek;
            $targetDate = now()->subDay();
        } else {
            $day = (int) $day;
            // Find the most recent date for this day of week
            $targetDate = now()->next($day)->subWeek();
            if ($targetDate->isFuture()) {
                $targetDate = $targetDate->subWeek();
            }
        }

        $weekNumber = $targetDate->weekOfYear;
        $year = $targetDate->year;

        $this->info("Checking for winner on day {$day}, week {$weekNumber}, year {$year}...");

        // Check if winner already exists
        $existingWinner = Idea::where('submission_day', $day)
            ->where('week_number', $weekNumber)
            ->where('year', $year)
            ->where('is_winner', true)
            ->exists();

        if ($existingWinner) {
            $this->warn('A winner has already been announced for this day.');

            return Command::SUCCESS;
        }

        // Find leading idea
        $leadingIdea = Idea::where('submission_day', $day)
            ->where('week_number', $weekNumber)
            ->where('year', $year)
            ->where('status', IdeaStatus::APPROVED)
            ->orderByDesc('votes_count')
            ->first();

        if (! $leadingIdea) {
            $this->error('No approved ideas found for this day.');

            return Command::FAILURE;
        }

        $this->info("Selected Winner: {$leadingIdea->title} by {$leadingIdea->user->name} with {$leadingIdea->votes_count} votes.");

        $confirmWinner->execute($leadingIdea);

        $this->info('Winner successfully announced!');

        return Command::SUCCESS;
    }
}
