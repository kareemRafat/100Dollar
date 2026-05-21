import { useLang } from '@erag/lang-sync-inertia/react';
import { router } from '@inertiajs/react';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';

interface Day {
    id: number;
    name: string;
}

interface Props {
    weekDays: Day[];
    currentDay: number;
}

export default function DayTabs({ weekDays = [], currentDay }: Props) {
    const { __ } = useLang();

    if (!weekDays || weekDays.length === 0) {
        return null;
    }

    const handleDayChange = (dayId: number) => {
        router.get(
            '/',
            { day: dayId },
            {
                preserveScroll: true,
                only: ['ideas', 'sponsor', 'currentDay', 'votedIdeaId'],
            },
        );
    };

    return (
        <section className="mx-auto mb-10 max-w-7xl px-6">
            <div className="no-scrollbar flex snap-x gap-2 overflow-x-auto pb-4">
                {weekDays.map((day) => (
                    <Button
                        key={day.id}
                        onClick={() => handleDayChange(day.id)}
                        variant={
                            currentDay === day.id ? 'default' : 'secondary'
                        }
                        className={cn(
                            'h-auto cursor-pointer rounded-xl px-6 py-3 font-headline text-sm font-bold whitespace-nowrap shadow-none',
                            currentDay === day.id
                                ? 'shadow-md'
                                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high dark:text-on-surface-variant',
                        )}
                    >
                        {__(day.name)}
                    </Button>
                ))}
            </div>
        </section>
    );
}
