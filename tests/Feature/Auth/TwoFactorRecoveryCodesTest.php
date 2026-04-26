<?php

use App\Models\User;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::twoFactorAuthentication());
});

test('users can regenerate two factor recovery codes', function () {
    $user = User::factory()->create([
        'two_factor_secret' => encrypt('test-secret'),
        'two_factor_recovery_codes' => encrypt(json_encode(['code-1', 'code-2'])),
        'two_factor_confirmed_at' => now(),
    ]);

    $originalCodes = $user->recoveryCodes();

    $this->actingAs($user, 'web')
        ->withSession(['auth.password_confirmed_at' => time()])
        ->post('/user/two-factor-recovery-codes', [
            '_locale' => app()->getLocale(),
        ])->assertRedirect();

    $updatedCodes = $user->fresh()->recoveryCodes();

    expect($updatedCodes)->toBeArray();
    expect($updatedCodes)->not->toEqual($originalCodes);
    expect(in_array('code-1', $updatedCodes, true))->toBeFalse();
});
