<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'idea_id',
    'voter_email',
    'otp',
    'otp_expires_at',
    'otp_verified_at',
    'ip_address',
])]
class Vote extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'otp_expires_at' => 'datetime',
            'otp_verified_at' => 'datetime',
        ];
    }

    public function idea(): BelongsTo
    {
        return $this->belongsTo(Idea::class);
    }
}
