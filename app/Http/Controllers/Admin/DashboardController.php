<?php

namespace App\Http\Controllers\Admin;

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

        // Basic Stats
        $stats = [
            'ideas_count' => Idea::count(),
            'votes_count' => Vote::count(),
            'users_count' => User::count(),
            'sponsors_count' => Sponsor::count(),
            'pending_ideas_count' => Idea::where('status', 'pending')->count(),
        ];

        // Ideas Trend (Daily)
        $ideasTrend = Idea::query()
            ->toBase()
            ->selectRaw('DATE(created_at) as day, count(*) as count')
            ->where('created_at', '>=', $startDate)
            ->groupBy('day')
            ->orderBy('day')
            ->get();

        // Votes Trend (Daily)
        $votesTrend = Vote::query()
            ->toBase()
            ->selectRaw('DATE(created_at) as day, count(*) as count')
            ->where('created_at', '>=', $startDate)
            ->groupBy('day')
            ->orderBy('day')
            ->get();

        // Weekly New Users (Last 12 weeks)
        $usersTrend = User::query()
            ->toBase()
            ->selectRaw('YEARWEEK(created_at, 1) as week, count(*) as count')
            ->where('created_at', '>=', now()->subWeeks(12))
            ->groupBy('week')
            ->orderBy('week')
            ->get();

        // Top 5 Most Voted Ideas (Proxy for shared until tracking added)
        $topIdeas = Idea::with(['user.media', 'country', 'media'])
            ->orderBy('votes_count', 'desc')
            ->limit(5)
            ->get();

        // Idea Distribution by Country
        $countryDistribution = Idea::query()
            ->toBase()
            ->join('countries', 'ideas.country_id', '=', 'countries.id')
            ->selectRaw('countries.name_ar as country, count(*) as count')
            ->groupBy('country')
            ->orderBy('count', 'desc')
            ->get();

        return Inertia::render('admin/pages/dashboard/index', [
            'stats' => $stats,
            'trends' => [
                'ideas' => $ideasTrend,
                'votes' => $votesTrend,
                'users' => $usersTrend,
            ],
            'top_ideas' => $topIdeas,
            'country_distribution' => $countryDistribution,
        ]);
    }
}
