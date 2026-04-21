<?php

namespace App\Http\Responses;

use App\Support\Auth\AuthContext;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\VerifyEmailResponse as VerifyEmailResponseContract;

use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class RoleAwareVerifyEmailResponse implements VerifyEmailResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     */
    public function toResponse($request): JsonResponse|RedirectResponse
    {
        if ($request->wantsJson()) {
            return new JsonResponse('', 204);
        }

        return redirect()->intended(
            LaravelLocalization::getLocalizedURL(
                app()->getLocale(),
                route(app(AuthContext::class)->homeRouteForUser($request->user())).'?verified=1'
            )
        );
    }
}
