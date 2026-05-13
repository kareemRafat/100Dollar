import { Head, router } from '@inertiajs/react';
import {
    CheckCircle,
    Clock,
    Loader2,
    XCircle,
    Globe,
    Mail,
    Phone,
    Building2,
    Trash2,
    Image as ImageIcon,
    ExternalLink
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import admin from '@/routes/admin';
import type { BreadcrumbItem, SponsorshipRequest } from '@/types';

interface SponsorshipRequestShowProps {
    request: SponsorshipRequest;
}


const getStatusBadge = (status: string) => {
    switch (status) {
        case 'approved':
            return <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 px-3 py-1 text-sm font-medium"><CheckCircle className="me-1.5 h-4 w-4" /> مقبول</Badge>;
        case 'rejected':
            return <Badge variant="destructive" className="px-3 py-1 text-sm font-medium"><XCircle className="me-1.5 h-4 w-4" /> مرفوض</Badge>;
        default:
            return <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200 px-3 py-1 text-sm font-medium"><Clock className="me-1.5 h-4 w-4" /> قيد المراجعة</Badge>;
    }
};

export default function SponsorshipRequestShow({ request }: SponsorshipRequestShowProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleUpdateStatus = (status: 'approved' | 'rejected' | 'pending') => {
        setIsProcessing(true);
        router.patch(admin.sponsorshipRequests.updateStatus(request.id).url, {
            status: status
        }, {
            onSuccess: () => {
                toast.success('تم تحديث حالة الطلب بنجاح');
            },
            onFinish: () => setIsProcessing(false)
        });
    };

    const handleDeleteSubmit = () => {
        router.delete(admin.sponsorshipRequests.destroy(request.id).url, {
            onSuccess: () => {
                toast.success('تم حذف الطلب بنجاح');
            },
        });
    };

    return (
        <>
            <Head title={`طلب رعاية - ${request.company_name}`} />

            <div className="p-6 lg:p-10 space-y-8" dir="rtl">
                {/* Minimal Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h1 className="text-2xl font-bold">{request.company_name}</h1>
                            {getStatusBadge(request.status)}
                        </div>
                        <p className="text-sm text-muted-foreground font-semibold">
                            تاريخ التقديم: {new Date(request.created_at).toLocaleDateString('ar-EG')} • {request.country?.name_ar}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {request.status === 'pending' && (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => handleUpdateStatus('rejected')}
                                    disabled={isProcessing}
                                    className="text-destructive border-destructive/20 hover:bg-destructive/5"
                                >
                                    {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 me-2" />}
                                    رفض
                                </Button>
                                <Button
                                    onClick={() => handleUpdateStatus('approved')}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 me-2" />}
                                    قبول
                                </Button>
                            </>
                        )}
                        {request.status !== 'pending' && (
                            <Button
                                variant="outline"
                                onClick={() => handleUpdateStatus('pending')}
                                disabled={isProcessing}
                            >
                                إعادة تعيين
                            </Button>
                        )}
                        <Separator orientation="vertical" className="h-8 mx-2" />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="text-muted-foreground hover:text-destructive"
                        >
                            <Trash2 className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* Simplified Details */}
                    <div className="lg:col-span-3 space-y-8">
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 rounded-lg border bg-card">
                                <div className="flex items-center gap-2 text-muted-foreground mb-1.5">
                                    <Mail className="h-3.5 w-3.5" />
                                    <p className="text-xs font-bold uppercase tracking-wider text-teal-600">البريد الإلكتروني</p>
                                </div>
                                <p className="font-semibold">{request.email}</p>
                            </div>
                            <div className="p-4 rounded-lg border bg-card">
                                <div className="flex items-center gap-2 text-muted-foreground mb-1.5">
                                    <Phone className="h-3.5 w-3.5" />
                                    <p className="text-xs font-bold text-teal-600 uppercase tracking-wider">الهاتف</p>
                                </div>
                                <p className="font-semibold" dir="ltr">{request.phone}</p>
                            </div>
                            <div className="p-4 rounded-lg border bg-card">
                                <div className="flex items-center gap-2 text-muted-foreground mb-1.5">
                                    <Globe className="h-3.5 w-3.5" />
                                    <p className="text-xs font-bold text-teal-600 uppercase tracking-wider">الموقع الإلكتروني</p>
                                </div>
                                {request.website ? (
                                    <a href={request.website} target="_blank" className="font-semibold text-primary flex items-center gap-1 hover:underline">
                                        زيارة الرابط <ExternalLink className="h-3 w-3" />
                                    </a>
                                ) : (
                                    <p className="font-semibold">-</p>
                                )}
                            </div>
                        </section>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-muted-foreground" />
                                <h3 className="text-lg font-bold">الرسالة المرفقة</h3>
                            </div>
                            <div className="p-6 rounded-lg border bg-card leading-loose text-foreground/80 whitespace-pre-wrap">
                                {request.message}
                            </div>
                        </div>
                    </div>

                    {/* Clean Sidebar */}
                    <div className="space-y-6">
                        <div className="rounded-lg border overflow-hidden">
                            <div className="bg-muted/50 px-4 py-2 border-b text-xs font-bold uppercase tracking-wider">شعار الشركة</div>
                            <div className="p-6 flex items-center justify-center bg-white">
                                {request.logo ? (
                                    <img src={request.logo} alt="" className="max-h-32 object-contain" />
                                ) : (
                                    <div className="flex flex-col items-center py-4 text-muted-foreground/40">
                                        <ImageIcon className="h-10 w-10 mb-2" />
                                        <span className="text-xs">لا يوجد شعار</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>





            {/* Delete Confirmation */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="p-6" dir="rtl">
                    <div className="space-y-4">
                        <DialogHeader>
                            <DialogTitle className="text-start">حذف الطلب</DialogTitle>
                            <DialogDescription className="text-start">
                                هل أنت متأكد من حذف طلب الرعاية الخاص بـ {request.company_name}؟ لا يمكن التراجع عن هذا الإجراء.
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

SponsorshipRequestShow.layout = (page: React.ReactElement) => {
    const request = page.props?.request as SponsorshipRequest | undefined;
    const companyName = request?.company_name || 'تفاصيل الطلب';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'لوحة التحكم',
            href: admin.dashboard().url,
        },
        {
            title: 'طلبات الرعاية',
            href: admin.sponsorshipRequests.index().url,
        },
        {
            title: companyName,
            href: request ? admin.sponsorshipRequests.show(request.id).url : '#',
        },
    ];

    return <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>;
};

