<?php

namespace Database\Factories;

use App\Models\Idea;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['idea_approved', 'idea_rejected', 'new_comment', 'new_follower', 'idea_won'];
        $type = fake()->randomElement($types);

        $titles = [
            'idea_approved' => 'تمت الموافقة على فكرتك',
            'idea_rejected' => 'تم رفض فكرتك',
            'new_comment' => 'تعليق جديد على فكرتك',
            'new_follower' => 'متابع جديد لك',
            'idea_won' => 'تهانينا! فكرتك فازت بجائزة اليوم',
        ];

        $data = [];
        if ($type !== 'new_follower') {
            $data['idea_id'] = Idea::inRandomOrder()->first()?->id ?? 1;
        } else {
            $data['follower_id'] = User::inRandomOrder()->first()?->id ?? 1;
        }

        return [
            'user_id' => User::factory(),
            'type' => $type,
            'title' => $titles[$type],
            'body' => fake()->sentence(),
            'data' => $data,
            'is_read' => false,
            'read_at' => null,
            'is_email_sent' => fake()->boolean(),
        ];
    }

    public function read(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_read' => true,
            'read_at' => now(),
        ]);
    }

    public function unread(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_read' => false,
            'read_at' => null,
        ]);
    }
}
