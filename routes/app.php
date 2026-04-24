<?php

use App\Http\Controllers\App\HomeController;
use App\Http\Controllers\App\IdeaController;
use App\Http\Controllers\App\PageController;
use App\Http\Controllers\App\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('app.home');

Route::get('/about', [PageController::class, 'about'])->name('app.about');
Route::get('/archive', [PageController::class, 'archive'])->name('app.archive');
Route::get('/sponsors', [PageController::class, 'sponsors'])->name('app.sponsors');
Route::get('/contact', [PageController::class, 'contact'])->name('app.contact');
Route::get('/how-it-works', [PageController::class, 'howItWorks'])->name('app.info');
Route::get('/terms', [PageController::class, 'terms'])->name('app.terms');

Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::get('/my-ideas', [IdeaController::class, 'index'])->name('app.ideas.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('app.profile');
    Route::get('/profile/personal-info', [ProfileController::class, 'edit'])->name('app.profile.personal-info');
    Route::get('/profile/password-security', [ProfileController::class, 'edit'])->name('app.profile.password-security');
    Route::get('/profile/security', [ProfileController::class, 'edit'])->middleware('password.confirm')->name('app.profile.security');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('app.profile.update');
    Route::patch('/profile/password', [ProfileController::class, 'updatePassword'])->name('app.profile.password.update');
    Route::get('/ideas/create', [IdeaController::class, 'create'])->name('app.ideas.create');
    Route::get('/ideas/{id}', [IdeaController::class, 'show'])->name('app.ideas.show');
});
