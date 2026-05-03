<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'company_name',
    'email',
    'phone',
    'website',
    'message',
    'status',
])]
class SponsorshipRequest extends Model
{
    use HasFactory;
}
