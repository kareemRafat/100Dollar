<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Support\Auth\AuthContext;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class ConfirmablePasswordController extends Controller
{
    /**
     * Confirm the current admin password and continue to the intended page.
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'string', 'current_password:admin'],
        ]);

        $request->session()->put('admin.auth.password_confirmed_at', Date::now()->unix());

        if ($request->wantsJson()) {
            return new JsonResponse('', 201);
        }

        AuthContext::sanitizeIntended($request);

        return redirect()->intended(route('admin.dashboard'));
    }
}
