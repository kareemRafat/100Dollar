<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Http\Resources\App\UserResource;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class NotificationController extends Controller
{
    /**
     * Display a listing of the notifications.
     */
    public function index(Request $request): Response
    {
        $user = $request->user()->load('media');

        $notifications = $user->customNotifications()
            ->latest()
            ->paginate(20);

        return Inertia::render('app/pages/profile', [
            'user' => new UserResource($user),
            'notifications' => $notifications,
            'activeSection' => 'notifications',
            'canManageTwoFactor' => Features::canManageTwoFactorAuthentication(),
            'twoFactorEnabled' => $user->hasEnabledTwoFactorAuthentication(),
            'requiresConfirmation' => Features::optionEnabled(Features::twoFactorAuthentication(), 'confirm'),
        ]);
    }

    /**
     * Return the latest notifications for the bell dropdown.
     */
    public function dropdown(Request $request): JsonResponse
    {
        return response()->json(
            $request->user()
                ->customNotifications()
                ->latest()
                ->limit(10)
                ->get()
        );
    }

    /**
     * Mark a notification as read or unread.
     */
    public function markAsRead(Request $request): RedirectResponse
    {
        $notificationId = $request->input('id');
        $status = $request->boolean('is_read', true);

        $notification = Notification::where('user_id', auth()->id())
            ->where('id', $notificationId)
            ->firstOrFail();

        $notification->update([
            'is_read' => $status,
            'read_at' => $status ? now() : null,
        ]);

        return back();
    }

    /**
     * Mark all notifications as read for the current user.
     */
    public function markAllAsRead(): RedirectResponse
    {
        Notification::where('user_id', auth()->id())
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now(),
            ]);

        return back();
    }
}
