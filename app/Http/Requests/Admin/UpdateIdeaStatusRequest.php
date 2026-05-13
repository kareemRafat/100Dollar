<?php

namespace App\Http\Requests\Admin;

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
            'status' => ['required', 'string', Rule::in(['approved', 'rejected'])],
            'submission_day' => [
                Rule::requiredIf($this->status === 'approved'),
                'nullable',
                'integer',
                'min:0',
                'max:6',
            ],
            'rejection_reason' => [
                Rule::requiredIf($this->status === 'rejected'),
                'nullable',
                'string',
                'min:5',
            ],
        ];
    }
}
