<?php

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::middleware(['auth', 'verified'])->group(function () {
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
