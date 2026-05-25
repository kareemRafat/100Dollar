<?php

namespace App\Http\Requests\Admin;

use App\Enums\IdeaStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateIdeaStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => ['required', Rule::enum(IdeaStatus::class)],
            'submission_day' => [
                'required_if:status,'.IdeaStatus::APPROVED->value,
                'integer',
                'min:0',
                'max:6',
            ],
            'rejection_reason' => [
                Rule::requiredIf($this->status === IdeaStatus::REJECTED->value),
                'nullable',
                'string',
                'min:5',
            ],
        ];
    }
}
