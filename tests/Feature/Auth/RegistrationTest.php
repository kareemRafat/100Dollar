<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::registration());
});

test('registration screen can be rendered', function () {
    $this->followingRedirects()->get(route('register'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('app/pages/auth/register'));
});

test('new users can register', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'phone' => '+201234567890',
        'country' => 'Egypt',
        'nationality' => 'Egyptian',
        'password' => 'password',
        'password_confirmation' => 'password',
        'terms' => true,
        '_locale' => app()->getLocale(),
    ]);

    $this->assertAuthenticated('web');
    $response->assertRedirect(localizedUrl(route('verification.notice', absolute: false)));

    expect(User::first()?->role)->toBe('user');
});
