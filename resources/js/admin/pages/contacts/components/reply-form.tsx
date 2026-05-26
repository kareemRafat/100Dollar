import { Clock3, Loader2, Reply } from 'lucide-react';
import React from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ContactMessage } from '@/types';

interface ReplyFormProps {
    contactMessage: ContactMessage;
    replyForm: {
        data: { reply_body: string };
        setData: (key: string, value: string) => void;
        errors: Partial<Record<string, string>>;
        processing: boolean;
    };
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ReplyForm({ contactMessage, replyForm, onSubmit }: ReplyFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-bold">
                    <Reply className="size-5 text-primary" />
                    {contactMessage.is_replied ? 'الرد المحفوظ' : 'إرسال رد'}
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
                                    ? new Date(contactMessage.replied_at).toLocaleString('ar-EG')
                                    : '-'}
                            </span>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="reply_body">نص الرد</Label>
                            <Textarea
                                id="reply_body"
                                value={replyForm.data.reply_body}
                                onChange={(e) => replyForm.setData('reply_body', e.target.value)}
                                className="min-h-40"
                                placeholder="اكتب رد الإدارة الذي سيُرسل إلى بريد الزائر"
                            />
                            <InputError message={replyForm.errors.reply_body} />
                        </div>
                        <Button type="submit" disabled={replyForm.processing} className="font-bold">
                            {replyForm.processing && (
                                <Loader2 className="me-2 size-4 animate-spin" />
                            )}
                            إرسال الرد بالبريد الإلكتروني
                        </Button>
                    </form>
                )}
            </CardContent>
        </Card>
    );
}
