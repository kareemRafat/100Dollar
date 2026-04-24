<?php

use App\Http\Controllers\Admin\Settings\ProfileController;
use App\Http\Controllers\Admin\Settings\SecurityController;
use App\Support\Auth\AuthContext;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::middleware('guest')->group(function () {
    Route::get('login', function (Request $request) {
        app(AuthContext::class)->remember($request, AuthContext::ADMIN);

        return Inertia::render('admin/pages/auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'canRegister' => false,
            'status' => $request->session()->get('status'),
        ]);
    })->name('admin.login');

    Route::get('forgot-password', function (Request $request) {
        app(AuthContext::class)->remember($request, AuthContext::ADMIN);

        return Inertia::render('admin/pages/auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]);
    })->name('admin.password.request');
});

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::inertia('/', 'admin/pages/dashboard')->name('admin.dashboard');

    Route::get('users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('admin.users.index');
    Route::post('users', [\App\Http\Controllers\Admin\UserController::class, 'store'])->name('admin.users.store');
    Route::patch('users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'update'])->name('admin.users.update');
    Route::delete('users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('admin.users.destroy');

    Route::get('confirm-password', function (Request $request) {
        app(AuthContext::class)->remember($request, AuthContext::ADMIN);

        return Inertia::render('admin/pages/auth/confirm-password');
    })->name('admin.password.confirm');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('admin.settings.profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('admin.settings.profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('admin.settings.profile.destroy');

    Route::get('settings/security', [SecurityController::class, 'edit'])->name('admin.settings.security.edit');

    Route::put('settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('admin.settings.password.update');

    Route::inertia('settings/appearance', 'admin/pages/settings/appearance')->name('admin.settings.appearance.edit');
});
