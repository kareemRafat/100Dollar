<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\App;

class OtpVerificationMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public string $otp, public ?string $forcedLocale = null)
    {
        if ($this->forcedLocale) {
            $this->locale = $this->forcedLocale;
        }
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        if ($this->locale) {
            App::setLocale($this->locale);
        }

        return new Envelope(
            subject: __('messages.mail.otp_subject'),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.notification',
            text: 'mail.notification-text',
            with: [
                'subject' => __('messages.mail.otp_subject'),
                'greeting' => __('messages.mail.otp_greeting'),
                'lines' => [
                    __('messages.mail.otp_line1'),
                    __('messages.mail.otp_line2'),
                ],
                'panelLabel' => __('messages.mail.otp_panel_label'),
                'panelValue' => $this->otp,
                'panelType' => 'otp-panel',
                'salutation' => __('messages.notifications.regards')."\n".config('app.name'),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
