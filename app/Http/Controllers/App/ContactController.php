<?php

namespace App\Http\Controllers\App;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\User;
use App\Notifications\NewContactMessageNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('app/pages/contact');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $contactMessage = ContactMessage::create([
            ...$validated,
            'locale' => app()->getLocale(),
        ]);

        $admins = User::where('role', UserRole::ADMIN)->get();

        foreach ($admins as $admin) {
            $admin->notify((new NewContactMessageNotification($contactMessage))->locale($contactMessage->locale));
        }

        return back()->with('success', __('messages.contact.success_message'));
    }
}
