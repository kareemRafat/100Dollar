<?php

use App\Models\Notification;
use App\Models\User;

test('app notification dropdown returns the latest ten notifications for user', function () {
    $user = User::factory()->create();

    Notification::factory()->count(12)->create([
        'user_id' => $user->id,
    ]);

    $response = $this->actingAs($user)
        ->getJson('/en/profile/notifications/dropdown');

    $response->assertOk()
        ->assertJsonCount(10);

    $response->assertOk()
        ->assertJsonCount(10);

    expect(collect($response->json())->pluck('id')->all())
        ->toBe($user->customNotifications()->latest()->limit(10)->pluck('id')->all());
});
