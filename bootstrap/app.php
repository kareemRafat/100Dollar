<?php

use App\Http\Middleware\EnsureUserRole;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Support\Auth\AuthContext;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        then: function () {
            Route::middleware('web')
                ->group(base_path('routes/app.php'));

            Route::middleware('web')
                ->prefix('admin')
                ->group(base_path('routes/admin.php'));
        },
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);
        $middleware->alias([
            'role' => EnsureUserRole::class,
        ]);
        $middleware->redirectGuestsTo(function (Request $request): string {
            return $request->is('admin') || $request->is('admin/*')
                ? route('admin.login')
                : route('login');
        });
        $middleware->redirectUsersTo(function (Request $request): string {
            return route(
                app(AuthContext::class)->homeRouteForUser($request->user()),
            );
        });

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
