import { Building2, Calendar, Clock, ExternalLink, Eye, FileText, Globe, ImageIcon, Mail, MapPin, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SponsorshipRequest } from '@/types';

const statusLabels: Record<string, { label: string; variant: 'default' | 'destructive' | 'secondary' }> = {
    pending: { label: 'قيد المراجعة', variant: 'secondary' },
    approved: { label: 'تم القبول', variant: 'default' },
    rejected: { label: 'مرفوض', variant: 'destructive' },
};

interface RequestInfoCardProps {
    request: SponsorshipRequest;
}

export default function RequestInfoCard({ request }: RequestInfoCardProps) {
    const badge = statusLabels[request.status] || statusLabels.pending;

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
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
                                    <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">البريد الإلكتروني</p>
                                    <p className="max-w-[200px] truncate font-bold">{request.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <Phone className="size-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">رقم الهاتف</p>
                                    <p className="font-bold" dir="ltr">{request.phone}</p>
                                </div>
                            </div>

                            {request.website && (
                                <div className="flex items-start gap-3 sm:col-span-2">
                                    <div className="rounded-lg bg-primary/10 p-2">
                                        <Globe className="size-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">الموقع الإلكتروني</p>
                                        <a
                                            href={request.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 font-bold text-primary hover:underline"
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
                                    <p className="text-xs font-semibold text-muted-foreground">اسم الشركة</p>
                                    <p className="font-bold">{request.company_name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <MapPin className="size-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground">الدولة</p>
                                    <p className="font-bold">{request.country?.name_ar || 'غير محدد'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <Calendar className="size-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground">تاريخ التقديم</p>
                                    <p className="font-bold">{new Date(request.created_at).toLocaleDateString('ar-EG')}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <Clock className="size-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground">الحالة الحالية</p>
                                    <p className="font-bold">
                                        <Badge variant={badge.variant} className="font-bold">{badge.label}</Badge>
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
                        <CardTitle className="flex items-center gap-2 text-lg font-bold">
                            <ImageIcon className="size-5 text-primary" />
                            شعار الشركة
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {request.logo ? (
                            <div className="group relative aspect-square overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-zinc-950">
                                <img
                                    src={request.logo}
                                    alt={request.company_name}
                                    className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <Button variant="secondary" size="sm" asChild className="font-bold shadow-lg">
                                        <a href={request.logo} target="_blank" rel="noopener noreferrer">
                                            <Eye className="me-2 size-4" />
                                            عرض الشعار كاملاً
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-muted bg-muted/5 text-muted-foreground">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="rounded-full bg-muted/50 p-3">
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
    );
}
