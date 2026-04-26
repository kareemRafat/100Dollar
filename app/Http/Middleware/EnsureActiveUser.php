<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Symfony\Component\HttpFoundation\Response;

class EnsureActiveUser
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        foreach (['web', 'admin'] as $guard) {
            if (! Auth::guard($guard)->check()) {
                continue;
            }

            if (Auth::guard($guard)->user()?->is_active) {
                continue;
            }

            Auth::guard($guard)->logout();

            if ($request->hasSession()) {
                $request->session()->invalidate();
                $request->session()->regenerateToken();
            }

            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Your account is inactive.',
                ], 403);
            }

            if ($request->is('admin') || $request->is('admin/*')) {
                return redirect()->guest(route('admin.login'));
            }

            return redirect()->guest(
                LaravelLocalization::getLocalizedURL(
                    app()->getLocale(),
                    route('login'),
                )
            );
        }

        return $next($request);
    }
}
