<?php

namespace App\Notifications;

use App\Models\Idea;
use App\Notifications\Channels\CustomDbChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WinnerAnnouncedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Idea $idea) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return [CustomDbChannel::class, 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject(__('messages.notifications.winner_announced_mail_subject'))
            ->view(['mail.notification', 'mail.notification-text'], [
                'subject' => __('messages.notifications.winner_announced_mail_subject'),
                'greeting' => __('messages.notifications.winner_announced_mail_greeting', ['name' => $notifiable->name]),
                'lines' => [
                    __('messages.notifications.winner_announced_mail_line1', ['title' => $this->idea->title]),
                    __('messages.notifications.winner_announced_mail_line2'),
                    __('messages.notifications.winner_announced_mail_line3'),
                    __('messages.notifications.winner_announced_mail_line4'),
                ],
                'actionText' => __('messages.notifications.winner_announced_mail_action'),
                'actionUrl' => route('app.ideas.show', $this->idea),
            ]);
    }

    public function toCustomDb(object $notifiable): array
    {
        return [
            'title' => __('messages.notifications.winner_announced_title'),
            'body' => __('messages.notifications.winner_announced_body', ['title' => $this->idea->title]),
            'data' => [
                'idea_id' => $this->idea->id,
                'amount' => 100.00,
            ],
        ];
    }
}
