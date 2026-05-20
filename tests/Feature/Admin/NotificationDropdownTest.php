<?php

use App\Models\Notification;
use App\Models\User;

test('admin notification dropdown returns the latest ten notifications', function () {
    $admin = User::factory()->admin()->create();

    Notification::factory()->count(12)->create([
        'user_id' => $admin->id,
    ]);

    $response = $this->actingAs($admin, 'admin')
        ->getJson(route('admin.notifications.dropdown'));

    $response->assertOk()
        ->assertJsonCount(10);

    expect(collect($response->json())->pluck('id')->all())
        ->toBe($admin->customNotifications()->latest()->limit(10)->pluck('id')->all());
});
