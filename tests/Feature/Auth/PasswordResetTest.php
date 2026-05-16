<?php

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Route;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Fortify\Features;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::resetPasswords());
});

test('reset password link screen can be rendered', function () {
    $this->followingRedirects()->get(route('password.request'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('app/pages/auth/forgot-password'));
});

test('admin password reset routes are not registered', function () {
    expect(Route::has('admin.password.request'))->toBeFalse();
    expect(Route::has('admin.password.email'))->toBeFalse();
    expect(Route::has('admin.password.reset'))->toBeFalse();
    expect(Route::has('admin.password.update'))->toBeFalse();
});

test('reset password link can be requested', function () {
    Notification::fake();

    $user = User::factory()->create();

    $this->post(route('password.email'), [
        'email' => $user->email,
    ]);

    Notification::assertSentTo($user, ResetPassword::class);
});

test('reset password screen can be rendered', function () {
    Notification::fake();

    $user = User::factory()->create();

    $this->post(route('password.email'), [
        'email' => $user->email,
    ]);

    Notification::assertSentTo($user, ResetPassword::class, function ($notification) {
        $response = $this->followingRedirects()->get(route('password.reset', [
            'token' => $notification->token,
        ]));

        $response->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('app/pages/auth/reset-password'));

        return true;
    });
});

test('password can be reset with valid token', function () {
    Notification::fake();

    $user = User::factory()->create();

    $this->post(route('password.email'), [
        'email' => $user->email,
    ]);

    Notification::assertSentTo($user, ResetPassword::class, function ($notification) use ($user) {
        $response = $this->post(route('password.update'), [
            'token' => $notification->token,
            'email' => $user->email,
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(LaravelLocalization::getLocalizedURL(app()->getLocale(), route('login')));

        return true;
    });
});

test('admin emails do not receive app password reset links', function () {
    Notification::fake();

    $admin = User::factory()->admin()->create();

    $response = $this->post(route('password.email'), [
        'email' => $admin->email,
    ]);

    $response->assertSessionHasNoErrors();
    Notification::assertNothingSent();
});

test('password cannot be reset with invalid token', function () {
    $user = User::factory()->create();

    $response = $this->post(route('password.update'), [
        'token' => 'invalid-token',
        'email' => $user->email,
        'password' => 'newpassword123',
        'password_confirmation' => 'newpassword123',
    ]);

    $response->assertSessionHasErrors('email');
});
