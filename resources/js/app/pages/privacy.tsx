import { useLang } from '@erag/lang-sync-inertia/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/app/layouts/app-layout';

const sections = [
    {
        id: 'collection',
        number: '٠١',
        title: 'collection_title',
        content: ['collection_content'],
    },
    {
        id: 'usage',
        number: '٠٢',
        title: 'usage_title',
        content: ['usage_content'],
    },
    {
        id: 'protection',
        number: '٠٣',
        title: 'protection_title',
        content: ['protection_content'],
    },
    {
        id: 'sharing',
        number: '٠٤',
        title: 'sharing_title',
        content: ['sharing_content'],
    },
];

export default function Privacy() {
    const { __ } = useLang();
    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    return (
        <AppLayout>
            <Head title={__('messages.privacy.title')} />

            <div className="mx-auto max-w-7xl px-8 pt-32 pb-16">
                <header className="mb-12">
                    <h1 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight text-on-surface dark:text-white md:text-5xl">
                        {__('messages.privacy.title')}
                    </h1>
                    <p className="text-on-surface-variant text-sm font-medium">
                        {__('messages.terms.last_updated')}
                    </p>
                    <div className="bg-outline-variant/30 mt-8 h-px w-full" />
                </header>

                <div className="flex flex-col-reverse gap-16 md:flex-row">
                    <article className="space-y-20 md:w-3/4">
                        {sections.map((section, index) => (
                            <section
                                key={section.id}
                                id={section.id}
                                className="scroll-mt-32"
                            >
                                <h2 className="mb-6 text-2xl font-bold text-on-surface dark:text-white">
                                    {formatNumber(index + 1)} {__(`messages.privacy.${section.title}`)}
                                </h2>
                                <div className="space-y-4 leading-loose text-on-surface dark:text-white/80">
                                    {section.content.map((key, idx) => (
                                        <p key={idx}>{__(`messages.privacy.${key}`)}</p>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </article>

                    <aside className="md:w-1/4">
                        <div className="bg-surface-container-low sticky top-32 rounded-xl p-8">
                            <h3 className="mb-6 text-lg font-bold text-on-surface dark:text-white">
                                {__('messages.terms.content_index_title')}
                            </h3>
                            <nav className="space-y-4">
                                {sections.map((section, index) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="group flex items-center gap-3 font-bold text-primary transition-transform hover:-translate-x-1"
                                    >
                                        <span className="text-xs opacity-50">
                                            {formatNumber(index + 1)}
                                        </span>
                                        <span className="group-hover:underline">
                                            {__(`messages.privacy.${section.title}`)}
                                        </span>
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>
                </div>
            </div>
        </AppLayout>
    );
}
