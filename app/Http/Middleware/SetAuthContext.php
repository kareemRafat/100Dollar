<?php

namespace App\Http\Middleware;

use App\Support\Auth\AuthContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetAuthContext
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $context = $request->input('_auth_context')
            ?? ($request->is('admin') || $request->is('admin/*') ? AuthContext::ADMIN : AuthContext::APP);

        app(AuthContext::class)->remember($request, $context);

        if ($context === AuthContext::APP) {
            $locale = $request->input('_locale') 
                ?? $request->session()->get('locale') 
                ?? config('app.locale');
                
            app()->setLocale($locale);
        }

        return $next($request);
    }
}
