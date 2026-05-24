<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ContactMessageResource;
use App\Mail\ContactMessageReplyMail;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();
        $status = $request->string('status')->toString();

        $contactMessages = ContactMessage::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($innerQuery) use ($search) {
                    $innerQuery->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('subject', 'like', "%{$search}%")
                        ->orWhere('message', 'like', "%{$search}%");
                });
            })
            ->when($status === 'replied', function ($query) {
                $query->whereNotNull('replied_at');
            })
            ->when($status === 'pending', function ($query) {
                $query->whereNull('replied_at');
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/pages/contacts/index', [
            'contactMessages' => ContactMessageResource::collection($contactMessages),
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function show(ContactMessage $contactMessage): Response
    {
        return Inertia::render('admin/pages/contacts/show', [
            'contactMessage' => (new ContactMessageResource($contactMessage))->resolve(),
        ]);
    }

    public function reply(Request $request, ContactMessage $contactMessage): RedirectResponse
    {
        if ($contactMessage->is_replied) {
            return to_route('admin.contacts.show', $contactMessage)->withErrors([
                'reply_body' => 'تم الرد على هذه الرسالة مسبقاً.',
            ]);
        }

        $validated = $request->validate([
            'reply_body' => ['required', 'string', 'max:5000'],
        ]);

        Mail::to($contactMessage->email)->send(
            new ContactMessageReplyMail($contactMessage, $validated['reply_body'], $contactMessage->locale)
        );

        $contactMessage->update([
            'reply_body' => $validated['reply_body'],
            'replied_at' => now(),
        ]);

        return to_route('admin.contacts.show', $contactMessage);
    }

    public function destroy(ContactMessage $contactMessage): RedirectResponse
    {
        $contactMessage->delete();

        return to_route('admin.contacts.index');
    }
}
