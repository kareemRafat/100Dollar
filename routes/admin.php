<?php

use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Admin\Auth\EmailVerificationController;
use App\Http\Controllers\Admin\Auth\NewPasswordController;
use App\Http\Controllers\Admin\Auth\PasswordResetLinkController;
use App\Http\Controllers\Admin\Auth\TwoFactorController;
use App\Http\Controllers\Admin\Settings\ProfileController;
use App\Http\Controllers\Admin\Settings\SecurityController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::middleware('guest:admin')->group(function () {
    Route::get('login', function (Request $request) {
        return Inertia::render('admin/pages/auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'canRegister' => false,
            'status' => $request->session()->get('status'),
        ]);
    })->name('admin.login');

    Route::post('login', [AuthenticatedSessionController::class, 'store'])
        ->middleware('throttle:login')
        ->name('admin.login.store');

    Route::get('forgot-password', function (Request $request) {
        return Inertia::render('admin/pages/auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]);
    })->name('admin.password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('admin.password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('admin.password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('admin.password.update');

    if (Features::enabled(Features::twoFactorAuthentication())) {
        Route::get('two-factor-challenge', [TwoFactorController::class, 'create'])
            ->name('admin.two-factor.login');

        Route::post('two-factor-challenge', [TwoFactorController::class, 'store'])
            ->name('admin.two-factor.store');
    }
});

Route::middleware(['auth:admin', 'role:admin'])->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('admin.logout');

    Route::get('email/verify', [EmailVerificationController::class, 'notice'])
        ->name('admin.verification.notice');

    Route::post('email/verification-notification', [EmailVerificationController::class, 'send'])
        ->middleware('throttle:6,1')
        ->name('admin.verification.send');

    Route::get('email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('admin.verification.verify');
});

Route::middleware(['auth:admin', 'verified', 'role:admin'])->group(function () {
    Route::inertia('/', 'admin/pages/dashboard')->name('admin.dashboard');

    Route::get('users', [UserController::class, 'index'])->name('admin.users.index');
    Route::post('users', [UserController::class, 'store'])->name('admin.users.store');
    Route::patch('users/{user}', [UserController::class, 'update'])->name('admin.users.update');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');

    Route::get('confirm-password', function () {
        return Inertia::render('admin/pages/auth/confirm-password');
    })->name('admin.password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store'])
        ->name('admin.password.confirm.store');

    if (Features::canManageTwoFactorAuthentication()) {
        Route::post('user/two-factor-authentication', [TwoFactorController::class, 'enable'])
            ->name('admin.two-factor.enable');
        Route::delete('user/two-factor-authentication', [TwoFactorController::class, 'disable'])
            ->name('admin.two-factor.disable');
        Route::post('user/confirmed-two-factor-authentication', [TwoFactorController::class, 'confirm'])
            ->name('admin.two-factor.confirm');
        Route::get('user/two-factor-qr-code', [TwoFactorController::class, 'qrCode'])
            ->name('admin.two-factor.qr-code');
        Route::get('user/two-factor-secret-key', [TwoFactorController::class, 'secretKey'])
            ->name('admin.two-factor.secret-key');
        Route::get('user/two-factor-recovery-codes', [TwoFactorController::class, 'recoveryCodes'])
            ->name('admin.two-factor.recovery-codes');
        Route::post('user/two-factor-recovery-codes', [TwoFactorController::class, 'regenerateRecoveryCodes'])
            ->name('admin.two-factor.recovery-codes.store');
    }

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('admin.settings.profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('admin.settings.profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('admin.settings.profile.destroy');

    Route::get('settings/security', [SecurityController::class, 'edit'])->name('admin.settings.security.edit');

    Route::put('settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('admin.settings.password.update');

    Route::inertia('settings/appearance', 'admin/pages/settings/appearance')->name('admin.settings.appearance.edit');
});
