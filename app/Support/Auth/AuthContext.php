<?php

namespace App\Support\Auth;

use App\Models\User;
use Illuminate\Http\Request;

class AuthContext
{
    public const ADMIN = 'admin';

    public const APP = 'app';

    public function remember(Request $request, ?string $context = null): string
    {
        $context = $this->normalize(
            $context
            ?? $request->input('_auth_context')
            ?? $request->query('auth_context')
            ?? $request->session()->get('auth_context')
            ?? ($request->is('admin') || $request->is('admin/*') ? self::ADMIN : self::APP),
        );

        if ($request->hasSession()) {
            $request->session()->put('auth_context', $context);
        }

        return $context;
    }

    public function view(Request $request, string $page): string
    {
        return $this->remember($request).'/auth/'.$page;
    }

    public function roleForContext(string $context): string
    {
        return $context === self::ADMIN ? 'admin' : 'user';
    }

    public function contextForRole(?string $role): string
    {
        return $role === 'admin' ? self::ADMIN : self::APP;
    }

    public function homeRouteForUser(?User $user): string
    {
        if ($user?->role === 'admin') {
            return 'admin.dashboard';
        }

        return 'app.home';
    }

    public function authenticatedRouteForUser(?User $user): string
    {
        if ($user instanceof User && ! $user->hasVerifiedEmail()) {
            return 'verification.notice';
        }

        return $this->homeRouteForUser($user);
    }

    public function loginRouteForContext(string $context): string
    {
        return $context === self::ADMIN ? 'admin.login' : 'login';
    }

    public function passwordRequestRouteForContext(string $context): string
    {
        return $context === self::ADMIN ? 'admin.password.request' : 'password.request';
    }

    public function normalize(?string $context): string
    {
        return $context === self::ADMIN ? self::ADMIN : self::APP;
    }
}
