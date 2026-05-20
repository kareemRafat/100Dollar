<?php

use App\Models\User;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::twoFactorAuthentication());
});

test('two factor challenge redirects to login when not authenticated', function () {
    $response = $this->get(route('two-factor.login'));

    $response->assertRedirectContains('/en');
});

test('two factor login stores the pending login and redirects to the challenge route', function () {
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

test('app two factor challenge returns localized invalid code message', function () {
    $user = User::factory()->create([
        'locale' => 'ar',
        'two_factor_secret' => encrypt('JBSWY3DPEHPK3PXP'),
        'two_factor_recovery_codes' => encrypt(json_encode(['code1', 'code2'])),
        'two_factor_confirmed_at' => now(),
    ]);

    $response = $this->withSession([
        'login.id' => $user->id,
        'login.remember' => false,
        'locale' => 'ar',
    ])->from(route('two-factor.login'))
        ->post(route('two-factor.login'), [
            'code' => 'invalid-code',
            '_locale' => 'ar',
        ]);

    $response->assertRedirect(route('two-factor.login'));
    $response->assertSessionHasErrors([
        'code' => 'رمز المصادقة الثنائية الذي أدخلته غير صحيح.',
    ]);
});

test('app two factor challenge redirects back with a localized throttle message', function () {
    $user = User::factory()->create([
        'locale' => 'ar',
        'two_factor_secret' => encrypt('JBSWY3DPEHPK3PXP'),
        'two_factor_recovery_codes' => encrypt(json_encode(['code1', 'code2'])),
        'two_factor_confirmed_at' => now(),
    ]);

    foreach (range(1, 5) as $attempt) {
        $this->withSession([
            'login.id' => $user->id,
            'login.remember' => false,
            'locale' => 'ar',
        ])->from(route('two-factor.login'))
            ->post(route('two-factor.login'), [
                'code' => 'invalid-code',
                '_locale' => 'ar',
            ]);
    }

    $response = $this->withSession([
        'login.id' => $user->id,
        'login.remember' => false,
        'locale' => 'ar',
    ])->from(route('two-factor.login'))
        ->post(route('two-factor.login'), [
            'code' => 'invalid-code',
            '_locale' => 'ar',
        ]);

    $response->assertRedirect(route('two-factor.login'));
    expect(session('message'))->toContain('محاولات كثيرة');
    expect(session('retry_after'))->toBeGreaterThan(0);
    expect($response->headers->get('Retry-After'))->not->toBeNull();
    $this->assertGuest('web');
});

test('app two factor challenge throttle message follows the active locale instead of the saved user locale', function () {
    $user = User::factory()->create([
        'locale' => 'en',
        'two_factor_secret' => encrypt('JBSWY3DPEHPK3PXP'),
        'two_factor_recovery_codes' => encrypt(json_encode(['code1', 'code2'])),
        'two_factor_confirmed_at' => now(),
    ]);

    foreach (range(1, 5) as $attempt) {
        $this->withSession([
            'login.id' => $user->id,
            'login.remember' => false,
            'locale' => 'ar',
        ])->from(route('two-factor.login'))
            ->post(route('two-factor.login'), [
                'code' => 'invalid-code',
                '_locale' => 'ar',
            ]);
    }

    $response = $this->withSession([
        'login.id' => $user->id,
        'login.remember' => false,
        'locale' => 'ar',
    ])->from(route('two-factor.login'))
        ->post(route('two-factor.login'), [
            'code' => 'invalid-code',
            '_locale' => 'ar',
        ]);

    $response->assertRedirect(route('two-factor.login'));
    expect(session('message'))->toContain('محاولات كثيرة');
    expect(session('message'))->not->toContain('Too many attempts');
});
