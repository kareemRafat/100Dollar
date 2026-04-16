<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AppPageController extends Controller
{
    public function about(): Response
    {
        return Inertia::render('app/about');
    }

    public function archive(): Response
    {
        return Inertia::render('app/archive');
    }

    public function sponsors(): Response
    {
        return Inertia::render('app/sponsors');
    }

    public function contact(): Response
    {
        return Inertia::render('app/contact');
    }

    public function howItWorks(): Response
    {
        return Inertia::render('app/how-it-works');
    }

    public function terms(): Response
    {
        return Inertia::render('app/terms');
    }
}
