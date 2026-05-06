<?php

namespace App\Http\Resources\App;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $user_id
 * @property string $body
 * @property int $likes_count
 * @property Carbon $created_at
 * @property User $user
 */
class CommentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'body' => $this->body,
            'likes_count' => $this->whenCounted('likes', $this->likes_count),
            'is_liked' => (bool) ($this->is_liked ?? false),
            'created_at' => $this->created_at,
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
