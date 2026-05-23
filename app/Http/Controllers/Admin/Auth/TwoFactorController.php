<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Support\Auth\AuthContext;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Actions\DisableTwoFactorAuthentication;
use Laravel\Fortify\Actions\EnableTwoFactorAuthentication;
use Laravel\Fortify\Actions\GenerateNewRecoveryCodes;
use Laravel\Fortify\Contracts\TwoFactorAuthenticationProvider;
use Laravel\Fortify\Fortify;

class TwoFactorController extends Controller
{
    public function create(Request $request): RedirectResponse|Response
    {
        if (! $this->hasPendingLogin($request)) {
            return redirect()->route('admin.login');
        }

        return Inertia::render('admin/pages/auth/two-factor-challenge');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => ['nullable', 'string'],
            'recovery_code' => ['nullable', 'string'],
        ]);

        $admin = $this->challengedAdmin($request);
        $recoveryCode = $this->validRecoveryCode($request, $admin);

        if ($recoveryCode !== null) {
            $admin->replaceRecoveryCode($recoveryCode);
        } elseif (! $this->hasValidCode($request, $admin)) {
            throw ValidationException::withMessages([
                'code' => 'رمز المصادقة الثنائية الذي أدخلته غير صحيح.',
            ]);
        }

        Auth::guard('admin')->login(
            $admin,
            $request->session()->pull('admin_login.remember', false),
        );

        $request->session()->forget('admin_login.id');
        $request->session()->regenerate();

        AuthContext::sanitizeIntended($request);

        return redirect()->intended(route('admin.dashboard'));
    }

    public function enable(Request $request, EnableTwoFactorAuthentication $enable): RedirectResponse
    {
        $enable($request->user('admin'), $request->boolean('force', false));

        return back();
    }

    public function disable(Request $request, DisableTwoFactorAuthentication $disable): RedirectResponse
    {
        $disable($request->user('admin'));

        return back();
    }

    public function confirm(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => ['required', 'string'],
        ]);

        $admin = $request->user('admin');

        $verified = app(TwoFactorAuthenticationProvider::class)->verify(
            Fortify::currentEncrypter()->decrypt($admin->two_factor_secret),
            $request->code
        );

        if (! $verified) {
            throw ValidationException::withMessages([
                'code' => ['رمز المصادقة الثنائية الذي أدخلته غير صحيح.'],
            ]);
        }

        $admin->forceFill([
            'two_factor_confirmed_at' => now(),
        ])->save();

        return back();
    }

    public function qrCode(Request $request): JsonResponse|array
    {
        if ($request->user('admin')->two_factor_secret === null) {
            return [];
        }

        return response()->json([
            'svg' => $request->user('admin')->twoFactorQrCodeSvg(),
            'url' => $request->user('admin')->twoFactorQrCodeUrl(),
        ]);
    }

    public function secretKey(Request $request): JsonResponse
    {
        abort_if($request->user('admin')->two_factor_secret === null, 404, 'Two factor authentication has not been enabled.');

        return response()->json([
            'secretKey' => Fortify::currentEncrypter()->decrypt($request->user('admin')->two_factor_secret),
        ]);
    }

    public function recoveryCodes(Request $request): JsonResponse|array
    {
        $admin = $request->user('admin');

        if (! $admin->two_factor_secret || ! $admin->two_factor_recovery_codes) {
            return [];
        }

        return response()->json(json_decode(
            Fortify::currentEncrypter()->decrypt($admin->two_factor_recovery_codes),
            true,
        ));
    }

    public function regenerateRecoveryCodes(Request $request, GenerateNewRecoveryCodes $generate): RedirectResponse
    {
        $generate($request->user('admin'));

        return back();
    }

    private function hasPendingLogin(Request $request): bool
    {
        return $request->session()->has('admin_login.id');
    }

    private function challengedAdmin(Request $request)
    {
        $adminId = $request->session()->get('admin_login.id');

        if ($adminId === null) {
            throw new HttpResponseException(redirect()->route('admin.login'));
        }

        $admin = Auth::guard('admin')->getProvider()->retrieveById($adminId);

        if ($admin === null) {
            throw new HttpResponseException(redirect()->route('admin.login'));
        }

        return $admin;
    }

    private function hasValidCode(Request $request, $admin): bool
    {
        $code = $request->string('code')->toString();

        if ($code === '') {
            return false;
        }

        return tap(app(TwoFactorAuthenticationProvider::class)->verify(
            Fortify::currentEncrypter()->decrypt($admin->two_factor_secret),
            $code,
        ), function (bool $result) use ($request): void {
            if ($result) {
                $request->session()->forget('admin_login.id');
            }
        });
    }

    private function validRecoveryCode(Request $request, $admin): ?string
    {
        $recoveryCode = $request->string('recovery_code')->toString();

        if ($recoveryCode === '') {
            return null;
        }

        return tap(collect($admin->recoveryCodes())->first(function (string $code) use ($recoveryCode): ?string {
            return hash_equals($code, $recoveryCode) ? $code : null;
        }), function (?string $code) use ($request): void {
            if ($code !== null) {
                $request->session()->forget('admin_login.id');
            }
        });
    }
}
