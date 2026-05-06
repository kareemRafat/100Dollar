<?php

use App\Models\Idea;
use App\Models\Sponsor;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('renders the home page with ideas, sponsors, and winners', function () {
    $this->withoutVite();
    // Arrange
    $user = User::factory()->create();
    $sponsor = Sponsor::factory()->create(['day_of_week' => now()->dayOfWeek, 'is_active' => true]);
    Idea::factory()->count(3)->approved()->create([
        'submission_day' => now()->dayOfWeek,
        'week_number' => now()->weekOfYear,
        'year' => now()->year,
    ]);
    Idea::factory()->count(2)->create(['is_winner' => true, 'winner_announced_at' => now()->subDay()]);

    // Act & Assert
    $this->withoutMiddleware()
        ->get('/')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('app/pages/home/index')
            ->has('ideas.data', 3)
            ->has('sponsor')
            ->has('previousWinners', 2)
            ->has('currentDay')
            ->has('secondsUntilEnd')
            ->has('weekDays', 7)
        );
});

it('filters ideas by day', function () {
    $this->withoutVite();
    // Arrange
    $sunday = 0;
    Idea::factory()->approved()->create([
        'submission_day' => $sunday,
        'week_number' => now()->weekOfYear,
        'year' => now()->year,
    ]);

    // Act & Assert
    $this->withoutMiddleware()
        ->get('/?day='.$sunday)
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('currentDay', $sunday)
            ->has('ideas.data', 1)
        );
});
