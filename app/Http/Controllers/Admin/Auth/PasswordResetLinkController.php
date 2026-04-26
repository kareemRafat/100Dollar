<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class PasswordResetLinkController extends Controller
{
    /**
     * Send a password reset link to an admin user if the address belongs to one.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
        ]);

        $admin = User::query()
            ->where('email', $validated['email'])
            ->where('role', 'admin')
            ->first();

        if ($admin === null) {
            return back()->with('status', __((string) Password::RESET_LINK_SENT));
        }

        $status = Password::broker()->sendResetLink([
            'email' => $admin->email,
        ]);

        if ($status === Password::RESET_LINK_SENT) {
            return back()->with('status', __($status));
        }

        return back()->withInput($request->only('email'))->withErrors([
            'email' => __($status),
        ]);
    }
}
