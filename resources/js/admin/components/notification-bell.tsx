import { Link, usePage, router, usePoll } from '@inertiajs/react';
import { Bell, Inbox } from 'lucide-react';
import { useEffect, useCallback } from 'react';
import { useState } from 'react';
import {
    dropdown,
    markAsRead,
    markAllAsRead,
} from '@/actions/App/Http/Controllers/Admin/NotificationController';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import admin from '@/routes/admin';

export function NotificationBell() {
    const { auth } = usePage().props as any;
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [hasLoadedNotifications, setHasLoadedNotifications] = useState(false);
    const [lastLoadedUnreadCount, setLastLoadedUnreadCount] = useState<
        number | null
    >(null);

    // Poll for new notifications every 60 seconds
    usePoll(60000, {
        only: ['auth'],
    });

    const unreadCount = auth.unread_notifications_count || 0;

    const loadNotifications = useCallback(async () => {
        const response = await fetch(dropdown.url(), {
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'same-origin',
        });

        if (!response.ok) {
            return;
        }

        const data = await response.json();

        setNotifications(Array.isArray(data) ? data : []);
        setHasLoadedNotifications(true);
        setLastLoadedUnreadCount(unreadCount);
    }, [unreadCount]);

    useEffect(() => {
        if (
            open &&
            (!hasLoadedNotifications || lastLoadedUnreadCount !== unreadCount)
        ) {
            void loadNotifications();
        }
    }, [
        hasLoadedNotifications,
        lastLoadedUnreadCount,
        open,
        unreadCount,
        loadNotifications,
    ]);

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
                    if (onFinish) {
                        onFinish();
                    }
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

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor(
            (now.getTime() - date.getTime()) / 1000,
        );

        if (diffInSeconds < 60) {
            return 'الآن';
        }

        if (diffInSeconds < 3600) {
            const mins = Math.floor(diffInSeconds / 60);

            return `قبل ${mins} دقيقة`;
        }

        if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);

            return `قبل ${hours} ساعة`;
        }

        const days = Math.floor(diffInSeconds / 86400);

        return `قبل ${days} يوم`;
    };

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
                    className="relative size-10 rounded-full text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                    asChild
                >
                    <button className="relative flex items-center justify-center">
                        <Bell className="size-6" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 z-20 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-neutral-950">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </button>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-80 rounded-xl border-neutral-200 p-0 shadow-xl dark:border-neutral-800 dark:bg-neutral-950"
            >
                <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3 dark:border-neutral-800">
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                        التنبيهات
                    </h3>
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="cursor-pointer text-[10px] font-bold text-blue-600 hover:underline dark:text-blue-400"
                        >
                            تحديد الكل كمقروء
                        </button>
                    )}
                </div>

                <div className="no-scrollbar max-h-[350px] overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map((notification: any) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className={cn(
                                    'flex cursor-pointer flex-col items-start gap-1 border-b border-neutral-50 px-4 py-3 last:border-0 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900',
                                    !notification.is_read &&
                                        'bg-blue-50/50 dark:bg-blue-900/10',
                                )}
                                onSelect={() => {
                                    const targetUrl =
                                        (notification.data?.idea_id
                                            ? admin.ideas.show(
                                                  notification.data.idea_id,
                                              ).url
                                            : null) ?? notification.data?.url;

                                    const navigate = () => {
                                        if (targetUrl) {
                                            router.visit(targetUrl);
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
                                                ? 'text-neutral-500'
                                                : 'text-neutral-900 dark:text-white',
                                        )}
                                    >
                                        {notification.title}
                                    </span>
                                    {!notification.is_read && (
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                    )}
                                </div>
                                <p className="line-clamp-2 text-[11px] text-neutral-500">
                                    {notification.body}
                                </p>
                                <span className="mt-1 text-[9px] text-neutral-400">
                                    {formatTime(notification.created_at)}
                                </span>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                                <Inbox className="size-6 text-neutral-400" />
                            </div>
                            <p className="text-xs font-bold text-neutral-500">
                                لا توجد تنبيهات بعد
                            </p>
                        </div>
                    )}
                </div>

                <DropdownMenuSeparator className="m-0 dark:bg-neutral-800" />
                <Link
                    href={admin.notifications.index().url}
                    className="flex w-full cursor-pointer items-center justify-center py-2.5 text-xs font-bold text-blue-600 hover:bg-neutral-50 dark:text-blue-400 dark:hover:bg-neutral-900"
                    onClick={() => setOpen(false)}
                >
                    عرض جميع التنبيهات
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
