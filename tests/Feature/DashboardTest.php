<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('admin.dashboard'));
    $response->assertRedirect(route('admin.login'));
});

test('admins can visit the dashboard', function () {
    $admin = User::factory()->admin()->create();
    $this->actingAs($admin);

    $response = $this->get(route('admin.dashboard'));
    $response->assertOk();
});

test('standard users are redirected away from the admin dashboard', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.dashboard'))
        ->assertRedirect(route('app.home'));
});
