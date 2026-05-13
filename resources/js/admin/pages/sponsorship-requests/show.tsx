import { Head, router, Link } from '@inertiajs/react';
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
    ExternalLink,
    ArrowRight,
    Calendar,
    MapPin,
    FileText,
    Eye
} from 'lucide-react';
import React, { useState } from 'react';
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
import { Separator } from '@/components/ui/separator';
import admin from '@/routes/admin';
import type { BreadcrumbItem, SponsorshipRequest } from '@/types';

interface SponsorshipRequestShowProps {
    request: SponsorshipRequest;
}

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
            <Head title={`طلب رعاية: ${request.company_name}`} />
            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href={admin.sponsorshipRequests.index().url}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                            <ArrowRight className="size-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">{request.company_name}</h1>
                            <div className="mt-1 flex items-center gap-2">
                                <Badge variant={request.status === 'approved' ? 'default' : request.status === 'rejected' ? 'destructive' : 'secondary'} className="font-bold">
                                    {request.status === 'approved' ? 'تم القبول' : request.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
                                </Badge>
                                <span className="text-sm text-muted-foreground font-semibold">
                                    تاريخ التقديم: {new Date(request.created_at).toLocaleDateString('ar-EG')}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {request.status === 'pending' && (
                            <>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleUpdateStatus('rejected')}
                                    disabled={isProcessing}
                                    className="font-bold"
                                >
                                    {isProcessing ? <Loader2 className="me-2 size-4 animate-spin" /> : <XCircle className="me-2 size-4" />}
                                    رفض الطلب
                                </Button>
                                <Button
                                    onClick={() => handleUpdateStatus('approved')}
                                    disabled={isProcessing}
                                    className="bg-green-600 hover:bg-green-700 font-bold"
                                >
                                    {isProcessing ? <Loader2 className="me-2 size-4 animate-spin" /> : <CheckCircle className="me-2 size-4" />}
                                    قبول الطلب
                                </Button>
                            </>
                        )}
                        {request.status !== 'pending' && (
                            <Button
                                variant="outline"
                                onClick={() => handleUpdateStatus('pending')}
                                disabled={isProcessing}
                                className="font-bold"
                            >
                                إعادة تعيين الحالة
                            </Button>
                        )}
                        <Separator orientation="vertical" className="mx-1 h-8" />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                            <Trash2 className="size-5" />
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 font-bold">
                                    <FileText className="size-5 text-primary" />
                                    الرسالة المرفقة
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                                <p className="text-base leading-relaxed font-semibold whitespace-pre-wrap">
                                    {request.message}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base font-bold">
                                    <Building2 className="size-4 text-primary" />
                                    معلومات التواصل
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <Mail className="size-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">البريد الإلكتروني</p>
                                            <p className="font-bold truncate max-w-[200px]">{request.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <Phone className="size-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">رقم الهاتف</p>
                                            <p className="font-bold" dir="ltr">{request.phone}</p>
                                        </div>
                                    </div>

                                    {request.website && (
                                        <div className="flex items-start gap-3 sm:col-span-2">
                                            <div className="rounded-lg bg-primary/10 p-2">
                                                <Globe className="size-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">الموقع الإلكتروني</p>
                                                <a 
                                                    href={request.website} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="font-bold text-primary flex items-center gap-1 hover:underline"
                                                >
                                                    {request.website}
                                                    <ExternalLink className="size-3" />
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="font-bold">تفاصيل الطلب</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <Building2 className="size-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-semibold">اسم الشركة</p>
                                            <p className="font-bold">{request.company_name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <MapPin className="size-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-semibold">الدولة</p>
                                            <p className="font-bold">{request.country?.name_ar || 'غير محدد'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <Calendar className="size-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-semibold">تاريخ التقديم</p>
                                            <p className="font-bold">{new Date(request.created_at).toLocaleDateString('ar-EG')}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <Clock className="size-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-semibold">الحالة الحالية</p>
                                            <p className="font-bold">
                                                {request.status === 'pending' ? 'بانتظار المراجعة' : request.status === 'approved' ? 'مقبول' : 'مرفوض'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="overflow-hidden">
                            <CardHeader className="border-b bg-muted/10 px-6 py-4">
                                <CardTitle className="font-bold text-lg flex items-center gap-2">
                                    <ImageIcon className="size-5 text-primary" />
                                    شعار الشركة
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                {request.logo ? (
                                    <div className="overflow-hidden rounded-xl border bg-white dark:bg-zinc-950 shadow-sm group relative aspect-square">
                                        <img 
                                            src={request.logo} 
                                            alt={request.company_name} 
                                            className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110" 
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                             <Button variant="secondary" size="sm" asChild className="font-bold shadow-lg">
                                                <a href={request.logo} target="_blank" rel="noopener noreferrer">
                                                    <Eye className="me-2 size-4" />
                                                    عرض الشعار كاملاً
                                                </a>
                                             </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-40 rounded-xl border-2 border-dashed border-muted text-muted-foreground bg-muted/5">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="p-3 rounded-full bg-muted/50">
                                                <ImageIcon className="size-8 opacity-40" />
                                            </div>
                                            <span className="text-sm font-bold">لا يوجد شعار مرفق</span>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="p-6" dir="rtl">
                    <div className="space-y-4">
                        <DialogHeader>
                            <DialogTitle className="text-start font-bold">حذف الطلب</DialogTitle>
                            <DialogDescription className="text-start font-semibold">
                                هل أنت متأكد من حذف طلب الرعاية الخاص بـ <span className="text-foreground font-bold">{request.company_name}</span>؟ لا يمكن التراجع عن هذا الإجراء.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-6 flex flex-row items-center justify-start gap-2">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="font-bold"
                            >
                                إلغاء
                            </Button>
                            <Button 
                                type="button" 
                                variant="destructive" 
                                onClick={handleDeleteSubmit}
                                className="font-bold"
                            >
                                {isProcessing && <Loader2 className="me-2 size-4 animate-spin" />}
                                حذف نهائي
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
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
