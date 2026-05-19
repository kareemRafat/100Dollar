<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        Model::preventLazyLoading(! app()->isProduction());

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );

        ResetPassword::createUrlUsing(function (object $user, string $token): string {
            $locale = method_exists($user, 'preferredLocale')
                ? $user->preferredLocale()
                : app()->getLocale();

            return LaravelLocalization::getLocalizedURL($locale, route('password.reset', [
                'token' => $token,
                'email' => $user->getEmailForPasswordReset(),
            ], absolute: false));
        });

        ResetPassword::toMailUsing(function (object $user, string $token): MailMessage {
            $url = call_user_func(ResetPassword::$createUrlCallback, $user, $token);

            return (new MailMessage)
                ->subject(__('messages.mail.reset_password_subject'))
                ->view(['mail.notification', 'mail.notification-text'], [
                    'subject' => __('messages.mail.reset_password_subject'),
                    'greeting' => __('messages.mail.reset_password_greeting', ['name' => $user->name]),
                    'lines' => [
                        __('messages.mail.reset_password_line1'),
                        __('messages.mail.reset_password_line2', ['minutes' => config('auth.passwords.'.config('auth.defaults.passwords').'.expire')]),
                        __('messages.mail.reset_password_line3'),
                    ],
                    'actionText' => __('messages.mail.reset_password_action'),
                    'actionUrl' => $url,
                    'preheader' => __('messages.mail.reset_password_line1'),
                ]);
        });

        VerifyEmail::createUrlUsing(function (object $user): string {
            $locale = method_exists($user, 'preferredLocale')
                ? $user->preferredLocale()
                : app()->getLocale();

            return LaravelLocalization::getLocalizedURL($locale, URL::temporarySignedRoute(
                'verification.verify',
                now()->addMinutes(config('auth.verification.expire', 60)),
                [
                    'id' => $user->getKey(),
                    'hash' => sha1($user->getEmailForVerification()),
                ],
            ));
        });

        VerifyEmail::toMailUsing(function (object $user, string $url): MailMessage {
            return (new MailMessage)
                ->subject(__('messages.mail.verify_email_subject'))
                ->view(['mail.notification', 'mail.notification-text'], [
                    'subject' => __('messages.mail.verify_email_subject'),
                    'greeting' => __('messages.mail.verify_email_greeting', ['name' => $user->name]),
                    'lines' => [
                        __('messages.mail.verify_email_line1'),
                        __('messages.mail.verify_email_line2'),
                    ],
                    'actionText' => __('messages.mail.verify_email_action'),
                    'actionUrl' => $url,
                    'preheader' => __('messages.mail.verify_email_line1'),
                ]);
        });
    }
}
