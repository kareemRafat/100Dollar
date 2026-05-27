<?php

namespace App\Notifications;

use App\Models\SponsorshipRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SponsorshipRequestRejectedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public SponsorshipRequest $sponsorshipRequest,
        public string $reason
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $request = $this->sponsorshipRequest;
        $locale = $this->locale ?? app()->getLocale();

        return (new MailMessage)
            ->subject(__('messages.notifications.sponsorship_rejected_mail_subject', [], $locale))
            ->view(['mail.notification', 'mail.notification-text'], [
                'subject' => __('messages.notifications.sponsorship_rejected_mail_subject', [], $locale),
                'greeting' => __('messages.notifications.sponsorship_rejected_mail_greeting', ['company' => $request->company_name], $locale),
                'mail_locale' => $locale,
                'lines' => [
                    __('messages.notifications.sponsorship_rejected_mail_line1', ['company' => $request->company_name], $locale),
                    __('messages.notifications.sponsorship_rejected_mail_line2', [], $locale),
                ],
                'panelLabel' => __('messages.notifications.sponsorship_rejected_mail_reason_label', [], $locale),
                'panelValue' => $this->reason,
                'panelType' => 'panel-rejected',
            ]);
    }
}
