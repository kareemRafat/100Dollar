<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Admin\ConfirmWinner;
use App\Http\Controllers\Controller;
use App\Models\Idea;
use App\Models\Sponsor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WinnerController extends Controller
{
    /**
     * Display a preview of potential winners for each day of the current week.
     */
    public function index(): Response
    {
        $currentWeek = now()->weekOfYear;
        $currentYear = now()->year;

        // Get sponsors to know which days are active
        $sponsors = Sponsor::where('is_active', true)->get();

        $days = [];
        // Saturday (6) to Friday (5)
        $weekDays = [6, 0, 1, 2, 3, 4, 5];

        foreach ($weekDays as $i) {
            $sponsor = $sponsors->where('day_of_week', $i)->first();

            // Find the leading idea for this day
            $leadingIdea = Idea::with(['user.media', 'media', 'category', 'country'])
                ->where('submission_day', $i)
                ->where('week_number', $currentWeek)
                ->where('year', $currentYear)
                ->where('status', 'approved')
                ->orderByDesc('votes_count')
                ->first();

            // Find if a winner is already announced for this day
            $announcedWinner = Idea::with(['user.media', 'media', 'category', 'country'])
                ->where('submission_day', $i)
                ->where('week_number', $currentWeek)
                ->where('year', $currentYear)
                ->where('is_winner', true)
                ->first();

            $days[] = [
                'day_index' => $i,
                'sponsor' => $sponsor,
                'leading_idea' => $leadingIdea,
                'announced_winner' => $announcedWinner,
                'is_today' => now()->dayOfWeek === $i,
            ];
        }

        return Inertia::render('admin/pages/winners/preview', [
            'days' => $days,
            'week' => $currentWeek,
            'year' => $currentYear,
        ]);
    }

    /**
     * Confirm an idea as the official winner.
     */
    public function confirm(Request $request, Idea $idea, ConfirmWinner $confirmWinner): RedirectResponse
    {
        if ($idea->is_winner) {
            return back()->withErrors(['error' => 'هذه الفكرة فائزة بالفعل.']);
        }

        if ($idea->status !== 'approved') {
            return back()->withErrors(['error' => 'لا يمكن اختيار فكرة غير معتمدة كفائزة.']);
        }

        // Check if a winner already exists for this day/week/year
        $existingWinner = Idea::where('submission_day', $idea->submission_day)
            ->where('week_number', $idea->week_number)
            ->where('year', $idea->year)
            ->where('is_winner', true)
            ->exists();

        if ($existingWinner) {
            return back()->withErrors(['error' => 'تم الإعلان عن فائز بالفعل لهذا اليوم.']);
        }

        $confirmWinner->execute($idea);

        return back()->with('status', 'winner-confirmed');
    }
}
