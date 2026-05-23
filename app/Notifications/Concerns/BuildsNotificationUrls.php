<?php

namespace App\Notifications\Concerns;

use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

trait BuildsNotificationUrls
{
    protected function localizedUrl(object $notifiable, string $routeName, array $parameters = []): string
    {
        $url = route($routeName, $parameters, false);

        return LaravelLocalization::getNonLocalizedURL($url);
    }
}
