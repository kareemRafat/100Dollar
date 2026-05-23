import { useLang } from '@erag/lang-sync-inertia/react';
import { Link, usePage, router, usePoll } from '@inertiajs/react';
import { Bell, Inbox } from 'lucide-react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
    dropdown,
    markAsRead,
    markAllAsRead,
} from '@/actions/App/Http/Controllers/App/NotificationController';
import { Button } from '@/app/components/ui/button';
import { Skeleton } from '@/app/components/ui/skeleton';
import {
    resolveNotificationBody,
    resolveNotificationTitle,
} from '@/app/lib/notifications';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn, getLocalizedPath } from '@/lib/utils';
import { show } from '@/routes/app/ideas';
import { notifications as notificationsPage } from '@/routes/app/profile';

export function NotificationBell() {
    const { auth, locale } = usePage().props as any;
    const { __ } = useLang();
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasLoadedNotifications, setHasLoadedNotifications] = useState(false);
    const [lastLoadedUnreadCount, setLastLoadedUnreadCount] = useState<
        number | null
    >(null);

    // Poll for new notifications every 60 seconds
    usePoll(60000, {
        only: ['auth'],
    });

    const unreadCount = auth.unread_notifications_count || 0;

    const loadNotifications = async () => {
        setLoading(true);

        try {
            const response = await fetch(
                getLocalizedPath(dropdown.url(), locale),
                {
                    headers: {
                        Accept: 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    credentials: 'same-origin',
                },
            );

            if (!response.ok) {
                return;
            }

            const data = await response.json();

            setNotifications(Array.isArray(data) ? data : []);
            setHasLoadedNotifications(true);
            setLastLoadedUnreadCount(unreadCount);
        } catch (error) {
            console.error('Failed to load notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (
            open &&
            (!hasLoadedNotifications || lastLoadedUnreadCount !== unreadCount)
        ) {
            void loadNotifications();
        }
    }, [hasLoadedNotifications, lastLoadedUnreadCount, open, unreadCount]);

    const handleMarkAsRead = (id: number, onFinish?: () => void) => {
        router.patch(
            markAsRead.url(),
            { id, is_read: true },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setNotifications((currentNotifications) =>
                        currentNotifications.map((notification) =>
                            notification.id === id
                                ? { ...notification, is_read: true }
                                : notification,
                        ),
                    );
                },
                onFinish: () => {
                    if (onFinish) onFinish();
                },
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
                onSuccess: () => {
                    setNotifications((currentNotifications) =>
                        currentNotifications.map((notification) => ({
                            ...notification,
                            is_read: true,
                        })),
                    );
                },
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

            return locale === 'ar'
                ? `قبل ${formattedMins(mins)} دقيقة`
                : `${mins}m ago`;
        }

        if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);

            return locale === 'ar'
                ? `قبل ${formattedMins(hours)} ساعة`
                : `${hours}h ago`;
        }

        const days = Math.floor(diffInSeconds / 86400);

        return locale === 'ar'
            ? `قبل ${formattedMins(days)} يوم`
            : `${days}d ago`;
    };

    // Helper to format numbers in Arabic locale if needed, otherwise fallback to simple number
    const formattedMins = (num: number) => num;

    return (
        <DropdownMenu
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);

                if (
                    nextOpen &&
                    (!hasLoadedNotifications ||
                        lastLoadedUnreadCount !== unreadCount)
                ) {
                    void loadNotifications();
                }
            }}
        >
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
                            <span className="absolute -top-0.5 -right-0.5 z-20 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-surface dark:ring-surface">
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
                    {loading ? (
                        <div className="flex flex-col">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="flex flex-col gap-2 border-b border-outline-variant/5 px-4 py-3 last:border-0"
                                >
                                    <div className="flex w-full items-start justify-between gap-2">
                                        <Skeleton className="h-4 w-2/3" />
                                        <Skeleton className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/20" />
                                    </div>
                                    <Skeleton className="h-3 w-5/6" />
                                    <Skeleton className="h-2.5 w-1/4" />
                                </div>
                            ))}
                        </div>
                    ) : notifications.length > 0 ? (
                        notifications.map((notification: any) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className={cn(
                                    'flex cursor-pointer flex-col items-start gap-1 border-b border-outline-variant/5 px-4 py-3 last:border-0 hover:bg-surface-container-high dark:hover:bg-white/5',
                                    !notification.is_read &&
                                        'bg-primary/5 dark:bg-primary/5',
                                )}
                                onSelect={() => {
                                    const targetUrl =
                                        notification.data?.url ??
                                        (notification.data?.idea_id
                                            ? show(notification.data.idea_id)
                                                  .url
                                            : null);

                                    const navigate = () => {
                                        if (targetUrl) {
                                            router.visit(
                                                getLocalizedPath(
                                                    targetUrl,
                                                    locale,
                                                ),
                                            );
                                        }
                                    };

                                    if (!notification.is_read) {
                                        handleMarkAsRead(
                                            notification.id,
                                            navigate,
                                        );
                                    } else {
                                        navigate();
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
                                        {resolveNotificationTitle(
                                            notification,
                                            __,
                                        )}
                                    </span>
                                    {!notification.is_read && (
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    )}
                                </div>
                                <p className="line-clamp-2 text-[11px] text-on-surface-variant">
                                    {resolveNotificationBody(notification, __)}
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
                    href={notificationsPage().url}
                    className="flex w-full items-center justify-center py-2.5 text-xs font-bold text-primary hover:bg-surface-container-high dark:hover:bg-white/5"
                    onClick={() => setOpen(false)}
                >
                    {__('messages.notifications.view_all')}
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
