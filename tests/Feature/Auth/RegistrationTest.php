<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::registration());
});

test('registration screen can be rendered', function () {
    $this->get(route('register'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('app/auth/register'));
});

test('new users can register', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        '_auth_context' => 'app',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('verification.notice', absolute: false));

    expect(User::first()?->role)->toBe('user');
});
