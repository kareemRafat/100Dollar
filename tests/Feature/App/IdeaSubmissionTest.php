<?php

use App\Models\Idea;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    Storage::fake('public');
    $this->user = User::factory()->create(['role' => 'user']);
});

test('authenticated user can see submission page', function () {
    // Manually use the prefixed URL to bypass some localization issues in tests
    actingAs($this->user)
        ->get('/en/ideas/create')
        ->assertSuccessful();
});

test('guest cannot see submission page', function () {
    $this->get('/en/ideas/create')
        ->assertRedirect('/en/login');
});

test('user can submit a valid idea with image and pdf', function () {
    $image = UploadedFile::fake()->image('idea-image.jpg');
    $pdf = UploadedFile::fake()->create('plan.pdf', 100);

    actingAs($this->user)
        ->post('/en/ideas', [
            'title' => 'My Great Business Idea',
            'description' => 'Detailed description of the business.',
            'category' => 'tech',
            'country' => 'Saudi Arabia',
            'city' => 'Riyadh',
            'image' => $image,
            'pdf_file' => $pdf,
            'agreed_terms' => true,
            'agreed_privacy' => true,
            'agreed_legal' => true,
        ])
        ->assertRedirect('/en/my-ideas')
        ->assertSessionHas('success');

    $idea = Idea::latest()->first();
    expect($idea->title)->toBe('My Great Business Idea');
    expect($idea->status)->toBe('pending');

    // Check media relationship
    expect($idea->media()->count())->toBe(2);
    expect($idea->media()->where('collection_name', 'image')->exists())->toBeTrue();
    expect($idea->media()->where('collection_name', 'pdf')->exists())->toBeTrue();

    // Check physical storage
    Storage::disk('public')->assertExists($idea->media()->where('collection_name', 'image')->first()->file_path);
    Storage::disk('public')->assertExists($idea->media()->where('collection_name', 'pdf')->first()->file_path);
});

test('idea submission requires all mandatory fields', function () {
    actingAs($this->user)
        ->post('/en/ideas', [])
        ->assertSessionHasErrors(['title', 'description', 'category', 'country', 'city', 'agreed_terms', 'agreed_privacy', 'agreed_legal']);
});

test('image must be valid and within size limit', function () {
    $largeImage = UploadedFile::fake()->image('too-big.jpg')->size(3000); // 3MB > 2MB

    actingAs($this->user)
        ->post('/en/ideas', [
            'image' => $largeImage,
        ])
        ->assertSessionHasErrors(['image']);
});

test('pdf must be valid and within size limit', function () {
    $largePdf = UploadedFile::fake()->create('too-big.pdf', 6000); // 6MB > 5MB

    actingAs($this->user)
        ->post('/en/ideas', [
            'pdf_file' => $largePdf,
        ])
        ->assertSessionHasErrors(['pdf_file']);
});
