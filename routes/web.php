<?php

use App\Http\Controllers\App\Auth\AuthenticatedSessionController;
use App\Http\Controllers\App\Auth\PasswordResetLinkController;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Laravel\Fortify\Http\Controllers\ConfirmablePasswordController;
use Laravel\Fortify\Http\Controllers\NewPasswordController;
use Laravel\Fortify\Http\Controllers\TwoFactorAuthenticatedSessionController;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

Route::group([
    'prefix' => LaravelLocalization::setLocale(),
    'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath'],
], function () {
    Route::middleware('guest')->group(function () {
        Route::get('login', function (Request $request) {
            return Inertia::render('app/pages/auth/login', [
                'canResetPassword' => Features::enabled(Features::resetPasswords()),
                'canRegister' => Features::enabled(Features::registration()),
                'status' => $request->session()->get('status'),
            ]);
        })->name('login');

        if (Features::enabled(Features::registration())) {
            Route::get('register', function () {
                return Inertia::render('app/pages/auth/register', [
                    'canLogin' => true,
                    'countries' => Country::all(),
                ]);
            })->name('register');
        }

        if (Features::enabled(Features::resetPasswords())) {
            Route::get('forgot-password', function (Request $request) {
                return Inertia::render('app/pages/auth/forgot-password', [
                    'status' => $request->session()->get('status'),
                ]);
            })->name('password.request');

            Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

            Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
                ->name('password.reset');

            Route::post('/reset-password', [NewPasswordController::class, 'store'])
                ->name('password.update');
        }

        if (Features::enabled(Features::twoFactorAuthentication())) {
            Route::get('/two-factor-challenge', [TwoFactorAuthenticatedSessionController::class, 'create'])
                ->name('two-factor.login');

            Route::post('/two-factor-challenge', [TwoFactorAuthenticatedSessionController::class, 'store']);
        }
    });

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    // Email Verification Routes
    if (Features::enabled(Features::emailVerification())) {
        Route::get('/email/verify', function (Request $request) {
            return $request->user()->hasVerifiedEmail()
                ? redirect('/')
                : Inertia::render('app/pages/auth/verify-email', [
                    'status' => session('status'),
                ]);
        })->middleware(['auth'])->name('verification.notice');
    }

    // Password Confirmation Routes
    Route::get('/user/confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->middleware(['auth'])
        ->name('password.confirm');

    Route::post('/user/confirm-password', [ConfirmablePasswordController::class, 'store'])
        ->middleware(['auth'])
        ->name('password.confirm.store');

    // Error Test Routes
    Route::get('/test-404', function () {
        abort(404);
    });

    Route::get('/test-500', function () {
        abort(500);
    });
});
