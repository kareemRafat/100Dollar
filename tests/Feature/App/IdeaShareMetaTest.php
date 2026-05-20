<?php

use App\Models\Idea;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Mcamara\LaravelLocalization\Middleware\LaravelLocalizationRedirectFilter;
use Mcamara\LaravelLocalization\Middleware\LocaleSessionRedirect;

it('renders share metadata for idea pages', function () {
    Storage::fake('public');

    $idea = Idea::factory()->approved()->create([
        'title' => 'Idea ready for sharing',
        'description' => str_repeat('A social preview description. ', 12),
    ]);

    $idea->media()->create([
        'file_path' => 'ideas/images/share-card.jpg',
        'mime_type' => 'image/jpeg',
        'file_size' => 1024,
        'collection_name' => 'image',
        'disk' => 'public',
    ]);

    $response = $this
        ->withoutVite()
        ->withoutMiddleware([LocaleSessionRedirect::class, LaravelLocalizationRedirectFilter::class])
        ->get(route('app.ideas.show', $idea));

    $shareDescription = mb_substr($idea->description, 0, 160);
    $shareImage = url(Storage::disk('public')->url('ideas/images/share-card.jpg'));
    $shareUrl = route('app.ideas.show', $idea);

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('app/pages/idea/show')
            ->where('shareMeta.title', $idea->title)
            ->where('shareMeta.description', $shareDescription)
            ->where('shareMeta.url', $shareUrl)
            ->where('shareMeta.image', $shareImage)
            ->where('shareMeta.image_type', 'image/jpeg')
        )
        ->assertSee('<meta property="og:title" content="'.$idea->title.'">', false)
        ->assertSee('<meta property="og:url" content="'.$shareUrl.'">', false)
        ->assertSee('<meta property="og:image" content="'.$shareImage.'">', false)
        ->assertSee('<meta name="twitter:image" content="'.$shareImage.'">', false);
});
