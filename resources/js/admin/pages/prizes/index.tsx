import { Head, router } from '@inertiajs/react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
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
import type { BreadcrumbItem, Paginated, PrizeRecord, Sponsor } from '@/types';
import { PrizeStatus } from '@/types';

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
        case PrizeStatus.DELIVERED:
            return (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="me-1 h-3 w-3" /> تم التسليم
                </Badge>
            );
        default:
            return (
                <Badge variant="secondary">
                    <Clock className="me-1 h-3 w-3" /> معلق
                </Badge>
            );
    }
};

export default function PrizesPage({ prizes, sponsors, filters }: PrizesProps) {
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [sponsorFilter, setSponsorFilter] = useState(
        filters.sponsor_id || 'all',
    );
    const [confirmingPrize, setConfirmingPrize] = useState<PrizeRecord | null>(
        null,
    );
    const [processing, setProcessing] = useState(false);

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

    const handleToggleStatus = () => {
        if (!confirmingPrize) {
            return;
        }

        const newStatus =
            confirmingPrize.status === PrizeStatus.DELIVERED
                ? PrizeStatus.PENDING
                : PrizeStatus.DELIVERED;

        setProcessing(true);
        router.patch(
            admin.prizes.updateStatus(confirmingPrize.id).url,
            {
                status: newStatus,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('تم تحديث حالة الجائزة');
                    setConfirmingPrize(null);
                },
                onFinish: () => setProcessing(false),
            },
        );
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
                                    <SelectValue placeholder="كل الرعاة" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        كل الرعاة
                                    </SelectItem>
                                    {sponsors.map((sponsor) => (
                                        <SelectItem
                                            key={sponsor.id}
                                            value={sponsor.id.toString()}
                                        >
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
                                    <SelectValue placeholder="الكل" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">الكل</SelectItem>
                                    <SelectItem value={PrizeStatus.PENDING}>
                                        معلق
                                    </SelectItem>
                                    <SelectItem value={PrizeStatus.DELIVERED}>
                                        تم التسليم
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 sm:p-6 sm:pt-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12 text-center">
                                            #
                                        </TableHead>
                                        <TableHead>الراعي</TableHead>
                                        <TableHead>الفائز</TableHead>
                                        <TableHead>الفكرة</TableHead>
                                        <TableHead>المبلغ</TableHead>
                                        <TableHead>التاريخ</TableHead>
                                        <TableHead>الحالة</TableHead>
                                        <TableHead className="text-end">
                                            الإجراءات
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {prizes.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={8}
                                                className="h-48 text-center text-muted-foreground"
                                            >
                                                لا يوجد سجلات جوائز تطابق
                                                المعايير.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        prizes.data.map((prize, index) => (
                                            <TableRow key={prize.id}>
                                                <TableCell className="text-center font-bold text-muted-foreground">
                                                    {(prizes.meta.current_page -
                                                        1) *
                                                        prizes.meta.per_page +
                                                        index +
                                                        1}
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    {prize.sponsor?.name || '-'}
                                                </TableCell>
                                                <TableCell>
                                                    {prize.idea?.user?.name ||
                                                        '-'}
                                                </TableCell>
                                                <TableCell className="max-w-xs truncate font-semibold">
                                                    {prize.idea?.title || '-'}
                                                </TableCell>
                                                <TableCell className="font-medium text-primary">
                                                    ${prize.amount}
                                                </TableCell>
                                                <TableCell className="text-sm font-bold text-muted-foreground">
                                                    {new Date(prize.created_at)
                                                        .toLocaleDateString(
                                                            'en-GB',
                                                            {
                                                                year: 'numeric',
                                                                month: '2-digit',
                                                                day: '2-digit',
                                                            },
                                                        )
                                                        .split('/')
                                                        .reverse()
                                                        .join('-')}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(
                                                        prize.status,
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-end">
                                                    <Button
                                                        size="sm"
                                                        onClick={() =>
                                                            setConfirmingPrize(
                                                                prize,
                                                            )
                                                        }
                                                        className={
                                                            prize.status ===
                                                            PrizeStatus.DELIVERED
                                                                ? 'bg-emerald-600 text-xs font-semibold text-white hover:bg-emerald-700'
                                                                : 'bg-sky-800 text-xs font-semibold text-white hover:bg-sky-900'
                                                        }
                                                    >
                                                        {prize.status ===
                                                        PrizeStatus.DELIVERED
                                                            ? 'تغيير للمعلق'
                                                            : 'تأكيد التسليم'}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="mt-6">
                            <Pagination links={prizes.meta.links} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog
                open={!!confirmingPrize}
                onOpenChange={(open) => !open && setConfirmingPrize(null)}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <DialogTitle className="mt-4 text-center">
                            {confirmingPrize?.status === PrizeStatus.DELIVERED
                                ? 'تغيير حالة الجائزة إلى معلق'
                                : 'تأكيد تسليم الجائزة'}
                        </DialogTitle>
                        <DialogDescription className="text-center font-bold">
                            هل أنت متأكد من تغيير حالة الجائزة الخاصة بـ{' '}
                            <span className="block font-bold text-foreground">
                                "{confirmingPrize?.idea?.user?.name}" ؟{' '}
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-2 rounded-lg bg-muted p-4">
                        <div className="flex justify-between text-sm">
                            <span className="font-bold text-muted-foreground">
                                الفكرة :
                            </span>
                            <span className="max-w-50 truncate text-end font-semibold">
                                {confirmingPrize?.idea?.title}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="font-bold text-muted-foreground">
                                المبلغ :
                            </span>
                            <span className="font-bold text-primary">
                                ${confirmingPrize?.amount}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="font-bold text-muted-foreground">
                                الراعي :
                            </span>
                            <span className="font-semibold">
                                {confirmingPrize?.sponsor?.name}
                            </span>
                        </div>
                    </div>
                    <DialogFooter className="mt-6 flex flex-row gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setConfirmingPrize(null)}
                            disabled={processing}
                            className="flex-1"
                        >
                            إلغاء
                        </Button>
                        <Button
                            onClick={handleToggleStatus}
                            disabled={processing}
                            className={
                                confirmingPrize?.status ===
                                PrizeStatus.DELIVERED
                                    ? 'flex-1 bg-amber-600 hover:bg-amber-700'
                                    : 'flex-1 bg-green-600 hover:bg-green-700'
                            }
                        >
                            {processing ? 'جاري التحديث...' : 'تأكيد'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

PrizesPage.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>
);
