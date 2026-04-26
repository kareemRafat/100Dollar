<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\PasswordResetResponse as PasswordResetResponseContract;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class AppPasswordResetResponse implements PasswordResetResponseContract
{
    public function __construct(private readonly string $status) {}

    /**
     * Create an HTTP response that represents the object.
     */
    public function toResponse($request): JsonResponse|RedirectResponse
    {
        if ($request->wantsJson()) {
            return new JsonResponse(['message' => trans($this->status)], 200);
        }

        $locale = $request->input('_locale') ?: app()->getLocale();

        return redirect()
            ->to(LaravelLocalization::getLocalizedURL($locale, route('login')))
            ->with('status', trans($this->status));
    }
}
