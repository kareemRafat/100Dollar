<?php

namespace App\Http\Responses;

use App\Support\Auth\AuthContext;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\LogoutResponse as LogoutResponseContract;

class RoleAwareLogoutResponse implements LogoutResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     */
    public function toResponse($request): JsonResponse|RedirectResponse
    {
        if ($request->wantsJson()) {
            return new JsonResponse('', 204);
        }

        $referer = $request->headers->get('referer', '');
        $context = str_contains($referer, '/admin') ? AuthContext::ADMIN : AuthContext::APP;

        return redirect()->route(
            app(AuthContext::class)->loginRouteForContext($context),
        );
    }
}
