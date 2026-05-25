import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, useForm, Link, router } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowRight,
    CheckCircle,
    FileText,
    Megaphone,
    Target,
    Trash2,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import type { Idea, Comment } from '@/types';
import { IdeaStatus } from '@/types';
import { ApproveIdeaDialog } from './components/approve-idea-dialog';
import { CommentsSection } from './components/comments-section';
import { DeleteCommentDialog } from './components/delete-comment-dialog';
import { DeleteIdeaDialog } from './components/delete-idea-dialog';
import { IdeaSidebar } from './components/idea-sidebar';
import { PdfPreviewCard } from './components/pdf-preview-card';
import { RejectIdeaDialog } from './components/reject-idea-dialog';

interface IdeaShowProps {
    idea: Idea;
    filters: {
        status?: string;
        search?: string;
        page?: string;
    };
    comments?: Comment[];
}

export default function IdeaShowPage({
    idea,
    filters,
    comments,
}: IdeaShowProps) {
    const { __ } = useLang();
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeletingIdea, setIsDeletingIdea] = useState(false);
    const [isDeleteIdeaModalOpen, setIsDeleteIdeaModalOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

    const approveForm = useForm({
        status: IdeaStatus.APPROVED,
        submission_day: idea.submission_day ?? '',
    });

    const rejectForm = useForm({
        status: IdeaStatus.REJECTED,
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
            onFinish: () => setIsLoadingComments(false),
        });
    };

    const handleDeleteComment = () => {
        if (!commentToDelete) {
            return;
        }

        setIsDeleting(true);

        router
            .optimistic((props: IdeaShowProps) => ({
                comments: props.comments?.map((c) =>
                    c.id === commentToDelete
                        ? { ...c, deleted_at: new Date().toISOString() }
                        : c,
                ),
            }))
            .delete(admin.comments.destroy(commentToDelete).url, {
                preserveScroll: true,
                only: ['comments'],
                onSuccess: () => {
                    setCommentToDelete(null);
                    toast.success('تم حذف التعليق بنجاح');
                },
                onFinish: () => setIsDeleting(false),
            });
    };

    const handleDeleteIdea = () => {
        setIsDeletingIdea(true);
        router.delete(admin.ideas.destroy(idea.id).url, {
            onSuccess: () => {
                setIsDeleteIdeaModalOpen(false);
                toast.success('تم حذف الفكرة وجميع بياناتها بنجاح');
            },
            onFinish: () => setIsDeletingIdea(false),
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
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <ArrowRight className="size-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">{idea.title}</h1>
                            <div className="mt-1 flex items-center gap-2">
                                <Badge
                                    variant={
                                        idea.status === IdeaStatus.APPROVED
                                            ? 'default'
                                            : idea.status ===
                                                IdeaStatus.REJECTED
                                              ? 'destructive'
                                              : 'secondary'
                                    }
                                    className="font-bold"
                                >
                                    {idea.status === IdeaStatus.APPROVED
                                        ? 'تمت الموافقة'
                                        : idea.status === IdeaStatus.REJECTED
                                          ? 'مرفوضة'
                                          : 'قيد المراجعة'}
                                </Badge>
                                <span className="text-sm font-semibold text-muted-foreground">
                                    تقديم بواسطة: {idea.user?.name}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setIsDeleteIdeaModalOpen(true)}
                            className="h-10 w-10 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-red-900/50 dark:hover:bg-red-900/20"
                            title="حذف الفكرة نهائياً"
                        >
                            <Trash2 className="size-5" />
                        </Button>

                        {idea.status !== IdeaStatus.REJECTED && (
                            <Button
                                variant="destructive"
                                onClick={() => setIsRejectModalOpen(true)}
                                className="font-bold"
                            >
                                <XCircle className="me-2 size-4" />
                                {idea.status === IdeaStatus.APPROVED
                                    ? 'تغيير لرفض'
                                    : 'رفض الفكرة'}
                            </Button>
                        )}
                        {idea.status !== IdeaStatus.APPROVED && (
                            <Button
                                onClick={() => setIsApproveModalOpen(true)}
                                className="bg-green-600 font-bold hover:bg-green-700"
                            >
                                <CheckCircle className="me-2 size-4" />
                                {idea.status === IdeaStatus.REJECTED
                                    ? 'تغيير لموافقة'
                                    : 'الموافقة على الفكرة'}
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <Card className="overflow-hidden py-0 pb-5">
                            <CardHeader className="border-b bg-muted/30">
                                <CardTitle className="flex items-center gap-2 py-4 text-lg font-bold">
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
                                        {Array.isArray(idea.target_audience) &&
                                        idea.target_audience.length > 0 ? (
                                            idea.target_audience.map(
                                                (item, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="px-3 py-1 font-bold"
                                                    >
                                                        {__(
                                                            `messages.submit_idea.audiences.${item}`,
                                                        )}
                                                    </Badge>
                                                ),
                                            )
                                        ) : (
                                            <span className="text-sm text-muted-foreground italic">
                                                غير محدد
                                            </span>
                                        )}
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
                                        {Array.isArray(
                                            idea.marketing_channel,
                                        ) &&
                                        idea.marketing_channel.length > 0 ? (
                                            idea.marketing_channel.map(
                                                (item, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="px-3 py-1 font-bold"
                                                    >
                                                        {__(
                                                            `messages.submit_idea.channels.${item}`,
                                                        )}
                                                    </Badge>
                                                ),
                                            )
                                        ) : (
                                            <span className="text-sm text-muted-foreground italic">
                                                غير محدد
                                            </span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {idea.pdf_file && (
                            <PdfPreviewCard
                                pdfFile={idea.pdf_file}
                                ideaId={idea.id}
                            />
                        )}

                        {idea.status === IdeaStatus.REJECTED &&
                            idea.rejection_reason && (
                                <Card className="border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 font-bold text-red-600">
                                            <AlertCircle className="size-5" />
                                            سبب الرفض
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="leading-relaxed font-semibold text-red-700 dark:text-red-400">
                                            {idea.rejection_reason}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}

                        <CommentsSection
                            comments={comments}
                            isLoadingComments={isLoadingComments}
                            onLoadComments={loadComments}
                            onDeleteComment={(id) => setCommentToDelete(id)}
                        />
                    </div>

                    <IdeaSidebar idea={idea} />
                </div>
            </div>

            <ApproveIdeaDialog
                open={isApproveModalOpen}
                onOpenChange={setIsApproveModalOpen}
                submissionDay={approveForm.data.submission_day}
                onSubmissionDayChange={(v) =>
                    approveForm.setData('submission_day', v)
                }
                error={approveForm.errors.submission_day}
                processing={approveForm.processing}
                onSubmit={handleApprove}
            />

            <RejectIdeaDialog
                open={isRejectModalOpen}
                onOpenChange={setIsRejectModalOpen}
                rejectionReason={rejectForm.data.rejection_reason}
                onRejectionReasonChange={(v) =>
                    rejectForm.setData('rejection_reason', v)
                }
                error={rejectForm.errors.rejection_reason}
                processing={rejectForm.processing}
                onSubmit={handleReject}
            />

            <DeleteCommentDialog
                open={commentToDelete !== null}
                onOpenChange={(open) => !open && setCommentToDelete(null)}
                onConfirm={handleDeleteComment}
                isDeleting={isDeleting}
            />

            <DeleteIdeaDialog
                open={isDeleteIdeaModalOpen}
                onOpenChange={setIsDeleteIdeaModalOpen}
                onConfirm={handleDeleteIdea}
                isDeleting={isDeletingIdea}
                ideaTitle={idea.title}
            />
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
