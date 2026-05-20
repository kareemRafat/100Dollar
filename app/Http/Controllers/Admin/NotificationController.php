<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    /**
     * Display a listing of the notifications.
     */
    public function index(Request $request): Response
    {
        $notifications = $request->user()
            ->customNotifications()
            ->latest()
            ->paginate(20);

        return Inertia::render('admin/pages/notifications/index', [
            'notifications' => $notifications,
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
     * Mark a notification as read.
     */
    public function markAsRead(Request $request): RedirectResponse
    {
        $notification = Notification::where('user_id', auth()->id())
            ->where('id', $request->id)
            ->firstOrFail();

        $notification->update([
            'is_read' => true,
            'read_at' => now(),
        ]);

        return back();
    }

    /**
     * Mark all notifications as read.
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
