<?php

namespace App\Http\Resources\App;

use App\Models\Category;
use App\Models\Country;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property Category $category
 * @property Country $country
 * @property string $city
 * @property string|null $image
 * @property int $votes_count
 * @property int $comments_count
 * @property User $user
 */
class IdeaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();
        $countryName = $this->country ? $this->country->{'name_'.$locale} : null;
        $votesCount = (int) ($this->votes_count ?? $this->votes()->count());
        $maxVotesCount = (int) $request->attributes->get('idea_max_votes', 100);

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'category' => $this->category?->{'name_'.$locale},
            'category_id' => $this->category_id,
            'category_icon' => $this->category?->icon,
            'country' => $countryName,
            'country_code' => $this->country?->code,
            'city' => $this->city,
            'image' => $this->image,
            'marketing_channel' => $this->marketing_channel,
            'target_audience' => $this->target_audience,
            'implementation_time' => $this->implementation_time,
            'votes_count' => $votesCount,
            'comments_count' => (int) ($this->comments_count ?? $this->comments()->count()),
            'user' => new PublicUserResource($this->whenLoaded('user')),
            'user_id' => $this->user_id,
            'status' => $this->is_winner ? 'winner' : $this->status,
            'rejection_reason' => $this->rejection_reason,
            'is_winner' => $this->is_winner,
            'created_at' => $this->created_at->format('d M Y'),
            'date' => $this->created_at->translatedFormat('d F Y'),
            'progress' => $this->progressFor($votesCount, $maxVotesCount),
            'target_votes' => $maxVotesCount,
            'funded' => $this->is_winner,
        ];
    }

    private function progressFor(int $votesCount, int $maxVotesCount): int
    {
        if ($this->is_winner) {
            return 100;
        }

        if ($maxVotesCount <= 0) {
            return 0;
        }

        return min(100, (int) round(($votesCount / $maxVotesCount) * 100));
    }
}
