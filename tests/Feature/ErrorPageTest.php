<?php

use Inertia\Testing\AssertableInertia as Assert;

it('renders the inertia error page for missing routes in production', function () {
    $this->withoutVite();
    $this->app->detectEnvironment(fn () => 'production');

    $this->get('/this-page-does-not-exist')
        ->assertNotFound()
        ->assertSee('error-page-shell', false)
        ->assertInertia(fn (Assert $page) => $page
            ->component('app/pages/errors/error')
            ->where('status', 404)
            ->has('locale')
            ->has('translations')
        );
});
