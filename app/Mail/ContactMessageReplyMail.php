<?php

namespace App\Mail;

use App\Models\ContactMessage;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMessageReplyMail extends Mailable
{
    use SerializesModels;

    public function __construct(
        public ContactMessage $contactMessage,
        public string $replyBody,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: __('messages.contact.reply_mail_subject'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.notification',
            text: 'mail.notification-text',
            with: [
                'subject' => __('messages.contact.reply_mail_subject'),
                'greeting' => __('messages.contact.reply_mail_greeting', ['name' => $this->contactMessage->name]),
                'lines' => [
                    __('messages.contact.reply_mail_intro', ['subject' => $this->contactMessage->subject]),
                    $this->replyBody,
                ],
                'salutation' => __('messages.notifications.regards')."\n".config('app.name'),
            ],
        );
    }

    /**
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
