<?php

namespace App\Http\Requests\Admin;

use App\Enums\SponsorshipStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSponsorshipRequestStatusRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => ['required', Rule::enum(SponsorshipStatus::class)],
            'rejection_reason' => [
                Rule::requiredIf($this->status === SponsorshipStatus::REJECTED->value),
                'nullable',
                'string',
                'min:5',
                'max:1000',
            ],
        ];
    }
}
