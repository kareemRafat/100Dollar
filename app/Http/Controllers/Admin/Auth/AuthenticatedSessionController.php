<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Support\Auth\AuthContext;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Features;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming admin authentication request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        $admin = User::where('email', $credentials['email'])
            ->where('role', UserRole::ADMIN)
            ->where('is_active', true)
            ->first();

        if (! $admin || ! Hash::check($credentials['password'], $admin->password)) {
            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        if ($this->requiresTwoFactorChallenge($admin)) {
            $request->session()->put('admin_login.id', $admin->id);
            $request->session()->put('admin_login.remember', $request->boolean('remember'));

            return redirect()->route('admin.two-factor.login');
        }

        $request->session()->regenerate();

        Auth::guard('admin')->login($admin, $request->boolean('remember'));

        AuthContext::sanitizeIntended($request);

        return redirect()->intended(route('admin.dashboard'));
    }

    /**
     * Destroy an authenticated admin session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('admin')->logout();

        $request->session()->forget([
            'admin_login.id',
            'admin_login.remember',
        ]);
        $request->session()->regenerate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }

    private function requiresTwoFactorChallenge(User $admin): bool
    {
        if (! Features::enabled(Features::twoFactorAuthentication())) {
            return false;
        }

        if (! $admin->two_factor_secret) {
            return false;
        }

        if (Features::optionEnabled(Features::twoFactorAuthentication(), 'confirm') &&
            is_null($admin->two_factor_confirmed_at)) {
            return false;
        }

        return true;
    }
}
