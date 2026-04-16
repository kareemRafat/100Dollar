<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AppIdeaController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('app/submit-idea');
    }

    public function show(): Response
    {
        return Inertia::render('app/ideas/show');
    }
}
