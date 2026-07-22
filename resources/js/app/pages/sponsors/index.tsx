import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/app/components/ui/button';
import type { Sponsor } from '@/types';

import { SponsorWeekGrid } from './partials/sponsor-week-grid';
import { BenefitsSection } from './partials/benefits-section';

interface Props {
    sponsors: Sponsor[];
    today: number;
}

export default function SponsorsIndex({ sponsors, today }: Props) {
    const { __ } = useLang();

    return (
        <>
            <Head title={__('messages.nav.sponsors')} />

            <section className="relative flex h-[400px] items-center justify-center overflow-hidden md:h-[500px]">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Business Partnership"
                        className="h-full w-full object-cover brightness-50 grayscale"
                        src="/images/sponsors.webp"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-slate-900" />
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
                    <h1 className="mb-6 font-headline text-4xl leading-tight font-black text-white md:text-5xl">
                        {__('messages.sponsors.hero_title')}
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-300">
                        {__('messages.sponsors.hero_desc')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            size="xl"
                            className="h-14 rounded-2xl px-8 text-lg font-black shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Link href="/sponsors/apply">
                                {__('messages.sponsors.become_sponsor_button')}
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="xl"
                            className="h-14 rounded-2xl border-white/20 bg-white/5 px-8 font-black text-white backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
                            onClick={() =>
                                document
                                    .getElementById('sponsors-list')
                                    ?.scrollIntoView({ behavior: 'smooth' })
                            }
                        >
                            {__('messages.sponsors.meet_sponsors_button')}
                        </Button>
                    </div>
                </div>
            </section>

            <SponsorWeekGrid sponsors={sponsors} today={today} />

            <BenefitsSection />
        </>
    );
}
