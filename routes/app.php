<?php

use App\Http\Controllers\App\AppHomeController;
use App\Http\Controllers\App\AppIdeaController;
use App\Http\Controllers\App\AppPageController;
use App\Http\Controllers\App\AppProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AppHomeController::class, 'index'])->name('app.home');

Route::get('/about', [AppPageController::class, 'about'])->name('app.about');
Route::get('/archive', [AppPageController::class, 'archive'])->name('app.archive');
Route::get('/sponsors', [AppPageController::class, 'sponsors'])->name('app.sponsors');
Route::get('/contact', [AppPageController::class, 'contact'])->name('app.contact');
Route::get('/how-it-works', [AppPageController::class, 'howItWorks'])->name('app.info');
Route::get('/terms', [AppPageController::class, 'terms'])->name('app.terms');

Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::get('/profile', [AppProfileController::class, 'edit'])->name('app.profile');
    Route::get('/ideas/create', [AppIdeaController::class, 'create'])->name('app.ideas.create');
    Route::get('/ideas/{id}', [AppIdeaController::class, 'show'])->name('app.ideas.show');
});
