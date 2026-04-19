<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function about(): Response
    {
        return Inertia::render('app/pages/about');
    }

    public function archive(): Response
    {
        return Inertia::render('app/pages/archive');
    }

    public function sponsors(): Response
    {
        return Inertia::render('app/pages/sponsors');
    }

    public function contact(): Response
    {
        return Inertia::render('app/pages/contact');
    }

    public function howItWorks(): Response
    {
        return Inertia::render('app/pages/how-it-works');
    }

    public function terms(): Response
    {
        return Inertia::render('app/pages/terms');
    }
}
