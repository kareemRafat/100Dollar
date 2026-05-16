<?php

namespace App\Jobs;

use App\Models\Idea;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Notification;

class NotifyIdeaFollowersJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Idea $idea,
        public $notificationClass,
        public array $params = [],
        public ?int $excludeUserId = null
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->idea->follows()
            ->with('user')
            ->when($this->excludeUserId, fn($q) => $q->where('user_id', '!=', $this->excludeUserId))
            ->chunkById(500, function ($follows) {
                foreach ($follows as $follow) {
                    $user = $follow->user;
                    $user->notify((new $this->notificationClass(...$this->params))->locale($user->preferredLocale()));
                }
            });
    }
}
