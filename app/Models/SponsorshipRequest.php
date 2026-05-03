<?php

namespace App\Models;

use App\Concerns\HasMedia;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'company_name',
    'email',
    'phone',
    'website',
    'country',
    'message',
    'status',
])]
class SponsorshipRequest extends Model
{
    use HasFactory, HasMedia;
}
