<?php

namespace App\Notifications;

use App\Models\Idea;
use App\Notifications\Channels\CustomDbChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class AdminNewIdeaNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Idea $idea) {}

    public function via(object $notifiable): array
    {
        return [CustomDbChannel::class];
    }

    public function toCustomDb(object $notifiable): array
    {
        $translationParams = ['title' => $this->idea->title];

        return [
            'title' => 'فكرة جديدة قيد الانتظار',
            'body' => 'تم تقديم فكرة جديدة بعنوان: '.$this->idea->title,
            'data' => [
                'idea_id' => $this->idea->id,
                'url' => route('admin.ideas.show', $this->idea, false),
                'translation_params' => $translationParams,
            ],
        ];
    }
}
