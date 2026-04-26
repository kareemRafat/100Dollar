<?php

use App\Models\User;

test('inactive users cannot authenticate through the app login flow', function () {
    $user = User::factory()->inactive()->create();

    $this->from(localizedUrl(route('login', absolute: false)))->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
        '_locale' => app()->getLocale(),
    ])->assertRedirect(localizedUrl(route('login', absolute: false)));

    $this->assertGuest('web');
});

test('inactive admins cannot authenticate through the admin login flow', function () {
    $admin = User::factory()->admin()->inactive()->create();

    $this->from(route('admin.login'))->post(route('admin.login.store'), [
        'email' => $admin->email,
        'password' => 'password',
    ])->assertRedirect(route('admin.login'));

    $this->assertGuest('admin');
});

test('inactive authenticated users are logged out from the app area', function () {
    $user = User::factory()->inactive()->create();

    $response = $this->actingAs($user)
        ->get(route('app.profile'));

    $response->assertRedirect(localizedUrl(route('login', absolute: false)));

    $this->assertGuest('web');
});

test('inactive authenticated users are logged out from the admin area', function () {
    $admin = User::factory()->admin()->inactive()->create();

    $response = $this->actingAs($admin, 'admin')
        ->get(route('admin.dashboard'));

    $response->assertRedirect(route('admin.login'));

    $this->assertGuest('admin');
});
