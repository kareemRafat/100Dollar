import { Head, router } from '@inertiajs/react';
import { CheckCircle2, Trophy, Users, Vote, AlertTriangle } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/admin/layouts/admin-layout';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import admin from '@/routes/admin';
import type { BreadcrumbItem, Idea, Sponsor } from '@/types';

interface WinnerDay {
    day_index: number;
    sponsor: Sponsor | null;
    leading_idea: Idea | null;
    announced_winner: Idea | null;
    is_today: boolean;
}

interface WinnersPreviewProps {
    days: WinnerDay[];
    week: number;
    year: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: admin.dashboard().url,
    },
    {
        title: 'إدارة الفائزين',
        href: admin.winners.index().url,
    },
];

const dayNames = [
    'الأحد',
    'الاثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
];

const weekOrder = [6, 0, 1, 2, 3, 4, 5];

export default function WinnersPreview({ days, week, year }: WinnersPreviewProps) {
    const [confirmingIdea, setConfirmingIdea] = useState<Idea | null>(null);
    const [processing, setProcessing] = useState(false);

    // Sort days based on weekOrder (Saturday first)
    const sortedDays = [...days].sort((a, b) => weekOrder.indexOf(a.day_index) - weekOrder.indexOf(b.day_index));

    const handleConfirmWinner = () => {
        if (!confirmingIdea) return;

        setProcessing(true);
        router.post(admin.winners.confirm(confirmingIdea.id).url, {}, {
            onSuccess: () => {
                toast.success('تم إعلان الفائز بنجاح');
                setConfirmingIdea(null);
            },
            onError: (errors) => {
                toast.error(errors.error || 'حدث خطأ ما');
            },
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <>
            <Head title="إدارة الفائزين" />
            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">إدارة الفائزين</h1>
                        <p className="text-sm text-muted-foreground">
                            متابعة وتأكيد الفائزين للأسبوع الحالي (أسبوع {week} - {year})
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedDays.map((day, index) => (
                        <Card
                            key={day.day_index}
                            className={cn(
                                "flex flex-col h-full",
                                day.is_today ? 'border-primary ring-1 ring-primary/20' : '',
                                index === sortedDays.length - 1 ? 'lg:col-span-3' : ''
                            )}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{dayNames[day.day_index]}</CardTitle>
                                    {day.is_today && (
                                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black">اليوم</Badge>
                                    )}
                                </div>
                                <CardDescription className="flex items-center gap-2">
                                    {day.sponsor ? (
                                        <>
                                            <span className="text-xs text-muted-foreground">الراعي:</span>
                                            <span className="font-semibold text-foreground">{day.sponsor.name}</span>
                                        </>
                                    ) : (
                                        <span className="text-xs text-destructive">لا يوجد راعٍ مخصص</span>
                                    )}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 flex-1">
                                {day.announced_winner ? (
                                    <div className="rounded-lg bg-green-50 p-4 border border-green-100 dark:bg-green-950/20 dark:border-green-900/30 h-full">
                                        <div className="mb-2 flex items-center gap-2 text-green-700 dark:text-green-400">
                                            <Trophy className="h-4 w-4" />
                                            <span className="text-sm font-bold">الفائز الرسمي</span>
                                        </div>
                                        <p className="font-bold text-foreground line-clamp-2">{day.announced_winner.title}</p>
                                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                            <Users className="h-3 w-3" />
                                            <span>{day.announced_winner.user?.name}</span>
                                        </div>
                                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                            <Vote className="h-3 w-3" />
                                            <span>{day.announced_winner.votes_count} صوت</span>
                                        </div>
                                    </div>
                                ) : day.leading_idea ? (
                                    <div className="rounded-lg bg-accent/50 p-4 border border-border h-full">
                                        <div className="mb-2 flex items-center gap-2 text-amber-600 dark:text-amber-400">
                                            <CheckCircle2 className="h-4 w-4" />
                                            <span className="text-sm font-bold text-muted-foreground">المتصدر حالياً</span>
                                        </div>
                                        <p className="font-bold text-foreground line-clamp-2">{day.leading_idea.title}</p>
                                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                            <Users className="h-3 w-3" />
                                            <span>{day.leading_idea.user?.name}</span>
                                        </div>
                                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground font-bold">
                                            <Vote className="h-3 w-3" />
                                            <span className="text-primary">{day.leading_idea.votes_count} صوت</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed text-muted-foreground h-full">
                                        <p className="text-xs">لا يوجد أفكار لهذا اليوم</p>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="pt-3">
                                {day.announced_winner ? (
                                    <Button disabled variant="outline" className="w-full gap-2">
                                        <CheckCircle2 className="h-4 w-4" />
                                        تم الإعلان
                                    </Button>
                                ) : day.leading_idea ? (
                                    <Button
                                        onClick={() => setConfirmingIdea(day.leading_idea)}
                                        className="w-full gap-2"
                                        disabled={!day.sponsor}
                                    >
                                        تأكيد الفائز
                                    </Button>
                                ) : (
                                    <Button disabled variant="secondary" className="w-full">
                                        انتظار المشاركات
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            <Dialog open={!!confirmingIdea} onOpenChange={(open) => !open && setConfirmingIdea(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <DialogTitle className="text-center mt-4">تأكيد الفائز الرسمي</DialogTitle>
                        <DialogDescription className="text-center">
                            هل أنت متأكد من اختيار فكرة <span className="font-bold text-foreground">"{confirmingIdea?.title}"</span> كفائز رسمي لهذا اليوم؟
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 rounded-lg bg-muted p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">صاحب الفكرة:</span>
                            <span className="font-semibold">{confirmingIdea?.user?.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">عدد الأصوات:</span>
                            <span className="font-semibold text-primary">{confirmingIdea?.votes_count} صوت</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">اليوم:</span>
                            <span className="font-semibold">{confirmingIdea ? dayNames[confirmingIdea.submission_day] : ''}</span>
                        </div>
                    </div>
                    <DialogFooter className="mt-6 flex flex-row gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setConfirmingIdea(null)}
                            disabled={processing}
                            className="flex-1"
                        >
                            إلغاء
                        </Button>
                        <Button
                            onClick={handleConfirmWinner}
                            disabled={processing}
                            className="flex-1"
                        >
                            {processing ? 'جاري التأكيد...' : 'تأكيد الفائز'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

WinnersPreview.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>
);
