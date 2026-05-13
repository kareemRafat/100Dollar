<?php

use App\Models\Country;
use App\Models\Idea;
use App\Models\User;
use App\Models\Vote;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->admin = User::factory()->create(['role' => 'admin']);
    $this->country = Country::factory()->create(['name_ar' => 'مصر', 'name_en' => 'Egypt']);
});

test('admin can view users list', function () {
    User::factory()->count(5)->create();

    actingAs($this->admin, 'admin')
        ->get(route('admin.users.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/pages/users')
            ->has('users.data', 6) // 5 users + 1 admin
            ->has('countries')
        );
});

test('admin can filter users by country', function () {
    $userInEgypt = User::factory()->create(['country_id' => $this->country->id]);
    User::factory()->create(['country_id' => null]);

    actingAs($this->admin, 'admin')
        ->get(route('admin.users.index', ['country_id' => $this->country->id]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('users.data', 1)
            ->where('users.data.0.id', $userInEgypt->id)
        );
});

test('admin can filter users by search', function () {
    $targetUser = User::factory()->create(['name' => 'Kareem', 'email' => 'kareem@example.com']);
    User::factory()->create(['name' => 'Ahmed', 'email' => 'ahmed@example.com']);

    actingAs($this->admin, 'admin')
        ->get(route('admin.users.index', ['search' => 'Kareem']))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('users.data', 1)
            ->where('users.data.0.id', $targetUser->id)
        );
});

test('admin can view user detail page', function () {
    $user = User::factory()->create(['country_id' => $this->country->id]);
    $idea = Idea::factory()->create(['user_id' => $user->id]);
    Vote::factory()->create(['voter_email' => $user->email, 'idea_id' => $idea->id]);

    actingAs($this->admin, 'admin')
        ->get(route('admin.users.show', $user))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/pages/users/show')
            ->where('user.id', $user->id)
            ->has('user.ideas', 1)
            ->has('user.votes', 1)
        );
});

test('admin can activate/deactivate user', function () {
    $user = User::factory()->create(['is_active' => true]);

    actingAs($this->admin, 'admin')
        ->patch(route('admin.users.update', $user), [
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'is_active' => 0,
        ])
        ->assertRedirect();

    expect($user->fresh()->is_active)->toBeFalse();

    actingAs($this->admin, 'admin')
        ->patch(route('admin.users.update', $user), [
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'is_active' => 1,
        ])
        ->assertRedirect();

    expect($user->fresh()->is_active)->toBeTrue();
});

test('admin can delete user', function () {
    $user = User::factory()->create();

    actingAs($this->admin, 'admin')
        ->delete(route('admin.users.destroy', $user))
        ->assertRedirect();

    $this->assertDatabaseMissing('users', ['id' => $user->id]);
});

test('admin cannot delete themselves', function () {
    actingAs($this->admin, 'admin')
        ->delete(route('admin.users.destroy', $this->admin))
        ->assertRedirect()
        ->assertSessionHasErrors('error');

    $this->assertDatabaseHas('users', ['id' => $this->admin->id]);
});
