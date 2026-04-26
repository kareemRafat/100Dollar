<?php

use App\Models\User;

test('admins can authenticate through the admin guard login flow', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->post(route('admin.login.store'), [
        'email' => $admin->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticatedAs($admin, 'admin');
    $response->assertRedirect(route('admin.dashboard'));
});

test('standard users cannot authenticate through the admin guard login flow', function () {
    $user = User::factory()->create();

    $this->from(route('admin.login'))->post(route('admin.login.store'), [
        'email' => $user->email,
        'password' => 'password',
    ])->assertRedirect(route('admin.login'));

    $this->assertGuest('admin');
});

test('admin logout clears only the admin guard session', function () {
    $appUser = User::factory()->create();
    $admin = User::factory()->admin()->create();

    $this->actingAs($appUser, 'web');
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('admin.logout'));

    $response->assertRedirect(route('admin.login'));
    $this->assertAuthenticatedAs($appUser, 'web');
    $this->assertGuest('admin');
});
