<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreSponsorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'day_of_week' => ['required', 'integer', 'min:0', 'max:6', 'unique:sponsors,day_of_week'],
            'contract_start' => ['required', 'date'],
            'contract_end' => ['required', 'date', 'after_or_equal:contract_start'],
            'is_active' => ['boolean'],
            'logo' => ['required', 'image', 'max:2048'],
        ];
    }
}
