<?php

namespace App\Http\Responses;

use App\Support\Auth\AuthContext;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

class RoleAwareRegisterResponse implements RegisterResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     */
    public function toResponse($request): JsonResponse|RedirectResponse
    {
        if ($request->wantsJson()) {
            return new JsonResponse('', 201);
        }

        return redirect()->intended(
            route(app(AuthContext::class)->authenticatedRouteForUser($request->user())),
        );
    }
}
