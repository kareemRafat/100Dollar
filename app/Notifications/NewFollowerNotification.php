<?php

namespace App\Notifications;

use App\Models\User;
use App\Notifications\Channels\CustomDbChannel;
use App\Notifications\Concerns\BuildsNotificationUrls;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class NewFollowerNotification extends Notification implements ShouldQueue
{
    use BuildsNotificationUrls, Queueable;

    public function __construct(public User $follower) {}

    public function via(object $notifiable): array
    {
        return [CustomDbChannel::class];
    }

    public function toCustomDb(object $notifiable): array
    {
        $translationParams = [
            'user' => $this->follower->name,
        ];

        return [
            'title' => __('messages.notifications.new_follower_title'),
            'body' => __('messages.notifications.new_follower_body', $translationParams),
            'data' => [
                'follower_id' => $this->follower->id,
                'url' => $this->localizedUrl($notifiable, 'app.profile.notifications'),
                'title_key' => 'messages.notifications.new_follower_title',
                'body_key' => 'messages.notifications.new_follower_body',
                'translation_params' => $translationParams,
            ],
        ];
    }
}
