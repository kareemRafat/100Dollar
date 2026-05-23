<?php

namespace App\Models;

use App\Concerns\HasMedia;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Translation\HasLocalePreference;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

#[Fillable(['name', 'email', 'password', 'role', 'phone', 'country_id', 'nationality', 'is_active', 'bio', 'locale'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable implements HasLocalePreference, MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, HasMedia, Notifiable, TwoFactorAuthenticatable;

    /**
     * Get the recipient's preferred locale for notifications.
     */
    public function preferredLocale(): string
    {
        return $this->locale ?: config('app.locale');
    }

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = ['avatar'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => \App\Enums\UserRole::class,
            'is_active' => 'boolean',
            'two_factor_confirmed_at' => 'datetime',
            'country_id' => 'integer',
        ];
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function ideas(): HasMany
    {
        return $this->hasMany(Idea::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function commentLikes(): HasMany
    {
        return $this->hasMany(CommentLike::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class, 'voter_email', 'email');
    }

    public function followers(): HasMany
    {
        return $this->hasMany(UserFollow::class, 'following_id');
    }

    public function following(): HasMany
    {
        return $this->hasMany(UserFollow::class, 'follower_id');
    }

    public function followedIdeas(): HasMany
    {
        return $this->hasMany(IdeaFollow::class);
    }

    public function customNotifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }
}
