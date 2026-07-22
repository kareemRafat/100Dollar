import { CheckCircle2, Trophy, Users, Vote } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import type { Idea, Sponsor } from '@/types';

interface WinnerDay {
    day_index: number;
    sponsor: Sponsor | null;
    leading_idea: Idea | null;
    announced_winner: Idea | null;
    is_today: boolean;
    is_tied?: boolean;
    voting_status?: 'voting_open' | 'completed' | null;
    remaining_days?: number | null;
}

interface WinnerCardProps {
    day: WinnerDay;
    dayName: string;
    isLastInGrid: boolean;
    onConfirm: (idea: Idea) => void;
}

export default function WinnerCard({
    day,
    dayName,
    isLastInGrid,
    onConfirm,
}: WinnerCardProps) {
    return (
        <Card
            className={cn(
                'flex h-full flex-col',
                day.is_today ? 'border-primary ring-1 ring-primary/20' : '',
                isLastInGrid ? 'lg:col-span-3' : '',
            )}
        >
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{dayName}</CardTitle>
                    <div className="flex items-center gap-2">
                        {day.is_tied && (
                            <Badge
                                variant="outline"
                                className="border-amber-500/30 bg-amber-500/10 text-xs font-bold text-amber-600"
                            >
                                تعادل
                            </Badge>
                        )}
                        {day.is_today && (
                            <Badge
                                variant="outline"
                                className="border-bg-orange-700/20 bg-orange-700/10 text-base font-bold text-orange-700"
                            >
                                اليوم
                            </Badge>
                        )}
                    </div>
                </div>
                <CardDescription className="flex items-center gap-2">
                    {day.sponsor ? (
                        <>
                            <span className="text-xs font-bold text-muted-foreground">
                                الراعي :
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
            {day.voting_status && !day.announced_winner && day.leading_idea && (
                <div className="px-6">
                    <Badge
                        variant="outline"
                        className={
                            day.voting_status === 'voting_open'
                                ? 'border-green-500/30 bg-green-500/10 text-xs font-bold text-green-600'
                                : 'border-gray-500/30 bg-gray-500/10 text-xs font-bold text-gray-600'
                        }
                    >
                        {day.voting_status === 'voting_open'
                            ? `التصويت مفتوح - ${day.remaining_days} أيام متبقية`
                            : 'التصويت مغلق'}
                    </Badge>
                </div>
            )}
            <CardContent className="flex-1 space-y-4">
                {day.announced_winner ? (
                    <div className="h-full rounded-lg border border-green-100 bg-green-50 p-4 dark:border-green-900/30 dark:bg-green-950/20">
                        <div className="mb-2 flex items-center gap-2 text-green-700 dark:text-green-400">
                            <Trophy className="h-4 w-4" />
                            <span className="text-sm font-bold">الفائز الرسمي</span>
                        </div>
                        <p className="line-clamp-2 font-bold text-foreground">
                            {day.announced_winner.title}
                        </p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span className="text-sm font-semibold">
                                {day.announced_winner.user?.name}
                            </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <Vote className="h-3 w-3" />
                            <span className="text-sm font-semibold">
                                {day.announced_winner.votes_count} صوت
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
                                {day.leading_idea.votes_count} صوت
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed text-muted-foreground">
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
                        onClick={() => onConfirm(day.leading_idea!)}
                        className="w-full gap-2"
                        disabled={!day.sponsor || day.is_tied}
                    >
                        {day.is_tied ? 'تعادل - يلزم اختيار يدوي' : 'تأكيد الفائز'}
                    </Button>
                ) : (
                    <Button disabled variant="secondary" className="w-full">
                        انتظار المشاركات
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
