import { Head, router } from '@inertiajs/react';
import { Inbox, CheckCheck, Clock, Eye } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import {
    markAsRead,
    markAllAsRead,
} from '@/actions/App/Http/Controllers/Admin/NotificationController';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import admin from '@/routes/admin';
import type { BreadcrumbItem, Paginated } from '@/types';

interface Notification {
    id: number;
    type: string;
    title: string;
    body: string;
    is_read: boolean;
    data: any;
    created_at: string;
}

interface NotificationsProps {
    notifications: Paginated<Notification>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: admin.dashboard().url,
    },
    {
        title: 'التنبيهات',
        href: admin.notifications.index().url,
    },
];

export default function NotificationsPage({
    notifications,
}: NotificationsProps) {
    const hasUnread = notifications.data.some((n) => !n.is_read);

    const handleMarkAllAsRead = () => {
        router.patch(
            markAllAsRead.url(),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('تم تحديد جميع التنبيهات كمقروءة');
                },
            },
        );
    };

    const handleNotificationClick = (notification: Notification) => {
        const url = notification.data?.url ?? admin.ideas.show(notification.data?.idea_id).url;
        const returnUrl = admin.notifications.index().url;
        const targetUrl = url ? `${url}?returnTo=${encodeURIComponent(returnUrl)}` : null;

        if (!notification.is_read) {
            router.patch(
                markAsRead.url(),
                { id: notification.id, is_read: true },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        if (targetUrl) {
router.visit(targetUrl);
}
                    },
                },
            );
        } else if (targetUrl) {
            router.visit(targetUrl);
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);

        return new Intl.DateTimeFormat('ar-SA', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date);
    };

    return (
        <>
            <Head title="التنبيهات" />
            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">التنبيهات</h1>
                        <p className="text-sm font-semibold text-muted-foreground">
                            إدارة ومتابعة آخر التنبيهات والنشاطات في المنصة
                        </p>
                    </div>

                    {hasUnread && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary/10 px-4 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
                        >
                            <CheckCheck className="me-2 h-4 w-4" />
                            تحديد الكل كمقروء
                        </button>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-bold">
                            قائمة التنبيهات
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 sm:p-6 sm:pt-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12 text-center font-bold">
                                            #
                                        </TableHead>
                                        <TableHead className="min-w-50 font-bold">
                                            التنبيه
                                        </TableHead>
                                        <TableHead className="min-w-30 font-bold">
                                            التاريخ
                                        </TableHead>
                                        <TableHead className="min-w-20 text-center font-bold">
                                            الحالة
                                        </TableHead>
                                        <TableHead className="min-w-25 text-end font-bold">
                                            الإجراءات
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {notifications.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={5}
                                                className="h-72 text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center space-y-4">
                                                    <div className="rounded-full bg-muted p-4">
                                                        <Inbox className="h-10 w-10 text-muted-foreground" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-xl font-bold">
                                                            لا توجد تنبيهات
                                                        </p>
                                                        <p className="text-sm font-semibold text-muted-foreground">
                                                            لم تصلك أي تنبيهات
                                                            بعد.
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        notifications.data.map(
                                            (notification, index) => (
                                                <TableRow
                                                    key={notification.id}
                                                    className={cn(
                                                        'transition-colors',
                                                        !notification.is_read &&
                                                            'bg-primary/5 hover:bg-primary/10',
                                                    )}
                                                >
                                                    <TableCell className="text-center font-bold text-muted-foreground">
                                                        {((notifications.meta
                                                            ?.current_page ||
                                                            1) -
                                                            1) *
                                                            (notifications.meta
                                                                ?.per_page ||
                                                                20) +
                                                            index +
                                                            1}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col gap-1">
                                                            <span
                                                                className={cn(
                                                                    'text-sm font-bold md:text-base',
                                                                    notification.is_read
                                                                        ? 'text-muted-foreground'
                                                                        : 'text-foreground',
                                                                )}
                                                            >
                                                                {
                                                                    notification.title
                                                                }
                                                            </span>
                                                            <p className="line-clamp-1 text-xs font-medium text-muted-foreground">
                                                                {
                                                                    notification.body
                                                                }
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                                            <Clock className="size-3" />
                                                            {formatTime(
                                                                notification.created_at,
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {!notification.is_read && (
                                                            <div className="flex justify-center">
                                                                <span className="h-2 w-2 rounded-full bg-primary" />
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-end">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    handleNotificationClick(
                                                                        notification,
                                                                    )
                                                                }
                                                                className="inline-flex h-8 items-center justify-center rounded-md bg-primary/10 px-3 text-xs font-bold text-primary transition-colors hover:bg-primary/20"
                                                            >
                                                                <Eye className="me-1.5 h-3.5 w-3.5" />
                                                                عرض
                                                            </button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="mt-6">
                            <Pagination
                                links={notifications.meta?.links || []}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

NotificationsPage.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>
);
