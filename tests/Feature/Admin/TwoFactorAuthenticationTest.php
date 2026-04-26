<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::twoFactorAuthentication());
});

test('admins with two factor enabled are redirected to the admin challenge during login', function () {
    Features::twoFactorAuthentication([
        'confirm' => true,
        'confirmPassword' => true,
    ]);

    $admin = User::factory()->admin()->create([
        'two_factor_secret' => encrypt('test-secret'),
        'two_factor_recovery_codes' => encrypt(json_encode(['code-1', 'code-2'])),
        'two_factor_confirmed_at' => now(),
    ]);

    $this->post(route('admin.login.store'), [
        'email' => $admin->email,
        'password' => 'password',
    ])->assertRedirect(route('admin.two-factor.login'));

    $this->assertGuest('admin');
    expect(session('admin_login.id'))->toBe($admin->id);
});

test('admin two factor challenge redirects back to admin login without a pending challenge', function () {
    $this->get(route('admin.two-factor.login'))
        ->assertRedirect(route('admin.login'));
});

test('admin two factor challenge renders on the admin route', function () {
    $admin = User::factory()->admin()->create([
        'two_factor_secret' => encrypt('test-secret'),
        'two_factor_recovery_codes' => encrypt(json_encode(['code-1', 'code-2'])),
        'two_factor_confirmed_at' => now(),
    ]);

    $this->withSession([
        'admin_login.id' => $admin->id,
        'admin_login.remember' => false,
    ])->get(route('admin.two-factor.login'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/pages/auth/two-factor-challenge'));
});

test('admins can complete the admin two factor challenge with a recovery code', function () {
    $admin = User::factory()->admin()->create([
        'two_factor_secret' => encrypt('test-secret'),
        'two_factor_recovery_codes' => encrypt(json_encode(['code-1', 'code-2'])),
        'two_factor_confirmed_at' => now(),
    ]);

    $this->withSession([
        'admin_login.id' => $admin->id,
        'admin_login.remember' => false,
    ])->post(route('admin.two-factor.store'), [
        'recovery_code' => 'code-1',
    ])->assertRedirect(route('admin.dashboard'));

    $this->assertAuthenticatedAs($admin, 'admin');

    $remainingCodes = $admin->fresh()->recoveryCodes();

    expect($remainingCodes)->toBeArray();
    expect(in_array('code-1', $remainingCodes, true))->toBeFalse();
});
