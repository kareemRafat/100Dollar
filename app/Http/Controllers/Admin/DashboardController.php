<?php

namespace App\Http\Controllers\Admin;

use App\Enums\IdeaStatus;
use App\Http\Controllers\Controller;
use App\Models\Idea;
use App\Models\Sponsor;
use App\Models\User;
use App\Models\Vote;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $days = 30;
        $startDate = now()->subDays($days);

        return Inertia::render('admin/pages/dashboard/index', [
            // Instant: Load immediately
            'stats' => [
                'ideas_count' => Idea::count(),
                'votes_count' => Vote::count(),
                'users_count' => User::count(),
                'sponsors_count' => Sponsor::count(),
                'pending_ideas_count' => Idea::where('status', IdeaStatus::PENDING)->count(),
            ],

            // Deferred: Load after the page renders or when visible
            'trends' => Inertia::optional(fn () => [
                'ideas' => Idea::query()
                    ->toBase()
                    ->selectRaw('DATE(created_at) as day, count(*) as count')
                    ->where('created_at', '>=', $startDate)
                    ->groupBy('day')
                    ->orderBy('day')
                    ->get(),

                'votes' => Vote::query()
                    ->toBase()
                    ->selectRaw('DATE(created_at) as day, count(*) as count')
                    ->where('created_at', '>=', $startDate)
                    ->groupBy('day')
                    ->orderBy('day')
                    ->get(),

                'users' => User::query()
                    ->toBase()
                    ->selectRaw('YEARWEEK(created_at, 1) as week, count(*) as count')
                    ->where('created_at', '>=', now()->subWeeks(12))
                    ->groupBy('week')
                    ->orderBy('week')
                    ->get(),
            ]),

            'top_ideas' => Inertia::optional(fn () => Idea::with(['user.media', 'country', 'media'])
                ->orderBy('votes_count', 'desc')
                ->limit(5)
                ->get()),

            'country_distribution' => Inertia::optional(fn () => Idea::query()
                ->toBase()
                ->join('countries', 'ideas.country_id', '=', 'countries.id')
                ->selectRaw('countries.name_ar as country, count(*) as count')
                ->groupBy('country')
                ->orderBy('count', 'desc')
                ->get()),
        ]);
    }
}
