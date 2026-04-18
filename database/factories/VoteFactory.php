<?php

namespace Database\Factories;

use App\Models\Idea;
use App\Models\Vote;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Vote>
 */
class VoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'idea_id' => Idea::factory(),
            'voter_email' => fake()->unique()->safeEmail(),
            'otp' => fake()->numerify('######'),
            'otp_expires_at' => now()->addMinutes(10),
            'otp_verified_at' => now(),
            'ip_address' => fake()->ipv4(),
        ];
    }
}
