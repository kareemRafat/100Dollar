<?php

use App\Models\Idea;
use App\Models\Vote;
use App\Models\User;
use App\Mail\OtpVerificationMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\RateLimiter;
use function Pest\Laravel\postJson;

beforeEach(function () {
    RateLimiter::clear('vote-attempts:127.0.0.1:voter@example.com');
    RateLimiter::clear('vote-attempts:127.0.0.1:');
});

test('user can request an otp for voting', function () {
    Mail::fake();
    
    $idea = Idea::factory()->create();
    $email = 'voter@example.com';

    $response = postJson(route('app.ideas.vote.send-otp', ['locale' => 'en', 'idea' => $idea]), [
        'email' => $email,
    ]);

    $response->assertOk();
    $response->assertJson(['message' => __('messages.vote_pin.otp_sent')]);

    Mail::assertSent(OtpVerificationMail::class, function ($mail) use ($email) {
        return $mail->hasTo($email);
    });

    $vote = Vote::where('idea_id', $idea->id)->where('voter_email', $email)->first();
    expect($vote)->not->toBeNull();
    expect($vote->otp)->not->toBeNull();
    expect(Crypt::decryptString($vote->otp))->toMatch('/^\d{6}$/');
});

test('user is blocked after 5 failed otp requests', function () {
    Mail::fake();
    $idea = Idea::factory()->create();
    $email = 'voter@example.com';

    for ($i = 0; $i < 5; $i++) {
        postJson(route('app.ideas.vote.send-otp', ['locale' => 'en', 'idea' => $idea]), ['email' => $email])->assertOk();
    }

    $response = postJson(route('app.ideas.vote.send-otp', ['locale' => 'en', 'idea' => $idea]), ['email' => $email]);
    $response->assertStatus(429);
    $response->assertJsonStructure(['message']);
});

test('user is blocked after 5 failed verification attempts', function () {
    $idea = Idea::factory()->create();
    $email = 'voter@example.com';
    
    Vote::create([
        'idea_id' => $idea->id,
        'voter_email' => $email,
        'otp' => Crypt::encryptString('123456'),
        'otp_expires_at' => now()->addMinutes(10),
    ]);

    for ($i = 0; $i < 5; $i++) {
        postJson(route('app.ideas.vote.verify', ['locale' => 'en', 'idea' => $idea]), [
            'email' => $email,
            'otp' => '000000',
        ])->assertStatus(422);
    }

    $response = postJson(route('app.ideas.vote.verify', ['locale' => 'en', 'idea' => $idea]), [
        'email' => $email,
        'otp' => '123456',
    ]);

    $response->assertStatus(429);
});

test('successful vote clears the block counter', function () {
    $idea = Idea::factory()->create();
    $email = 'voter@example.com';
    $otp = '123456';
    
    Vote::create([
        'idea_id' => $idea->id,
        'voter_email' => $email,
        'otp' => Crypt::encryptString($otp),
        'otp_expires_at' => now()->addMinutes(10),
    ]);

    // 4 failed attempts
    for ($i = 0; $i < 4; $i++) {
        postJson(route('app.ideas.vote.verify', ['locale' => 'en', 'idea' => $idea]), [
            'email' => $email,
            'otp' => '000000',
        ])->assertStatus(422);
    }

    // 5th attempt is successful
    $response = postJson(route('app.ideas.vote.verify', ['locale' => 'en', 'idea' => $idea]), [
        'email' => $email,
        'otp' => $otp,
    ]);

    $response->assertOk();
    
    // Counter should be cleared, next request should work
    $anotherIdea = Idea::factory()->create();
    postJson(route('app.ideas.vote.send-otp', ['locale' => 'en', 'idea' => $anotherIdea]), ['email' => $email])->assertOk();
});

test('user cannot vote more than once per competition day', function () {
    $sundayIdea1 = Idea::factory()->create([
        'submission_day' => 0,
        'week_number' => now()->weekOfYear,
        'year' => now()->year,
    ]);
    $sundayIdea2 = Idea::factory()->create([
        'submission_day' => 0,
        'week_number' => now()->weekOfYear,
        'year' => now()->year,
    ]);
    $mondayIdea = Idea::factory()->create([
        'submission_day' => 1,
        'week_number' => now()->weekOfYear,
        'year' => now()->year,
    ]);
    $email = 'voter@example.com';

    // First vote (Sunday)
    Vote::create([
        'idea_id' => $sundayIdea1->id,
        'voter_email' => $email,
        'otp_verified_at' => now(),
    ]);

    // Attempt second vote on same competition day (Sunday) -> Should Fail
    $response = postJson(route('app.ideas.vote.send-otp', ['locale' => 'en', 'idea' => $sundayIdea2]), [
        'email' => $email,
    ]);

    $response->assertStatus(400);
    $response->assertJson(['message' => __('messages.vote_pin.already_voted_today')]);

    // Attempt vote on a different competition day (Monday) -> Should Pass
    $response = postJson(route('app.ideas.vote.send-otp', ['locale' => 'en', 'idea' => $mondayIdea]), [
        'email' => $email,
    ]);

    $response->assertOk();
});
