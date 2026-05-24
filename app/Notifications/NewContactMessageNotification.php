<?php

namespace App\Notifications;

use App\Models\ContactMessage;
use App\Notifications\Channels\CustomDbChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewContactMessageNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public ContactMessage $contactMessage) {}

    public function via(object $notifiable): array
    {
        return [CustomDbChannel::class, 'mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $locale = $this->contactMessage->locale ?? 'ar';

        return (new MailMessage)
            ->subject(__('messages.notifications.new_contact_message_subject', [], $locale))
            ->view(['mail.notification', 'mail.notification-text'], [
                'subject' => __('messages.notifications.new_contact_message_subject', [], $locale),
                'greeting' => __('messages.notifications.new_contact_message_greeting', [], $locale),
                'lines' => [
                    __('messages.notifications.new_contact_message_line1', ['name' => $this->contactMessage->name], $locale),
                    $this->contactMessage->message,
                ],
                'actionText' => __('messages.notifications.new_contact_message_action', [], $locale),
                'actionUrl' => route('admin.contacts.show', $this->contactMessage),
                'mail_locale' => $locale,
                'salutation' => __('messages.notifications.regards', [], $locale) . "\n" . config('app.name'),
            ]);
    }

    public function toCustomDb(object $notifiable): array
    {
        return [
            'title' => 'رسالة تواصل جديدة',
            'body' => 'تم استلام رسالة جديدة من '.$this->contactMessage->name,
            'data' => [
                'contact_message_id' => $this->contactMessage->id,
                'url' => route('admin.contacts.show', $this->contactMessage, false),
            ],
        ];
    }
}
