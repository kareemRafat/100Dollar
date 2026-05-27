import { useLang } from '@erag/lang-sync-inertia/react';
import { Link } from '@inertiajs/react';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';
import type { Sponsor } from '@/types';

interface SponsorWeekGridProps {
    sponsors: Sponsor[];
    today: number;
}

const dayKeys = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
];

export function SponsorWeekGrid({ sponsors, today }: SponsorWeekGridProps) {
    const { __ } = useLang();

    const weekDaysOrdered = [6, 0, 1, 2, 3, 4, 5];

    const fullWeekSponsors = weekDaysOrdered.map((index) => {
        const found = sponsors.find((s) => s.day_of_week === index);

        return {
            day: dayKeys[index],
            dayIndex: index,
            isToday: index === today,
            isFeatured: [6, 2, 5].includes(index),
            data: found || null,
        };
    });

    return (
        <section
            id="sponsors-list"
            className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
        >
            <div className="mb-12 text-center md:mb-16 md:text-start">
                <h2 className="mb-4 font-headline text-3xl font-black text-on-surface md:text-4xl dark:text-white">
                    {__('messages.sponsors.weekly_schedule_title')}
                </h2>
                <p className="text-on-surface-variant dark:text-slate-400">
                    {__('messages.sponsors.weekly_schedule_desc')}
                </p>
            </div>

            <div className="grid auto-rows-[minmax(240px,_1fr)] grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:auto-rows-[minmax(260px,_1fr)] xl:grid-cols-4">
                {fullWeekSponsors.map((item) => (
                    <div
                        key={item.dayIndex}
                        className={cn(
                            'h-full',
                            item.isFeatured &&
                                'md:col-span-2 lg:row-span-2 xl:col-span-2',
                        )}
                    >
                        <SponsorCard
                            item={item}
                            isFeatured={item.isFeatured}
                        />
                    </div>
                ))}

                <SponsorCtaCard />
            </div>
        </section>
    );
}

function SponsorCard({
    item,
    isFeatured = false,
}: {
    item: { day: string; isToday: boolean; data: any };
    isFeatured?: boolean;
}) {
    const { __ } = useLang();
    const { data, isToday, day } = item;

    if (!data) {
        return (
            <div
                className={cn(
                    'group relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container-low p-5 transition-all duration-500 hover:border-primary/30 md:p-6 dark:bg-surface-container-high',
                    isFeatured && 'min-h-[320px] md:min-h-[360px]',
                )}
            >
                <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full border border-outline-variant/10 bg-surface-container-high px-3.5 py-1 text-[10px] font-black tracking-widest text-on-surface-variant uppercase shadow-sm dark:bg-surface-container-highest dark:text-slate-300">
                        {__(`messages.sponsors.days.${day}`)}
                    </span>
                    <span className="text-[10px] font-black text-primary/30">
                        $100
                    </span>
                </div>

                <div
                    className={cn(
                        'mb-4 flex w-full items-center justify-center rounded-2xl bg-surface-container-high/50 transition-all duration-500 group-hover:bg-primary/5 dark:bg-surface-container-highest/30',
                        isFeatured
                            ? 'mb-6 min-h-[180px] flex-1'
                            : 'min-h-[160px]',
                    )}
                >
                    <span className="material-symbols-outlined text-3xl text-outline-variant/30">
                        add_circle
                    </span>
                </div>

                <div className="text-start">
                    <h3 className="mb-1 font-headline text-base font-black text-on-surface dark:text-white">
                        {__('messages.sponsors.available_for_sponsorship')}
                    </h3>
                    <Button
                        asChild
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-[10px] font-bold text-primary"
                    >
                        <Link href="/sponsors/apply">
                            {__('messages.nav.contact')}
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'group relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-3xl border bg-surface-container-lowest transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:bg-surface-container-low',
                isToday
                    ? 'z-10 border-primary shadow-md ring-2 ring-primary/5'
                    : 'border-outline-variant/10 shadow-sm hover:border-primary/20',
                isFeatured && 'min-h-[320px] md:min-h-[360px]',
            )}
        >
            <div className="absolute inset-0 z-0">
                <img
                    alt={`${data.name} Logo`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={data.logo}
                />
                <div
                    className={cn(
                        'absolute inset-0 transition-opacity duration-500',
                        isToday
                            ? 'bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-90'
                            : 'bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-70',
                    )}
                />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-6">
                <div className="flex items-center justify-between">
                    <div
                        className={cn(
                            'flex items-center gap-2 rounded-full px-3.5 py-1.5 shadow-sm transition-transform duration-500 group-hover:scale-105',
                            isToday
                                ? 'bg-white text-primary ring-2 ring-primary/10'
                                : 'border border-white/10 bg-slate-900/60 text-white backdrop-blur-xl',
                        )}
                    >
                        <span className="text-base leading-none font-black tracking-widest uppercase">
                            {__(`messages.sponsors.days.${day}`)}
                        </span>
                        {isToday && (
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                            </span>
                        )}
                    </div>

                    <div
                        className={cn(
                            'rounded-full border px-3 py-1 text-[10px] font-black shadow-sm backdrop-blur-md transition-all duration-500',
                            isToday
                                ? 'border-white/30 bg-white/20 text-white'
                                : 'border-primary/20 bg-primary/10 text-primary-fixed',
                        )}
                    >
                        $100
                    </div>
                </div>

                <div className="text-start">
                    <h3
                        className={cn(
                            'font-headline leading-tight font-black text-white drop-shadow-sm',
                            isFeatured
                                ? 'text-2xl md:text-3xl'
                                : 'text-lg md:text-xl',
                        )}
                    >
                        {data.name}
                    </h3>
                </div>
            </div>
        </div>
    );
}

function SponsorCtaCard() {
    const { __ } = useLang();

    return (
        <div className="group relative flex h-full min-h-[240px] flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 p-6 text-center transition-all duration-500 hover:border-primary/40 md:col-span-2 md:min-h-[320px] lg:row-span-2 lg:min-h-[360px] xl:col-span-2">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-3xl">
                    rocket_launch
                </span>
            </div>

            <h3 className="relative mb-2 font-headline text-xl font-black text-on-surface md:text-2xl dark:text-white">
                {__('messages.sponsors.your_brand_here')}
            </h3>
            <p className="relative mb-6 max-w-sm text-sm leading-6 text-on-surface-variant/80 dark:text-slate-400">
                {__('messages.sponsors.cta_description')}
            </p>

            <Button
                asChild
                size="sm"
                className="relative h-10 rounded-xl px-6 text-sm font-black shadow-lg shadow-primary/10"
            >
                <Link href="/sponsors/apply">
                    {__('messages.sponsors.contact_us_now')}
                </Link>
            </Button>
        </div>
    );
}
