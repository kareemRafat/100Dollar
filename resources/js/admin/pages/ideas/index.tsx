import { Head, Link, router } from '@inertiajs/react';
import { Eye, Search, Lightbulb, User as UserIcon, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import type { BreadcrumbItem, Idea } from '@/types';

interface IdeasProps {
    ideas: {
        data: Idea[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: {
        status?: string;
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: admin.dashboard().url,
    },
    {
        title: 'إدارة الأفكار',
        href: admin.ideas.index().url,
    },
];

const statusTabs = [
    { id: 'pending', label: 'في انتظار المراجعة', icon: Clock, color: 'text-amber-500' },
    { id: 'approved', label: 'تمت الموافقة', icon: CheckCircle, color: 'text-green-500' },
    { id: 'rejected', label: 'مرفوضة', icon: XCircle, color: 'text-red-500' },
];

export default function IdeasPage({ ideas, filters }: IdeasProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'pending');

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const timeout = setTimeout(() => {
            router.get(admin.ideas.index().url, { search, status }, {
                preserveState: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, status]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-bold">تمت الموافقة</Badge>;
            case 'rejected':
                return <Badge variant="destructive" className="font-bold">مرفوضة</Badge>;
            default:
                return <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100 font-bold">قيد الانتظار</Badge>;
        }
    };

    return (
        <>
            <Head title="إدارة الأفكار" />
            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">إدارة الأفكار</h1>
                        <p className="text-sm text-muted-foreground font-semibold">
                            مراجعة وقبول أو رفض الأفكار المقدمة من المستخدمين
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2 border-b pb-4">
                        {statusTabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = status === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setStatus(tab.id)}
                                    className={cn(
                                        "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all",
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                    )}
                                >
                                    <Icon className={cn("size-4", !isActive && tab.color)} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    <Card>
                        <CardHeader className="flex flex-col space-y-4 pb-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                            <CardTitle className="font-bold">قائمة الأفكار</CardTitle>
                            <div className="relative w-full sm:w-64">
                                <div className="pointer-events-none absolute inset-y-0 inset-inline-start-0 flex items-center ps-3">
                                    <Search className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <Input
                                    type="search"
                                    placeholder="بحث في العناوين أو المستخدمين..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full ps-10 font-semibold"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 sm:p-6 sm:pt-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="min-w-50 font-bold">الفكرة وصاحبها</TableHead>
                                            <TableHead className="min-w-25 font-bold">التصنيف</TableHead>
                                            <TableHead className="min-w-30 font-bold">تاريخ التقديم</TableHead>
                                            <TableHead className="min-w-[100px] font-bold">الحالة</TableHead>
                                            <TableHead className="text-end min-w-[100px] font-bold">الإجراءات</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {ideas.data.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="h-72 text-center">
                                                    <div className="flex flex-col items-center justify-center space-y-4">
                                                        <div className="rounded-full bg-muted p-4">
                                                            <Lightbulb className="h-10 w-10 text-muted-foreground" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-xl font-bold">لا توجد أفكار</p>
                                                            <p className="text-sm text-muted-foreground font-semibold">
                                                                لا توجد أفكار تطابق المعايير المختارة حالياً.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            ideas.data.map((idea) => (
                                                <TableRow key={idea.id}>
                                                    <TableCell className="font-bold">
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-sm md:text-base">{idea.title}</span>
                                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-bold">
                                                                <UserIcon className="size-3.5" />
                                                                {idea.user?.name}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className="font-semibold">
                                                            {typeof idea.category === 'object' ? idea.category?.name_ar : idea.category}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
                                                            <Calendar className="size-3" />
                                                            {idea.date}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {getStatusBadge(idea.status)}
                                                    </TableCell>
                                                    <TableCell className="text-end">
                                                        <Link
                                                            href={admin.ideas.show(idea.id).url}
                                                            data={filters}
                                                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary/10 px-4 text-sm font-bold text-primary hover:bg-primary/20 transition-colors"
                                                        >
                                                            <Eye className="me-2 h-4 w-4" />
                                                            مراجعة
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="mt-6">
                                <Pagination links={ideas.links} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

IdeasPage.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>
);
