<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $role = $request->input('role');
        $status = $request->input('status');
        $countryId = $request->input('country_id');

        $users = User::query()
            ->with(['media', 'country'])
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->when($role, function ($query, $role) {
                $query->where('role', $role);
            })
            ->when($status !== null && $status !== '', function ($query) use ($status) {
                $query->where('is_active', $status === 'active');
            })
            ->when($countryId, function ($query, $countryId) {
                $query->where('country_id', $countryId);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/pages/users', [
            'users' => $users,
            'countries' => Country::all(),
            'filters' => $request->only(['search', 'role', 'status', 'country_id']),
        ]);
    }

    /**
     * Display the specified user.
     */
    public function show(User $user): Response
    {
        $user->load(['country', 'media', 'ideas', 'votes.idea']);

        return Inertia::render('admin/pages/users/show', [
            'user' => $user,
        ]);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', 'string', Rule::in(['admin', 'user'])],
            'country_id' => ['required', 'exists:countries,id'],
            'phone' => ['nullable', 'string', 'max:20'],
            'is_active' => ['required', 'boolean'],
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'country_id' => $validated['country_id'],
            'phone' => $validated['phone'],
            'is_active' => $validated['is_active'],
            'email_verified_at' => now(),
        ]);

        return back()->with('status', 'user-created');
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)->ignore($user->id)],
            'role' => ['required', 'string', Rule::in(['admin', 'user'])],
            'country_id' => ['required', 'exists:countries,id'],
            'phone' => ['nullable', 'string', 'max:20'],
            'is_active' => ['required', 'boolean'],
        ]);

        if ($request->filled('password')) {
            $request->validate([
                'password' => ['string', 'min:8'],
            ]);
            $user->password = Hash::make($request->password);
        }

        $user->update($validated);

        return back()->with('status', 'user-updated');
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        if ($user->id === auth('admin')->id()) {
            return back()->withErrors(['error' => 'لا يمكنك حذف نفسك']);
        }

        $user->delete();

        return back()->with('status', 'user-deleted');
    }
}
