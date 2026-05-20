<?php

namespace App\Http\Controllers\App;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\TwoFactorAuthenticationRequest;
use App\Http\Resources\App\UserResource;
use App\Models\User;
use App\Models\UserFollow;
use App\Models\Vote;
use App\Notifications\NewFollowerNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class ProfileController extends Controller
{
    use PasswordValidationRules;
    use ProfileValidationRules;

    /**
     * Display the user's profile form.
     */
    public function edit(TwoFactorAuthenticationRequest $request): Response
    {
        JsonResource::withoutWrapping();

        $user = $request->user()->load('media');
        $routeName = Route::currentRouteName();

        $props = [
            'user' => new UserResource($user),
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

        // Fetch activity data based on active section with pagination and deferring
        if ($activeSection === 'voted-ideas') {
            $query = Vote::where('voter_email', $user->email)
                ->whereNotNull('otp_verified_at')
                ->whereHas('idea')
                ->with(['idea.user', 'idea.category', 'idea.country'])
                ->latest();

            $props['votedIdeas'] = $request->inertia()
                ? $query->paginate(10)->through(function ($vote) {
                    $vote->idea->user?->setAppends([]);

                    return $vote->idea->setAppends(['date']);
                })
                : Inertia::defer(fn () => $query->paginate(10)->through(function ($vote) {
                    $vote->idea->user?->setAppends([]);

                    return $vote->idea->setAppends(['date']);
                }));
        } elseif ($activeSection === 'followed-ideas') {
            $query = $user->followedIdeas()
                ->whereHas('idea')
                ->with(['idea.user', 'idea.category', 'idea.country'])
                ->latest();

            $props['followedIdeas'] = $request->inertia()
                ? $query->paginate(10)->through(function ($follow) {
                    $follow->idea->user?->setAppends([]);

                    return $follow->idea->setAppends(['date']);
                })
                : Inertia::defer(fn () => $query->paginate(10)->through(function ($follow) {
                    $follow->idea->user?->setAppends([]);

                    return $follow->idea->setAppends(['date']);
                }));
        } elseif ($activeSection === 'followed-people') {
            $query = $user->following()
                ->whereHas('following')
                ->with('following')
                ->latest();

            $props['followedPeople'] = $request->inertia()
                ? $query->paginate(10)->through(fn ($follow) => $follow->following->setAppends([]))
                : Inertia::defer(fn () => $query->paginate(10)->through(fn ($follow) => $follow->following->setAppends([])));
        }

        return Inertia::render('app/pages/profile', $props);
    }

    /**
     * Toggle follow for a user.
     */
    public function toggleFollow(User $user): RedirectResponse
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

            $user->notify((new NewFollowerNotification($follower))->locale($user->preferredLocale()));
        }

        return back();
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): \Symfony\Component\HttpFoundation\Response
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => $this->nameRules(),
            'email' => $this->emailRules($user->id),
            'phone' => ['nullable', 'string', 'max:20'],
            'bio' => ['nullable', 'string', 'max:500'],
            'avatar' => ['nullable', 'image', 'max:2048'], // 2MB
            'locale' => ['required', 'string', 'in:ar,en'],
        ]);

        $user->fill([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'bio' => $validated['bio'],
            'locale' => $validated['locale'],
        ]);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $oldLocale = $user->getOriginal('locale');
        $user->save();

        if ($request->hasFile('avatar')) {
            // Delete old avatar if exists
            $user->media()->where('collection_name', 'avatar')->delete();

            $path = $request->file('avatar')->store('avatars', 'public');

            $user->media()->create([
                'file_path' => $path,
                'mime_type' => $request->file('avatar')->getMimeType(),
                'file_size' => $request->file('avatar')->getSize(),
                'collection_name' => 'avatar',
                'disk' => 'public',
            ]);
        }

        if ($oldLocale !== $user->locale) {
            $url = LaravelLocalization::getLocalizedURL($user->locale, route('app.profile'));

            return Inertia::location($url);
        }

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
