import { Clock3, Mail, MessageSquare, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ContactMessage } from '@/types';
import type { ReactNode } from 'react';

interface ContactMessageDisplayProps {
    contactMessage: ContactMessage;
    children?: ReactNode;
}

export default function ContactMessageDisplay({ contactMessage, children }: ContactMessageDisplayProps) {
    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2 font-bold">
                                <MessageSquare className="size-5 text-primary" />
                                الرسالة الأصلية
                            </CardTitle>
                            {contactMessage.is_replied ? (
                                <Badge className="bg-green-100 font-bold text-green-800 hover:bg-green-100">
                                    تم الرد
                                </Badge>
                            ) : (
                                <Badge variant="secondary" className="bg-amber-100 font-bold text-amber-800 hover:bg-amber-100">
                                    بانتظار الرد
                                </Badge>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-base leading-relaxed font-semibold whitespace-pre-wrap">
                            {contactMessage.message}
                        </p>
                    </CardContent>
                </Card>
                {children}
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-bold">بيانات المرسل</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <User className="size-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">الاسم</p>
                                <p className="font-bold">{contactMessage.name}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Mail className="size-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">البريد الإلكتروني</p>
                                <p className="font-bold">{contactMessage.email}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <MessageSquare className="size-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">الموضوع</p>
                                <p className="font-bold">{contactMessage.subject}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Clock3 className="size-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">تاريخ الإرسال</p>
                                <p className="font-bold">
                                    {new Date(contactMessage.created_at).toLocaleString('ar-EG')}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
