import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/app/components/ui/button';
import AppLayout from '@/app/layouts/app-layout';
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

    // Create a normalized sponsors list for all 7 days
    const fullWeekSponsors = dayKeys.map((key, index) => {
        const found = sponsors.find(s => s.day_of_week === index);
        
        return {
            day: key,
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
        <AppLayout activeRoute="/sponsors">
            <Head title={__('messages.nav.sponsors')} />

            <section className="relative flex h-[320px] items-center justify-center overflow-hidden md:h-[400px]">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Business Partnership"
                        className="h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000"
                    />
                    <div
                        className="hero-overlay absolute inset-0"
                        style={{
                            background:
                                'linear-gradient(to bottom, rgba(26, 26, 46, 0.85), rgba(26, 26, 46, 0.95))',
                        }}
                    />
                </div>
                <div className="relative z-10 mx-auto px-8 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-4 py-1 text-primary-fixed">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                        </span>
                        <span className="text-sm font-bold">
                            {__('messages.sponsors.hero_badge')}
                        </span>
                    </div>
                    <h1 className="mb-4 font-headline text-2xl leading-tight font-black text-white md:text-4xl">
                        {__('messages.sponsors.hero_title')}
                    </h1>
                    <p className="mx-auto mb-6 max-w-2xl text-[15px] leading-relaxed text-gray-300">
                        {__('messages.sponsors.hero_desc')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button asChild size="lg" className="rounded-xl font-bold">
                            <Link href="/sponsors/apply">
                                {__('messages.sponsors.become_sponsor_button')}
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-xl border-white/20 bg-white/10 font-bold text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                            onClick={() => document.getElementById('sponsors-list')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {__('messages.sponsors.meet_sponsors_button')}
                        </Button>
                    </div>
                </div>
            </section>

            <section id="sponsors-list" className="mx-auto max-w-7xl px-8 py-24 scroll-mt-20">
                <div className="flex flex-col gap-10">
                    {/* First Row: Sat, Sun, Mon, Tue */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="hidden w-16 items-center justify-center rounded-2xl border border-primary/10 bg-primary/5 md:flex">
                            <span
                                className="writing-vertical py-8 font-headline text-2xl font-black text-primary"
                                style={{
                                    writingMode: 'vertical-rl',
                                    textOrientation: 'mixed',
                                }}
                            >
                                {__('messages.nav.sponsors')}
                            </span>
                        </div>
                        <div className="grid flex-1 grid-cols-1 items-stretch gap-6 md:grid-cols-4">
                            {fullWeekSponsors.slice(6, 7).concat(fullWeekSponsors.slice(0, 3)).map((item) => (
                                <SponsorCard key={item.day} item={item} />
                            ))}
                        </div>
                    </div>

                    {/* Second Row: Wed, Thu, Fri */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="hidden w-16 items-center justify-center rounded-2xl border border-primary/10 bg-primary/5 md:flex">
                             {/* Empty side bar for visual balance */}
                        </div>
                        <div className="grid flex-1 grid-cols-1 items-stretch gap-6 md:grid-cols-3">
                            {fullWeekSponsors.slice(3, 6).map((item) => (
                                <SponsorCard key={item.day} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto mb-24 max-w-7xl px-8">
                <div className="relative overflow-hidden rounded-3xl border border-outline-variant/10 bg-surface-container-high/30 p-12">
                    <div className="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-primary/5" />
                    <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-48 w-48 rounded-full bg-primary/5" />
                    <div className="relative z-10 mb-12 text-center">
                        <h2 className="mb-4 font-headline text-4xl leading-tight font-black text-on-surface dark:text-white">
                            {__('messages.sponsors.inspire_youth_title')}
                        </h2>
                        <p className="mx-auto max-w-xl text-on-surface dark:text-white">
                            {__('messages.sponsors.inspire_youth_desc')}
                        </p>
                    </div>
                    <div className="relative z-10 mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {sponsorBenefits.map((benefit) => (
                            <div
                                key={benefit.icon}
                                className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-md backdrop-blur-sm transition-all hover:shadow-lg dark:bg-surface-container-highest"
                            >
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                                    <span className="material-symbols-outlined text-3xl text-primary">
                                        {benefit.icon}
                                    </span>
                                </div>
                                <h4 className="mb-3 font-headline text-xl font-bold text-on-surface dark:text-white">
                                    {benefit.title}
                                </h4>
                                <p className="text-sm leading-relaxed text-on-surface-variant dark:text-slate-200">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="relative z-10 text-center">
                        <Button asChild size="lg" className="h-16 rounded-2xl px-12 text-xl font-black shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                            <Link href="/sponsors/apply">
                                {__('messages.sponsors.contact_for_sponsorship')}
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}

function SponsorCard({ item }: { item: { day: string; isToday: boolean; data: any } }) {
    const { __ } = useLang();
    const { data, isToday, day } = item;

    if (!data) {
        return (
            <div
                className="group flex flex-col items-center justify-between rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-low p-8 text-center transition-all duration-300 hover:border-primary/50 dark:bg-surface-container-high"
            >
                <div className="w-full">
                    <div className="mb-6 flex justify-center">
                        <span className="rounded-full bg-surface-container-high px-4 py-1.5 text-xs font-bold text-on-surface-variant dark:bg-surface-container-highest dark:text-slate-300">
                            {__(`messages.sponsors.days.${day}`)}
                        </span>
                    </div>
                    <div className="mb-6 flex aspect-square w-full items-center justify-center rounded-xl bg-surface-container-high transition-colors group-hover:bg-primary/10 dark:bg-surface-container-highest">
                        <span className="material-symbols-outlined text-5xl text-outline-variant transition-colors group-hover:text-primary">
                            add_circle
                        </span>
                    </div>
                    <h3 className="mb-2 font-headline text-lg font-black text-on-surface dark:text-white">
                        {__('messages.sponsors.available_for_sponsorship')}
                    </h3>
                </div>
                <Button asChild className="mt-4 w-full rounded-xl font-bold">
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
                'flex flex-col justify-between rounded-2xl border-2 border-primary bg-surface-container-lowest p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-surface-container-low dark:border-primary/50',
                isToday && 'relative shadow-xl ring-2 ring-primary/20',
            )}
        >
            {isToday && (
                <div className="absolute -top-3 left-6">
                    <span className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white shadow-lg ring-4 ring-surface-container-lowest dark:ring-surface-container-low">
                        {__('messages.sponsors.today_badge')}
                    </span>
                </div>
            )}
            <div>
                <div className="flex justify-center mb-6">
                    <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full">
                        {__(`messages.sponsors.days.${day}`)}
                    </span>
                </div>
                <div className="w-full aspect-square bg-surface-container-low rounded-xl mb-6 flex items-center justify-center overflow-hidden border border-outline-variant/30 p-6">
                    <img
                        alt={`${data.name} Logo`}
                        className="h-full w-full object-contain"
                        src={data.logo || 'https://via.placeholder.com/200x200?text=Sponsor+Logo'}
                    />
                </div>
                <div className="text-center">
                    <h3 className="mb-1 font-headline text-xl font-black text-on-surface dark:text-white">
                        {data.name}
                    </h3>
                    <p className="mb-4 text-sm text-on-surface-variant dark:text-slate-400">
                        {__('messages.sponsors.day_sponsor').replace(
                            ':day',
                            __(`messages.sponsors.days.${day}`),
                        )}
                    </p>
                </div>
            </div>
            <div className="border-t border-outline-variant/30 pt-4 text-center">
                <p className="text-primary font-black text-lg">
                    {__('messages.sponsors.weekly_prize')}
                </p>
            </div>
        </div>
    );
}
