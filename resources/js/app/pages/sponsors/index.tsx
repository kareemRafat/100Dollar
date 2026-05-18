import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';
import type { Sponsor } from '@/types';

interface Props {
    sponsors: Sponsor[];
    today: number; // 0-6 (Sunday-Saturday)
}

export default function SponsorsIndex({ sponsors, today }: Props) {
    const { __ } = useLang();

    // Mapping Laravel's dayOfWeek (0=Sunday ... 6=Saturday) to our keys
    const dayKeys = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ];

    // Create a normalized sponsors list for all 7 days, starting from Saturday (common in Arab world)
    const weekDaysOrdered = [6, 0, 1, 2, 3, 4, 5]; // Sat, Sun, Mon, Tue, Wed, Thu, Fri

    const fullWeekSponsors = weekDaysOrdered.map((index) => {
        const found = sponsors.find(s => s.day_of_week === index);
        return {
            day: dayKeys[index],
            dayIndex: index,
            isToday: index === today,
            data: found || null
        };
    });

    const sponsorBenefits = [
        {
            icon: 'visibility',
            title: __('messages.sponsors.benefit_visibility_title'),
            description: __('messages.sponsors.benefit_visibility_desc'),
        },
        {
            icon: 'handshake',
            title: __('messages.sponsors.benefit_connection_title'),
            description: __('messages.sponsors.benefit_connection_desc'),
        },
        {
            icon: 'analytics',
            title: __('messages.sponsors.benefit_report_title'),
            description: __('messages.sponsors.benefit_report_desc'),
        },
    ];

    return (
        <>
            <Head title={__('messages.nav.sponsors')} />

            <section className="relative flex h-[400px] items-center justify-center overflow-hidden md:h-[500px]">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Business Partnership"
                        className="h-full w-full object-cover grayscale brightness-50"
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-slate-900"
                    />
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-8 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-primary-fixed backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                        </span>
                        <span className="text-xs font-black tracking-wider uppercase">
                            {__('messages.sponsors.hero_badge')}
                        </span>
                    </div>
                    <h1 className="mb-6 font-headline text-4xl leading-tight font-black text-white md:text-6xl">
                        {__('messages.sponsors.hero_title')}
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-300">
                        {__('messages.sponsors.hero_desc')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild size="xl" className="h-14 rounded-2xl px-8 font-black text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                            <Link href="/sponsors/apply">
                                {__('messages.sponsors.become_sponsor_button')}
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="xl"
                            className="h-14 rounded-2xl border-white/20 bg-white/5 px-8 font-black text-white backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
                            onClick={() => document.getElementById('sponsors-list')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {__('messages.sponsors.meet_sponsors_button')}
                        </Button>
                    </div>
                </div>
            </section>

            <section id="sponsors-list" className="mx-auto max-w-7xl px-8 py-24 scroll-mt-20">
                <div className="mb-16 text-center md:text-start">
                    <h2 className="mb-4 font-headline text-3xl font-black text-on-surface dark:text-white md:text-4xl">
                        {__('messages.sponsors.weekly_schedule_title')}
                    </h2>
                    <p className="text-on-surface-variant dark:text-slate-400">
                        {__('messages.sponsors.weekly_schedule_desc')}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {fullWeekSponsors.map((item) => (
                        <SponsorCard key={item.day} item={item} />
                    ))}

                    {/* The 8th slot CTA */}
                    <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] border-2 border-dashed border-primary/20 bg-primary/5 p-8 text-center transition-all duration-500 hover:border-primary/50 hover:bg-primary/10">
                        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/10" />
                        <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/10" />

                        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110">
                            <span className="material-symbols-outlined text-5xl">rocket_launch</span>
                        </div>

                        <h3 className="relative mb-3 font-headline text-xl font-black text-on-surface dark:text-white">
                            {__('messages.sponsors.your_brand_here')}
                        </h3>
                        <p className="relative mb-6 text-sm text-on-surface-variant dark:text-slate-400">
                            {__('messages.sponsors.cta_description')}
                        </p>

                        <Button asChild className="relative w-full rounded-xl font-black shadow-lg shadow-primary/20">
                            <Link href="/sponsors/apply">
                                {__('messages.sponsors.contact_us_now')}
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="mx-auto mb-24 max-w-7xl px-8">
                <div className="relative overflow-hidden rounded-[3rem] border border-outline-variant/10 bg-surface-container-high/30 p-12 md:p-20">
                    <div className="absolute top-0 right-0 -mt-32 -mr-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
                    <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

                    <div className="relative z-10 mb-16 text-center">
                        <h2 className="mb-6 font-headline text-4xl leading-tight font-black text-on-surface dark:text-white md:text-5xl">
                            {__('messages.sponsors.inspire_youth_title')}
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-on-surface-variant dark:text-slate-300">
                            {__('messages.sponsors.inspire_youth_desc')}
                        </p>
                    </div>

                    <div className="relative z-10 mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {sponsorBenefits.map((benefit) => (
                            <div
                                key={benefit.icon}
                                className="group rounded-3xl border border-outline-variant/10 bg-surface-container-lowest p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-sm dark:bg-surface-container-highest"
                            >
                                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                    <span className="material-symbols-outlined text-4xl font-light transition-transform duration-500 group-hover:rotate-12">
                                        {benefit.icon}
                                    </span>
                                </div>
                                <h4 className="mb-4 font-headline text-2xl font-black text-on-surface dark:text-white">
                                    {benefit.title}
                                </h4>
                                <p className="text-base leading-relaxed text-on-surface-variant dark:text-slate-300">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="relative z-10 text-center">
                        <Button asChild size="xl" className="h-16 rounded-2xl px-12 text-xl font-black shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                            <Link href="/sponsors/apply">
                                {__('messages.sponsors.contact_for_sponsorship')}
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}

function SponsorCard({ item }: { item: { day: string; isToday: boolean; data: any } }) {
    const { __ } = useLang();
    const { data, isToday, day } = item;

    if (!data) {
        return (
            <div
                className="group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-outline-variant/30 bg-surface-container-low p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-lg dark:bg-surface-container-high"
            >
                <div>
                    <div className="mb-6 flex items-center justify-between">
                        <span className="rounded-lg bg-surface-container-high px-3 py-1 text-[10px] font-black tracking-widest text-on-surface-variant uppercase dark:bg-surface-container-highest dark:text-slate-400">
                            {__(`messages.sponsors.days.${day}`)}
                        </span>
                    </div>

                    <div className="mb-6 flex aspect-square w-full items-center justify-center rounded-2xl bg-surface-container-high transition-all duration-500 group-hover:bg-primary/5 dark:bg-surface-container-highest">
                        <span className="material-symbols-outlined text-4xl text-outline-variant/40 transition-colors group-hover:text-primary/40">
                            add_circle
                        </span>
                    </div>

                    <h3 className="mb-1 font-headline text-lg font-black text-on-surface dark:text-white">
                        {__('messages.sponsors.available_for_sponsorship')}
                    </h3>
                    <p className="text-[11px] text-on-surface-variant dark:text-slate-400">
                        {__('messages.sponsors.be_the_one')}
                    </p>
                </div>

                <Button asChild variant="outline" size="sm" className="mt-6 h-10 rounded-lg font-black transition-all hover:bg-primary hover:text-white hover:border-primary">
                    <Link href="/sponsors/apply">
                        {__('messages.nav.contact')}
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border bg-surface-container-lowest p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-md dark:bg-surface-container-low',
                isToday
                    ? 'border-primary shadow-lg ring-4 ring-primary/5 z-10'
                    : 'border-outline-variant/20 shadow-sm hover:border-primary/30'
            )}
        >
            {isToday && (
                <div className="absolute top-0 inset-0 w-full">
                    <div className="h-1 w-full bg-primary" />
                </div>
            )}

            <div>
                <div className="mb-6 flex items-center justify-between">
                    <div className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-1",
                        isToday
                            ? "bg-primary text-white shadow-sm"
                            : "bg-primary/5 text-primary border border-primary/10"
                    )}>
                        <span className="text-[10px] font-black tracking-widest uppercase">
                            {__(`messages.sponsors.days.${day}`)}
                        </span>
                        {isToday && (
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                            </span>
                        )}
                    </div>

                    {!isToday && (
                        <span className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-tighter">
                            {__('messages.sponsors.day_sponsor').replace(':day', '').trim()}
                        </span>
                    )}
                </div>

                <div className="group/logo relative mb-6 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-outline-variant/5 bg-white p-6 transition-all duration-500 group-hover:p-5 dark:bg-slate-200">
                    <img
                        alt={`${data.name} Logo`}
                        className="h-full w-full object-contain transition-transform duration-500 rounded-lg"
                        src={data.logo}
                    />
                </div>

                <div className="text-center md:text-start">
                    <h3 className="mb-0.5 font-headline text-xl font-black text-on-surface dark:text-white">
                        {data.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1.5 md:justify-start">
                        <span className="h-1 w-1 rounded-full bg-primary/40" />
                        <p className="text-[11px] font-bold text-on-surface-variant dark:text-slate-400">
                            {__('messages.sponsors.certified_partner')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-surface-container-low p-3 dark:bg-surface-container-highest/30">
                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 dark:text-slate-500">
                    {__('messages.sponsors.weekly_prize')}
                </p>
                <p className="font-headline text-base font-black text-primary">
                    $100
                </p>
            </div>
        </div>
    );
}
