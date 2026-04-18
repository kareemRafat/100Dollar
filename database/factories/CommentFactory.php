<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Idea;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $arabicComments = [
            'فكرة رائعة ومميزة، بالتوفيق!',
            'أتمنى لو يتم إضافة جانب تقني أكثر لهذا المشروع.',
            'هل فكرت في كيفية تسويق هذه الخدمة؟',
            'مشروع واقعي جداً ويحتاجه السوق حالياً.',
            'أتفق معك في هذا الطرح، فكرة مبدعة.',
        ];

        return [
            'user_id' => User::factory(),
            'idea_id' => Idea::factory(),
            'body' => fake()->randomElement($arabicComments),
            'likes_count' => fake()->numberBetween(0, 50),
        ];
    }
}
