<?php

namespace App\Http\Resources\App;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string $category
 * @property string $country
 * @property string $city
 * @property string|null $image
 * @property int $votes_count
 * @property int $comments_count
 * @property \App\Models\User $user
 */
class IdeaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'category' => $this->category,
            'country' => $this->country,
            'city' => $this->city,
            'image' => $this->image,
            'votes_count' => (int) ($this->votes_count ?? $this->votes()->count()),
            'comments_count' => (int) ($this->comments_count ?? $this->comments()->count()),
            'user' => new UserResource($this->whenLoaded('user')),
            'user_id' => $this->user_id,
        ];
    }
}
