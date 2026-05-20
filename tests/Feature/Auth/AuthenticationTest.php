<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Fortify\Features;

test('app login screen can be rendered', function () {
    $this->followingRedirects()->get(route('login'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('app/pages/auth/login'));
});

test('admin login screen can be rendered', function () {
    $this->get(route('admin.login'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/pages/auth/login'));
});

test('users can authenticate using the app login screen', function () {
    $user = User::factory()->create([
        'locale' => app()->getLocale(),
    ]);

    $response = $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
        '_locale' => app()->getLocale(),
    ]);

    $this->assertAuthenticatedAs($user, 'web');
    $this->assertGuest('admin');
    $response->assertRedirect(localizedUrl(route('app.home', absolute: false), app()->getLocale()));
});

test('users can authenticate to a safe in-app redirect path', function () {
    $user = User::factory()->create([
        'locale' => 'ar',
    ]);

    $response = $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
        '_locale' => 'ar',
        'redirect' => '/ideas?filter=recent',
    ]);

    $this->assertAuthenticatedAs($user, 'web');
    $response->assertRedirect(localizedUrl('/ideas?filter=recent', 'ar'));
});

test('users cannot authenticate to an unsafe redirect path', function () {
    $user = User::factory()->create([
        'locale' => app()->getLocale(),
    ]);

    $response = $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
        '_locale' => app()->getLocale(),
        'redirect' => 'https://evil.example/phish',
    ]);

    $this->assertAuthenticatedAs($user, 'web');
    $response->assertRedirect(localizedUrl(route('app.home', absolute: false), app()->getLocale()));
});

test('users cannot authenticate to an admin redirect path from the app login screen', function () {
    $user = User::factory()->create([
        'locale' => app()->getLocale(),
    ]);

    $response = $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
        '_locale' => app()->getLocale(),
        'redirect' => '/admin',
    ]);

    $this->assertAuthenticatedAs($user, 'web');
    $response->assertRedirect(localizedUrl(route('app.home', absolute: false), app()->getLocale()));
});

test('admins cannot authenticate through the app login screen', function () {
    $admin = User::factory()->admin()->create();

    $this->from(localizedUrl(route('login', absolute: false)))->post(route('login.store'), [
        'email' => $admin->email,
        'password' => 'password',
        '_locale' => app()->getLocale(),
    ])->assertRedirect(localizedUrl(route('login', absolute: false)));

    $this->assertGuest('web');
});

test('users with two factor enabled are redirected to two factor challenge', function () {
    $this->skipUnlessFortifyHas(Features::twoFactorAuthentication());

    Features::twoFactorAuthentication([
        'confirm' => true,
        'confirmPassword' => true,
    ]);

    $user = User::factory()->create();

    $user->forceFill([
        'two_factor_secret' => encrypt('JBSWY3DPEHPK3PXP'),
        'two_factor_recovery_codes' => encrypt(json_encode(['code1', 'code2'])),
        'two_factor_confirmed_at' => now(),
    ])->save();

    $response = $this->post(route('login'), [
        'email' => $user->email,
        'password' => 'password',
        '_locale' => app()->getLocale(),
    ]);

    $response->assertRedirect(route('two-factor.login'));
    $response->assertSessionHas('login.id', $user->id);
    $this->assertGuest('web');
});

test('users can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'wrong-password',
        '_locale' => app()->getLocale(),
    ]);

    $this->assertGuest('web');
});

test('users can logout to the app login page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user, 'web')
        ->from(localizedUrl(route('app.home', absolute: false)))
        ->post(route('logout'), ['_locale' => app()->getLocale()]);

    $this->assertGuest('web');
    $response->assertRedirect(localizedUrl(route('login', absolute: false)));
});

test('app logout clears only the web guard session', function () {
    $user = User::factory()->create();
    $admin = User::factory()->admin()->create();

    $response = $this->actingAs($user, 'web')
        ->actingAs($admin, 'admin')
        ->post(route('logout'), ['_locale' => app()->getLocale()]);

    $response->assertRedirect(localizedUrl(route('login', absolute: false)));
    $this->assertGuest('web');
    $this->assertAuthenticatedAs($admin, 'admin');
});

test('users are rate limited', function () {
    $user = User::factory()->create();

    foreach (range(1, 5) as $attempt) {
        $this->from(route('login'))->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'wrong-password',
            '_locale' => app()->getLocale(),
        ]);
    }

    $response = $this->from(route('login'))->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'wrong-password',
        '_locale' => app()->getLocale(),
    ]);

    $response->assertTooManyRequests();
});
