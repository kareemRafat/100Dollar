<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class IdeaController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('app/pages/my-ideas');
    }

    public function create(): Response
    {
        return Inertia::render('app/pages/submit-idea');
    }

    public function show(): Response
    {
        return Inertia::render('app/pages/ideas/show');
    }
}
