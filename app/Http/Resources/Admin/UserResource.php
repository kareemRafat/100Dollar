<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'is_active' => (bool) $this->is_active,
            'avatar' => $this->avatar,
            'phone' => $this->phone,
            'country_id' => $this->country_id,
            'country' => [
                'id' => $this->country?->id,
                'name_ar' => $this->country?->name_ar,
            ],
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
