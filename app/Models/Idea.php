<?php

namespace App\Models;

use App\Concerns\HasMedia;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'user_id',
    'sponsor_id',
    'category_id',
    'country_id',
    'title',
    'description',
    'city',
    'submission_day',
    'week_number',
    'year',
    'status',
    'votes_count',
    'is_winner',
    'rejection_reason',
    'approved_at',
    'winner_announced_at',
    'marketing_channel',
    'target_audience',
    'implementation_time',
])]
class Idea extends Model
{
    use HasFactory, HasMedia;

    protected $appends = ['date', 'pdf_file', 'image'];

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
            'target_audience' => 'array',
            'marketing_channel' => 'array',
            'country_id' => 'integer',
        ];
    }

    public function getDateAttribute(): ?string
    {
        return $this->created_at?->format('Y-m-d');
    }

    public function getPdfFileAttribute(): ?string
    {
        return $this->media->where('collection_name', 'pdf')->first()?->url;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
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
