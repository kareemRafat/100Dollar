<?php

namespace App\Http\Responses;

use App\Support\Auth\AuthContext;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

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

        if ($request->user()?->role === 'admin') {
            return redirect()->intended(route('admin.dashboard'));
        }

        $locale = $request->input('_locale') ?: app()->getLocale();

        return redirect()->intended(
            LaravelLocalization::getLocalizedURL(
                $locale,
                route(app(AuthContext::class)->authenticatedRouteForUser($request->user()))
            )
        );
    }
}
