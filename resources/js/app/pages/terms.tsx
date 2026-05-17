import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link } from '@inertiajs/react';
import { contact } from '@/routes/app';

export default function Terms() {
    const { __ } = useLang();

    const termsSections = [
        {
            title: __('messages.terms.definitions_title'),
            content: __('messages.terms.definitions_content'),
        },
        {
            title: __('messages.terms.participation_title'),
            content: __('messages.terms.participation_content'),
        },
        {
            title: __('messages.terms.intellectual_property_title'),
            content: __('messages.terms.intellectual_property_content'),
        },
        {
            title: __('messages.terms.voting_title'),
            content: __('messages.terms.voting_content'),
        },
        {
            title: __('messages.terms.prizes_title'),
            content: __('messages.terms.prizes_content'),
        },
        {
            title: __('messages.terms.disclaimer_title'),
            content: __('messages.terms.disclaimer_content'),
        },
    ];

    return (
        <>
            <Head title={__('messages.terms.title')} />

            <section className="relative flex h-[250px] items-center justify-center overflow-hidden bg-deep-navy md:h-[300px]">
                <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/80 to-deep-navy" />
                <div className="relative z-10 text-center">
                    <h1 className="mb-4 font-headline text-3xl font-extrabold text-white md:text-5xl">
                        {__('messages.terms.title')}
                    </h1>
                    <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
                </div>
            </section>

            <section className="mx-auto max-w-4xl px-8 py-16">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <div className="mb-10 rounded-2xl border border-primary/10 bg-primary/5 p-6 text-sm text-on-surface-variant">
                        {__('messages.terms.last_updated')}
                    </div>

                    <div className="space-y-12">
                        {termsSections.map((section, index) => (
                            <div key={index}>
                                <h2 className="mb-4 text-2xl font-black text-secondary dark:text-white">
                                    {section.title}
                                </h2>
                                <p className="leading-relaxed text-on-surface dark:text-slate-300">
                                    {section.content}
                                </p>
                            </div>
                        ))}

                        <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-low p-8 text-center">
                            <h3 className="mb-4 text-xl font-bold text-on-surface dark:text-white">
                                {__('messages.terms.contact_title')}
                            </h3>
                            <p className="mb-6 text-on-surface-variant">
                                {__('messages.terms.contact_desc')}
                            </p>
                            <Link
                                href={contact.url()}
                                className="inline-block font-bold text-primary hover:underline"
                            >
                                {__('messages.nav.contact')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
