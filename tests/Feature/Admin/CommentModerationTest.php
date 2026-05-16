<?php

use App\Models\Comment;
use App\Models\Idea;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

beforeEach(function () {
    $this->admin = User::factory()->create([
        'role' => 'admin',
        'email_verified_at' => now(),
    ]);
});

test('admin can soft delete a comment', function () {
    $comment = Comment::factory()->create();

    actingAs($this->admin, 'admin')
        ->delete(route('admin.comments.destroy', $comment))
        ->assertRedirect();

    $this->assertSoftDeleted($comment);
});

test('public users see violation message for deleted comments', function () {
    $idea = Idea::factory()->create(['status' => 'approved']);
    $comment = Comment::factory()->create(['idea_id' => $idea->id, 'body' => 'Violating comment']);
    $comment->delete();

    // App/IdeaController@show uses partial loading for comments
    get(route('app.ideas.show', $idea), [
        'X-Inertia-Partial-Data' => 'comments',
        'X-Inertia-Partial-Component' => 'app/pages/idea/show',
    ])
        ->assertInertia(fn ($page) => $page
            ->has('comments.data', 1)
            ->where('comments.data.0.body', __('messages.comments.comment_deleted_violation'))
            ->where('comments.data.0.is_deleted', true)
        );
});

test('admins see original text for deleted comments', function () {
    $idea = Idea::factory()->create();
    $comment = Comment::factory()->create(['idea_id' => $idea->id, 'body' => 'Original bad comment']);
    $comment->delete();

    actingAs($this->admin, 'admin')
        ->get(route('admin.ideas.show', $idea), [
            'X-Inertia-Partial-Data' => 'comments',
            'X-Inertia-Partial-Component' => 'admin/pages/ideas/show',
        ])
        ->assertInertia(fn ($page) => $page
            ->has('comments', 1)
            ->where('comments.0.body', 'Original bad comment')
            ->where('comments.0.deleted_at', fn ($val) => ! is_null($val))
        );
});
