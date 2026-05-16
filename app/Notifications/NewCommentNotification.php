<?php

namespace App\Notifications;

use App\Models\Comment;
use App\Notifications\Channels\CustomDbChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class NewCommentNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Comment $comment) {}

    public function via(object $notifiable): array
    {
        return [CustomDbChannel::class];
    }

    public function toCustomDb(object $notifiable): array
    {
        return [
            'title' => __('messages.notifications.new_comment_title'),
            'body' => __('messages.notifications.new_comment_body', [
                'user' => $this->comment->user->name,
                'title' => $this->comment->idea->title,
            ]),
            'data' => [
                'idea_id' => $this->comment->idea_id,
                'comment_id' => $this->comment->id,
            ],
        ];
    }
}
