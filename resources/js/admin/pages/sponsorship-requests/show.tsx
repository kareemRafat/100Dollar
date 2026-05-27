import { Head, router, useForm, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Badge } from '@/components/ui/badge';
import admin from '@/routes/admin';
import type { SponsorshipRequest } from '@/types';
import DeleteRequestDialog from './components/delete-request-dialog';
import RejectSponsorshipRequestDialog from './components/reject-sponsorship-request-dialog';
import RequestInfoCard from './components/request-info-card';
import RequestStatusActions from './components/request-status-actions';

interface SponsorshipRequestShowProps {
    request: SponsorshipRequest;
}

const statusLabels: Record<string, { label: string; variant: 'default' | 'destructive' | 'secondary' }> = {
    pending: { label: 'قيد المراجعة', variant: 'secondary' },
    approved: { label: 'تم القبول', variant: 'default' },
    rejected: { label: 'مرفوض', variant: 'destructive' },
};

export default function SponsorshipRequestShow({ request }: SponsorshipRequestShowProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

    const rejectForm = useForm({
        status: 'rejected',
        rejection_reason: request.rejection_reason || '',
    });

    const handleUpdateStatus = (status: 'approved' | 'rejected' | 'pending') => {
        if (status === 'rejected') {
            setIsRejectDialogOpen(true);

            return;
        }

        setIsProcessing(true);
        router.patch(
            admin.sponsorshipRequests.updateStatus(request.id).url,
            { status },
            {
                onSuccess: () => {
                    toast.success('تم تحديث حالة الطلب بنجاح');
                },
                onFinish: () => setIsProcessing(false),
            },
        );
    };

    const handleRejectSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        rejectForm.patch(admin.sponsorshipRequests.updateStatus(request.id).url, {
            onSuccess: () => {
                setIsRejectDialogOpen(false);
                toast.success('تم رفض الطلب وإرسال إشعار للمتقدم');
            },
        });
    };

    const handleDeleteSubmit = () => {
        router.delete(admin.sponsorshipRequests.destroy(request.id).url, {
            onSuccess: () => {
                toast.success('تم حذف الطلب بنجاح');
            },
        });
    };

    const badge = statusLabels[request.status] || statusLabels.pending;

    return (
        <>
            <Head title={`طلب رعاية: ${request.company_name}`} />
            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href={admin.sponsorshipRequests.index().url}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <ArrowRight className="size-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">{request.company_name}</h1>
                            <div className="mt-1 flex items-center gap-2">
                                <Badge variant={badge.variant} className="font-bold">{badge.label}</Badge>
                                <span className="text-sm font-semibold text-muted-foreground">
                                    تاريخ التقديم: {new Date(request.created_at).toLocaleDateString('ar-EG')}
                                </span>
                            </div>
                        </div>
                    </div>

                    <RequestStatusActions
                        status={request.status}
                        isProcessing={isProcessing}
                        onUpdateStatus={handleUpdateStatus}
                        onDeleteClick={() => setIsDeleteModalOpen(true)}
                    />
                </div>

                <RequestInfoCard request={request} />
            </div>

            <DeleteRequestDialog
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                companyName={request.company_name}
                onConfirm={handleDeleteSubmit}
            />

            <RejectSponsorshipRequestDialog
                open={isRejectDialogOpen}
                onOpenChange={setIsRejectDialogOpen}
                rejectionReason={rejectForm.data.rejection_reason}
                onRejectionReasonChange={(value) => rejectForm.setData('rejection_reason', value)}
                error={rejectForm.errors.rejection_reason}
                processing={rejectForm.processing}
                onSubmit={handleRejectSubmit}
            />
        </>
    );
}

SponsorshipRequestShow.layout = (page: React.ReactNode) => (
    <AdminLayout
        breadcrumbs={[
            {
                title: 'لوحة التحكم',
                href: admin.dashboard().url,
            },
            {
                title: 'طلبات الرعاية',
                href: admin.sponsorshipRequests.index().url,
            },
            {
                title: 'تفاصيل الطلب',
                href: '#',
            },
        ]}
    >
        {page}
    </AdminLayout>
);
