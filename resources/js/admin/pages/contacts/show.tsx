import { Head, Link, useForm } from '@inertiajs/react';
import { Reply, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { reply } from '@/actions/App/Http/Controllers/Admin/ContactController';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import admin from '@/routes/admin';
import type { ContactMessage } from '@/types';
import ContactMessageDisplay from './components/contact-message-display';
import DeleteContactDialog from './components/delete-contact-dialog';
import ReplyForm from './components/reply-form';

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

                <ContactMessageDisplay contactMessage={contactMessage}>
                    <ReplyForm
                        contactMessage={contactMessage}
                        replyForm={replyForm}
                        onSubmit={handleReplySubmit}
                    />
                </ContactMessageDisplay>
            </div>

            <DeleteContactDialog
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onDelete={handleDelete}
                processing={deleteForm.processing}
            />
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
