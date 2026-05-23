<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactMessageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'subject' => $this->subject,
            'message' => $this->message,
            'reply_body' => $this->reply_body,
            'replied_at' => $this->replied_at,
            'is_replied' => $this->is_replied,
            'created_at' => $this->created_at,
        ];
    }
}
