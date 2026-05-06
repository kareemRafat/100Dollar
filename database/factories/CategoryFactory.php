<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $nameEn = $this->faker->unique()->words(2, true);

        return [
            'name_en' => ucfirst($nameEn),
            'name_ar' => 'تصنيف '.$this->faker->word(),
            'slug' => Str::slug($nameEn),
            'icon' => 'category',
        ];
    }
}
