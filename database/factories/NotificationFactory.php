<?php

namespace Database\Factories;

use App\Models\Idea;
use App\Models\Notification;
use App\Models\User;
use App\Notifications\IdeaApprovedNotification;
use App\Notifications\IdeaRejectedNotification;
use App\Notifications\NewCommentNotification;
use App\Notifications\NewFollowerNotification;
use App\Notifications\WinnerAnnouncedNotification;
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
        $shortType = fake()->randomElement([
            'idea_approved',
            'idea_rejected',
            'new_comment',
            'new_follower',
            'idea_won',
        ]);

        $typeMap = [
            'idea_approved' => IdeaApprovedNotification::class,
            'idea_rejected' => IdeaRejectedNotification::class,
            'new_comment' => NewCommentNotification::class,
            'new_follower' => NewFollowerNotification::class,
            'idea_won' => WinnerAnnouncedNotification::class,
        ];

        $idea = Idea::inRandomOrder()->first();
        $ideaId = $idea?->id ?? 1;
        $ideaTitle = $idea?->title ?? 'فكرة رائعة';

        $follower = User::inRandomOrder()->first();
        $followerId = $follower?->id ?? 1;
        $followerName = $follower?->name ?? 'مستخدم';

        [$title, $body, $data] = match ($shortType) {
            'idea_approved' => [
                'تمت الموافقة على فكرتك',
                "تمت الموافقة على فكرتك \"{$ideaTitle}\" وهي الآن متاحة للتصويت.",
                [
                    'idea_id' => $ideaId,
                    'url' => "/ideas/{$ideaId}",
                    'title_key' => 'messages.notifications.idea_approved_title',
                    'body_key' => 'messages.notifications.idea_approved_body',
                    'translation_params' => ['title' => $ideaTitle],
                ],
            ],
            'idea_rejected' => [
                'تم رفض فكرتك',
                "للأسف تم رفض فكرتك \"{$ideaTitle}\".",
                [
                    'idea_id' => $ideaId,
                    'reason' => fake()->randomElement([
                        'المحتوى لا يطابق شروط المنصة.',
                        'الفكرة مكررة أو مشابهة لفكرة موجودة.',
                        'الميزانية تتجاوز الحد المسموح به.',
                    ]),
                    'url' => "/ideas/{$ideaId}",
                    'title_key' => 'messages.notifications.idea_rejected_title',
                    'body_key' => 'messages.notifications.idea_rejected_body',
                    'translation_params' => ['title' => $ideaTitle],
                ],
            ],
            'new_comment' => [
                'تعليق جديد على فكرتك',
                "علّق {$followerName} على فكرتك \"{$ideaTitle}\".",
                [
                    'idea_id' => $ideaId,
                    'comment_id' => fake()->numberBetween(1, 9999),
                    'url' => "/ideas/{$ideaId}",
                    'title_key' => 'messages.notifications.new_comment_title',
                    'body_key' => 'messages.notifications.new_comment_body',
                    'translation_params' => ['user' => $followerName, 'title' => $ideaTitle],
                ],
            ],
            'new_follower' => [
                'متابع جديد',
                "بدأ {$followerName} في متابعتك.",
                [
                    'follower_id' => $followerId,
                    'url' => '/profile/notifications',
                    'title_key' => 'messages.notifications.new_follower_title',
                    'body_key' => 'messages.notifications.new_follower_body',
                    'translation_params' => ['user' => $followerName],
                ],
            ],
            'idea_won' => [
                'تهانينا! فكرتك فازت بجائزة اليوم',
                "فازت فكرتك \"{$ideaTitle}\" بجائزة اليوم البالغة 100 دولار!",
                [
                    'idea_id' => $ideaId,
                    'amount' => 100.00,
                    'url' => "/ideas/{$ideaId}",
                    'title_key' => 'messages.notifications.winner_announced_title',
                    'body_key' => 'messages.notifications.winner_announced_body',
                    'translation_params' => ['title' => $ideaTitle],
                ],
            ],
        };

        return [
            'user_id' => User::factory(),
            'type' => $typeMap[$shortType],
            'title' => $title,
            'body' => $body,
            'data' => $data,
            'is_read' => fake()->boolean(30),
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
