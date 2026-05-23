<?php

namespace App\Mail;

use App\Models\ContactMessage;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMessageReplyMail extends Mailable implements ShouldQueue
{
    use SerializesModels;

    public function __construct(
        public ContactMessage $contactMessage,
        public string $replyBody,
        ?string $preferredLocale = null,
    ) {
        $this->locale($preferredLocale ?? app()->getLocale());
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: __('messages.contact.reply_mail_subject', [], $this->locale),
        );
    }
    public function content(): Content
    {
        $translatedSubject = __('messages.contact.subject_' . $this->contactMessage->subject, [], $this->locale);

        // Fallback to the raw subject if no translation is found
        if ($translatedSubject === 'messages.contact.subject_' . $this->contactMessage->subject) {
            $translatedSubject = $this->contactMessage->subject;
        }

        return new Content(
            view: 'mail.notification',
            text: 'mail.notification-text',
            with: [
                'locale' => $this->locale,
                'subject' => __('messages.contact.reply_mail_subject', [], $this->locale),
                'greeting' => __('messages.contact.reply_mail_greeting', ['name' => $this->contactMessage->name], $this->locale),
                'lines' => [
                    __('messages.contact.reply_mail_intro', ['subject' => $translatedSubject], $this->locale),
                ],
                'panelValue' => $this->replyBody,
                'panelType' => 'panel-reply',
                'salutation' => __('messages.notifications.regards', [], $this->locale) . "\n" . config('app.name'),
            ],
        );
    }
}
