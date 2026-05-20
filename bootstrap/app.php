<?php

use App\Http\Middleware\EnsureActiveUser;
use App\Http\Middleware\EnsureUserRole;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\RequirePasswordConfirmation;
use App\Http\Middleware\SetRequestLocale;
use App\Support\Auth\AuthContext;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\ExceptionResponse;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Mcamara\LaravelLocalization\Middleware\LaravelLocalizationRedirectFilter;
use Mcamara\LaravelLocalization\Middleware\LaravelLocalizationRoutes;
use Mcamara\LaravelLocalization\Middleware\LaravelLocalizationViewPath;
use Mcamara\LaravelLocalization\Middleware\LocaleCookieRedirect;
use Mcamara\LaravelLocalization\Middleware\LocaleSessionRedirect;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        then: function () {
            Route::middleware(['web', 'localeSessionRedirect', 'localizationRedirect', 'localeViewPath'])
                ->prefix(LaravelLocalization::setLocale())
                ->group(function () {
                    Route::group([], base_path('routes/app.php'));
                });

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
            'localize' => LaravelLocalizationRoutes::class,
            'localizationRedirect' => LaravelLocalizationRedirectFilter::class,
            'localeSessionRedirect' => LocaleSessionRedirect::class,
            'localeCookieRedirect' => LocaleCookieRedirect::class,
            'localeViewPath' => LaravelLocalizationViewPath::class,
            'password.confirm' => RequirePasswordConfirmation::class,
        ]);
        $middleware->redirectGuestsTo(fn (Request $request) => AuthContext::loginUrl($request));
        $middleware->redirectUsersTo(fn (Request $request): string => AuthContext::authenticatedUrl($request));
        $middleware->appendToGroup('web', [
            SetRequestLocale::class,
            HandleAppearance::class,
            HandleInertiaRequests::class,
            EnsureActiveUser::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            if (app()->isProduction() && in_array($response->getStatusCode(), [403, 404, 500, 503])) {
                return (new ExceptionResponse(
                    $exception,
                    $request,
                    $response,
                    app('router'),
                    app('Illuminate\Contracts\Http\Kernel'),
                ))
                    ->render('app/pages/errors/error', [
                        'status' => $response->getStatusCode(),
                    ])
                    ->usingMiddleware(HandleInertiaRequests::class)
                    ->rootView('app')
                    ->withSharedData()
                    ->toResponse($request);
            }

            if ($response->getStatusCode() === 419) {
                return back()->with([
                    'message' => 'The page expired, please try again.',
                ]);
            }

            if ($response->getStatusCode() === 429) {
                if (! $request->is('*/two-factor-challenge') && ! $request->is('admin/two-factor-challenge')) {
                    return $response;
                }

                $message = $request->is('admin/*')
                    ? __('messages.auth.throttle_2fa_admin')
                    : __('messages.auth.throttle_2fa');

                $seconds = max(1, (int) $response->headers->get('Retry-After', 60));

                return back()->with([
                    'message' => Str::replace(':seconds', (string) $seconds, $message),
                ]);
            }

            return $response;
        });
    })->create();
