import { Head, router, Link } from '@inertiajs/react';
import { Eye, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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
import type { BreadcrumbItem, Paginated, SponsorshipRequest } from '@/types';

interface SponsorshipRequestsProps {
    requests: Paginated<SponsorshipRequest>;
    filters: {
        status?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: admin.dashboard().url,
    },
    {
        title: 'طلبات الرعاية',
        href: admin.sponsorshipRequests.index().url,
    },
];

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'approved':
            return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="me-1 h-3 w-3" /> مقبول</Badge>;
        case 'rejected':
            return <Badge variant="destructive"><XCircle className="me-1 h-3 w-3" /> مرفوض</Badge>;
        default:
            return <Badge variant="secondary"><Clock className="me-1 h-3 w-3" /> قيد المراجعة</Badge>;
    }
};

export default function SponsorshipRequestsPage({ requests, filters }: SponsorshipRequestsProps) {
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<SponsorshipRequest | null>(null);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const params: any = {};

        if (statusFilter !== 'all') {
            params.status = statusFilter;
        }

        router.get(admin.sponsorshipRequests.index().url, params, {
            preserveState: true,
            replace: true,
        });
    }, [statusFilter]);

    const handleDeleteClick = (request: SponsorshipRequest) => {
        setSelectedRequest(request);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteSubmit = () => {
        if (!selectedRequest) {
            return ;
        }

        router.delete(admin.sponsorshipRequests.destroy(selectedRequest.id).url, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                toast.success('تم حذف الطلب بنجاح');
            },
        });
    };

    return (
        <>
            <Head title="طلبات الرعاية" />
            <div className="space-y-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-bold">طلبات الرعاية</h1>
                    <p className="text-sm text-muted-foreground">
                        مراجعة وإدارة طلبات الانضمام كرعاة للمنصة
                    </p>
                </div>

                <Card>
                    <CardHeader className="flex flex-col space-y-4 pb-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                        <CardTitle>قائمة الطلبات</CardTitle>
                        <div className="flex items-center gap-3">
                            <Select
                                dir="rtl"
                                value={statusFilter}
                                onValueChange={setStatusFilter}
                            >
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="تصفية حسب الحالة" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">الكل</SelectItem>
                                    <SelectItem value="pending">قيد المراجعة</SelectItem>
                                    <SelectItem value="approved">مقبول</SelectItem>
                                    <SelectItem value="rejected">مرفوض</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 sm:p-6 sm:pt-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12 text-center">#</TableHead>
                                        <TableHead>الشركة</TableHead>
                                        <TableHead>البريد الإلكتروني</TableHead>
                                        <TableHead>الدولة</TableHead>
                                        <TableHead>التاريخ</TableHead>
                                        <TableHead>الحالة</TableHead>
                                        <TableHead className="text-end">الإجراءات</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {requests.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="h-48 text-center text-muted-foreground">
                                                لا يوجد طلبات رعاية تطابق المعايير.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        requests.data.map((request, index) => (
                                            <TableRow key={request.id}>
                                                <TableCell className="text-center font-bold text-muted-foreground">
                                                    {(requests.meta.current_page - 1) * 10 + index + 1}
                                                </TableCell>
                                                <TableCell className="font-medium">{request.company_name}</TableCell>
                                                <TableCell>{request.email}</TableCell>
                                                <TableCell>{request.country?.name_ar || '-'}</TableCell>
                                                <TableCell className="text-sm font-bold text-muted-foreground">
                                                    {new Date(request.created_at).toISOString().split('T')[0]}
                                                </TableCell>
                                                <TableCell>{getStatusBadge(request.status)}</TableCell>
                                                <TableCell className="text-end">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link 
                                                            href={admin.sponsorshipRequests.show(request.id).url}
                                                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary/10 px-4 text-sm font-bold text-primary hover:bg-primary/20 transition-colors"
                                                        >
                                                            <Eye className="me-2 h-4 w-4" />
                                                            مراجعة
                                                        </Link>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDeleteClick(request)}
                                                            className="h-9 w-9 text-destructive hover:bg-destructive/10"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="mt-6">
                            <Pagination links={requests.links as any} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Delete Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="p-6" dir="rtl">
                    <div className="space-y-4">
                        <DialogHeader>
                            <DialogTitle className="text-start">حذف الطلب</DialogTitle>
                            <DialogDescription className="text-start">
                                هل أنت متأكد من حذف طلب الرعاية الخاص بـ {selectedRequest?.company_name}؟ لا يمكن التراجع عن هذا الإجراء.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-6 flex flex-row items-center justify-start gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsDeleteModalOpen(false)}>إلغاء</Button>
                            <Button type="button" variant="destructive" onClick={handleDeleteSubmit}>
                                حذف نهائي
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

SponsorshipRequestsPage.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>
);
