<?php

use App\Models\Comment;
use App\Models\Idea;
use App\Models\Notification;
use App\Models\User;
use App\Notifications\IdeaApprovedNotification;
use App\Notifications\NewCommentNotification;
use App\Notifications\NewFollowerNotification;

test('idea notifications store a localized destination url', function () {
    $user = User::factory()->create(['locale' => 'en']);
    $idea = Idea::factory()->for($user)->create();

    $payload = (new IdeaApprovedNotification($idea))->toCustomDb($user);

    expect($payload['data']['url'])->toBe(localizedUrl(route('app.ideas.show', $idea, false), 'en'))
        ->and($payload['data']['title_key'])->toBe('messages.notifications.idea_approved_title')
        ->and($payload['data']['body_key'])->toBe('messages.notifications.idea_approved_body')
        ->and($payload['data']['translation_params'])->toBe(['title' => $idea->title]);
});

test('comment notifications store a localized destination url', function () {
    $owner = User::factory()->create(['locale' => 'ar']);
    $commenter = User::factory()->create();
    $idea = Idea::factory()->for($owner)->create();
    $comment = Comment::factory()->create([
        'idea_id' => $idea->id,
        'user_id' => $commenter->id,
    ]);

    $payload = (new NewCommentNotification($comment))->toCustomDb($owner);

    expect($payload['data']['url'])->toBe(localizedUrl(route('app.ideas.show', $idea, false), 'ar'))
        ->and($payload['data']['title_key'])->toBe('messages.notifications.new_comment_title')
        ->and($payload['data']['body_key'])->toBe('messages.notifications.new_comment_body')
        ->and($payload['data']['translation_params'])->toBe([
            'user' => $commenter->name,
            'title' => $idea->title,
        ]);
});

test('new follower notifications point to notifications page in the recipient locale', function () {
    $user = User::factory()->create(['locale' => 'en']);
    $follower = User::factory()->create(['name' => 'Ahmed']);

    $payload = (new NewFollowerNotification($follower))->toCustomDb($user);

    expect($payload['title'])->toBe('New Follower')
        ->and($payload['data']['follower_id'])->toBe($follower->id)
        ->and($payload['data']['url'])->toBe(localizedUrl(route('app.profile.notifications', absolute: false), 'en'))
        ->and($payload['data']['title_key'])->toBe('messages.notifications.new_follower_title')
        ->and($payload['data']['body_key'])->toBe('messages.notifications.new_follower_body')
        ->and($payload['data']['translation_params'])->toBe(['user' => 'Ahmed']);
});

test('following a user creates a follower notification with a destination url', function () {
    $follower = User::factory()->create(['locale' => 'en']);
    $followedUser = User::factory()->create(['locale' => 'ar']);

    $this->actingAs($follower)
        ->post(route('app.users.follow', $followedUser))
        ->assertRedirect();

    $notification = Notification::query()
        ->where('user_id', $followedUser->id)
        ->latest()
        ->first();

    expect($notification)->not->toBeNull()
        ->and($notification->title)->toBe('متابع جديد')
        ->and($notification->data['follower_id'])->toBe($follower->id)
        ->and($notification->data['url'])->toBe(localizedUrl(route('app.profile.notifications', absolute: false), 'ar'))
        ->and($notification->data['title_key'])->toBe('messages.notifications.new_follower_title')
        ->and($notification->data['body_key'])->toBe('messages.notifications.new_follower_body')
        ->and($notification->data['translation_params'])->toBe(['user' => $follower->name]);
});
