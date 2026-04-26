<?php

use App\Models\User;

test('users can update their app profile without changing account status', function () {
    $user = User::factory()->create([
        'is_active' => true,
    ]);

    $response = $this->actingAs($user)
        ->patch(route('app.profile.update'), [
            'name' => 'Updated User',
            'email' => 'updated@example.com',
            'phone' => '+201234567890',
            'bio' => 'Updated bio',
            'is_active' => false,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect();

    $user->refresh();

    expect($user->name)->toBe('Updated User');
    expect($user->email)->toBe('updated@example.com');
    expect($user->is_active)->toBeTrue();
});

test('users cannot escalate their role through the app profile update', function () {
    $user = User::factory()->create([
        'role' => 'user',
    ]);

    $this->actingAs($user)
        ->patch(route('app.profile.update'), [
            'name' => 'Updated User',
            'email' => 'updated-role@example.com',
            'role' => 'admin',
        ])->assertSessionHasNoErrors();

    expect($user->fresh()->role)->toBe('user');
});
