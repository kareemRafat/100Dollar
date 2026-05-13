import { Head, router } from '@inertiajs/react';
import { CheckCircle, Clock } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import type { BreadcrumbItem, Paginated, PrizeRecord, Sponsor } from '@/types';

interface PrizesProps {
    prizes: Paginated<PrizeRecord>;
    sponsors: Sponsor[];
    filters: {
        status?: string;
        sponsor_id?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: admin.dashboard().url,
    },
    {
        title: 'الجوائز والمدفوعات',
        href: admin.prizes.index().url,
    },
];

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'paid':
            return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="me-1 h-3 w-3" /> تم الدفع</Badge>;
        default:
            return <Badge variant="secondary"><Clock className="me-1 h-3 w-3" /> معلق</Badge>;
    }
};

export default function PrizesPage({ prizes, sponsors, filters }: PrizesProps) {
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [sponsorFilter, setSponsorFilter] = useState(filters.sponsor_id || 'all');

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

        if (sponsorFilter !== 'all') {
            params.sponsor_id = sponsorFilter;
        }

        router.get(admin.prizes.index().url, params, {
            preserveState: true,
            replace: true,
        });
    }, [statusFilter, sponsorFilter]);

    const handleToggleStatus = (prize: PrizeRecord) => {
        const newStatus = prize.status === 'paid' ? 'pending' : 'paid';
        router.patch(admin.prizes.updateStatus(prize.id).url, {
            status: newStatus
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('تم تحديث حالة الدفع');
            },
        });
    };

    return (
        <>
            <Head title="الجوائز والمدفوعات" />
            <div className="space-y-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-bold">الجوائز والمدفوعات</h1>
                    <p className="text-sm text-muted-foreground">
                        متابعة تسليم الجوائز للفائزين من قبل الرعاة
                    </p>
                </div>

                <Card>
                    <CardHeader className="flex flex-col space-y-4 pb-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                        <CardTitle>سجل الجوائز</CardTitle>
                        <div className="flex items-center gap-3">
                            <Select
                                dir="rtl"
                                value={sponsorFilter}
                                onValueChange={setSponsorFilter}
                            >
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="تصفية حسب الراعي" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">كل الرعاة</SelectItem>
                                    {sponsors.map((sponsor) => (
                                        <SelectItem key={sponsor.id} value={sponsor.id.toString()}>
                                            {sponsor.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                                    <SelectItem value="pending">معلق</SelectItem>
                                    <SelectItem value="paid">تم الدفع</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 sm:p-6 sm:pt-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>الراعي</TableHead>
                                        <TableHead>الفائز</TableHead>
                                        <TableHead>الفكرة</TableHead>
                                        <TableHead>المبلغ</TableHead>
                                        <TableHead>التاريخ</TableHead>
                                        <TableHead>الحالة</TableHead>
                                        <TableHead className="text-end">الإجراءات</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {prizes.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="h-48 text-center text-muted-foreground">
                                                لا يوجد سجلات جوائز تطابق المعايير.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        prizes.data.map((prize) => (
                                            <TableRow key={prize.id}>
                                                <TableCell className="font-semibold">{prize.sponsor?.name || '-'}</TableCell>
                                                <TableCell>{prize.idea?.user?.name || '-'}</TableCell>
                                                <TableCell className="max-w-xs truncate font-semibold">{prize.idea?.title || '-'}</TableCell>
                                                <TableCell className="font-medium text-primary">${prize.amount}</TableCell>
                                                <TableCell className="text-sm font-bold text-muted-foreground">
                                                    {new Date(prize.created_at).toLocaleDateString('en-GB', {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                    }).split('/').reverse().join('-')}
                                                </TableCell>
                                                <TableCell>{getStatusBadge(prize.status)}</TableCell>
                                                <TableCell className="text-end">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleToggleStatus(prize)}
                                                        className={prize.status === 'paid' ? 'text-muted-foreground' : 'text-green-600 border-green-200 hover:bg-green-50'}
                                                    >
                                                        {prize.status === 'paid' ? 'تغيير للمعلق' : 'تأكيد الدفع'}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="mt-6">
                            <Pagination links={prizes.links as any} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

PrizesPage.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>
);
