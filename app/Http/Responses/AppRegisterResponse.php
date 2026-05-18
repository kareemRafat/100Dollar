<?php

namespace App\Http\Responses;

use App\Support\Auth\AuthContext;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class AppRegisterResponse implements RegisterResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     */
    public function toResponse($request): JsonResponse|RedirectResponse
    {
        if ($request->wantsJson()) {
            return new JsonResponse('', 201);
        }

        AuthContext::sanitizeIntended($request);

        $locale = $request->input('_locale') ?: app()->getLocale();
        $route = $request->user()?->hasVerifiedEmail()
            ? route('app.home')
            : route('verification.notice');

        return redirect()->to(
            LaravelLocalization::getLocalizedURL($locale, $route)
        );
    }
}
