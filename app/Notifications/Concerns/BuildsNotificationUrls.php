<?php

namespace App\Notifications\Concerns;

use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

trait BuildsNotificationUrls
{
    protected function localizedUrl(object $notifiable, string $routeName, array $parameters = []): string
    {
        return LaravelLocalization::getLocalizedURL(
            method_exists($notifiable, 'preferredLocale') ? $notifiable->preferredLocale() : app()->getLocale(),
            route($routeName, $parameters, false),
        );
    }
}
