<?php

use App\Enums\IdeaStatus;
use App\Enums\UserRole;
use App\Models\Category;
use App\Models\Country;
use App\Models\Idea;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    Storage::fake('public');
    $this->user = User::factory()->create(['role' => UserRole::USER]);
    $this->category = Category::factory()->create();
    $this->country = Country::factory()->create();
    
    $this->idea = Idea::factory()->create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'country_id' => $this->country->id,
        'status' => IdeaStatus::PENDING,
    ]);
});

test('owner can see edit page for pending idea', function () {
    actingAs($this->user)
        ->get("/en/ideas/{$this->idea->id}/edit")
        ->assertSuccessful();
});

test('non-owner cannot see edit page', function () {
    $otherUser = User::factory()->create(['role' => UserRole::USER]);
    
    actingAs($otherUser)
        ->get(localizedUrl("/ideas/{$this->idea->id}/edit", 'en'))
        ->assertForbidden();
});

test('approved idea cannot be edited', function () {
    $this->idea->update(['status' => IdeaStatus::APPROVED]);
    
    actingAs($this->user)
        ->get(localizedUrl("/ideas/{$this->idea->id}/edit", 'en'))
        ->assertRedirect(localizedUrl('/my-ideas', 'en'))
        ->assertSessionHas('error');
});

test('rejected idea can be edited', function () {
    $this->idea->update(['status' => IdeaStatus::REJECTED]);
    
    actingAs($this->user)
        ->get(localizedUrl("/ideas/{$this->idea->id}/edit", 'en'))
        ->assertSuccessful();
});

test('owner can update idea and it resets to pending', function () {
    $this->idea->update(['status' => IdeaStatus::REJECTED]);
    
    actingAs($this->user)
        ->patch(localizedUrl("/ideas/{$this->idea->id}", 'en'), [
            'title' => 'Updated Title',
            'description' => 'Updated description.',
            'category_id' => $this->category->id,
            'country_id' => $this->country->id,
            'city' => 'New City',
            'marketing_channel' => ['social_media'],
            'target_audience' => ['youth'],
            'implementation_time' => 'month',
        ])
        ->assertRedirect(localizedUrl('/my-ideas', 'en'))
        ->assertSessionHas('success');

    $this->idea->refresh();
    expect($this->idea->title)->toBe('Updated Title');
    expect($this->idea->status)->toBe(IdeaStatus::PENDING);
});

test('replacing image deletes the old one', function () {
    // Add initial image
    $oldImage = UploadedFile::fake()->image('old.jpg');
    $path = $oldImage->store('ideas/images', 'public');
    $this->idea->media()->create([
        'file_path' => $path,
        'mime_type' => 'image/jpeg',
        'file_size' => 100,
        'collection_name' => 'image',
        'disk' => 'public',
    ]);
    
    Storage::disk('public')->assertExists($path);
    
    // Update with new image
    $newImage = UploadedFile::fake()->image('new.jpg');
    
    actingAs($this->user)
        ->patch(localizedUrl("/ideas/{$this->idea->id}", 'en'), [
            'title' => 'Updated Title',
            'description' => 'Updated description.',
            'category_id' => $this->category->id,
            'country_id' => $this->country->id,
            'city' => 'New City',
            'marketing_channel' => ['social_media'],
            'target_audience' => ['youth'],
            'implementation_time' => 'month',
            'image' => $newImage,
        ]);
        
    Storage::disk('public')->assertMissing($path);
    $this->idea->refresh();
    expect($this->idea->media()->where('collection_name', 'image')->count())->toBe(1);
    Storage::disk('public')->assertExists($this->idea->media()->where('collection_name', 'image')->first()->file_path);
});
