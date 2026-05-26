import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/admin/layouts/admin-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem, Idea, Sponsor } from '@/types';
import ConfirmWinnerDialog from './components/confirm-winner-dialog';
import WinnersGrid from './components/winners-grid';

interface WinnerDay {
    day_index: number;
    sponsor: Sponsor | null;
    leading_idea: Idea | null;
    announced_winner: Idea | null;
    is_today: boolean;
}

interface WinnersPreviewProps {
    days: WinnerDay[];
    week: number;
    year: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: admin.dashboard().url,
    },
    {
        title: 'إدارة الفائزين',
        href: admin.winners.index().url,
    },
];

export default function WinnersPreview({
    days,
    week,
    year,
}: WinnersPreviewProps) {
    const [confirmingIdea, setConfirmingIdea] = useState<Idea | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleConfirmWinner = () => {
        if (!confirmingIdea) {
            return;
        }

        setProcessing(true);
        router.post(
            admin.winners.confirm(confirmingIdea.id).url,
            {},
            {
                onSuccess: () => {
                    toast.success('تم إعلان الفائز بنجاح');
                    setConfirmingIdea(null);
                },
                onError: (errors) => {
                    toast.error(errors.error || 'حدث خطأ ما');
                },
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <>
            <Head title="إدارة الفائزين" />
            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">إدارة الفائزين</h1>
                        <p className="text-sm font-semibold text-muted-foreground">
                            متابعة وتأكيد الفائزين للأسبوع الحالي (أسبوع {week}{' '}
                            - {year})
                        </p>
                    </div>
                </div>

                <WinnersGrid
                    days={days}
                    onConfirm={setConfirmingIdea}
                />
            </div>

            <ConfirmWinnerDialog
                open={!!confirmingIdea}
                onOpenChange={(open) => !open && setConfirmingIdea(null)}
                confirmingIdea={confirmingIdea}
                processing={processing}
                onConfirm={handleConfirmWinner}
            />
        </>
    );
}

WinnersPreview.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>
);
