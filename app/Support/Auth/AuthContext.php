<?php

namespace App\Support\Auth;

use Illuminate\Contracts\Auth\Factory as AuthFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Session;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class AuthContext
{
    /**
     * Resolve the current guard user directly from the auth factory.
     */
    private static function user(Request $request): mixed
    {
        /** @var AuthFactory $auth */
        $auth = app(AuthFactory::class);

        return $auth->guard(self::guard($request))->user();
    }

    /**
     * Determine if the current request is for the admin domain.
     */
    public static function isAdmin(Request $request): bool
    {
        return $request->is('admin') || $request->is('admin/*');
    }

    /**
     * Determine the guard to use for the current request.
     */
    public static function guard(Request $request): string
    {
        return self::isAdmin($request) ? 'admin' : 'web';
    }

    /**
     * Determine the login route name for the current context.
     */
    public static function loginRouteName(Request $request): string
    {
        return self::isAdmin($request) ? 'admin.login' : 'login';
    }

    /**
     * Determine the home/dashboard route name for the current context.
     */
    public static function homeRouteName(Request $request): string
    {
        return self::isAdmin($request) ? 'admin.dashboard' : 'app.home';
    }

    /**
     * Determine the authenticated redirect route for the current request context.
     */
    public static function authenticatedRouteName(Request $request): string
    {
        if (! self::isAdmin($request)) {
            $user = self::user($request);

            if ($user instanceof MustVerifyEmail && ! $user->hasVerifiedEmail()) {
                return 'verification.notice';
            }
        }

        return self::homeRouteName($request);
    }

    /**
     * Sanitize the intended URL to ensure users don't cross domain contexts
     * (e.g., regular users redirected to admin routes).
     */
    public static function sanitizeIntended(Request $request): void
    {
        $intended = Session::get('url.intended');

        if (! $intended) {
            return;
        }

        $path = parse_url($intended, PHP_URL_PATH);
        $path = $path ? trim($path, '/') : '';

        // Determine if the intended path is for the admin panel
        $intendedIsAdmin = $path === 'admin' || str_starts_with($path, 'admin/');

        // Determine if the current context is admin (via middleware/request)
        $currentIsAdmin = self::isAdmin($request);

        // If we are in the App context but the intended URL is Admin, and the user is not an admin, clear it.
        if (! $currentIsAdmin && $intendedIsAdmin) {
            $user = $request->user();
            if (! $user || $user->role !== 'admin') {
                Session::forget('url.intended');
            }
        }

        // Safety check: If we are in Admin context but intended is NOT admin, clear it.
        // This ensures admins are always kept within the admin panel.
        if ($currentIsAdmin && ! $intendedIsAdmin) {
            Session::forget('url.intended');
        }
    }

    /**
     * Perform a locale-aware redirect to the intended URL or a fallback.
     */
    public static function redirectIntended(Request $request, string $fallbackRoute, array $params = []): RedirectResponse
    {
        self::sanitizeIntended($request);

        $user = $request->user();
        $locale = $user?->locale ?: ($request->input('_locale') ?: app()->getLocale());

        // Pull the intended URL from session
        $intended = Session::pull('url.intended');

        if ($intended) {
            return redirect()->to(
                LaravelLocalization::getLocalizedURL($locale, $intended)
            );
        }

        return redirect()->to(
            LaravelLocalization::getLocalizedURL($locale, route($fallbackRoute, $params))
        );
    }

    /**
     * Sanitize an explicit app redirect path so it stays inside the localized app.
     */
    public static function sanitizeAppRedirectPath(?string $redirect): ?string
    {
        if ($redirect === null || $redirect === '') {
            return null;
        }

        $parts = parse_url($redirect);

        if ($parts === false || Arr::hasAny($parts, ['scheme', 'host', 'port', 'user', 'pass'])) {
            return null;
        }

        $path = $parts['path'] ?? null;

        if (! is_string($path) || ! str_starts_with($path, '/')) {
            return null;
        }

        $segments = array_values(array_filter(explode('/', trim($path, '/')), fn (string $segment): bool => $segment !== ''));
        $supportedLocales = array_keys(LaravelLocalization::getSupportedLocales());

        if (in_array($segments[0] ?? null, $supportedLocales, true)) {
            array_shift($segments);
        }

        if (($segments[0] ?? null) === 'admin') {
            return null;
        }

        $sanitized = $path;

        if (isset($parts['query'])) {
            $sanitized .= '?'.$parts['query'];
        }

        if (isset($parts['fragment'])) {
            $sanitized .= '#'.$parts['fragment'];
        }

        return $sanitized;
    }

    /**
     * Build the login URL for the current request context.
     */
    public static function loginUrl(Request $request): string
    {
        return self::routeUrl($request, self::loginRouteName($request));
    }

    /**
     * Build the authenticated redirect URL for the current request context.
     */
    public static function authenticatedUrl(Request $request): string
    {
        return self::routeUrl($request, self::authenticatedRouteName($request));
    }

    /**
     * Build a route URL for the current request context.
     */
    public static function routeUrl(Request $request, string $routeName): string
    {
        $url = route($routeName, absolute: false);

        if (self::isAdmin($request)) {
            return $url;
        }

        return LaravelLocalization::getLocalizedURL(
            app()->getLocale(),
            $url,
        );
    }
}
