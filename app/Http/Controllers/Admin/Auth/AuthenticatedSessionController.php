<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Features;
use Laravel\Fortify\TwoFactorAuthenticatable;

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

        $admin = User::query()
            ->where('email', $credentials['email'])
            ->where('role', 'admin')
            ->where('is_active', true)
            ->first();

        if (! $admin instanceof User || ! Hash::check($credentials['password'], $admin->password)) {
            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        if (
            Features::enabled(Features::twoFactorAuthentication())
            && $this->requiresTwoFactorChallenge($admin)
        ) {
            $request->session()->put([
                'admin_login.id' => $admin->getKey(),
                'admin_login.remember' => $request->boolean('remember'),
            ]);

            return redirect()->route('admin.two-factor.login');
        }

        Auth::guard('admin')->login($admin, $request->boolean('remember'));
        $request->session()->regenerate();

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
        if (empty($admin->two_factor_secret)) {
            return false;
        }

        if (! in_array(TwoFactorAuthenticatable::class, class_uses_recursive($admin), true)) {
            return false;
        }

        if (! Features::optionEnabled(Features::twoFactorAuthentication(), 'confirm')) {
            return true;
        }

        return $admin->two_factor_confirmed_at !== null;
    }
}
