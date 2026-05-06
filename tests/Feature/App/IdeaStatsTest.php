<?php

use App\Models\Idea;
use App\Models\User;
use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->user = User::factory()->create(['role' => 'user']);
});

test('my ideas page shows correct aggregated stats', function () {
    // Create some ideas for the user
    Idea::factory()->create([
        'user_id' => $this->user->id,
        'votes_count' => 10,
        'is_winner' => true,
    ]);

    Idea::factory()->create([
        'user_id' => $this->user->id,
        'votes_count' => 5,
        'is_winner' => false,
    ]);

    // Create an idea for another user (should not be counted)
    Idea::factory()->create([
        'user_id' => User::factory()->create()->id,
        'votes_count' => 100,
        'is_winner' => true,
    ]);

    actingAs($this->user)
        ->get(localizedUrl('/my-ideas'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('app/pages/idea/index')
            ->has('stats', 3)
            ->where('stats.0.value', '2') // Total Ideas
            ->where('stats.1.value', '15') // Total Votes (10 + 5)
            ->where('stats.2.value', '01') // Winning Ideas (padded to 2 digits: "01")
        );
});

test('my ideas page shows zero stats when user has no ideas', function () {
    actingAs($this->user)
        ->get(localizedUrl('/my-ideas'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('app/pages/idea/index')
            ->has('stats', 3)
            ->where('stats.0.value', '0')
            ->where('stats.1.value', '0')
            ->where('stats.2.value', '00')
        );
});
