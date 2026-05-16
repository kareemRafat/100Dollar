<?php

namespace App\Notifications;

use App\Models\Idea;
use App\Notifications\Channels\CustomDbChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class IdeaApprovedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Idea $idea,
        public bool $onlyDb = false
    ) {}

    public function via(object $notifiable): array
    {
        $channels = [CustomDbChannel::class];

        if (! $this->onlyDb) {
            $channels[] = 'mail';
        }

        return $channels;
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject(__('messages.notifications.idea_approved_mail_subject'))
            ->greeting(__('messages.notifications.idea_approved_mail_greeting', ['name' => $notifiable->name]))
            ->line(__('messages.notifications.idea_approved_mail_line1', ['title' => $this->idea->title]))
            ->action(__('messages.notifications.idea_approved_mail_action'), url('/ideas/'.$this->idea->id))
            ->line(__('messages.notifications.idea_approved_mail_line2'));
    }

    public function toCustomDb(object $notifiable): array
    {
        return [
            'title' => __('messages.notifications.idea_approved_title'),
            'body' => __('messages.notifications.idea_approved_body', ['title' => $this->idea->title]),
            'data' => [
                'idea_id' => $this->idea->id,
            ],
        ];
    }
}
