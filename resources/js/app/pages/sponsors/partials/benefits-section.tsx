import { useLang } from '@erag/lang-sync-inertia/react';
import { Link } from '@inertiajs/react';
import { Button } from '@/app/components/ui/button';

export function BenefitsSection() {
    const { __ } = useLang();

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
        <section className="mx-auto mb-24 max-w-7xl px-8">
            <div className="relative overflow-hidden rounded-[3rem] border border-outline-variant/10 bg-surface-container-high/30 p-12 md:p-20">
                <div className="absolute top-0 right-0 -mt-32 -mr-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

                <div className="relative z-10 mb-16 text-center">
                    <h2 className="mb-6 font-headline text-4xl leading-tight font-black text-on-surface md:text-5xl dark:text-white">
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
                    <Button
                        asChild
                        size="xl"
                        className="h-16 rounded-2xl px-12 text-xl font-black shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <Link href="/sponsors/apply">
                            {__('messages.sponsors.contact_for_sponsorship')}
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
