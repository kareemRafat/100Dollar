<?php

namespace App\Notifications;

use App\Models\ContactMessage;
use App\Notifications\Channels\CustomDbChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class NewContactMessageNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public ContactMessage $contactMessage) {}

    public function via(object $notifiable): array
    {
        return [CustomDbChannel::class];
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
