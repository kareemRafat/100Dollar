<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Idea;
use App\Models\Vote;
use App\Mail\OtpVerificationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Validation\ValidationException;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class VoteController extends Controller
{
    public function sendOtp(Request $request, Idea $idea)
    {
        if ($idea->status !== 'approved') {
            abort(404);
        }

        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $email = $request->email;
        $user = $request->user();
        $ip = $request->ip();
        $locale = LaravelLocalization::getCurrentLocale() ?: app()->getLocale();
        
        // Consistent rate limiting key
        $key = $user 
            ? 'vote-attempts:user:' . $user->id 
            : 'vote-attempts:ip:' . $ip;

        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);
            $time = \Carbon\CarbonInterval::seconds($seconds)->cascade()->forHumans([
                'join' => true,
            ]);
            
            return response()->json([
                'message' => __('messages.common.too_many_attempts', ['time' => $time]),
            ], 429);
        }

        // Check if user is the owner (logged in or matching email)
        if ($this->isIdeaOwner($idea, $user, $email)) {
            return response()->json([
                'message' => __('messages.vote_pin.owner_cannot_vote'),
            ], 400);
        }

        // Check if already voted for this specific idea (verified vote)
        // We use a separate check before updateOrCreate to prevent resetting otp_verified_at
        $alreadyVotedForThisIdea = Vote::where('idea_id', $idea->id)
            ->where('voter_email', $email)
            ->whereNotNull('otp_verified_at')
            ->exists();

        if ($alreadyVotedForThisIdea) {
            return response()->json([
                'message' => __('messages.vote_pin.already_voted'),
            ], 400);
        }

        // Check if already voted for ANY idea in the same competition day (one vote per competition day rule)
        $votedForThisCompetitionDay = Vote::where('voter_email', $email)
            ->whereNotNull('otp_verified_at')
            ->whereHas('idea', function ($query) use ($idea) {
                $query->where('submission_day', $idea->submission_day)
                    ->where('week_number', $idea->week_number)
                    ->where('year', $idea->year);
            })
            ->exists();

        if ($votedForThisCompetitionDay) {
            return response()->json([
                'message' => __('messages.vote_pin.already_voted_today'),
            ], 400);
        }

        // Increment attempts on OTP request
        RateLimiter::hit($key, 600); // 10 minutes block

        // Generate 6-digit OTP
        $otp = (string) random_int(100000, 999999);

        // Store or update pending vote
        Vote::updateOrCreate(
            ['idea_id' => $idea->id, 'voter_email' => $email],
            [
                'otp' => Crypt::encryptString($otp),
                'otp_expires_at' => now()->addMinutes(10),
                'ip_address' => $ip,
                'otp_verified_at' => null, // Only reaches here if not already verified
            ]
        );

        // Send Email
        Mail::to($email)->locale($locale)->send(new OtpVerificationMail($otp, $locale));

        return response()->json([
            'message' => __('messages.vote_pin.otp_sent'),
        ]);
    }

    public function verifyOtp(Request $request, Idea $idea)
    {
        if ($idea->status !== 'approved') {
            abort(404);
        }

        $request->validate([
            'email' => ['required', 'email'],
            'otp' => ['required', 'string', 'size:6'],
        ]);

        $user = $request->user();
        $email = $request->email;
        $ip = $request->ip();
        
        // Consistent rate limiting key
        $key = $user 
            ? 'vote-attempts:user:' . $user->id 
            : 'vote-attempts:ip:' . $ip;

        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);
            $time = \Carbon\CarbonInterval::seconds($seconds)->cascade()->forHumans([
                'join' => true,
            ]);
            
            return response()->json([
                'message' => __('messages.common.too_many_attempts', ['time' => $time]),
            ], 429);
        }

        return DB::transaction(function () use ($idea, $email, $request, $key, $user) {
            // Check if user is the owner (logged in or matching email)
            if ($this->isIdeaOwner($idea, $user, $email)) {
                return response()->json([
                    'message' => __('messages.vote_pin.owner_cannot_vote'),
                ], 400);
            }

            // Lock the vote record to prevent concurrent verifications
            $vote = Vote::where('idea_id', $idea->id)
                ->where('voter_email', $email)
                ->lockForUpdate()
                ->first();

            if (!$vote) {
                RateLimiter::hit($key, 600);
                throw ValidationException::withMessages([
                    'otp' => [__('messages.vote_pin.no_request')],
                ]);
            }

            if ($vote->otp_verified_at) {
                return response()->json([
                    'message' => __('messages.vote_pin.already_voted'),
                ], 400);
            }

            // Check if already voted for ANY idea in the same competition day
            $votedForThisCompetitionDay = Vote::where('voter_email', $email)
                ->whereNotNull('otp_verified_at')
                ->whereHas('idea', function ($query) use ($idea) {
                    $query->where('submission_day', $idea->submission_day)
                        ->where('week_number', $idea->week_number)
                        ->where('year', $idea->year);
                })
                ->exists();

            if ($votedForThisCompetitionDay) {
                return response()->json([
                    'message' => __('messages.vote_pin.already_voted_today'),
                ], 400);
            }

            if ($vote->otp_expires_at->isPast()) {
                RateLimiter::hit($key, 600);
                throw ValidationException::withMessages([
                    'otp' => [__('messages.vote_pin.expired')],
                ]);
            }

            try {
                $decryptedOtp = Crypt::decryptString($vote->otp);
            } catch (\Exception $e) {
                RateLimiter::hit($key, 600);
                throw ValidationException::withMessages([
                    'otp' => [__('messages.vote_pin.invalid')],
                ]);
            }

            if ($decryptedOtp !== $request->otp) {
                RateLimiter::hit($key, 600);
                throw ValidationException::withMessages([
                    'otp' => [__('messages.vote_pin.invalid')],
                ]);
            }

            // Mark as verified
            $vote->update([
                'otp_verified_at' => now(),
                'otp' => null,
            ]);

            // Lock and increment idea votes count
            $idea->refresh(); // Get fresh votes_count
            $idea->lockForUpdate();
            $idea->increment('votes_count');

            // Clear attempts on success
            RateLimiter::clear($key);

            return response()->json([
                'message' => __('messages.vote_pin.success'),
                'votes_count' => $idea->votes_count,
            ]);
        });
    }

    private function isIdeaOwner(Idea $idea, ?\App\Models\User $user, string $email): bool
    {
        if ($user && $idea->user_id === $user->id) {
            return true;
        }

        return $idea->user->email === $email;
    }
}
