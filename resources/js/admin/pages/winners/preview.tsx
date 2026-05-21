import { Head, router } from '@inertiajs/react';
import { CheckCircle2, Trophy, Users, Vote, AlertTriangle } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
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

export default function WinnersPreview({
    days,
    week,
    year,
}: WinnersPreviewProps) {
    const [confirmingIdea, setConfirmingIdea] = useState<Idea | null>(null);
    const [processing, setProcessing] = useState(false);

    // Sort days based on weekOrder (Saturday first)
    const sortedDays = [...days].sort(
        (a, b) =>
            weekOrder.indexOf(a.day_index) - weekOrder.indexOf(b.day_index),
    );

    const handleConfirmWinner = () => {
        if (!confirmingIdea) {
            return;
        }

        setProcessing(true);
        router.post(
            admin.winners.confirm(confirmingIdea.id).url,
            {},
            {
                onSuccess: () => {
                    toast.success('تم إعلان الفائز بنجاح');
                    setConfirmingIdea(null);
                },
                onError: (errors) => {
                    toast.error(errors.error || 'حدث خطأ ما');
                },
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <>
            <Head title="إدارة الفائزين" />
            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">إدارة الفائزين</h1>
                        <p className="text-sm font-semibold text-muted-foreground">
                            متابعة وتأكيد الفائزين للأسبوع الحالي (أسبوع {week}{' '}
                            - {year})
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedDays.map((day, index) => (
                        <Card
                            key={day.day_index}
                            className={cn(
                                'flex h-full flex-col',
                                day.is_today
                                    ? 'border-primary ring-1 ring-primary/20'
                                    : '',
                                index === sortedDays.length - 1
                                    ? 'lg:col-span-3'
                                    : '',
                            )}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">
                                        {dayNames[day.day_index]}
                                    </CardTitle>
                                    {day.is_today && (
                                        <Badge
                                            variant="outline"
                                            className="border-bg-orange-700/20 bg-orange-700/10 text-base font-bold text-orange-700"
                                        >
                                            اليوم
                                        </Badge>
                                    )}
                                </div>
                                <CardDescription className="flex items-center gap-2">
                                    {day.sponsor ? (
                                        <>
                                            <span className="text-xs font-bold text-muted-foreground">
                                                {' '}
                                                الراعي :{' '}
                                            </span>
                                            <span className="text-sm font-bold text-sky-800">
                                                {day.sponsor.name}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-xs text-destructive">
                                            لا يوجد راعٍ مخصص
                                        </span>
                                    )}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                {day.announced_winner ? (
                                    <div className="h-full rounded-lg border border-green-100 bg-green-50 p-4 dark:border-green-900/30 dark:bg-green-950/20">
                                        <div className="mb-2 flex items-center gap-2 text-green-700 dark:text-green-400">
                                            <Trophy className="h-4 w-4" />
                                            <span className="text-sm font-bold">
                                                الفائز الرسمي
                                            </span>
                                        </div>
                                        <p className="line-clamp-2 font-bold text-foreground">
                                            {day.announced_winner.title}
                                        </p>
                                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                            <Users className="h-3 w-3" />
                                            <span className="text-sm font-semibold">
                                                {
                                                    day.announced_winner.user
                                                        ?.name
                                                }
                                            </span>
                                        </div>
                                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                            <Vote className="h-3 w-3" />
                                            <span className="text-sm font-semibold">
                                                {
                                                    day.announced_winner
                                                        .votes_count
                                                }{' '}
                                                صوت
                                            </span>
                                        </div>
                                    </div>
                                ) : day.leading_idea ? (
                                    <div className="h-full rounded-lg border border-border bg-accent/50 p-4">
                                        <div className="mb-2 flex items-center gap-2 text-amber-600 dark:text-amber-400">
                                            <CheckCircle2 className="h-4 w-4" />
                                            <span className="text-sm font-bold text-muted-foreground">
                                                المتصدر حالياً
                                            </span>
                                        </div>
                                        <p className="line-clamp-2 font-bold text-foreground">
                                            {day.leading_idea.title}
                                        </p>
                                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                            <Users className="h-3 w-3" />
                                            <span className="text-sm font-semibold">
                                                {day.leading_idea.user?.name}
                                            </span>
                                        </div>
                                        <div className="mt-1 flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                            <Vote className="h-3 w-3" />
                                            <span className="text-sm font-semibold text-primary">
                                                {day.leading_idea.votes_count}{' '}
                                                صوت
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed text-muted-foreground">
                                        <p className="text-xs">
                                            لا يوجد أفكار لهذا اليوم
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="pt-3">
                                {day.announced_winner ? (
                                    <Button
                                        disabled
                                        variant="outline"
                                        className="w-full gap-2"
                                    >
                                        <CheckCircle2 className="h-4 w-4" />
                                        تم الإعلان
                                    </Button>
                                ) : day.leading_idea ? (
                                    <Button
                                        onClick={() =>
                                            setConfirmingIdea(day.leading_idea)
                                        }
                                        className="w-full gap-2"
                                        disabled={!day.sponsor}
                                    >
                                        تأكيد الفائز
                                    </Button>
                                ) : (
                                    <Button
                                        disabled
                                        variant="secondary"
                                        className="w-full"
                                    >
                                        انتظار المشاركات
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            <Dialog
                open={!!confirmingIdea}
                onOpenChange={(open) => !open && setConfirmingIdea(null)}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <DialogTitle className="mt-4 text-center">
                            تأكيد الفائز الرسمي
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            هل أنت متأكد من اختيار فكرة{' '}
                            <span className="font-bold text-foreground">
                                "{confirmingIdea?.title}"
                            </span>{' '}
                            كفائز رسمي لهذا اليوم؟
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-2 rounded-lg bg-muted p-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                                صاحب الفكرة:
                            </span>
                            <span className="font-semibold">
                                {confirmingIdea?.user?.name}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                                عدد الأصوات:
                            </span>
                            <span className="font-semibold text-primary">
                                {confirmingIdea?.votes_count} صوت
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                                اليوم:
                            </span>
                            <span className="font-semibold">
                                {confirmingIdea
                                    ? dayNames[confirmingIdea.submission_day]
                                    : ''}
                            </span>
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
