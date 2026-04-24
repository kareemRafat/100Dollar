<?php

namespace App\Http\Responses;

use App\Support\Auth\AuthContext;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\PasswordConfirmedResponse as PasswordConfirmedResponseContract;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class RoleAwarePasswordConfirmedResponse implements PasswordConfirmedResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        if ($request->wantsJson()) {
            return new JsonResponse('', 201);
        }

        $context = app(AuthContext::class)->remember($request);

        // Fallback to context home if no intended URL is found
        $route = app(AuthContext::class)->homeRouteForUser($request->user());
        $fallback = LaravelLocalization::getLocalizedURL(
            app()->getLocale(),
            route($route)
        );

        return redirect()->intended($fallback);
    }
}
