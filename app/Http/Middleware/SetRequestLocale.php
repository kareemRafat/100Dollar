<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetRequestLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->is('admin') || $request->is('admin/*')) {
            app()->setLocale('ar');

            return $next($request);
        }

        $locale = $request->segment(1);

        if (! in_array($locale, ['en', 'ar'])) {
            $locale = $request->input('_locale')
                ?? $request->session()->get('locale')
                ?? config('app.locale');
        }

        if (in_array($locale, ['en', 'ar'])) {
            app()->setLocale($locale);
            $request->session()->put('locale', $locale);
        }

        return $next($request);
    }
}
