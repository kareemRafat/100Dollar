<?php

namespace Database\Factories;

use App\Models\Idea;
use App\Models\PrizeRecord;
use App\Models\Sponsor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PrizeRecord>
 */
class PrizeRecordFactory extends Factory
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
            'sponsor_id' => Sponsor::factory(),
            'amount' => 100.00,
            'status' => 'pending',
            'delivered_at' => null,
        ];
    }

    public function delivered(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'delivered',
            'delivered_at' => now(),
        ]);
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'delivered_at' => null,
        ]);
    }
}
