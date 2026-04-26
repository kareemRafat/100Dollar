<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequirePasswordConfirmation
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ?string $redirectToRoute = null): Response
    {
        if ($this->shouldConfirmPassword($request)) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Password confirmation required.',
                ], 423);
            }

            $route = $redirectToRoute ?: ($request->routeIs('admin.*') ? 'admin.password.confirm' : 'password.confirm');

            return redirect()->guest(route($route));
        }

        return $next($request);
    }

    /**
     * Determine if the confirmation timeout has expired.
     */
    protected function shouldConfirmPassword(Request $request): bool
    {
        $confirmedAt = $request->session()->get('auth.password_confirmed_at', 0);

        return (time() - $confirmedAt) > config('auth.password_timeout', 10800);
    }
}
