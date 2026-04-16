<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AppProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('app/profile', [
            'user' => $request->user()->only('name', 'email'),
        ]);
    }
}
