<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationController extends Controller
{
    public function notice(Request $request): RedirectResponse|Response
    {
        if ($request->user('admin')->hasVerifiedEmail()) {
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('admin/pages/auth/verify-email', [
            'status' => $request->session()->get('status'),
        ]);
    }

    public function send(Request $request): JsonResponse|RedirectResponse
    {
        $admin = $request->user('admin');

        if ($admin->hasVerifiedEmail()) {
            return $request->wantsJson()
                ? new JsonResponse('', 204)
                : redirect()->route('admin.dashboard');
        }

        $admin->sendEmailVerificationNotification();

        if ($request->wantsJson()) {
            return new JsonResponse('', 202);
        }

        return back()->with('status', 'verification-link-sent');
    }

    public function verify(Request $request, string $id, string $hash): RedirectResponse
    {
        $admin = $request->user('admin');

        abort_unless((string) $admin->getKey() === $id, 403);
        abort_unless(hash_equals(sha1($admin->getEmailForVerification()), $hash), 403);

        if (! $admin->hasVerifiedEmail() && $admin->markEmailAsVerified()) {
            event(new Verified($admin));
        }

        return redirect()->route('admin.dashboard', ['verified' => 1]);
    }
}
