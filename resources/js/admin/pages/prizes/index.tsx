import { Head, router } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import type { BreadcrumbItem, Paginated, PrizeRecord, Sponsor } from '@/types';
import { PrizeStatus } from '@/types';
import PayoutConfirmDialog from './components/payout-confirm-dialog';
import PrizeFilters from './components/prize-filters';
import PrizesTable from './components/prizes-table';

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

        const params: Record<string, string> = {};

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
                        <PrizeFilters
                            statusFilter={statusFilter}
                            sponsorFilter={sponsorFilter}
                            sponsors={sponsors}
                            onStatusChange={setStatusFilter}
                            onSponsorChange={setSponsorFilter}
                        />
                    </CardHeader>
                    <CardContent className="p-0 sm:p-6 sm:pt-0">
                        <PrizesTable
                            prizes={prizes}
                            onConfirmClick={setConfirmingPrize}
                        />
                    </CardContent>
                </Card>
            </div>

            <PayoutConfirmDialog
                open={!!confirmingPrize}
                onOpenChange={(open) => !open && setConfirmingPrize(null)}
                confirmingPrize={confirmingPrize}
                processing={processing}
                onConfirm={handleToggleStatus}
            />
        </>
    );
}

PrizesPage.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>
);
