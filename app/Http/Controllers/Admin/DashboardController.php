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
        return Inertia::render('admin/pages/dashboard', [
            'stats' => [
                'ideas_count' => Idea::count(),
                'votes_count' => Vote::count(),
                'users_count' => User::count(),
                'sponsors_count' => Sponsor::count(),
                'pending_ideas_count' => Idea::where('status', 'pending')->count(),
            ],
        ]);
    }
}
