<?php

namespace App\Notifications;

use App\Models\SponsorshipRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SponsorshipRequestApprovedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public SponsorshipRequest $sponsorshipRequest
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $request = $this->sponsorshipRequest;
        $locale = $this->locale ?? app()->getLocale();

        app()->setLocale($locale);
        $contactUrl = route('app.contact');

        return (new MailMessage)
            ->subject(__('messages.notifications.sponsorship_approved_mail_subject', [], $locale))
            ->view(['mail.notification', 'mail.notification-text'], [
                'subject' => __('messages.notifications.sponsorship_approved_mail_subject', [], $locale),
                'greeting' => __('messages.notifications.sponsorship_approved_mail_greeting', ['company' => $request->company_name], $locale),
                'mail_locale' => $locale,
                'lines' => [
                    __('messages.notifications.sponsorship_approved_mail_line1', ['company' => $request->company_name], $locale),
                    __('messages.notifications.sponsorship_approved_mail_line2', [], $locale),
                ],
                'actionText' => __('messages.notifications.sponsorship_approved_mail_action', [], $locale),
                'actionUrl' => $contactUrl,
            ]);
    }
}
