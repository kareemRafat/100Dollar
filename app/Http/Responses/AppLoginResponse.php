<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class AppLoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     */
    public function toResponse($request): JsonResponse|RedirectResponse
    {
        if ($request->wantsJson()) {
            return new JsonResponse('', 204);
        }

        $locale = $request->input('_locale') ?: app()->getLocale();

        if ($request->filled('redirect')) {
            return redirect()->to($request->input('redirect'));
        }

        $route = $request->user()?->hasVerifiedEmail()
            ? route('app.home')
            : route('verification.notice');

        return redirect()->intended(
            LaravelLocalization::getLocalizedURL($locale, $route)
        );
    }
}
