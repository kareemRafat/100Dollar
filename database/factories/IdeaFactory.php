<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Idea;
use App\Models\Sponsor;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Idea>
 */
class IdeaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $countries = ['الأردن', 'السعودية', 'مصر', 'الإمارات', 'الكويت'];

        $titles = [
            'مشروع إعادة تدوير البلاستيك المنزلي',
            'تطبيق لتوصيل الطلبات للمناطق الريفية',
            'منصة لتعليم الحرف اليدوية للأطفال',
            'عربة طعام متنقلة للوجبات الصحية',
            'نظام ذكي لترشيد استهلاك المياه في الحديقة',
            'مشروع إنتاج صابون طبيعي من زيت الزيتون',
            'تطبيق لتبادل الكتب المستعملة',
        ];

        return [
            'user_id' => User::factory(),
            'sponsor_id' => null,
            'category_id' => Category::inRandomOrder()->first()?->id ?? Category::factory(),
            'title' => fake()->randomElement($titles),
            'description' => fake()->paragraph(5),
            'country' => fake()->randomElement($countries),
            'city' => fake()->city(),
            'submission_day' => fake()->numberBetween(0, 6),
            'week_number' => now()->weekOfYear,
            'year' => now()->year,
            'marketing_channel' => fake()->randomElements(['social_media', 'word_of_mouth', 'physical', 'whatsapp', 'other'], fake()->numberBetween(1, 3)),
            'target_audience' => fake()->randomElements(['youth', 'students', 'entrepreneurs', 'housewives', 'professionals', 'small_business_owners', 'children', 'elderly'], fake()->numberBetween(1, 3)),
            'implementation_time' => fake()->randomElement(['less_than_week', 'one_two_weeks', 'month', 'more_than_month']),
            'status' => 'pending',
            'votes_count' => 0,
            'is_winner' => false,
            'rejection_reason' => null,
            'approved_at' => null,
            'winner_announced_at' => null,
        ];
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }

    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'approved_at' => now(),
        ]);
    }

    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'rejected',
            'rejection_reason' => 'المحتوى لا يطابق شروط المنصة.',
        ]);
    }

    public function winner(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'is_winner' => true,
            'winner_announced_at' => now(),
        ]);
    }

    public function withSponsor(Sponsor $sponsor): static
    {
        return $this->state(fn (array $attributes) => [
            'sponsor_id' => $sponsor->id,
        ]);
    }
}
