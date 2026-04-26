<?php

namespace App\Http\Controllers\App\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LogoutResponse as LogoutResponseContract;

class AuthenticatedSessionController
{
    /**
     * Destroy an authenticated app session without clearing the admin guard.
     */
    public function destroy(Request $request): LogoutResponseContract
    {
        Auth::guard('web')->logout();

        $request->session()->forget([
            'login.id',
            'login.remember',
        ]);
        $request->session()->regenerate();
        $request->session()->regenerateToken();

        return app(LogoutResponseContract::class);
    }
}
