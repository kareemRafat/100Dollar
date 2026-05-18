<?php

namespace App\Http\Responses;

use App\Support\Auth\AuthContext;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\TwoFactorLoginResponse as TwoFactorLoginResponseContract;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class AppTwoFactorLoginResponse implements TwoFactorLoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     */
    public function toResponse($request): JsonResponse|RedirectResponse
    {
        if ($request->wantsJson()) {
            return new JsonResponse('', 204);
        }

        AuthContext::sanitizeIntended($request);

        $locale = $request->input('_locale') ?: app()->getLocale();
        $route = $request->user()?->hasVerifiedEmail()
            ? route('app.home')
            : route('verification.notice');

        return redirect()->intended(
            LaravelLocalization::getLocalizedURL($locale, $route)
        );
    }
}
