<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Fortify\Features;

test('app login screen can be rendered', function () {
    $this->get(route('login'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('app/auth/login'));
});

test('admin login screen can be rendered', function () {
    $this->get(route('admin.login'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/auth/login'));
});

test('users can authenticate using the app login screen', function () {
    $user = User::factory()->create();

    $response = $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
        '_auth_context' => 'app',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('app.home', absolute: false));
});

test('admins can authenticate using the admin login screen', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->post(route('login.store'), [
        'email' => $admin->email,
        'password' => 'password',
        '_auth_context' => 'admin',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('admin.dashboard', absolute: false));
});

test('standard users can not authenticate through the admin login screen', function () {
    $user = User::factory()->create();

    $this->from(route('admin.login'))->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
        '_auth_context' => 'admin',
    ])->assertRedirect(route('admin.login'));

    $this->assertGuest();
});

test('users with two factor enabled are redirected to two factor challenge', function () {
    $this->skipUnlessFortifyHas(Features::twoFactorAuthentication());

    Features::twoFactorAuthentication([
        'confirm' => true,
        'confirmPassword' => true,
    ]);

    $user = User::factory()->create();

    $user->forceFill([
        'two_factor_secret' => encrypt('test-secret'),
        'two_factor_recovery_codes' => encrypt(json_encode(['code1', 'code2'])),
        'two_factor_confirmed_at' => now(),
    ])->save();

    $response = $this->post(route('login'), [
        'email' => $user->email,
        'password' => 'password',
        '_auth_context' => 'app',
    ]);

    $response->assertRedirect(route('two-factor.login'));
    $response->assertSessionHas('login.id', $user->id);
    $this->assertGuest();
});

test('users can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'wrong-password',
        '_auth_context' => 'app',
    ]);

    $this->assertGuest();
});

test('users can logout to the app login page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->from(route('app.home'))
        ->post(route('logout'));

    $this->assertGuest();
    $response->assertRedirect(route('login'));
});

test('admins can logout to the admin login page', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->actingAs($admin)
        ->from(route('admin.dashboard'))
        ->post(route('logout'));

    $this->assertGuest();
    $response->assertRedirect(route('admin.login'));
});

test('users are rate limited', function () {
    $user = User::factory()->create();

    foreach (range(1, 5) as $attempt) {
        $this->from(route('login'))->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'wrong-password',
            '_auth_context' => 'app',
        ]);
    }

    $response = $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'wrong-password',
        '_auth_context' => 'app',
    ]);

    expect($response->getStatusCode())->toBe(429);
});
