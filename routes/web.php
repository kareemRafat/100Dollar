<?php

use App\Support\Auth\AuthContext;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

Route::group([
    'prefix' => LaravelLocalization::setLocale(),
    'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath'],
], function () {
    Route::middleware('guest')->group(function () {
        Route::get('login', function (Request $request) {
            app(AuthContext::class)->remember($request, AuthContext::APP);

            return Inertia::render('app/pages/auth/login', [
                'canResetPassword' => Features::enabled(Features::resetPasswords()),
                'canRegister' => Features::enabled(Features::registration()),
                'status' => $request->session()->get('status'),
            ]);
        })->name('login');

        if (Features::enabled(Features::registration())) {
            Route::get('register', function (Request $request) {
                app(AuthContext::class)->remember($request, AuthContext::APP);

                return Inertia::render('app/pages/auth/register', [
                    'canLogin' => true,
                ]);
            })->name('register');
        }

        if (Features::enabled(Features::resetPasswords())) {
            Route::get('forgot-password', function (Request $request) {
                app(AuthContext::class)->remember($request, AuthContext::APP);

                return Inertia::render('app/pages/auth/forgot-password', [
                    'status' => $request->session()->get('status'),
                ]);
            })->name('password.request');
        }
    });
});
