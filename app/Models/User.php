<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name', 'email', 'password', 'role', 'phone', 'country', 'nationality', 'avatar', 'is_active'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

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
            'role' => 'string',
            'is_active' => 'boolean',
            'two_factor_confirmed_at' => 'datetime',
        ];
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
