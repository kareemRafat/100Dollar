<?php

namespace App\Notifications;

use App\Models\Comment;
use App\Notifications\Channels\CustomDbChannel;
use App\Notifications\Concerns\BuildsNotificationUrls;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class NewCommentNotification extends Notification implements ShouldQueue
{
    use BuildsNotificationUrls, Queueable;

    public function __construct(public Comment $comment) {}

    public function via(object $notifiable): array
    {
        return [CustomDbChannel::class];
    }

    public function toCustomDb(object $notifiable): array
    {
        $translationParams = [
            'user' => $this->comment->user->name,
            'title' => $this->comment->idea->title,
        ];

        return [
            'title' => __('messages.notifications.new_comment_title'),
            'body' => __('messages.notifications.new_comment_body', $translationParams),
            'data' => [
                'idea_id' => $this->comment->idea_id,
                'comment_id' => $this->comment->id,
                'url' => $this->localizedUrl($notifiable, 'app.ideas.show', [$this->comment->idea]),
                'title_key' => 'messages.notifications.new_comment_title',
                'body_key' => 'messages.notifications.new_comment_body',
                'translation_params' => $translationParams,
            ],
        ];
    }
}
