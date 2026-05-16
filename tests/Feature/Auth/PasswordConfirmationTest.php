<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('confirm password screen can be rendered', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->followingRedirects()->get(route('password.confirm'));

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('app/pages/auth/confirm-password'),
    );
});

test('admin confirm password screen can be rendered', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->actingAs($admin, 'admin')->get(route('admin.password.confirm'));

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/pages/auth/confirm-password'),
    );
});

test('password confirmation requires authentication', function () {
    $response = $this->get(route('password.confirm'));

    $response->assertRedirect(localizedUrl(route('login', absolute: false)));
});

test('admin password can be confirmed through the admin guard flow', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->actingAs($admin, 'admin')
        ->withSession(['url.intended' => route('admin.settings.security.edit')])
        ->post(route('admin.password.confirm.store'), [
            'password' => 'password',
        ]);

    $response->assertRedirect(route('admin.settings.security.edit'));
    expect(session('admin.auth.password_confirmed_at'))->not->toBeNull();
});
