<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'reply_body',
        'replied_at',
    ];

    protected $appends = [
        'is_replied',
    ];

    protected function casts(): array
    {
        return [
            'replied_at' => 'datetime',
        ];
    }

    public function getIsRepliedAttribute(): bool
    {
        return $this->replied_at !== null;
    }
}
