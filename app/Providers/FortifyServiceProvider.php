<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Http\Responses\RoleAwareLoginResponse;
use App\Http\Responses\RoleAwareLogoutResponse;
use App\Http\Responses\RoleAwarePasswordConfirmedResponse;
use App\Http\Responses\RoleAwarePasswordResetResponse;
use App\Http\Responses\RoleAwareRegisterResponse;
use App\Http\Responses\RoleAwareTwoFactorLoginResponse;
use App\Http\Responses\RoleAwareVerifyEmailResponse;
use App\Models\User;
use App\Support\Auth\AuthContext;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Laravel\Fortify\Contracts\LogoutResponse as LogoutResponseContract;
use Laravel\Fortify\Contracts\PasswordConfirmedResponse as PasswordConfirmedResponseContract;
use Laravel\Fortify\Contracts\PasswordResetResponse as PasswordResetResponseContract;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;
use Laravel\Fortify\Contracts\TwoFactorLoginResponse as TwoFactorLoginResponseContract;
use Laravel\Fortify\Contracts\VerifyEmailResponse as VerifyEmailResponseContract;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(LoginResponseContract::class, RoleAwareLoginResponse::class);
        $this->app->singleton(LogoutResponseContract::class, RoleAwareLogoutResponse::class);
        $this->app->singleton(RegisterResponseContract::class, RoleAwareRegisterResponse::class);
        $this->app->singleton(TwoFactorLoginResponseContract::class, RoleAwareTwoFactorLoginResponse::class);
        $this->app->singleton(VerifyEmailResponseContract::class, RoleAwareVerifyEmailResponse::class);
        $this->app->singleton(PasswordConfirmedResponseContract::class, RoleAwarePasswordConfirmedResponse::class);
        $this->app->bind(PasswordResetResponseContract::class, fn ($app, array $parameters) => new RoleAwarePasswordResetResponse($parameters['status']));
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
        Fortify::loginView(fn (Request $request) => Inertia::render(
            app(AuthContext::class)->view($request, 'login'),
            [
                'canResetPassword' => Features::enabled(Features::resetPasswords()),
                'canRegister' => app(AuthContext::class)->remember($request) === AuthContext::APP
                    && Features::enabled(Features::registration()),
                'status' => $request->session()->get('status'),
            ],
        ));

        Fortify::resetPasswordView(fn (Request $request) => Inertia::render(
            app(AuthContext::class)->view($request, 'reset-password'),
            [
                'email' => $request->email,
                'token' => $request->route('token'),
            ],
        ));

        Fortify::requestPasswordResetLinkView(fn (Request $request) => Inertia::render(
            app(AuthContext::class)->view($request, 'forgot-password'),
            [
                'status' => $request->session()->get('status'),
            ],
        ));

        Fortify::verifyEmailView(fn (Request $request) => Inertia::render(
            app(AuthContext::class)->view($request, 'verify-email'),
            [
                'status' => $request->session()->get('status'),
            ],
        ));

        Fortify::registerView(fn (Request $request) => Inertia::render(
            app(AuthContext::class)->view($request, 'register'),
            [
                'canLogin' => true,
            ],
        ));

        Fortify::twoFactorChallengeView(fn (Request $request) => Inertia::render(
            app(AuthContext::class)->view($request, 'two-factor-challenge'),
        ));

        Fortify::confirmPasswordView(fn (Request $request) => Inertia::render(
            app(AuthContext::class)->view($request, 'confirm-password'),
        ));
    }

    /**
     * Configure Fortify authentication rules.
     */
    private function configureAuthentication(): void
    {
        Fortify::authenticateUsing(function (Request $request) {
            $context = app(AuthContext::class)->remember($request);

            $user = User::query()
                ->where('email', $request->string('email')->toString())
                ->first();

            if ($user === null) {
                return null;
            }

            if ($user->role !== app(AuthContext::class)->roleForContext($context)) {
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
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });
    }
}
