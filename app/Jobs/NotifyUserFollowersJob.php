<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Notification;

class NotifyUserFollowersJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public User $user,
        public $notificationClass,
        public array $params = []
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->user->followers()
            ->with('follower')
            ->chunkById(500, function ($follows) {
                $users = $follows->pluck('follower');
                Notification::send($users, new $this->notificationClass(...$this->params));
            });
    }
}
