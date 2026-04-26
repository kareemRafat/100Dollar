<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('admin.dashboard'));
    $response->assertRedirect(route('admin.login'));
});

test('admins can visit the dashboard', function () {
    $admin = User::factory()->admin()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->get(route('admin.dashboard'));
    $response->assertOk();
});

test('web-authenticated standard users are redirected to the admin login page', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.dashboard'))
        ->assertRedirect(route('admin.login'));
});

test('non-admin users are forbidden when authenticated on the admin guard', function () {
    $user = User::factory()->create();

    $this->actingAs($user, 'admin')
        ->get(route('admin.dashboard'))
        ->assertForbidden();
});
