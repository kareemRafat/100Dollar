import { useLang } from '@erag/lang-sync-inertia/react';
import { Head } from '@inertiajs/react';

export default function Privacy() {
    const { __ } = useLang();

    return (
        <>
            <Head title={__('messages.ui.privacy_policy')} />

            <section className="relative flex h-[250px] items-center justify-center overflow-hidden bg-deep-navy md:h-[300px]">
                <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/80 to-deep-navy" />
                <div className="relative z-10 text-center">
                    <h1 className="mb-4 font-headline text-3xl font-extrabold text-white md:text-5xl">
                        {__('messages.ui.privacy_policy')}
                    </h1>
                    <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
                </div>
            </section>

            <section className="mx-auto max-w-4xl px-8 py-16">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <div className="mb-10 rounded-2xl border border-primary/10 bg-primary/5 p-6 text-sm text-on-surface-variant">
                        {__('messages.privacy.last_updated')}: ٢٤ مارس ٢٠٢٤
                    </div>

                    <div className="space-y-12 text-on-surface dark:text-slate-300">
                        <div>
                            <h2 className="mb-4 text-2xl font-black text-secondary dark:text-white">
                                {__('messages.privacy.section1_title')}
                            </h2>
                            <p className="leading-relaxed">
                                {__('messages.privacy.section1_content')}
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-4 text-2xl font-black text-secondary dark:text-white">
                                {__('messages.privacy.section2_title')}
                            </h2>
                            <p className="leading-relaxed">
                                {__('messages.privacy.section2_content')}
                            </p>
                            <ul className="mt-4 list-disc space-y-2 ps-6">
                                <li>{__('messages.privacy.data_item1')}</li>
                                <li>{__('messages.privacy.data_item2')}</li>
                                <li>{__('messages.privacy.data_item3')}</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-4 text-2xl font-black text-secondary dark:text-white">
                                {__('messages.privacy.section3_title')}
                            </h2>
                            <p className="leading-relaxed">
                                {__('messages.privacy.section3_content')}
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-4 text-2xl font-black text-secondary dark:text-white">
                                {__('messages.privacy.section4_title')}
                            </h2>
                            <p className="leading-relaxed">
                                {__('messages.privacy.section4_content')}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-low p-8 text-center">
                            <h3 className="mb-4 text-xl font-bold text-on-surface dark:text-white">
                                {__('messages.privacy.questions_title')}
                            </h3>
                            <p className="mb-6 text-on-surface-variant">
                                {__('messages.privacy.questions_desc')}
                            </p>
                            <a
                                href="mailto:privacy@afkar100.com"
                                className="inline-block font-bold text-primary hover:underline"
                            >
                                privacy@afkar100.com
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
