<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Idea;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        return Inertia::render('app/pages/idea/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'category' => ['required', 'string'],
            'country' => ['required', 'string'],
            'city' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:2048'], // 2MB
            'pdf_file' => ['nullable', 'file', 'mimes:pdf', 'max:5120'], // 5MB
            'agreed_terms' => ['required', 'accepted'],
            'agreed_privacy' => ['required', 'accepted'],
            'agreed_legal' => ['required', 'accepted'],
        ]);

        $idea = DB::transaction(function () use ($validated, $request) {
            /** @var Idea $idea */
            $idea = auth()->user()->ideas()->create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'category' => $validated['category'],
                'country' => $validated['country'],
                'city' => $validated['city'],
                'status' => 'pending',
                'submission_day' => now()->dayOfWeek,
                'week_number' => now()->weekOfYear,
                'year' => now()->year,
            ]);

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('ideas/images', 'public');
                $idea->media()->create([
                    'file_path' => $path,
                    'file_name' => $request->file('image')->getClientOriginalName(),
                    'mime_type' => $request->file('image')->getMimeType(),
                    'file_size' => $request->file('image')->getSize(),
                    'collection_name' => 'image',
                    'disk' => 'public',
                ]);
            }

            if ($request->hasFile('pdf_file')) {
                $path = $request->file('pdf_file')->store('ideas/pdfs', 'public');
                $idea->media()->create([
                    'file_path' => $path,
                    'file_name' => $request->file('pdf_file')->getClientOriginalName(),
                    'mime_type' => $request->file('pdf_file')->getMimeType(),
                    'file_size' => $request->file('pdf_file')->getSize(),
                    'collection_name' => 'pdf',
                    'disk' => 'public',
                ]);

                // Keep backward compatibility
                $idea->update(['pdf_file' => $path]);
            }

            return $idea;
        });

        // TODO: Send internal admin notification
        // $adminUsers = User::where('role', 'admin')->get();
        // Notification::send($adminUsers, new NewIdeaSubmitted($idea));

        return redirect()->route('app.ideas.index')
            ->with('success', __('messages.idea_submitted_successfully'));
    }

    public function show(Idea $idea): Response
    {
        $idea->load(['user', 'sponsor']);
        $idea->loadCount(['votes', 'comments']);

        return Inertia::render('app/pages/idea/show', [
            'idea' => $idea,
            'comments' => Inertia::scroll(fn () => $idea->comments()
                ->with(['user:id,name,avatar'])
                ->withCount('likes')
                ->latest('id')
                ->cursorPaginate(7)
            ),
            'isFollowingIdea' => auth()->check() ? auth()->user()->followedIdeas()->where('idea_id', $idea->id)->exists() : false,
            'isFollowingOwner' => auth()->check() ? auth()->user()->following()->where('following_id', $idea->user_id)->exists() : false,
        ]);
    }

    public function toggleFollow(Idea $idea)
    {
        $user = auth()->user();
        $follow = $user->followedIdeas()->where('idea_id', $idea->id)->first();

        if ($follow) {
            $follow->delete();
        } else {
            $user->followedIdeas()->create(['idea_id' => $idea->id]);
        }

        return back();
    }
}
