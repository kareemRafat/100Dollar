<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Idea;
use App\Models\Vote;
use App\Mail\OtpVerificationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Validation\ValidationException;

class VoteController extends Controller
{
    public function sendOtp(Request $request, Idea $idea)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $email = $request->email;
        $ip = $request->ip();

        // Rate limiting: 3 OTP requests per hour per IP
        $key = 'otp-limit:' . $ip;
        if (RateLimiter::tooManyAttempts($key, 3)) {
            $seconds = RateLimiter::availableIn($key);
            $time = \Carbon\CarbonInterval::seconds($seconds)->cascade()->forHumans([
                'join' => true,
            ]);
            
            return response()->json([
                'message' => __('messages.common.too_many_attempts', ['time' => $time]),
            ], 429);
        }

        // Check if already voted (verified vote)
        $existingVote = Vote::where('idea_id', $idea->id)
            ->where('voter_email', $email)
            ->whereNotNull('otp_verified_at')
            ->first();

        if ($existingVote) {
            return response()->json([
                'message' => __('messages.vote_pin.already_voted'),
            ], 422);
        }

        // Generate 6-digit OTP
        $otp = (string) rand(100000, 999999);

        // Store or update pending vote
        Vote::updateOrCreate(
            ['idea_id' => $idea->id, 'voter_email' => $email],
            [
                'otp' => Crypt::encryptString($otp),
                'otp_expires_at' => now()->addMinutes(10),
                'ip_address' => $ip,
                'otp_verified_at' => null, // Reset if they are re-requesting for an unverified vote
            ]
        );

        // Send Email
        Mail::to($email)->send(new OtpVerificationMail($otp));

        RateLimiter::hit($key, 600);

        return response()->json([
            'message' => __('messages.vote_pin.otp_sent'),
        ]);
    }

    public function verifyOtp(Request $request, Idea $idea)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'otp' => ['required', 'string', 'size:6'],
        ]);

        $vote = Vote::where('idea_id', $idea->id)
            ->where('voter_email', $request->email)
            ->first();

        if (!$vote) {
            throw ValidationException::withMessages([
                'otp' => [__('messages.vote_pin.no_request')],
            ]);
        }

        if ($vote->otp_verified_at) {
            return response()->json([
                'message' => __('messages.vote_pin.already_voted'),
            ], 422);
        }

        if ($vote->otp_expires_at->isPast()) {
            throw ValidationException::withMessages([
                'otp' => [__('messages.vote_pin.expired')],
            ]);
        }

        try {
            $decryptedOtp = Crypt::decryptString($vote->otp);
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'otp' => [__('messages.vote_pin.invalid')],
            ]);
        }

        if ($decryptedOtp !== $request->otp) {
            throw ValidationException::withMessages([
                'otp' => [__('messages.vote_pin.invalid')],
            ]);
        }

        // Mark as verified
        $vote->update([
            'otp_verified_at' => now(),
            'otp' => null, // Clear OTP after verification
        ]);

        // Increment idea votes count
        $idea->increment('votes_count');

        return response()->json([
            'message' => __('messages.vote_pin.success'),
            'votes_count' => $idea->votes_count,
        ]);
    }
}
