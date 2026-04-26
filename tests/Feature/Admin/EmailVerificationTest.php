<?php

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\URL;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::emailVerification());
});

test('admin verification notice renders on the admin route', function () {
    $admin = User::factory()->admin()->unverified()->create();

    $this->actingAs($admin, 'admin')
        ->get(route('admin.verification.notice'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/pages/auth/verify-email'));
});

test('verified admins are redirected away from the admin verification notice', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin, 'admin')
        ->get(route('admin.verification.notice'))
        ->assertRedirect(route('admin.dashboard'));
});

test('admins can resend verification notifications from the admin route', function () {
    Notification::fake();

    $admin = User::factory()->admin()->unverified()->create();

    $this->actingAs($admin, 'admin')
        ->post(route('admin.verification.send'))
        ->assertRedirect();

    Notification::assertSentTo($admin, VerifyEmail::class);
});

test('admin email verification redirects to the admin dashboard', function () {
    Event::fake();

    $admin = User::factory()->admin()->unverified()->create();

    $verificationUrl = URL::temporarySignedRoute(
        'admin.verification.verify',
        now()->addMinutes(60),
        ['id' => $admin->id, 'hash' => sha1($admin->email)],
    );

    $this->actingAs($admin, 'admin')
        ->get($verificationUrl)
        ->assertRedirect(route('admin.dashboard', ['verified' => 1]));

    Event::assertDispatched(Verified::class);
    expect($admin->fresh()->hasVerifiedEmail())->toBeTrue();
});
