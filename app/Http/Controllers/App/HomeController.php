<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Http\Resources\App\IdeaResource;
use App\Models\Idea;
use App\Models\Sponsor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        $now = Carbon::now();
        $currentDay = (int) $request->query('day', $now->dayOfWeek);
        $currentWeek = $now->isoWeek();
        $currentYear = $now->isoWeekYear();

        $ideas = Idea::with(['user:id,name', 'user.media', 'category', 'media'])
            ->withCount('comments')
            ->where('submission_day', $currentDay)
            ->where('week_number', $currentWeek)
            ->where('year', $currentYear)
            ->where('status', 'approved')
            ->orderByDesc('votes_count')
            ->simplePaginate(6)
            ->withQueryString();

        $sponsor = Sponsor::with('media')
            ->where('day_of_week', $currentDay)
            ->where('is_active', true)
            ->first(['id', 'name', 'day_of_week']);

        $previousWinners = Inertia::optional(fn () => Idea::with(['user:id,name', 'user.media', 'sponsor:id,name', 'sponsor.media', 'media'])
            ->where('is_winner', true)
            ->orderByDesc('winner_announced_at')
            ->take(7)
            ->get(['id', 'user_id', 'sponsor_id', 'title', 'winner_announced_at'])
            ->values());

        // Calculate countdown to the end of the day (no cache needed)
        $endOfDay = $now->copy()->endOfDay();
        $secondsUntilEnd = $now->diffInSeconds($endOfDay);

        return Inertia::render('app/pages/home/index', [
            'ideas' => Inertia::scroll(IdeaResource::collection($ideas)),
            'sponsor' => $sponsor,
            'previousWinners' => $previousWinners,
            'currentDay' => $currentDay,
            'secondsUntilEnd' => $secondsUntilEnd,
            'weekDays' => $this->getWeekDays(),
        ]);
    }

    private function getWeekDays(): array
    {
        return [
            ['id' => 6, 'name' => 'messages.sponsors.days.saturday'],
            ['id' => 0, 'name' => 'messages.sponsors.days.sunday'],
            ['id' => 1, 'name' => 'messages.sponsors.days.monday'],
            ['id' => 2, 'name' => 'messages.sponsors.days.tuesday'],
            ['id' => 3, 'name' => 'messages.sponsors.days.wednesday'],
            ['id' => 4, 'name' => 'messages.sponsors.days.thursday'],
            ['id' => 5, 'name' => 'messages.sponsors.days.friday'],
        ];
    }
}
