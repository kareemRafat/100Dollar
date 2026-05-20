<?php

namespace App\Notifications;

use App\Models\Idea;
use App\Notifications\Channels\CustomDbChannel;
use App\Notifications\Concerns\BuildsNotificationUrls;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class IdeaRejectedNotification extends Notification implements ShouldQueue
{
    use BuildsNotificationUrls, Queueable;

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
            ->subject(__('messages.notifications.idea_rejected_mail_subject'))
            ->view(['mail.notification', 'mail.notification-text'], [
                'subject' => __('messages.notifications.idea_rejected_mail_subject'),
                'greeting' => __('messages.notifications.idea_rejected_mail_greeting', ['name' => $notifiable->name]),
                'lines' => [
                    __('messages.notifications.idea_rejected_mail_line1', ['title' => $this->idea->title]),
                    __('messages.notifications.idea_rejected_mail_line2'),
                ],
                'panelLabel' => __('messages.notifications.idea_rejected_mail_reason_label'),
                'panelValue' => $this->reason,
                'panelType' => 'panel-rejected',
                'actionText' => __('messages.notifications.idea_rejected_mail_action'),
                'actionUrl' => route('app.ideas.show', $this->idea),
            ]);
    }

    public function toCustomDb(object $notifiable): array
    {
        $translationParams = ['title' => $this->idea->title];

        return [
            'title' => __('messages.notifications.idea_rejected_title'),
            'body' => __('messages.notifications.idea_rejected_body', $translationParams),
            'data' => [
                'idea_id' => $this->idea->id,
                'reason' => $this->reason,
                'url' => $this->localizedUrl($notifiable, 'app.ideas.show', [$this->idea]),
                'title_key' => 'messages.notifications.idea_rejected_title',
                'body_key' => 'messages.notifications.idea_rejected_body',
                'translation_params' => $translationParams,
            ],
        ];
    }
}
