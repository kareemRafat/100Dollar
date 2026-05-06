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
    public function getImageAttribute(): ?string
    {
        return $this->media->where('collection_name', 'image')->first()?->url;
    }

    /**
     * Get the full URL for the avatar media.
     */
    public function getAvatarAttribute(): ?string
    {
        return $this->media->where('collection_name', 'avatar')->first()?->url
            ?? 'https://ui-avatars.com/api/?name='.urlencode($this->name ?? 'User').'&color=7F9CF5&background=EBF4FF';
    }

    /**
     * Get the full URL for the logo media (specifically for sponsors/requests).
     */
    public function getLogoAttribute(): ?string
    {
        return $this->media->where('collection_name', 'logo')->first()?->url
            ?? 'https://ui-avatars.com/api/?name='.urlencode($this->name ?? $this->company_name ?? 'Sponsor').'&size=256&background=random';
    }
}
