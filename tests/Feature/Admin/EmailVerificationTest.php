<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;

test('admin verification routes are not registered', function () {
    expect(Route::has('admin.verification.notice'))->toBeFalse();
    expect(Route::has('admin.verification.send'))->toBeFalse();
    expect(Route::has('admin.verification.verify'))->toBeFalse();
});

test('unverified admins can access the admin dashboard without email verification', function () {
    $admin = User::factory()->admin()->unverified()->create();

    $this->actingAs($admin, 'admin')
        ->get(route('admin.dashboard'))
        ->assertOk();
});
