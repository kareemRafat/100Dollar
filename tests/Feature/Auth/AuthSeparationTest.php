<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('authenticated app users are redirected away from app guest pages', function () {
    $user = User::factory()->create();

    $this->actingAs($user, 'web')
        ->get(route('login'))
        ->assertRedirect(localizedUrl(route('app.home', absolute: false)));
});

test('unverified app users are redirected from app guest pages to verification notice', function () {
    $user = User::factory()->unverified()->create();

    $this->actingAs($user, 'web')
        ->get(route('login'))
        ->assertRedirect(localizedUrl(route('verification.notice', absolute: false)));
});

test('authenticated admins are redirected away from admin guest pages', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin, 'admin')
        ->get(route('admin.login'))
        ->assertRedirect(route('admin.dashboard'));
});

test('unverified admins are redirected from admin guest pages to the admin dashboard', function () {
    $admin = User::factory()->admin()->unverified()->create();

    $this->actingAs($admin, 'admin')
        ->get(route('admin.login'))
        ->assertRedirect(route('admin.dashboard'));
});

test('authenticated admins may still access app guest login routes', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin, 'admin')
        ->followingRedirects()
        ->get(route('login'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('app/pages/auth/login'));
});
