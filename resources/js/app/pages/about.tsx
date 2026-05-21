import { useLang } from '@erag/lang-sync-inertia/react';
import { Head } from '@inertiajs/react';

const partners = [
    'FINTECH_CO',
    'GLOBAL_VENTURES',
    'ARAB_TECH',
    'INNOVATE_HUB',
    'SEED_FUND',
];

export default function About() {
    const { __ } = useLang();

    const coreValues = [
        {
            icon: 'rocket_launch',
            title: __('messages.about.value_innovation_title'),
            description: __('messages.about.value_innovation_desc'),
        },
        {
            icon: 'groups',
            title: __('messages.about.value_community_title'),
            description: __('messages.about.value_community_desc'),
        },
        {
            icon: 'gavel',
            title: __('messages.about.value_transparency_title'),
            description: __('messages.about.value_transparency_desc'),
        },
        {
            icon: 'bolt',
            title: __('messages.about.value_speed_title'),
            description: __('messages.about.value_speed_desc'),
        },
    ];

    return (
        <>
            <Head title={__('messages.nav.about')} />

            <section className="relative flex h-100 items-center justify-center overflow-hidden md:h-125">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="About Us Background"
                        className="h-full w-full object-cover brightness-50 grayscale"
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
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
                            {__('messages.about.get_to_know_us')}
                        </span>
                    </div>
                    <h1 className="mb-6 font-headline text-3xl leading-tight font-black text-white md:text-5xl">
                        {__('messages.about.hero_title')}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300">
                        {__('messages.about.hero_desc')}
                    </p>
                </div>
            </section>

            <section className="bg-surface-container-lowest px-8 py-12 dark:bg-surface-container-low">
                <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="rounded-2xl bg-primary-container/10 p-3">
                                <span className="material-symbols-outlined text-xl text-primary">
                                    lightbulb
                                </span>
                            </div>
                            <div>
                                <h3 className="mb-1 text-xl font-black text-on-surface dark:text-white">
                                    {__('messages.about.mission_title')}
                                </h3>
                                <p className="text-sm leading-relaxed text-on-surface-variant">
                                    {__('messages.about.mission_desc')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="rounded-2xl bg-primary-container/10 p-3">
                                <span className="material-symbols-outlined text-xl text-primary">
                                    visibility
                                </span>
                            </div>
                            <div>
                                <h3 className="mb-1 text-xl font-black text-on-surface dark:text-white">
                                    {__('messages.about.vision_title')}
                                </h3>
                                <p className="text-sm leading-relaxed text-on-surface-variant">
                                    {__('messages.about.vision_desc')}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative rounded-3xl border border-outline-variant/10 bg-surface-container-low p-6">
                        <p className="text-right font-headline text-lg leading-relaxed font-medium text-on-surface italic dark:text-white">
                            "{__('messages.about.quote')}"
                        </p>
                        <div className="mt-4 flex items-center justify-end gap-3">
                            <div className="text-right">
                                <p className="text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.about.management_team')}
                                </p>
                                <p className="text-xs text-on-surface-variant">
                                    {__('messages.about.golden_ledger')}
                                </p>
                            </div>
                            <div className="h-1 w-8 bg-primary" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-outline-variant/10 bg-primary-container/5 px-8 py-10">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
                    <div className="text-center">
                        <p className="mb-1 text-2xl font-black text-primary md:text-3xl">
                            1,500+
                        </p>
                        <p className="text-xs font-bold text-on-surface dark:text-white">
                            {__('messages.about.stats_ideas')}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="mb-1 text-2xl font-black text-primary md:text-3xl">
                            45,000+
                        </p>
                        <p className="text-xs font-bold text-on-surface dark:text-white">
                            {__('messages.about.stats_voters')}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="mb-1 text-2xl font-black text-primary md:text-3xl">
                            85
                        </p>
                        <p className="text-xs font-bold text-on-surface dark:text-white">
                            {__('messages.about.stats_winners')}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="mb-1 text-2xl font-black text-primary md:text-3xl">
                            $10M+
                        </p>
                        <p className="text-xs font-bold text-on-surface dark:text-white">
                            {__('messages.about.stats_investments')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-surface px-8 py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 text-center">
                        <h2 className="mb-3 text-3xl font-black text-on-surface dark:text-white">
                            {__('messages.about.core_values_title')}
                        </h2>
                        <p className="mx-auto max-w-2xl text-sm text-on-surface-variant">
                            {__('messages.about.core_values_desc')}
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-4">
                        {coreValues.map((value) => (
                            <div
                                key={value.icon}
                                className="editorial-shadow rounded-2xl border-outline-variant/5 bg-surface-container-lowest p-6 transition-transform hover:scale-[1.02]"
                            >
                                <span className="material-symbols-outlined mb-4 text-xl text-primary">
                                    {value.icon}
                                </span>
                                <h4 className="mb-2 text-lg font-bold text-on-surface dark:text-white">
                                    {value.title}
                                </h4>
                                <p className="text-sm leading-relaxed text-on-surface-variant">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-surface-container-low px-8 py-12">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 md:flex-row">
                    <div className="md:w-1/2">
                        <div className="relative">
                            <div className="absolute -bottom-3 -left-3 h-full w-full rounded-3xl border-2 border-primary" />
                            <img
                                alt="Founder Portrait"
                                className="editorial-shadow relative z-10 rounded-3xl"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRWXYBtDY5262YQECmriYAZMWZx9NgZoqDXOE5FlJgrnHzt0WHO3mjKBQGkD2TUGnLu6qwNK2vsGBhDkk8S-sUyr1wTJ-f8N2HPMaCdqR-PjTFkjeszpXu4nXubtiyQSUkakXhXD5HVZgHulQLjhuLbFQyy4y_hvFoQwPMvkNAZXr2rDyELxRhyRo50ET7HKHU_vFMMwscXQePz-AKkd2V13kfiXNe8rlf8aTt6cmVWkvMIT_ITMYnvxLC_To9-6jWz4MZ65ZgUoA"
                            />
                        </div>
                    </div>
                    <div className="text-right md:w-1/2">
                        <span className="mb-1 block text-xs font-bold tracking-widest text-primary uppercase">
                            {__('messages.about.story_badge')}
                        </span>
                        <h2 className="mb-4 text-2xl leading-tight font-black text-on-surface dark:text-white">
                            {__('messages.about.story_title')}
                        </h2>
                        <p className="mb-3 text-sm leading-relaxed text-on-surface-variant">
                            {__('messages.about.story_p1')}
                        </p>
                        <p className="mb-5 text-sm leading-relaxed text-on-surface-variant">
                            {__('messages.about.story_p2')}
                        </p>
                        <div className="inline-block rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-3 shadow-sm">
                            <p className="text-base font-bold text-on-surface dark:text-white">
                                {__('messages.about.founder_name')}
                            </p>
                            <p className="text-xs text-primary">
                                {__('messages.about.founder_title')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden border-t border-outline-variant/10 bg-surface px-8 py-10">
                <div className="mx-auto max-w-7xl">
                    <p className="mb-6 text-center text-sm font-bold tracking-widest text-outline uppercase">
                        {__('messages.about.partners_title')}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-10 opacity-40 grayscale md:gap-20">
                        {partners.map((partner) => (
                            <span
                                key={partner}
                                className="font-headline text-2xl font-bold"
                            >
                                {partner}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
