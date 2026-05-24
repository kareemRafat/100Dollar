<?php

namespace App\Notifications;

use App\Models\Comment;
use App\Notifications\Channels\CustomDbChannel;
use App\Notifications\Concerns\BuildsNotificationUrls;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewCommentNotification extends Notification implements ShouldQueue
{
    use BuildsNotificationUrls, Queueable;

    public function __construct(
        public Comment $comment,
        public bool $sendMail = false
    ) {}

    public function via(object $notifiable): array
    {
        $channels = [CustomDbChannel::class];

        if ($this->sendMail) {
            $channels[] = 'mail';
        }

        return $channels;
    }

    public function toMail(object $notifiable): MailMessage
    {
        $locale = $notifiable->preferredLocale();

        return (new MailMessage)
            ->subject(__('messages.notifications.new_comment_mail_subject', [], $locale))
            ->view(['mail.notification', 'mail.notification-text'], [
                'subject' => __('messages.notifications.new_comment_mail_subject', [], $locale),
                'greeting' => __('messages.notifications.new_comment_mail_greeting', ['name' => $notifiable->name], $locale),
                'lines' => [
                    __('messages.notifications.new_comment_mail_line1', [
                        'user' => $this->comment->user->name,
                        'title' => $this->comment->idea->title,
                    ], $locale),
                ],
                'panelValue' => $this->comment->body,
                'actionText' => __('messages.notifications.new_comment_mail_action', [], $locale),
                'actionUrl' => route('app.ideas.show', $this->comment->idea),
                'mail_locale' => $locale,
                'salutation' => __('messages.notifications.regards', [], $locale) . "\n" . config('app.name'),
            ]);
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
