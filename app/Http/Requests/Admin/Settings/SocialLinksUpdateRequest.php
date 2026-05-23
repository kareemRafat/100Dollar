<?php

namespace App\Http\Requests\Admin\Settings;

use App\Enums\UserRole;
use Illuminate\Foundation\Http\FormRequest;

class SocialLinksUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->role === UserRole::ADMIN;
    }

    public function rules(): array
    {
        return [
            'social_whatsapp' => ['nullable', 'url'],
            'social_x' => ['nullable', 'url'],
            'social_facebook' => ['nullable', 'url'],
            'social_instagram' => ['nullable', 'url'],
        ];
    }
}
