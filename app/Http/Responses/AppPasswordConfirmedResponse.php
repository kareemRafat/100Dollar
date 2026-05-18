<?php

namespace App\Http\Responses;

use App\Support\Auth\AuthContext;
use Illuminate\Http\JsonResponse;
use Laravel\Fortify\Contracts\PasswordConfirmedResponse as PasswordConfirmedResponseContract;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class AppPasswordConfirmedResponse implements PasswordConfirmedResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     */
    public function toResponse($request)
    {
        if ($request->wantsJson()) {
            return new JsonResponse('', 201);
        }

        AuthContext::sanitizeIntended($request);

        $fallback = LaravelLocalization::getLocalizedURL(
            app()->getLocale(),
            route('app.home'),
        );

        return redirect()->intended($fallback);
    }
}
