<?php

namespace App\Console\Commands;

use App\Actions\Admin\ConfirmWinner;
use App\Enums\IdeaStatus;
use App\Models\Idea;
use Illuminate\Console\Command;

class AnnounceWinner extends Command
{
    protected $signature = 'app:announce-winner';

    protected $description = 'Auto-determine winners for groups where all ideas have completed their 7-day voting window.';

    public function handle(ConfirmWinner $confirmWinner): int
    {
        $groups = Idea::where('status', IdeaStatus::APPROVED)
            ->where('is_winner', false)
            ->selectRaw('submission_day, week_number, year')
            ->groupBy('submission_day', 'week_number', 'year')
            ->get();

        $anyAction = false;

        foreach ($groups as $group) {
            $day = $group->submission_day;
            $week = $group->week_number;
            $year = $group->year;

            $ideas = Idea::where('submission_day', $day)
                ->where('week_number', $week)
                ->where('year', $year)
                ->where('status', IdeaStatus::APPROVED)
                ->where('is_winner', false)
                ->get();

            // Skip if any idea in the group still has its voting window open
            $allClosed = $ideas->every(fn ($idea) => $idea->voting_ends_at && $idea->voting_ends_at->isPast());

            if (! $allClosed) {
                $this->info("Group (day:{$day}, week:{$week}, year:{$year}): waiting for all ideas to complete voting window.");

                continue;
            }

            // Skip if winner already exists for this group
            $hasWinner = Idea::where('submission_day', $day)
                ->where('week_number', $week)
                ->where('year', $year)
                ->where('is_winner', true)
                ->exists();

            if ($hasWinner) {
                $this->info("Group (day:{$day}, week:{$week}, year:{$year}): winner already exists.");

                continue;
            }

            // Sort by votes_count DESC, approved_at ASC
            $sorted = $ideas->sortByDesc('votes_count')->sortBy('approved_at');

            $topIdea = $sorted->first();

            if (! $topIdea || $topIdea->votes_count === 0) {
                $this->warn("Group (day:{$day}, week:{$week}, year:{$year}): top idea has 0 votes — skipping.");

                continue;
            }

            // Check for tie
            $topVotes = $topIdea->votes_count;
            $tied = $sorted->filter(fn ($idea) => $idea->votes_count === $topVotes);

            if ($tied->count() > 1) {
                $this->warn("Group (day:{$day}, week:{$week}, year:{$year}): tie detected among ".$tied->count()." ideas with {$topVotes} votes — admin must decide manually.");

                continue;
            }

            $this->info("Group (day:{$day}, week:{$week}, year:{$year}): winner is {$topIdea->title} with {$topIdea->votes_count} votes.");
            $confirmWinner->execute($topIdea);
            $anyAction = true;
        }

        if (! $anyAction) {
            $this->info('No groups qualified for auto-winner determination.');
        }

        return Command::SUCCESS;
    }
}
