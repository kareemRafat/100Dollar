<?php

namespace App\Http\Responses;

use App\Support\Auth\AuthContext;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\PasswordResetResponse as PasswordResetResponseContract;

class RoleAwarePasswordResetResponse implements PasswordResetResponseContract
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

        $context = app(AuthContext::class)->remember($request);

        return redirect()
            ->route(app(AuthContext::class)->loginRouteForContext($context))
            ->with('status', trans($this->status));
    }
}
