<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'name_en',
    'name_ar',
    'slug',
    'icon',
])]
class Category extends Model
{
    use HasFactory;

    public function ideas(): HasMany
    {
        return $this->hasMany(Idea::class);
    }
}
