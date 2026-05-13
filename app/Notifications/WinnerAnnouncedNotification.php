<?php

namespace App\Notifications;

use App\Models\Idea;
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
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject(__('messages.notifications.winner_announced_mail_subject'))
            ->greeting(__('messages.notifications.winner_announced_mail_greeting', ['name' => $notifiable->name]))
            ->line(__('messages.notifications.winner_announced_mail_line1', ['title' => $this->idea->title]))
            ->line(__('messages.notifications.winner_announced_mail_line2'))
            ->action(__('messages.notifications.winner_announced_mail_action'), url('/ideas/'.$this->idea->id))
            ->line(__('messages.notifications.winner_announced_mail_line3'))
            ->line(__('messages.notifications.winner_announced_mail_line4'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'idea_id' => $this->idea->id,
            'title' => $this->idea->title,
            'amount' => 100.00,
        ];
    }
}
