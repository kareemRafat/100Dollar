<?php

namespace App\Concerns;

use App\Models\Media;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

trait HasMedia
{
    /**
     * Get all of the model's media.
     */
    public function media(): MorphMany
    {
        return $this->morphMany(Media::class, 'mediable');
    }

    /**
     * Get the model's single media (e.g., avatar or cover).
     */
    public function singleMedia(string $collection = 'default'): MorphOne
    {
        return $this->morphOne(Media::class, 'mediable')
            ->where('collection_name', $collection);
    }

    /**
     * Get the full URL for the image media.
     */
    public function getImageUrlAttribute(): ?string
    {
        return $this->media->where('collection_name', 'image')->first()?->url;
    }

    /**
     * Get the full URL for the avatar media.
     */
    public function getAvatarUrlAttribute(): ?string
    {
        return $this->media->where('collection_name', 'avatar')->first()?->url;
    }
}
