<?php

namespace App\Http\Requests\App;

use App\Enums\IdeaStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IdeaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $idea = $this->route('idea');

        // For update, ensure the user owns the idea and it's in a valid state
        if ($this->isMethod('patch') || ($this->isMethod('post') && $idea)) {
            // If route model binding didn't happen for some reason (e.g. in tests)
            if ($idea && ! $idea instanceof \App\Models\Idea) {
                $idea = \App\Models\Idea::find($idea);
            }

            return $idea && $idea->user_id === auth()->id() && 
                   in_array($idea->status, [IdeaStatus::PENDING, IdeaStatus::REJECTED]);
        }

        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $isUpdate = $this->isMethod('patch') || ($this->isMethod('post') && $this->route('idea'));

        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'category_id' => ['required', 'exists:categories,id'],
            'country_id' => ['required', 'exists:countries,id'],
            'city' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:2048'], // 2MB
            'pdf_file' => ['nullable', 'file', 'mimes:pdf', 'max:5120'], // 5MB
            
            // Terms are only required for the store action
            'agreed_terms' => [Rule::requiredIf(! $isUpdate), 'accepted'],
            'agreed_privacy' => [Rule::requiredIf(! $isUpdate), 'accepted'],
            'agreed_legal' => [Rule::requiredIf(! $isUpdate), 'accepted'],
            
            'marketing_channel' => ['required', 'array', 'min:1'],
            'marketing_channel.*' => ['string', 'in:social_media,word_of_mouth,physical,whatsapp,other'],
            'target_audience' => ['required', 'array', 'min:1'],
            'target_audience.*' => ['string'],
            'implementation_time' => ['required', 'string'],
        ];
    }
}
