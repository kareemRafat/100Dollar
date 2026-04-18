<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::twoFactorAuthentication());
});

test('two factor challenge redirects to login when not authenticated', function () {
    $response = $this->get(route('two-factor.login'));

    $response->assertRedirect(route('login'));
});

test('two factor challenge can be rendered', function () {
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

    $this->post(route('login'), [
        'email' => $user->email,
        'password' => 'password',
        '_auth_context' => 'app',
    ]);

    $this->get(route('two-factor.login'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('app/auth/two-factor-challenge'),
        );
});

test('admin two factor challenge uses the admin auth page', function () {
    Features::twoFactorAuthentication([
        'confirm' => true,
        'confirmPassword' => true,
    ]);

    $admin = User::factory()->admin()->create();

    $admin->forceFill([
        'two_factor_secret' => encrypt('test-secret'),
        'two_factor_recovery_codes' => encrypt(json_encode(['code1', 'code2'])),
        'two_factor_confirmed_at' => now(),
    ])->save();

    $this->post(route('login'), [
        'email' => $admin->email,
        'password' => 'password',
        '_auth_context' => 'admin',
    ]);

    $this->get(route('two-factor.login'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/auth/two-factor-challenge'),
        );
});
