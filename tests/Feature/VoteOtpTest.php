<?php

use App\Models\Idea;
use App\Models\Vote;
use App\Models\User;
use App\Mail\OtpVerificationMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Crypt;
use function Pest\Laravel\postJson;

test('user can request an otp for voting', function () {
    Mail::fake();
    
    $idea = Idea::factory()->create();
    $email = 'voter@example.com';

    $response = postJson(route('app.ideas.vote.send-otp', $idea), [
        'email' => $email,
    ]);

    $response->assertOk();
    $response->assertJson(['message' => __('OTP sent successfully to your email.')]);

    Mail::assertSent(OtpVerificationMail::class, function ($mail) use ($email) {
        return $mail->hasTo($email);
    });

    $vote = Vote::where('idea_id', $idea->id)->where('voter_email', $email)->first();
    expect($vote)->not->toBeNull();
    expect($vote->otp)->not->toBeNull();
    expect(Crypt::decryptString($vote->otp))->toMatch('/^\d{6}$/');
});

test('user can verify otp and cast a vote', function () {
    $idea = Idea::factory()->create(['votes_count' => 0]);
    $email = 'voter@example.com';
    $otp = '123456';

    $vote = Vote::create([
        'idea_id' => $idea->id,
        'voter_email' => $email,
        'otp' => Crypt::encryptString($otp),
        'otp_expires_at' => now()->addMinutes(10),
    ]);

    $response = postJson(route('app.ideas.vote.verify', $idea), [
        'email' => $email,
        'otp' => $otp,
    ]);

    $response->assertOk();
    $response->assertJson(['message' => __('Your vote has been cast successfully!')]);

    $vote->refresh();
    expect($vote->otp_verified_at)->not->toBeNull();
    expect($vote->otp)->toBeNull();

    $idea->refresh();
    expect($idea->votes_count)->toBe(1);
});

test('user cannot verify invalid otp', function () {
    $idea = Idea::factory()->create();
    $email = 'voter@example.com';
    $otp = '123456';

    Vote::create([
        'idea_id' => $idea->id,
        'voter_email' => $email,
        'otp' => Crypt::encryptString($otp),
        'otp_expires_at' => now()->addMinutes(10),
    ]);

    $response = postJson(route('app.ideas.vote.verify', $idea), [
        'email' => $email,
        'otp' => '000000',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['otp']);
});

test('otp expires after 10 minutes', function () {
    $idea = Idea::factory()->create();
    $email = 'voter@example.com';
    $otp = '123456';

    Vote::create([
        'idea_id' => $idea->id,
        'voter_email' => $email,
        'otp' => Crypt::encryptString($otp),
        'otp_expires_at' => now()->subMinutes(1),
    ]);

    $response = postJson(route('app.ideas.vote.verify', $idea), [
        'email' => $email,
        'otp' => $otp,
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['otp']);
});
