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
    Route::get('/ideas/create', [IdeaController::class, 'create'])->name('app.ideas.create');
    Route::get('/ideas/{id}', [IdeaController::class, 'show'])->name('app.ideas.show');
});
