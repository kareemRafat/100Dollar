import { Head, Link, router } from '@inertiajs/react';
import {
    CheckCircle2,
    Clock3,
    Eye,
    Mail,
    MessageSquare,
    Search,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import admin from '@/routes/admin';
import type { BreadcrumbItem, ContactMessage, Paginated } from '@/types';

interface ContactsIndexProps {
    contactMessages: Paginated<ContactMessage>;
    filters: {
        search?: string;
        status?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: admin.dashboard().url,
    },
    {
        title: 'رسائل التواصل',
        href: admin.contacts.index().url,
    },
];

export default function ContactsIndexPage({
    contactMessages,
    filters,
}: ContactsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const timeout = setTimeout(() => {
            router.get(
                admin.contacts.index().url,
                {
                    search: search || undefined,
                    status: status === 'all' ? undefined : status,
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, status]);

    return (
        <>
            <Head title="رسائل التواصل" />

            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">رسائل التواصل</h1>
                        <p className="text-sm font-semibold text-muted-foreground">
                            متابعة رسائل الزوار والرد عليها من لوحة التحكم
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <CardTitle className="font-bold">قائمة الرسائل</CardTitle>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="relative w-full sm:w-72">
                                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                                    <Search className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <Input
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="بحث بالاسم أو البريد أو الموضوع"
                                    className="ps-10"
                                />
                            </div>

                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="w-full sm:w-44">
                                    <SelectValue placeholder="حالة الرسالة" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">الكل</SelectItem>
                                    <SelectItem value="pending">بانتظار الرد</SelectItem>
                                    <SelectItem value="replied">تم الرد</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0 sm:p-6 sm:pt-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="font-bold">المرسل</TableHead>
                                        <TableHead className="font-bold">الموضوع</TableHead>
                                        <TableHead className="font-bold">الحالة</TableHead>
                                        <TableHead className="font-bold">تاريخ الإرسال</TableHead>
                                        <TableHead className="text-end font-bold">الإجراء</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {contactMessages.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-72 text-center">
                                                <div className="flex flex-col items-center justify-center gap-4">
                                                    <div className="rounded-full bg-muted p-4">
                                                        <MessageSquare className="h-10 w-10 text-muted-foreground" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-xl font-bold">لا توجد رسائل</p>
                                                        <p className="text-sm font-semibold text-muted-foreground">
                                                            لم يتم العثور على رسائل مطابقة للفلاتر الحالية.
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        contactMessages.data.map((contactMessage) => (
                                            <TableRow key={contactMessage.id}>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="font-bold">{contactMessage.name}</div>
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                            <Mail className="size-3.5" />
                                                            <span>{contactMessage.email}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="max-w-sm truncate font-semibold">
                                                        {contactMessage.subject}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {contactMessage.is_replied ? (
                                                        <Badge className="bg-green-100 font-bold text-green-800 hover:bg-green-100">
                                                            <CheckCircle2 className="me-1 size-3.5" />
                                                            تم الرد
                                                        </Badge>
                                                    ) : (
                                                        <Badge
                                                            variant="secondary"
                                                            className="bg-amber-100 font-bold text-amber-800 hover:bg-amber-100"
                                                        >
                                                            <Clock3 className="me-1 size-3.5" />
                                                            بانتظار الرد
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-sm font-semibold text-muted-foreground">
                                                    {new Date(contactMessage.created_at).toLocaleString('ar-EG')}
                                                </TableCell>
                                                <TableCell className="text-end">
                                                    <Link
                                                        href={admin.contacts.show(contactMessage.id).url}
                                                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary/10 px-3 text-xs font-bold text-primary transition-colors hover:bg-primary/20"
                                                    >
                                                        <Eye className="me-1.5 size-3.5" />
                                                        عرض
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="mt-6">
                            <Pagination links={contactMessages.meta.links} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ContactsIndexPage.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>
);
