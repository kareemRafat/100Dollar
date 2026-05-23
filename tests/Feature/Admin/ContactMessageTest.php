<?php

use App\Mail\ContactMessageReplyMail;
use App\Models\ContactMessage;
use App\Models\Notification;
use App\Models\User;
use App\Notifications\NewContactMessageNotification;
use Illuminate\Support\Facades\Mail;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->admin = User::factory()->admin()->create();
});

test('contact form submission notifies all admins', function () {
    $otherAdmin = User::factory()->admin()->create();

    $response = $this->post(route('app.contact.submit'), [
        'name' => 'Ahmed',
        'email' => 'ahmed@example.com',
        'subject' => 'general',
        'message' => 'This is a new contact request.',
    ]);

    $response->assertRedirect();

    $contactMessage = ContactMessage::query()->first();

    expect($contactMessage)->not->toBeNull();

    expect(Notification::query()->where('type', NewContactMessageNotification::class)->count())
        ->toBe(2);

    expect(Notification::query()->pluck('user_id')->all())
        ->toContain($this->admin->id, $otherAdmin->id);
});

test('admin can view contact messages list', function () {
    ContactMessage::query()->create([
        'name' => 'Visitor One',
        'email' => 'one@example.com',
        'subject' => 'general',
        'message' => 'First message',
    ]);

    ContactMessage::query()->create([
        'name' => 'Visitor Two',
        'email' => 'two@example.com',
        'subject' => 'other',
        'message' => 'Second message',
        'reply_body' => 'Saved reply',
        'replied_at' => now(),
    ]);

    $this->actingAs($this->admin, 'admin')
        ->get(route('admin.contacts.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/pages/contacts/index')
            ->has('contactMessages.data', 2)
            ->where('contactMessages.data.0.id', 2)
            ->where('contactMessages.data.0.is_replied', true)
        );
});

test('admin can view contact message details', function () {
    $contactMessage = ContactMessage::query()->create([
        'name' => 'Visitor',
        'email' => 'visitor@example.com',
        'subject' => 'general',
        'message' => 'Need some help please.',
    ]);

    $this->actingAs($this->admin, 'admin')
        ->get(route('admin.contacts.show', $contactMessage))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/pages/contacts/show')
            ->where('contactMessage.id', $contactMessage->id)
            ->where('contactMessage.is_replied', false)
        );
});

test('admin can reply to a contact message and email is sent', function () {
    Mail::fake();

    $contactMessage = ContactMessage::query()->create([
        'name' => 'Visitor',
        'email' => 'visitor@example.com',
        'subject' => 'general',
        'message' => 'Can you help?',
    ]);

    $this->actingAs($this->admin, 'admin')
        ->post(route('admin.contacts.reply', $contactMessage), [
            'reply_body' => 'Sure, here is our response.',
        ])
        ->assertRedirect(route('admin.contacts.show', $contactMessage));

    $contactMessage->refresh();

    expect($contactMessage->reply_body)->toBe('Sure, here is our response.')
        ->and($contactMessage->replied_at)->not->toBeNull()
        ->and($contactMessage->is_replied)->toBeTrue();

    Mail::assertSent(ContactMessageReplyMail::class, function (ContactMessageReplyMail $mail) use ($contactMessage) {
        return $mail->hasTo($contactMessage->email)
            && $mail->replyBody === 'Sure, here is our response.';
    });
});

test('admin cannot overwrite an existing reply', function () {
    Mail::fake();

    $contactMessage = ContactMessage::query()->create([
        'name' => 'Visitor',
        'email' => 'visitor@example.com',
        'subject' => 'general',
        'message' => 'Can you help?',
        'reply_body' => 'Original reply',
        'replied_at' => now(),
    ]);

    $this->actingAs($this->admin, 'admin')
        ->post(route('admin.contacts.reply', $contactMessage), [
            'reply_body' => 'Attempted replacement reply',
        ])
        ->assertRedirect(route('admin.contacts.show', $contactMessage->id));

    expect($contactMessage->fresh()->reply_body)->toBe('Original reply');

    Mail::assertNothingSent();
});

test('admin can delete a contact message', function () {
    $contactMessage = ContactMessage::query()->create([
        'name' => 'Visitor',
        'email' => 'visitor@example.com',
        'subject' => 'general',
        'message' => 'Can you help?',
    ]);

    $this->actingAs($this->admin, 'admin')
        ->delete(route('admin.contacts.destroy', $contactMessage))
        ->assertRedirect(route('admin.contacts.index'));

    $this->assertDatabaseMissing('contact_messages', ['id' => $contactMessage->id]);
});

test('guest cannot access admin contact management routes', function () {
    $contactMessage = ContactMessage::query()->create([
        'name' => 'Visitor',
        'email' => 'visitor@example.com',
        'subject' => 'general',
        'message' => 'Can you help?',
    ]);

    $this->get(route('admin.contacts.index'))->assertRedirect(route('admin.login'));
    $this->get(route('admin.contacts.show', $contactMessage))->assertRedirect(route('admin.login'));
    $this->post(route('admin.contacts.reply', $contactMessage), [
        'reply_body' => 'Blocked',
    ])->assertRedirect(route('admin.login'));
    $this->delete(route('admin.contacts.destroy', $contactMessage))->assertRedirect(route('admin.login'));
});
