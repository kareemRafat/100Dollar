<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'user_id',
    'sponsor_id',
    'title',
    'description',
    'category',
    'country',
    'city',
    'image',
    'pdf_file',
    'submission_day',
    'week_number',
    'year',
    'status',
    'votes_count',
    'is_winner',
    'rejection_reason',
    'approved_at',
    'winner_announced_at',
])]
class Idea extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'submission_day' => 'integer',
            'week_number' => 'integer',
            'year' => 'integer',
            'votes_count' => 'integer',
            'is_winner' => 'boolean',
            'approved_at' => 'datetime',
            'winner_announced_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sponsor(): BelongsTo
    {
        return $this->belongsTo(Sponsor::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function follows(): HasMany
    {
        return $this->hasMany(IdeaFollow::class);
    }

    public function prizeRecords(): HasMany
    {
        return $this->hasMany(PrizeRecord::class);
    }
}
