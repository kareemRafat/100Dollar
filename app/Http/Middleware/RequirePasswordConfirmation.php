<?php

namespace App\Http\Middleware;

use App\Support\Auth\AuthContext;
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
            if ($request->wantsJson() && ! $request->hasHeader('X-Inertia')) {
                return response()->json([
                    'message' => 'Password confirmation required.',
                ], 423);
            }

            $route = $redirectToRoute ?: ($request->routeIs('admin.*') ? 'admin.password.confirm' : 'password.confirm');

            return redirect()->guest(AuthContext::routeUrl($request, $route));
        }

        return $next($request);
    }

    /**
     * Determine if the confirmation timeout has expired.
     */
    protected function shouldConfirmPassword(Request $request): bool
    {
        $key = AuthContext::isAdmin($request) ? 'admin.auth.password_confirmed_at' : 'auth.password_confirmed_at';
        $confirmedAt = $request->session()->get($key, 0);

        return (time() - $confirmedAt) > config('auth.password_timeout', 10800);
    }
}
