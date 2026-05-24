<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'mediable_id',
        'mediable_type',
        'file_path',
        'mime_type',
        'file_size',
        'collection_name',
        'disk',
    ];

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::deleting(function (Media $media) {
            Storage::disk($media->disk)->delete($media->file_path);
        });
    }

    /**
     * Get the parent mediable model.
     */
    public function mediable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Get the full URL for the media file.
     */
    public function getUrlAttribute(): string
    {
        $url = Storage::disk($this->disk)->url($this->file_path);

        if (Str::startsWith($url, ['http://', 'https://'])) {
            return $url;
        }

        return url($url);
    }
}
