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
     *
     * @param  Request  $request
     * @param  Closure  $next
     * @param  string|null  $redirectToRoute
     * @return Response
     */
    public function handle(Request $request, Closure $next, ?string $redirectToRoute = null): Response
    {
        if ($this->shouldConfirmPassword($request)) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Password confirmation required.',
                ], 423);
            }

            $context = app(AuthContext::class)->remember($request);
            $route = $redirectToRoute ?: app(AuthContext::class)->passwordConfirmRouteForContext($context);

            return redirect()->guest(route($route));
        }

        return $next($request);
    }

    /**
     * Determine if the confirmation timeout has expired.
     *
     * @param  Request  $request
     * @return bool
     */
    protected function shouldConfirmPassword(Request $request): bool
    {
        $confirmedAt = $request->session()->get('auth.password_confirmed_at', 0);

        return (time() - $confirmedAt) > config('auth.password_timeout', 10800);
    }
}
