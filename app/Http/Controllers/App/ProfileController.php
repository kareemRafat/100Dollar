<?php

namespace App\Http\Controllers\App;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\TwoFactorAuthenticationRequest;
use App\Models\Notification;
use App\Models\Vote;
use App\Models\UserFollow;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class ProfileController extends Controller
{
    use PasswordValidationRules;
    use ProfileValidationRules;

    /**
     * Display the user's profile form.
     */
    public function edit(TwoFactorAuthenticationRequest $request): Response
    {
        $user = $request->user();
        $routeName = Route::currentRouteName();

        $props = [
            'user' => $user,
            'status' => session('status'),
            'canManageTwoFactor' => Features::canManageTwoFactorAuthentication(),
        ];

        if (Features::canManageTwoFactorAuthentication()) {
            $request->ensureStateIsValid();

            $props['twoFactorEnabled'] = $user->hasEnabledTwoFactorAuthentication();
            $props['requiresConfirmation'] = Features::optionEnabled(Features::twoFactorAuthentication(), 'confirm');
        }

        // Determine active section from route
        $activeSection = match ($routeName) {
            'app.profile.security' => 'security',
            'app.profile.voted-ideas' => 'voted-ideas',
            'app.profile.followed-ideas' => 'followed-ideas',
            'app.profile.followed-people' => 'followed-people',
            'app.profile.notifications' => 'notifications',
            default => 'personal-info',
        };

        // Fetch activity data based on active section
        if ($activeSection === 'voted-ideas') {
            $props['votedIdeas'] = Vote::where('voter_email', $user->email)
                ->whereNotNull('otp_verified_at')
                ->with('idea.user')
                ->latest()
                ->get()
                ->pluck('idea');
        } elseif ($activeSection === 'followed-ideas') {
            $props['followedIdeas'] = $user->followedIdeas()
                ->with('idea.user')
                ->latest()
                ->get()
                ->pluck('idea');
        } elseif ($activeSection === 'followed-people') {
            $props['followedPeople'] = $user->following()
                ->with('following')
                ->latest()
                ->get()
                ->pluck('following');
        } elseif ($activeSection === 'notifications') {
            $props['notifications'] = $user->customNotifications()
                ->latest()
                ->get();
        }

        return Inertia::render('app/pages/profile', $props);
    }

    /**
     * Mark a notification as read.
     */
    public function markNotificationAsRead(Notification $notification): RedirectResponse
    {
        if ($notification->user_id !== auth()->id()) {
            abort(403);
        }

        $notification->update([
            'is_read' => true,
            'read_at' => now(),
        ]);

        return back();
    }

    /**
     * Toggle follow for a user.
     */
    public function toggleFollow(\App\Models\User $user): RedirectResponse
    {
        $follower = auth()->user();

        if ($follower->id === $user->id) {
            return back();
        }

        $follow = UserFollow::where('follower_id', $follower->id)
            ->where('following_id', $user->id)
            ->first();

        if ($follow) {
            $follow->delete();
        } else {
            UserFollow::create([
                'follower_id' => $follower->id,
                'following_id' => $user->id,
            ]);
        }

        return back();
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => $this->nameRules(),
            'email' => $this->emailRules($user->id),
            'phone' => ['nullable', 'string', 'max:20'],
            'bio' => ['nullable', 'string', 'max:500'],
        ]);

        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return back()->with('status', 'profile-updated');
    }

    /**
     * Update the user's password.
     */
    public function updatePassword(Request $request): RedirectResponse
    {
        $validated = $request->validateWithBag('updatePassword', [
            'current_password' => $this->currentPasswordRules(),
            'password' => $this->passwordRules(),
        ]);

        $request->user()->update([
            'password' => bcrypt($validated['password']),
        ]);

        return back()->with('status', 'password-updated');
    }
}
