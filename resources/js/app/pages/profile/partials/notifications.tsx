import { useLang } from '@erag/lang-sync-inertia/react';
import { router, usePage } from '@inertiajs/react';
import { Bell, Clock, CheckCheck } from 'lucide-react';
import { memo } from 'react';
import {
    markAsRead,
    markAllAsRead,
} from '@/actions/App/Http/Controllers/App/NotificationController';
import { toast } from '@/app/components/ui/toast';
import {
    resolveNotificationBody,
    resolveNotificationTitle,
} from '@/app/lib/notifications';
import { Pagination } from '@/components/ui/pagination';
import { cn, getLocalizedPath } from '@/lib/utils';
import { show } from '@/routes/app/ideas';

type Notification = {
    id: number;
    type: string;
    title: string;
    body: string;
    is_read: boolean;
    data: any;
    created_at: string;
};

type Props = {
    notifications: {
        data: Notification[];
        links: any[];
        meta: any;
    };
};

function Notifications({ notifications }: Props) {
    const { __ } = useLang();
    const { props: pageProps } = usePage();
    const locale = pageProps.locale as string;

    const items = Array.isArray(notifications)
        ? notifications
        : notifications?.data || [];
    const hasUnread = items.some((n) => !n.is_read);

    // Standardized pagination data retrieval
    const meta = (notifications as any)?.meta;
    const links = meta?.links || (notifications as any)?.links || [];
    const lastPage = meta?.last_page || (notifications as any)?.last_page || 1;
    const total = meta?.total || (notifications as any)?.total || items.length;

    const handleMarkAsRead = (id: number, isRead: boolean = true) => {
        router.patch(
            markAsRead.url(),
            { id, is_read: isRead },
            {
                preserveScroll: true,
            },
        );
    };

    const handleMarkAllAsRead = () => {
        router.patch(
            markAllAsRead.url(),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(
                        __('messages.profile.notifications'),
                        __('messages.profile.mark_all_read_success'),
                    );
                },
            },
        );
    };

    const handleNotificationClick = (notification: Notification) => {
        const targetUrl =
            notification.data?.url ??
            (notification.data?.idea_id
                ? show(notification.data.idea_id).url
                : null);

        if (targetUrl) {
            router.patch(
                markAsRead.url(),
                { id: notification.id, is_read: true },
                {
                    preserveScroll: true,
                    onFinish: () => {
                        router.visit(getLocalizedPath(targetUrl, locale));
                    },
                },
            );
        } else if (!notification.is_read) {
            handleMarkAsRead(notification.id, true);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        return new Intl.DateTimeFormat(locale, {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date);
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-outline-variant/20 bg-surface-container-lowest p-12 text-center dark:bg-surface-container-low">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Bell className="size-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-secondary dark:text-white">
                    {__('messages.profile.no_notifications')}
                </h3>
                <p className="max-w-sm text-on-surface-variant/60">
                    {__('messages.profile.notifications_empty_desc')}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-secondary dark:text-white">
                    {__('messages.profile.notifications')} ({total})
                </h2>

                {hasUnread && (
                    <button
                        onClick={handleMarkAllAsRead}
                        className="inline-flex items-center gap-2 text-xs font-bold text-primary transition-colors hover:text-primary/80"
                    >
                        <CheckCheck className="size-4" />
                        {__('messages.profile.mark_all_read')}
                    </button>
                )}
            </div>

            <div className="space-y-3">
                {items.map((notification) => (
                    <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`group relative flex gap-4 rounded-xl border p-4 transition-all ${
                            notification.is_read
                                ? 'border-outline-variant/10 bg-surface-container-lowest opacity-75 dark:bg-surface-container-low'
                                : 'cursor-pointer border-primary/20 bg-primary/5 hover:shadow-md dark:bg-primary/10'
                        }`}
                    >
                        <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                notification.is_read
                                    ? 'bg-surface-container-high text-on-surface-variant/60 dark:bg-white/5'
                                    : 'bg-primary/10 text-primary'
                            }`}
                        >
                            <Bell className="size-5" />
                        </div>

                        <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                                <h3
                                    className={`text-sm font-bold ${
                                        notification.is_read
                                            ? 'text-secondary dark:text-white/80'
                                            : 'text-secondary dark:text-white'
                                    }`}
                                >
                                    {resolveNotificationTitle(notification, __)}
                                </h3>
                                <div className="me-5 flex items-center gap-1 text-[10px] text-on-surface-variant/40">
                                    <Clock className="size-3" />
                                    {formatDate(notification.created_at)}
                                </div>
                            </div>
                            <p className="text-xs text-on-surface-variant/60">
                                {resolveNotificationBody(notification, __)}
                            </p>
                        </div>

                        {!notification.is_read && (
                            <div className="absolute end-4 top-4 mt-1">
                                <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {lastPage > 1 && (
                <div className="mt-8">
                    <Pagination links={links} only={['notifications']} />
                </div>
            )}
        </div>
    );
}

export default memo(Notifications);
