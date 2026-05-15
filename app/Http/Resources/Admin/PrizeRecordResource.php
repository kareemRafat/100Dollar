<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrizeRecordResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'amount' => $this->amount,
            'status' => $this->status,
            'delivered_at' => $this->delivered_at?->toIso8601String(),
            'created_at' => $this->created_at->toIso8601String(),
            'sponsor' => [
                'id' => $this->sponsor?->id,
                'name' => $this->sponsor?->name,
            ],
            'idea' => [
                'id' => $this->idea?->id,
                'title' => $this->idea?->title,
                'user' => [
                    'id' => $this->idea?->user?->id,
                    'name' => $this->idea?->user?->name,
                ],
            ],
        ];
    }
}
