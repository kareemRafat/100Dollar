<?php

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use App\Support\Auth\AuthContext;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::middleware('guest')->group(function () {
    Route::get('login', function (Request $request) {
        app(AuthContext::class)->remember($request, AuthContext::ADMIN);

        return Inertia::render('admin/auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'canRegister' => false,
            'status' => $request->session()->get('status'),
        ]);
    })->name('admin.login');

    Route::get('forgot-password', function (Request $request) {
        app(AuthContext::class)->remember($request, AuthContext::ADMIN);

        return Inertia::render('admin/auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]);
    })->name('admin.password.request');
});

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::inertia('dashboard', 'admin/dashboard')->name('admin.dashboard');

    Route::redirect('settings', 'settings/profile')->name('admin.settings');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('admin.settings.profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('admin.settings.profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('admin.settings.profile.destroy');

    Route::get('settings/security', [SecurityController::class, 'edit'])->name('admin.settings.security.edit');

    Route::put('settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('admin.settings.password.update');

    Route::inertia('settings/appearance', 'admin/settings/appearance')->name('admin.settings.appearance.edit');
});
