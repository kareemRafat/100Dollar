<?php

namespace Database\Factories;

use App\Models\Sponsor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Sponsor>
 */
class SponsorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $sponsorNames = [
            'شركة الرواد للاستثمار',
            'مؤسسة التنمية العربية',
            'بنك الأفكار',
            'صندوق تمويل المشاريع',
            'هيئة دعم الابتكار',
            'مجموعة التقدم الصناعي',
            'شركة النهضة للحلول الرقمية',
        ];

        return [
            'name' => fake()->randomElement($sponsorNames),
            'day_of_week' => fake()->unique()->numberBetween(0, 6),
            'contract_start' => now()->startOfYear(),
            'contract_end' => now()->endOfYear(),
            'is_active' => true,
        ];
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}
