import { useLang } from '@erag/lang-sync-inertia/react';
import { Link, usePage, router, usePoll } from '@inertiajs/react';
import { Bell, Inbox } from 'lucide-react';
import { useState } from 'react';
import {
    markAsRead,
    markAllAsRead,
} from '@/actions/App/Http/Controllers/App/NotificationController';
import { Button } from '@/app/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { show } from '@/routes/app/ideas';
import { notifications as notificationsIndex } from '@/routes/app/profile';

export function NotificationBell() {
    const { auth, locale } = usePage().props as any;
    const { __ } = useLang();
    const [open, setOpen] = useState(false);

    // Poll for new notifications every 60 seconds
    usePoll(60000, {
        only: ['auth'],
    });

    const unreadCount = auth.unread_notifications_count || 0;
    const notifications = auth.notifications_dropdown || [];

    const handleMarkAsRead = (id: number) => {
        router.patch(
            markAsRead.url(),
            { id, is_read: true },
            {
                preserveScroll: true,
            },
        );
    };

    const handleMarkAllAsRead = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.patch(
            markAllAsRead.url(),
            {},
            {
                preserveScroll: true,
            },
        );
    };

    // Helper for relative time (simple version)
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor(
            (now.getTime() - date.getTime()) / 1000,
        );

        if (diffInSeconds < 60) {
            return locale === 'ar' ? 'الآن' : 'Just now';
        }

        if (diffInSeconds < 3600) {
            const mins = Math.floor(diffInSeconds / 60);

            return locale === 'ar' ? `قبل ${mins} دقيقة` : `${mins}m ago`;
        }

        if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);

            return locale === 'ar' ? `قبل ${hours} ساعة` : `${hours}h ago`;
        }

        const days = Math.floor(diffInSeconds / 86400);

        return locale === 'ar' ? `قبل ${days} يوم` : `${days}d ago`;
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative size-10 rounded-full text-on-surface-variant hover:bg-surface-container-high dark:text-on-surface-variant dark:hover:bg-white/5"
                    asChild
                >
                    <button className="relative flex items-center justify-center">
                        <Bell className="size-6" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white ring-2 ring-surface dark:ring-surface shadow-sm z-20">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </button>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-80 rounded-xl border-outline-variant/10 p-0 shadow-xl dark:bg-surface-container-low"
            >
                <div className="flex items-center justify-between border-b border-outline-variant/10 px-4 py-3 dark:border-white/5">
                    <h3 className="text-sm font-bold text-on-surface dark:text-white">
                        {__('messages.notifications.title')}
                    </h3>
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="cursor-pointer text-[10px] font-bold text-primary hover:underline"
                        >
                            {__('messages.notifications.mark_all_read')}
                        </button>
                    )}
                </div>

                <div className="no-scrollbar max-h-[350px] overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map((notification: any) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className={cn(
                                    'flex cursor-pointer flex-col items-start gap-1 border-b border-outline-variant/5 px-4 py-3 last:border-0 hover:bg-surface-container-high dark:hover:bg-white/5',
                                    !notification.is_read &&
                                        'bg-primary/5 dark:bg-primary/5',
                                )}
                                onSelect={() => {
                                    if (!notification.is_read) {
                                        handleMarkAsRead(notification.id);
                                    }

                                    // Handle redirection based on data
                                    if (notification.data?.idea_id) {
                                        router.visit(
                                            show(notification.data.idea_id).url,
                                        );
                                    }
                                }}
                            >
                                <div className="flex w-full items-start justify-between gap-2">
                                    <span
                                        className={cn(
                                            'text-[13px] leading-tight font-bold',
                                            notification.is_read
                                                ? 'text-on-surface-variant'
                                                : 'text-on-surface dark:text-white',
                                        )}
                                    >
                                        {notification.title}
                                    </span>
                                    {!notification.is_read && (
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    )}
                                </div>
                                <p className="line-clamp-2 text-[11px] text-on-surface-variant">
                                    {notification.body}
                                </p>
                                <span className="mt-1 text-[9px] text-on-surface-variant/70">
                                    {formatTime(notification.created_at)}
                                </span>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface-container dark:bg-white/5">
                                <Inbox className="size-6 text-on-surface-variant/40" />
                            </div>
                            <p className="text-xs font-bold text-on-surface-variant">
                                {__('messages.notifications.empty')}
                            </p>
                        </div>
                    )}
                </div>

                <DropdownMenuSeparator className="m-0 bg-outline-variant/10 dark:bg-white/5" />
                <Link
                    href={notificationsIndex().url}
                    className="flex w-full items-center justify-center py-2.5 text-xs font-bold text-primary hover:bg-surface-container-high dark:hover:bg-white/5"
                    onClick={() => setOpen(false)}
                >
                    {__('messages.notifications.view_all')}
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
