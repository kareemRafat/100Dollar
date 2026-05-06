<?php

namespace App\Http\Resources\App;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $name
 * @property int $day_of_week
 * @property bool $is_active
 * @property Media|null $media
 */
class SponsorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'day_of_week' => (int) $this->day_of_week,
            'is_active' => (bool) $this->is_active,
            'logo' => $this->logo,
        ];
    }
}
