<?php

namespace App\Models;

use App\Concerns\HasMedia;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'name',
    'day_of_week',
    'contract_start',
    'contract_end',
    'is_active',
])]
class Sponsor extends Model
{
    use HasFactory, HasMedia;

    protected function casts(): array
    {
        return [
            'day_of_week' => 'integer',
            'contract_start' => 'date',
            'contract_end' => 'date',
            'is_active' => 'boolean',
        ];
    }

    public function ideas(): HasMany
    {
        return $this->hasMany(Idea::class);
    }

    public function prizeRecords(): HasMany
    {
        return $this->hasMany(PrizeRecord::class);
    }
}
