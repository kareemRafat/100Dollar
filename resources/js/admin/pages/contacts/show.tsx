import { Head, Link, useForm } from '@inertiajs/react';
import {
    Clock3,
    Loader2,
    Mail,
    MessageSquare,
    Reply,
    Trash2,
    User,
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { reply } from '@/actions/App/Http/Controllers/Admin/ContactController';
import AdminLayout from '@/admin/layouts/admin-layout';
import InputError from '@/components/input-error';
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
import { Textarea } from '@/components/ui/textarea';
import admin from '@/routes/admin';
import type { ContactMessage } from '@/types';

interface ContactShowProps {
    contactMessage: ContactMessage;
}

export default function ContactShowPage({ contactMessage }: ContactShowProps) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const replyForm = useForm({
        reply_body: '',
    });

    const deleteForm = useForm({});

    const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        replyForm.post(reply(contactMessage.id).url, {
            onSuccess: () => {
                toast.success('تم إرسال الرد وحفظه بنجاح.');
            },
            onError: () => {
                toast.error(
                    'تعذر إرسال الرد. يرجى مراجعة البيانات والمحاولة مجدداً.',
                );
            },
        });
    };

    const handleDelete = () => {
        deleteForm.delete(admin.contacts.destroy(contactMessage.id).url, {
            onSuccess: () => {
                toast.success('تم حذف رسالة التواصل بنجاح.');
            },
            onError: () => {
                toast.error('تعذر حذف الرسالة حالياً.');
            },
        });
    };

    return (
        <>
            <Head title={`رسالة التواصل #${contactMessage.id}`} />

            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href={admin.contacts.index().url}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <Reply className="size-5 rotate-180" />
                        </Link>

                        <div>
                            <h1 className="text-2xl font-bold">
                                تفاصيل رسالة التواصل
                            </h1>
                            <p className="text-sm font-semibold text-muted-foreground">
                                مراجعة الرسالة والرد على الزائر عبر البريد
                                الإلكتروني
                            </p>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                        <Trash2 className="size-5" />
                    </Button>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 font-bold">
                                    <MessageSquare className="size-5 text-primary" />
                                    الرسالة الأصلية
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-base leading-relaxed font-semibold whitespace-pre-wrap">
                                    {contactMessage.message}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 font-bold">
                                    <Reply className="size-5 text-primary" />
                                    {contactMessage.is_replied
                                        ? 'الرد المحفوظ'
                                        : 'إرسال رد'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {contactMessage.is_replied ? (
                                    <div className="space-y-4">
                                        <Badge className="bg-green-100 font-bold text-green-800 hover:bg-green-100">
                                            تم الرد على هذه الرسالة
                                        </Badge>

                                        <div className="rounded-xl border bg-muted/30 p-4">
                                            <p className="text-base leading-relaxed font-semibold whitespace-pre-wrap">
                                                {contactMessage.reply_body}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                            <Clock3 className="size-4" />
                                            <span>
                                                تم الرد في{' '}
                                                {contactMessage.replied_at
                                                    ? new Date(
                                                          contactMessage.replied_at,
                                                      ).toLocaleString('ar-EG')
                                                    : '-'}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <form
                                        onSubmit={handleReplySubmit}
                                        className="space-y-4"
                                    >
                                        <div className="grid gap-2">
                                            <Label htmlFor="reply_body">
                                                نص الرد
                                            </Label>
                                            <Textarea
                                                id="reply_body"
                                                value={
                                                    replyForm.data.reply_body
                                                }
                                                onChange={(e) =>
                                                    replyForm.setData(
                                                        'reply_body',
                                                        e.target.value,
                                                    )
                                                }
                                                className="min-h-40"
                                                placeholder="اكتب رد الإدارة الذي سيُرسل إلى بريد الزائر"
                                            />
                                            <InputError
                                                message={
                                                    replyForm.errors.reply_body
                                                }
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={replyForm.processing}
                                            className="font-bold"
                                        >
                                            {replyForm.processing && (
                                                <Loader2 className="me-2 size-4 animate-spin" />
                                            )}
                                            إرسال الرد بالبريد الإلكتروني
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-bold">
                                    بيانات المرسل
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2">
                                        <User className="size-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                            الاسم
                                        </p>
                                        <p className="font-bold">
                                            {contactMessage.name}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2">
                                        <Mail className="size-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                            البريد الإلكتروني
                                        </p>
                                        <p className="font-bold">
                                            {contactMessage.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2">
                                        <MessageSquare className="size-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                            الموضوع
                                        </p>
                                        <p className="font-bold">
                                            {contactMessage.subject}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2">
                                        <Clock3 className="size-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                            تاريخ الإرسال
                                        </p>
                                        <p className="font-bold">
                                            {new Date(
                                                contactMessage.created_at,
                                            ).toLocaleString('ar-EG')}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="font-bold">
                                    الحالة
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {contactMessage.is_replied ? (
                                    <Badge className="bg-green-100 font-bold text-green-800 hover:bg-green-100">
                                        تم الرد
                                    </Badge>
                                ) : (
                                    <Badge
                                        variant="secondary"
                                        className="bg-amber-100 font-bold text-amber-800 hover:bg-amber-100"
                                    >
                                        بانتظار الرد
                                    </Badge>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Dialog
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
            >
                <DialogContent dir="rtl">
                    <DialogHeader>
                        <DialogTitle className="text-start font-bold">
                            حذف رسالة التواصل
                        </DialogTitle>
                        <DialogDescription className="text-start font-semibold">
                            سيتم حذف الرسالة نهائياً من لوحة التحكم. هل أنت
                            متأكد؟
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="flex flex-row items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            إلغاء
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteForm.processing}
                        >
                            {deleteForm.processing && (
                                <Loader2 className="me-2 size-4 animate-spin" />
                            )}
                            حذف الرسالة
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

ContactShowPage.layout = (page: React.ReactNode) => {
    const contactMessage = (page as any)?.props?.contactMessage;

    return (
        <AdminLayout
            breadcrumbs={
                contactMessage
                    ? [
                          {
                              title: 'لوحة التحكم',
                              href: admin.dashboard().url,
                          },
                          {
                              title: 'رسائل التواصل',
                              href: admin.contacts.index().url,
                          },
                          {
                              title: `رسالة #${contactMessage.id}`,
                              href: admin.contacts.show(contactMessage.id).url,
                          },
                      ]
                    : [
                          {
                              title: 'لوحة التحكم',
                              href: admin.dashboard().url,
                          },
                          {
                              title: 'رسائل التواصل',
                              href: admin.contacts.index().url,
                          },
                      ]
            }
        >
            {page}
        </AdminLayout>
    );
};
