<?php

namespace App\Notifications;

use App\Models\Idea;
use App\Notifications\Channels\CustomDbChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class IdeaRejectedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Idea $idea,
        public string $reason
    ) {}

    public function via(object $notifiable): array
    {
        return [CustomDbChannel::class, 'mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject(__('messages.notifications.idea_rejected_mail_subject', ['title' => $this->idea->title]))
            ->view(['mail.notification', 'mail.notification-text'], [
                'subject' => __('messages.notifications.idea_rejected_mail_subject', ['title' => $this->idea->title]),
                'greeting' => __('messages.notifications.idea_rejected_mail_greeting', ['name' => $notifiable->name]),
                'lines' => [
                    __('messages.notifications.idea_rejected_mail_line1', ['title' => $this->idea->title]),
                    $this->reason,
                    __('messages.notifications.idea_rejected_mail_line2'),
                    __('messages.notifications.idea_rejected_mail_line3'),
                ],
                'actionText' => __('messages.notifications.idea_rejected_mail_action'),
                'actionUrl' => route('app.ideas.show', $this->idea),
            ]);
    }

    public function toCustomDb(object $notifiable): array
    {
        return [
            'title' => __('messages.notifications.idea_rejected_title'),
            'body' => __('messages.notifications.idea_rejected_body', ['title' => $this->idea->title]),
            'data' => [
                'idea_id' => $this->idea->id,
                'reason' => $this->reason,
            ],
        ];
    }
}
