<?php

namespace App\Notifications\Channels;

use App\Models\Notification as NotificationModel;
use Illuminate\Notifications\Notification;

class CustomDbChannel
{
    /**
     * Send the given notification.
     *
     * @param  mixed  $notifiable
     * @return void
     */
    public function send($notifiable, Notification $notification)
    {
        if (! method_exists($notification, 'toCustomDb')) {
            return;
        }

        $data = $notification->toCustomDb($notifiable);

        NotificationModel::create([
            'user_id' => $notifiable->id,
            'type' => get_class($notification),
            'title' => $data['title'],
            'body' => $data['body'],
            'data' => $data['data'] ?? [],
            'is_read' => false,
        ]);
    }
}
