<?php

use App\Models\User;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::twoFactorAuthentication());
});

test('app users can fetch two factor setup data before confirmation', function () {
    Features::twoFactorAuthentication([
        'confirm' => true,
        'confirmPassword' => true,
    ]);

    $user = User::factory()->create([
        'two_factor_secret' => encrypt('test-secret'),
        'two_factor_recovery_codes' => encrypt(json_encode(['code-1', 'code-2'])),
        'two_factor_confirmed_at' => null,
    ]);

    $this->actingAs($user, 'web')
        ->withSession(['auth.password_confirmed_at' => time()])
        ->get('/user/two-factor-secret-key')
        ->assertOk()
        ->assertJson([
            'secretKey' => 'test-secret',
        ]);

    $this->actingAs($user, 'web')
        ->withSession(['auth.password_confirmed_at' => time()])
        ->get('/user/two-factor-qr-code')
        ->assertOk()
        ->assertJsonStructure([
            'svg',
            'url',
        ]);
});

test('admins can fetch two factor setup data before confirmation', function () {
    Features::twoFactorAuthentication([
        'confirm' => true,
        'confirmPassword' => true,
    ]);

    $admin = User::factory()->admin()->create([
        'two_factor_secret' => encrypt('test-secret'),
        'two_factor_recovery_codes' => encrypt(json_encode(['code-1', 'code-2'])),
        'two_factor_confirmed_at' => null,
    ]);

    $this->actingAs($admin, 'admin')
        ->withSession(['admin.auth.password_confirmed_at' => time()])
        ->get(route('admin.two-factor.secret-key'))
        ->assertOk()
        ->assertJson([
            'secretKey' => 'test-secret',
        ]);

    $this->actingAs($admin, 'admin')
        ->withSession(['admin.auth.password_confirmed_at' => time()])
        ->get(route('admin.two-factor.qr-code'))
        ->assertOk()
        ->assertJsonStructure([
            'svg',
            'url',
        ]);
});
