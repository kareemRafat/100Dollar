<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Http\Responses\AppFailedTwoFactorLoginResponse;
use App\Http\Responses\AppLoginResponse;
use App\Http\Responses\AppLogoutResponse;
use App\Http\Responses\AppPasswordConfirmedResponse;
use App\Http\Responses\AppPasswordResetResponse;
use App\Http\Responses\AppRegisterResponse;
use App\Http\Responses\AppTwoFactorLoginResponse;
use App\Http\Responses\AppVerifyEmailResponse;
use App\Models\User;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\FailedTwoFactorLoginResponse as FailedTwoFactorLoginResponseContract;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Laravel\Fortify\Contracts\LogoutResponse as LogoutResponseContract;
use Laravel\Fortify\Contracts\PasswordConfirmedResponse as PasswordConfirmedResponseContract;
use Laravel\Fortify\Contracts\PasswordResetResponse as PasswordResetResponseContract;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;
use Laravel\Fortify\Contracts\TwoFactorLoginResponse as TwoFactorLoginResponseContract;
use Laravel\Fortify\Contracts\VerifyEmailResponse as VerifyEmailResponseContract;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(LoginResponseContract::class, AppLoginResponse::class);
        $this->app->singleton(FailedTwoFactorLoginResponseContract::class, AppFailedTwoFactorLoginResponse::class);
        $this->app->singleton(LogoutResponseContract::class, AppLogoutResponse::class);
        $this->app->singleton(RegisterResponseContract::class, AppRegisterResponse::class);
        $this->app->singleton(TwoFactorLoginResponseContract::class, AppTwoFactorLoginResponse::class);
        $this->app->singleton(VerifyEmailResponseContract::class, AppVerifyEmailResponse::class);
        $this->app->singleton(PasswordConfirmedResponseContract::class, AppPasswordConfirmedResponse::class);
        $this->app->bind(PasswordResetResponseContract::class, fn ($app, array $parameters) => new AppPasswordResetResponse($parameters['status']));
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureActions();
        $this->configureAuthentication();
        $this->configureViews();
        $this->configureRateLimiting();
    }

    /**
     * Configure Fortify actions.
     */
    private function configureActions(): void
    {
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::createUsersUsing(CreateNewUser::class);
    }

    /**
     * Configure Fortify views.
     */
    private function configureViews(): void
    {
        Fortify::resetPasswordView(function (Request $request) {
            return Inertia::render('app/pages/auth/reset-password', [
                'email' => $request->email,
                'token' => $request->route('token'),
            ]);
        });

        Fortify::twoFactorChallengeView(fn () => Inertia::render('app/pages/auth/two-factor-challenge'));
        Fortify::confirmPasswordView(fn () => Inertia::render('app/pages/auth/confirm-password'));
    }

    /**
     * Configure Fortify authentication rules.
     */
    private function configureAuthentication(): void
    {
        Fortify::authenticateUsing(function (Request $request) {
            $user = User::query()
                ->where('email', $request->string('email')->toString())
                ->where('role', 'user')
                ->where('is_active', true)
                ->first();

            if ($user === null) {
                return null;
            }

            if (! Hash::check($request->string('password')->toString(), $user->password)) {
                return null;
            }

            return $user;
        });
    }

    /**
     * Configure rate limiting.
     */
    private function configureRateLimiting(): void
    {
        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)
                ->by($request->session()->get('login.id'))
                ->response(function (Request $request, array $headers) {
                    $seconds = max(1, (int) ($headers['Retry-After'] ?? 60));

                    $locale = $this->resolveAppTwoFactorLocale($request);
                    app()->setLocale($locale);

                    return back()
                        ->with('message', __('messages.auth.throttle_2fa', ['time' => $seconds, 'seconds' => $seconds]))
                        ->with('retry_after', $seconds)
                        ->withHeaders($headers);
                });
        });

        RateLimiter::for('admin-two-factor', function (Request $request) {
            return Limit::perMinute(5)
                ->by($request->session()->get('admin_login.id') ?: $request->ip())
                ->response(function (Request $request, array $headers) {
                    $seconds = max(1, (int) ($headers['Retry-After'] ?? 60));

                    app()->setLocale('ar');

                    return back()
                        ->with('message', __('messages.auth.throttle_2fa_admin', ['time' => $seconds, 'seconds' => $seconds]))
                        ->with('retry_after', $seconds)
                        ->withHeaders($headers);
                });
        });

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });
    }

    private function resolveAppTwoFactorLocale(Request $request): string
    {
        $pathLocale = $request->segment(1);

        if (in_array($pathLocale, ['ar', 'en'], true)) {
            return $pathLocale;
        }

        $requestedLocale = $request->string('_locale')->toString();

        if (in_array($requestedLocale, ['ar', 'en'], true)) {
            return $requestedLocale;
        }

        $sessionLocale = $request->session()->get('locale');

        if (in_array($sessionLocale, ['ar', 'en'], true)) {
            return $sessionLocale;
        }

        $challengedUserId = $request->session()->get('login.id');

        if ($challengedUserId) {
            $challengedUser = User::query()->find($challengedUserId);

            if ($challengedUser?->locale) {
                return $challengedUser->locale;
            }
        }

        return config('app.locale');
    }
}
