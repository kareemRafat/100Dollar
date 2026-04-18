<?php

namespace Database\Factories;

use App\Models\Idea;
use App\Models\IdeaFollow;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<IdeaFollow>
 */
class IdeaFollowFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'idea_id' => Idea::factory(),
        ];
    }
}
