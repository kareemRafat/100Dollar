<?php

namespace App\Http\Responses;

use App\Support\Auth\AuthContext;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\LogoutResponse as LogoutResponseContract;

use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

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

        $context = app(AuthContext::class)->remember($request);

        if ($context === AuthContext::ADMIN) {
            return redirect()->route('admin.login');
        }

        $locale = $request->input('_locale') ?: app()->getLocale();

        return redirect()->to(
            LaravelLocalization::getLocalizedURL(
                $locale,
                route(app(AuthContext::class)->loginRouteForContext($context))
            )
        );
    }
}
