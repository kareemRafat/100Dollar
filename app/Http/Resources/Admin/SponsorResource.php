<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SponsorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'website_url' => $this->website_url,
            'day_of_week' => $this->day_of_week,
            'is_active' => (bool) $this->is_active,
            'logo' => $this->logo,
            'contract_start' => $this->contract_start?->toIso8601String(),
            'contract_end' => $this->contract_end?->toIso8601String(),
            'ideas_count' => $this->ideas_count,
            'prize_records_count' => $this->prize_records_count,
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
