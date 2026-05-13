<?php

namespace App\Http\Resources\App;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $title
 * @property string $category
 * @property string $country
 * @property string $city
 * @property string|null $image
 * @property int $votes_count
 * @property int $comments_count
 * @property User $user
 */
class CompactIdeaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'title' => $this->title,
            // Full description and PDF are excluded for payload reduction
            'category' => $this->category?->{'name_'.$locale},
            'category_id' => $this->category_id,
            'category_icon' => $this->category?->icon,
            'country' => $this->country ? $this->country->{'name_'.$locale} : null,
            'country_code' => $this->country?->code,
            'city' => $this->city,
            'image' => $this->image,
            'votes_count' => (int) ($this->votes_count ?? 0),
            'comments_count' => (int) ($this->comments_count ?? 0),
            'user' => new PublicUserResource($this->whenLoaded('user')),
            'user_id' => $this->user_id,
            'status' => $this->is_winner ? 'winner' : $this->status,
            'is_winner' => $this->is_winner,
            'created_at' => $this->created_at->format('d M Y'),
            'date' => $this->created_at->translatedFormat('d F Y'),
            'progress' => $this->is_winner ? 100 : min(100, round((($this->votes_count ?? 0) / 100) * 100)),
            'target_votes' => 100,
            'funded' => $this->is_winner,
        ];
    }
}
