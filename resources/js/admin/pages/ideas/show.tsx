import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, useForm, Link, router } from '@inertiajs/react';
import {
    CheckCircle,
    XCircle,
    ArrowRight,
    User,
    Calendar,
    MapPin,
    Briefcase,
    Target,
    Megaphone,
    Clock,
    Loader2,
    AlertCircle,
    FileText,
    Image as ImageIcon,
    Eye,
    Download,
    ExternalLink,
    MessageSquare,
    Trash2
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
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import admin from '@/routes/admin';
import type { Idea, Comment } from '@/types';

interface IdeaShowProps {
    idea: Idea;
    filters: {
        status?: string;
        search?: string;
        page?: string;
    };
    comments?: Comment[];
}

const daysOfWeek = [
    { value: '0', label: 'الأحد' },
    { value: '1', label: 'الاثنين' },
    { value: '2', label: 'الثلاثاء' },
    { value: '3', label: 'الأربعاء' },
    { value: '4', label: 'الخميس' },
    { value: '5', label: 'الجمعة' },
    { value: '6', label: 'السبت' },
];

export default function IdeaShowPage({ idea, filters, comments }: IdeaShowProps) {
    const { __ } = useLang();
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [showPdfPreview, setShowPdfPreview] = useState(false);
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

    const approveForm = useForm({
        status: 'approved',
        submission_day: idea.submission_day?.toString() || '',
    });

    const rejectForm = useForm({
        status: 'rejected',
        rejection_reason: idea.rejection_reason || '',
    });

    const handleApprove = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        approveForm.patch(admin.ideas.updateStatus(idea.id).url, {
            onSuccess: () => {
                setIsApproveModalOpen(false);
                toast.success('تمت الموافقة على الفكرة بنجاح');
            },
        });
    };

    const handleReject = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        rejectForm.patch(admin.ideas.updateStatus(idea.id).url, {
            onSuccess: () => {
                setIsRejectModalOpen(false);
                toast.success('تم رفض الفكرة وإرسال إشعار للمستخدم');
            },
        });
    };

    const loadComments = () => {
        setIsLoadingComments(true);
        router.reload({
            only: ['comments'],
            onFinish: () => setIsLoadingComments(false)
        });
    };

    const handleDeleteComment = () => {
        if (!commentToDelete) {
            return;
        }

        setIsDeleting(true);

        router.optimistic((props: IdeaShowProps) => ({
            comments: props.comments?.map(c =>
                c.id === commentToDelete
                    ? { ...c, deleted_at: new Date().toISOString() }
                    : c
            )
        })).delete(admin.comments.destroy(commentToDelete).url, {
            preserveScroll: true,
            only: ['comments'],
            onSuccess: () => {
                setCommentToDelete(null);
                toast.success('تم حذف التعليق بنجاح');
            },
            onFinish: () => setIsDeleting(false)
        });
    };


    return (
        <>
            <Head title={`مراجعة فكرة: ${idea.title}`} />
            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href={admin.ideas.index().url}
                            data={filters}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                            <ArrowRight className="size-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">{idea.title}</h1>
                            <div className="mt-1 flex items-center gap-2">
                                <Badge variant={idea.status === 'approved' ? 'default' : idea.status === 'rejected' ? 'destructive' : 'secondary'} className="font-bold">
                                    {idea.status === 'approved' ? 'تمت الموافقة' : idea.status === 'rejected' ? 'مرفوضة' : 'قيد المراجعة'}
                                </Badge>
                                <span className="text-sm text-muted-foreground font-semibold">
                                    تقديم بواسطة: {idea.user?.name}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {idea.status !== 'rejected' && (
                            <Button
                                variant="destructive"
                                onClick={() => setIsRejectModalOpen(true)}
                                className="font-bold"
                            >
                                <XCircle className="me-2 size-4" />
                                {idea.status === 'approved' ? 'تغيير لرفض' : 'رفض الفكرة'}
                            </Button>
                        )}
                        {idea.status !== 'approved' && (
                            <Button
                                onClick={() => setIsApproveModalOpen(true)}
                                className="bg-green-600 hover:bg-green-700 font-bold"
                            >
                                <CheckCircle className="me-2 size-4" />
                                {idea.status === 'rejected' ? 'تغيير لموافقة' : 'الموافقة على الفكرة'}
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="overflow-hidden py-0 pb-5">
                            <CardHeader className="bg-muted/30 border-b">
                                <CardTitle className="flex items-center gap-2 font-bold text-lg py-4">
                                    <FileText className="size-5 text-primary" />
                                    وصف الفكرة
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-base leading-relaxed font-semibold whitespace-pre-wrap text-foreground/90">
                                    {idea.description}
                                </p>
                            </CardContent>
                        </Card>

                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                                        <Target className="size-4 text-primary" />
                                        الجمهور المستهدف
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.isArray(idea.target_audience) && idea.target_audience.length > 0 ? idea.target_audience.map((item, index) => (
                                            <Badge key={index} variant="secondary" className="font-bold px-3 py-1">
                                                {__(`messages.submit_idea.audiences.${item}`)}
                                            </Badge>
                                        )) : <span className="text-muted-foreground italic text-sm">غير محدد</span>}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                                        <Megaphone className="size-4 text-primary" />
                                        قنوات التسويق
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.isArray(idea.marketing_channel) && idea.marketing_channel.length > 0 ? idea.marketing_channel.map((item, index) => (
                                            <Badge key={index} variant="secondary" className="font-bold px-3 py-1">
                                                {__(`messages.submit_idea.channels.${item}`)}
                                            </Badge>
                                        )) : <span className="text-muted-foreground italic text-sm">غير محدد</span>}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {idea.pdf_file && (
                            <Card className="overflow-hidden py-0 pb-5">
                                <CardHeader className="bg-muted/50 border-b">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <CardTitle className="flex items-center gap-2 font-bold text-lg py-4">
                                            <FileText className="size-5 text-primary" />
                                            الملف التوضيحي المرفق
                                        </CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm" asChild className="h-9 font-bold">
                                                <a href={idea.pdf_file} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="me-2 size-4" />
                                                    عرض ملء الشاشة
                                                </a>
                                            </Button>
                                            <Button size="sm" asChild className="h-9 font-bold bg-primary hover:bg-primary/90">
                                                <a href={idea.pdf_file} download={`idea-${idea.id}-plan.pdf`}>
                                                    <Download className="me-2 size-4" />
                                                    تحميل PDF
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className={`w-full bg-muted/30 relative flex flex-col items-center justify-center transition-all duration-300 ${showPdfPreview ? 'aspect-[1/1.4] sm:aspect-video md:aspect-[1/1.4]' : 'py-12 px-8 text-center'}`}>
                                        {showPdfPreview ? (
                                            <iframe
                                                src={`${idea.pdf_file}#toolbar=0&navpanes=0`}
                                                className="h-full w-full border-none animate-in fade-in duration-500"
                                                title="PDF Preview"
                                            />
                                        ) : (
                                            <div className="space-y-4 animate-in zoom-in-95 duration-300">
                                                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                                                    <FileText className="size-8" />
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="text-lg font-bold">الملف متاح للمراجعة</h3>
                                                    <p className="text-sm text-muted-foreground font-semibold max-w-xs mx-auto">
                                                        انقر للمعاينة مباشرة هنا أو استخدم الخيارات أعلاه للتحميل
                                                    </p>
                                                </div>
                                                <Button
                                                    onClick={() => setShowPdfPreview(true)}
                                                    variant="secondary"
                                                    className="font-bold px-10 shadow-sm hover:shadow-md transition-all"
                                                >
                                                    <Eye className="me-2 size-4" />
                                                    عرض المعاينة هنا
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {idea.status === 'rejected' && idea.rejection_reason && (
                            <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-red-600 font-bold">
                                        <AlertCircle className="size-5" />
                                        سبب الرفض
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-red-700 dark:text-red-400 font-semibold leading-relaxed">
                                        {idea.rejection_reason}
                                    </p>
                                </CardContent>
                            </Card>
                        )}


                        <Card className='overflow-hidden py-0 pb-5'>
                            <CardHeader className="flex flex-row items-center justify-between border-b">
                                <CardTitle className="flex items-center gap-2 font-bold text-lg py-4">
                                    <MessageSquare className="size-5 text-primary" />
                                    التعليقات
                                </CardTitle>
                                {!comments && (
                                    <Button
                                        onClick={loadComments}
                                        disabled={isLoadingComments}
                                        variant="outline"
                                        size="sm"
                                        className="font-bold"
                                    >
                                        {isLoadingComments && <Loader2 className="me-2 size-4 animate-spin" />}
                                        عرض التعليقات
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="p-0">
                                {comments ? (
                                    <div className="divide-y">
                                        {comments.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                                <MessageSquare className="size-12 text-muted-foreground/30 mb-4" />
                                                <p className="text-lg font-bold">لا توجد تعليقات</p>
                                                <p className="text-sm text-muted-foreground font-semibold">لم يتم إضافة أي تعليقات على هذه الفكرة بعد.</p>
                                            </div>
                                        ) : (
                                            comments.map((comment) => (
                                                <div key={comment.id} className="p-6 transition-colors hover:bg-muted/30">
                                                    <div className="flex justify-between items-start gap-4">
                                                        <div className="flex gap-4">
                                                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                                                                {comment.user?.name?.[0] || 'U'}
                                                            </div>
                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-bold">{comment.user?.name}</span>
                                                                    {comment.deleted_at && (
                                                                        <Badge variant="destructive" className="text-[10px] px-2 py-0 h-5 font-bold">تم الإشراف (محذوف)</Badge>
                                                                    )}
                                                                </div>
                                                                <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                                                                    <Clock className="size-3" />
                                                                    {new Date(comment.created_at).toLocaleDateString('ar-SA', {
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })}
                                                                </div>
                                                                <p className={cn(
                                                                    "mt-3 text-sm font-semibold leading-relaxed",
                                                                    comment.deleted_at ? "text-muted-foreground line-through opacity-70 italic" : "text-foreground"
                                                                )}>
                                                                    {comment.body}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {!comment.deleted_at && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="text-red-500 hover:text-red-600 hover:bg-red-50 shrink-0"
                                                                onClick={() => setCommentToDelete(comment.id)}
                                                                title="حذف التعليق"
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <MessageSquare className="size-12 text-muted-foreground/20 mb-4" />
                                        <p className="text-muted-foreground font-semibold mb-6">يتم تحميل التعليقات عند الطلب لتسريع تحميل الصفحة.</p>
                                        <Button
                                            onClick={loadComments}
                                            disabled={isLoadingComments}
                                            className="font-bold px-8"
                                        >
                                            {isLoadingComments ? (
                                                <><Loader2 className="me-2 size-4 animate-spin" /> جاري التحميل...</>
                                            ) : (
                                                'تحميل التعليقات الآن'
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className='py-0 pb-5'>
                            <CardHeader className="border-b bg-muted/10 py-4">
                                <CardTitle className="font-bold text-lg">معلومات إضافية</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5 pt-6">
                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2.5">
                                        <User className="size-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-0.5">صاحب الفكرة</p>
                                        <p className="font-bold text-foreground">{idea.user?.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2.5">
                                        <Briefcase className="size-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-0.5">التصنيف</p>
                                        <p className="font-bold text-foreground">{typeof idea.category === 'object' ? idea.category?.name_ar : idea.category}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2.5">
                                        <MapPin className="size-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-0.5">الموقع</p>
                                        <p className="font-bold text-foreground">{idea.city || 'غير محدد'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2.5">
                                        <Clock className="size-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-0.5">مدة التنفيذ</p>
                                        <p className="font-bold text-foreground">
                                            {idea.implementation_time ? __(`messages.submit_idea.times.${idea.implementation_time}`) : 'غير محدد'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2.5">
                                        <Calendar className="size-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-0.5">تاريخ التقديم</p>
                                        <p className="font-bold text-foreground">{idea.date}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden py-0 pb-5">
                            <CardHeader className="border-b bg-muted/10 px-6 py-4">
                                <CardTitle className="font-bold text-lg flex items-center gap-2">
                                    <ImageIcon className="size-5 text-primary" />
                                    الصورة المرفقة
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                {idea.image ? (
                                    <div className="overflow-hidden rounded-xl border bg-muted shadow-sm group relative aspect-video sm:aspect-square">
                                        <img
                                            src={idea.image}
                                            alt={idea.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                             <Button variant="secondary" size="sm" asChild className="font-bold shadow-lg">
                                                <a href={idea.image} target="_blank" rel="noopener noreferrer">
                                                    <Eye className="me-2 size-4" />
                                                    عرض الصورة كاملة
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
                                            <span className="text-sm font-bold">لا توجد صور مرفقة</span>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Approve Modal */}
            <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
                <DialogContent dir="rtl">
                    <form onSubmit={handleApprove}>
                        <DialogHeader>
                            <DialogTitle className="text-start font-bold">الموافقة على الفكرة</DialogTitle>
                            <DialogDescription className="text-start font-semibold">
                                عند الموافقة، يجب تحديد اليوم الذي سيتم فيه نشر الفكرة في الأسبوع القادم.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-6">
                            <Label htmlFor="submission_day" className="font-bold block mb-2">يوم النشر</Label>
                            <Select
                                dir="rtl"
                                value={approveForm.data.submission_day}
                                onValueChange={(v) => approveForm.setData('submission_day', v)}
                            >
                                <SelectTrigger className="font-semibold">
                                    <SelectValue placeholder="اختر يوم النشر" />
                                </SelectTrigger>
                                <SelectContent>
                                    {daysOfWeek.map((day) => (
                                        <SelectItem key={day.value} value={day.value} className="font-semibold">
                                            {day.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {approveForm.errors.submission_day && (
                                <p className="mt-1 text-sm text-red-500 font-semibold">{approveForm.errors.submission_day}</p>
                            )}
                        </div>
                        <DialogFooter className="flex flex-row items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsApproveModalOpen(false)}
                                className="font-bold"
                            >
                                إلغاء
                            </Button>
                            <Button
                                type="submit"
                                disabled={approveForm.processing}
                                className="bg-green-600 hover:bg-green-700 font-bold"
                            >
                                {approveForm.processing && <Loader2 className="me-2 size-4 animate-spin" />}
                                تأكيد الموافقة
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Reject Modal */}
            <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
                <DialogContent dir="rtl">
                    <form onSubmit={handleReject}>
                        <DialogHeader>
                            <DialogTitle className="text-start font-bold">رفض الفكرة</DialogTitle>
                            <DialogDescription className="text-start font-semibold">
                                يرجى كتابة سبب الرفض بوضوح ليتم إرساله لصاحب الفكرة.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-6">
                            <Label htmlFor="rejection_reason" className="font-bold block mb-2">سبب الرفض</Label>
                            <Textarea
                                id="rejection_reason"
                                placeholder="اكتب سبب الرفض هنا..."
                                value={rejectForm.data.rejection_reason}
                                onChange={(e) => rejectForm.setData('rejection_reason', e.target.value)}
                                className="min-h-[120px] font-semibold"
                            />
                            {rejectForm.errors.rejection_reason && (
                                <p className="mt-1 text-sm text-red-500 font-semibold">{rejectForm.errors.rejection_reason}</p>
                            )}
                        </div>
                        <DialogFooter className="flex flex-row items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsRejectModalOpen(false)}
                                className="font-bold"
                            >
                                إلغاء
                            </Button>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={rejectForm.processing}
                                className="font-bold"
                            >
                                {rejectForm.processing && <Loader2 className="me-2 size-4 animate-spin" />}
                                تأكيد الرفض
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Comment Confirmation Modal */}
            <Dialog open={commentToDelete !== null} onOpenChange={(open) => !open && setCommentToDelete(null)}>
                <DialogContent dir="rtl">
                    <DialogHeader>
                        <DialogTitle className="text-start font-bold">حذف التعليق</DialogTitle>
                        <DialogDescription className="text-start font-semibold">
                            هل أنت متأكد من رغبتك في حذف هذا التعليق؟ سيتم إخفاؤه عن المستخدمين مع بقائه في لوحة التحكم للأرشفة.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row items-center gap-2 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCommentToDelete(null)}
                            className="font-bold"
                        >
                            إلغاء
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            disabled={isDeleting}
                            onClick={handleDeleteComment}
                            className="font-bold"
                        >
                            {isDeleting && <Loader2 className="me-2 size-4 animate-spin" />}
                            تأكيد الحذف
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

IdeaShowPage.layout = (page: React.ReactNode) => (
    <AdminLayout
        breadcrumbs={[
            { title: 'لوحة التحكم', href: admin.dashboard().url },
            { title: 'إدارة الأفكار', href: admin.ideas.index().url },
            { title: 'مراجعة الفكرة', href: '#' },
        ]}
    >
        {page}
    </AdminLayout>
);
