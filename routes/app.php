<?php

use App\Http\Controllers\App\CommentController;
use App\Http\Controllers\App\ContactController;
use App\Http\Controllers\App\HomeController;
use App\Http\Controllers\App\IdeaController;
use App\Http\Controllers\App\PageController;
use App\Http\Controllers\App\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('app.home');

Route::get('/about', [PageController::class, 'about'])->name('app.about');
Route::get('/archive', [PageController::class, 'archive'])->name('app.archive');
Route::get('/sponsors', [PageController::class, 'sponsors'])->name('app.sponsors');
Route::get('/contact', [ContactController::class, 'index'])->name('app.contact');
Route::post('/contact', [ContactController::class, 'store'])->name('app.contact.submit');
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
    Route::post('/ideas', [IdeaController::class, 'store'])->name('app.ideas.store');
    
    // Idea Actions
    Route::post('/ideas/{idea}/follow', [IdeaController::class, 'toggleFollow'])->name('app.ideas.follow');
    Route::post('/ideas/{idea}/comments', [CommentController::class, 'store'])->name('app.comments.store');
    
    // User/Owner Actions
    Route::post('/users/{user}/follow', [ProfileController::class, 'toggleFollow'])->name('app.users.follow');
    
    // Comment Actions
    Route::post('/comments/{comment}/like', [CommentController::class, 'toggleLike'])->name('app.comments.like');
});

Route::get('/ideas/{idea}', [IdeaController::class, 'show'])->name('app.ideas.show');
