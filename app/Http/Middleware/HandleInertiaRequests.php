<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Middleware;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $isAdminRequest = $request->is('admin') || $request->is('admin/*');
        $user = $isAdminRequest ? Auth::guard('admin')->user() : Auth::user();

        $sendKey = $user ? "vote-send:user:{$user->id}" : "vote-send:ip:{$request->ip()}";
        $globalKey = "vote-global:ip:{$request->ip()}";

        $isBlocked = RateLimiter::tooManyAttempts($sendKey, 5) ||
                     RateLimiter::tooManyAttempts($globalKey, 10);

        $availableIn = $isBlocked ? max(
            RateLimiter::availableIn($sendKey),
            RateLimiter::availableIn($globalKey)
        ) : 0;

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $user ? $user->load('media') : null,
                'unread_notifications_count' => $user ? $user->customNotifications()->where('is_read', false)->count() : 0,
            ],
            'flash' => [
                'message' => $request->session()->get('message'),
                'retry_after' => $request->session()->get('retry_after'),
            ],
            'vote_block' => [
                'is_blocked' => $isBlocked,
                'available_in' => $availableIn,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'locale' => app()->getLocale(),
            'translations' => syncLangFiles(['auth', 'pagination', 'passwords', 'validation', 'messages']),
            'languages' => collect(LaravelLocalization::getSupportedLocales())->map(function ($properties, $locale) {
                return [
                    'key' => $locale,
                    'name' => $properties['native'],
                    'url' => LaravelLocalization::getLocalizedURL($locale, null, [], true),
                ];
            })->values(),
            'social_links' => [
                'whatsapp' => Setting::get('social_whatsapp'),
                'x' => Setting::get('social_x'),
                'facebook' => Setting::get('social_facebook'),
                'instagram' => Setting::get('social_instagram'),
            ],
        ];
    }
}
