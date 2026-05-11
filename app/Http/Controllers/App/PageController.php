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

    public function privacy(): Response
    {
        return Inertia::render('app/pages/privacy');
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
