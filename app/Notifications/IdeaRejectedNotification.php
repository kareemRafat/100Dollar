<?php

namespace App\Notifications;

use App\Models\Idea;
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
        return ['database', 'mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('بخصوص فكرتك: '.$this->idea->title)
            ->greeting('مرحباً '.$notifiable->name)
            ->line('نعتذر منك، لقد تم رفض فكرتك "'.$this->idea->title.'" للأسباب التالية:')
            ->line($this->reason)
            ->line('يمكنك تعديل الفكرة وإعادة إرسالها أو إرسال فكرة جديدة.')
            ->action('عرض الفكرة', url('/ideas/'.$this->idea->id))
            ->line('شكراً لاستخدامك منصتنا!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'idea_id' => $this->idea->id,
            'idea_title' => $this->idea->title,
            'reason' => $this->reason,
            'message' => 'تم رفض فكرتك: '.$this->idea->title,
        ];
    }
}
