<?php

use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Admin\Auth\EmailVerificationController;
use App\Http\Controllers\Admin\Auth\TwoFactorController;
use App\Http\Controllers\Admin\CommentController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\IdeaController;
use App\Http\Controllers\Admin\PrizeRecordController;
use App\Http\Controllers\Admin\Settings\ProfileController;
use App\Http\Controllers\Admin\Settings\SecurityController;
use App\Http\Controllers\Admin\SponsorController;
use App\Http\Controllers\Admin\SponsorshipRequestController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\WinnerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::middleware('guest:admin')->group(function () {
    Route::get('login', function (Request $request) {
        return Inertia::render('admin/pages/auth/login', [
            'canResetPassword' => false,
            'canRegister' => false,
            'status' => $request->session()->get('status'),
        ]);
    })->name('admin.login');

    Route::post('login', [AuthenticatedSessionController::class, 'store'])
        ->middleware('throttle:login')
        ->name('admin.login.store');

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
    Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');

    // Ideas
    Route::get('ideas', [IdeaController::class, 'index'])->name('admin.ideas.index');
    Route::get('ideas/{idea}', [IdeaController::class, 'show'])->name('admin.ideas.show');
    Route::patch('ideas/{idea}/status', [IdeaController::class, 'updateStatus'])->name('admin.ideas.update-status');

    // Comments
    Route::delete('comments/{comment}', [CommentController::class, 'destroy'])->name('admin.comments.destroy');

    Route::get('users', [UserController::class, 'index'])->name('admin.users.index');
    Route::get('users/{user}', [UserController::class, 'show'])->name('admin.users.show');
    Route::post('users', [UserController::class, 'store'])->name('admin.users.store');
    Route::patch('users/{user}', [UserController::class, 'update'])->name('admin.users.update');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');

    // Sponsors
    Route::get('sponsors', [SponsorController::class, 'index'])->name('admin.sponsors.index');
    Route::post('sponsors', [SponsorController::class, 'store'])->name('admin.sponsors.store');
    Route::patch('sponsors/{sponsor}', [SponsorController::class, 'update'])->name('admin.sponsors.update');
    Route::delete('sponsors/{sponsor}', [SponsorController::class, 'destroy'])->name('admin.sponsors.destroy');
    Route::patch('sponsors/{sponsor}/toggle-status', [SponsorController::class, 'toggleStatus'])->name('admin.sponsors.toggle-status');

    // Sponsorship Requests
    Route::get('sponsorship-requests', [SponsorshipRequestController::class, 'index'])->name('admin.sponsorship-requests.index');
    Route::get('sponsorship-requests/{sponsorship_request}', [SponsorshipRequestController::class, 'show'])->name('admin.sponsorship-requests.show');
    Route::patch('sponsorship-requests/{sponsorship_request}/status', [SponsorshipRequestController::class, 'updateStatus'])->name('admin.sponsorship-requests.update-status');
    Route::delete('sponsorship-requests/{sponsorship_request}', [SponsorshipRequestController::class, 'destroy'])->name('admin.sponsorship-requests.destroy');

    // Prize Records
    Route::get('prizes', [PrizeRecordController::class, 'index'])->name('admin.prizes.index');
    Route::patch('prizes/{prizeRecord}/status', [PrizeRecordController::class, 'updateStatus'])->name('admin.prizes.update-status');

    // Winners
    Route::get('winners', [WinnerController::class, 'index'])->name('admin.winners.index');
    Route::post('winners/{idea}/confirm', [WinnerController::class, 'confirm'])->name('admin.winners.confirm');

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
