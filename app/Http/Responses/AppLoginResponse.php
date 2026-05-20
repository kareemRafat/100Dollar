<?php

namespace App\Http\Responses;

use App\Support\Auth\AuthContext;
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
        if ($request->wantsJson() && ! $request->hasHeader('X-Inertia')) {
            return new JsonResponse('', 204);
        }

        $user = $request->user();
        $locale = $user?->locale ?: ($request->input('_locale') ?: app()->getLocale());
        $redirect = $request->input('redirect');

        if ($redirect) {
            return redirect()->to(
                LaravelLocalization::getLocalizedURL($locale, $redirect)
            );
        }

        if ($user && $user->role === 'admin') {
            AuthContext::sanitizeIntended($request);

            return redirect()->intended(route('admin.dashboard'));
        }

        $fallbackRoute = $user?->hasVerifiedEmail()
            ? 'app.home'
            : 'verification.notice';

        return AuthContext::redirectIntended($request, $fallbackRoute);
    }
}
