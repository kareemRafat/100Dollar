<?php

namespace App\Listeners;

use App\Events\CommentCreated;
use App\Jobs\NotifyIdeaFollowersJob;
use App\Notifications\NewCommentNotification;

class HandleCommentCreated
{
    /**
     * Handle the event.
     */
    public function handle(CommentCreated $event): void
    {
        $comment = $event->comment;
        $idea = $comment->idea;

        // 1. Notify idea owner if they aren't the one who commented
        if ($idea->user_id !== $comment->user_id) {
            $owner = $idea->user;
            $owner->notify((new NewCommentNotification($comment))->locale($owner->preferredLocale()));
        }

        // 2. Notify idea followers
        NotifyIdeaFollowersJob::dispatch(
            $idea,
            NewCommentNotification::class,
            ['comment' => $comment],
            $comment->user_id // Exclude the person who commented
        );
    }
}
