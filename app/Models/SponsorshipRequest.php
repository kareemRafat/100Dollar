<?php

namespace App\Models;

use App\Concerns\HasMedia;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'company_name',
    'email',
    'phone',
    'website',
    'country_id',
    'message',
    'status',
])]
class SponsorshipRequest extends Model
{
    use HasFactory, HasMedia;

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = ['logo'];

    protected function casts(): array
    {
        return [
            'country_id' => 'integer',
            'status' => \App\Enums\SponsorshipStatus::class,
        ];
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }
}
