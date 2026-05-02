import { useLang } from '@erag/lang-sync-inertia/react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Bell, Clock } from 'lucide-react';
import { read } from '@/routes/app/profile/notifications';

type Notification = {
    id: number;
    title: string;
    body: string;
    is_read: boolean;
    created_at: string;
};

type Props = {
    notifications: Notification[];
};

export default function Notifications({ notifications = [] }: Props) {
    const { __ } = useLang();
    const { props: pageProps } = usePage();
    const locale = pageProps.locale as string;

    const handleMarkAsRead = (id: number) => {
        router.patch(read(id).url, {}, {
            preserveScroll: true,
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(locale, {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date);
    };

    if (notifications.length === 0) {
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
            <h2 className="text-xl font-bold text-secondary dark:text-white">
                {__('messages.profile.notifications')} ({notifications.length})
            </h2>

            <div className="space-y-3">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        onClick={() => !notification.is_read && handleMarkAsRead(notification.id)}
                        className={`group relative flex gap-4 rounded-xl border p-4 transition-all ${
                            notification.is_read
                                ? 'border-outline-variant/10 bg-surface-container-lowest dark:bg-surface-container-low opacity-75'
                                : 'border-primary/20 bg-primary/5 cursor-pointer hover:shadow-md dark:bg-primary/10'
                        }`}
                    >
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                            notification.is_read
                                ? 'bg-surface-container-high text-on-surface-variant/60 dark:bg-white/5'
                                : 'bg-primary/10 text-primary'
                        }`}>
                            <Bell className="size-5" />
                        </div>

                        <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className={`text-sm font-bold ${
                                    notification.is_read ? 'text-secondary dark:text-white/80' : 'text-secondary dark:text-white'
                                }`}>
                                    {notification.title}
                                </h3>
                                <div className="flex items-center me-5 gap-1 text-[10px] text-on-surface-variant/40">
                                    <Clock className="size-3" />
                                    {formatDate(notification.created_at)}
                                </div>
                            </div>
                            <p className="text-xs text-on-surface-variant/60">
                                {notification.body}
                            </p>
                        </div>

                        {!notification.is_read && (
                            <div className="absolute top-4 end-4 mt-1">
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
