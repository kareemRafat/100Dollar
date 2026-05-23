<?php

namespace App\Http\Middleware;

use App\Support\Auth\AuthContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user(AuthContext::guard($request));

        if ($user === null) {
            abort(403, 'Unauthorized: No authenticated user found.');
        }

        $userRole = $user->role;

        // Extract value from Enum if it is one
        if ($userRole instanceof \BackedEnum) {
            $userRole = $userRole->value;
        } elseif (is_object($userRole) && method_exists($userRole, 'value')) {
            $userRole = $userRole->value;
        }

        if (! in_array((string) $userRole, $roles, true)) {
            abort(403, 'Unauthorized: Role mismatch.');
        }

        return $next($request);
    }
}
