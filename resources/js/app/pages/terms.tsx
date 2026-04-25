import { useLang } from '@erag/lang-sync-inertia/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/app/layouts/app-layout';

const sections = [
    {
        id: 'definitions',
        number: '٠١',
        title: 'definitions_title',
        content: [
            'definitions_content_1',
            'definitions_content_2',
        ],
    },
    {
        id: 'participation',
        number: '٠٢',
        title: 'participation_title',
        content: [
            'participation_content_1',
        ],
        list: [
            'participation_list_1',
            'participation_list_2',
            'participation_list_3',
        ],
    },
    {
        id: 'intellectual-property',
        number: '٠٣',
        title: 'intellectual_property_title',
        highlight: true,
        content: [
            'intellectual_property_content_1',
        ],
    },
    {
        id: 'voting',
        number: '٠٤',
        title: 'voting_title',
        content: [
            'voting_content_1',
        ],
    },
    {
        id: 'prizes',
        number: '٠٥',
        title: 'prizes_title',
        content: [
            'prizes_content_1',
        ],
    },
    {
        id: 'disclaimer',
        number: '٠٦',
        title: 'disclaimer_title',
        content: [
            'disclaimer_content_1',
        ],
    },
];

export default function Terms() {
    const { __ } = useLang();

    return (
        <AppLayout>
            <Head title={__('messages.terms.title')} />

            <div className="mx-auto max-w-7xl px-8 pt-32 pb-16">
                <header className="mb-12">
                    <h1 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight text-on-surface dark:text-white md:text-5xl">
                        {__('messages.terms.title')}
                    </h1>
                    <p className="text-on-surface-variant text-sm font-medium">
                        {__('messages.terms.last_updated')}
                    </p>
                    <div className="bg-outline-variant/30 mt-8 h-px w-full" />
                </header>

                <div className="flex flex-col-reverse gap-16 md:flex-row">
                    <article className="space-y-20 md:w-3/4">
                        {sections.map((section) => (
                            <section
                                key={section.id}
                                id={section.id}
                                className="scroll-mt-32"
                            >
                                <h2 className="mb-6 text-2xl font-bold text-on-surface dark:text-white">
                                    {__(`messages.terms.${section.title}`)}
                                </h2>
                                {section.highlight ? (
                                    <div className="bg-surface-container-lowest golden-ledger-shadow rounded-lg border-r-4 border-primary p-8">
                                        <div className="mb-4 flex items-center gap-3 text-primary">
                                            <span
                                                className="material-symbols-outlined"
                                                style={{
                                                    fontVariationSettings:
                                                        "'FILL' 1",
                                                }}
                                            >
                                                gavel
                                            </span>
                                            <span className="text-lg font-bold">
                                                {__('messages.terms.intellectual_property_highlight_title')}
                                            </span>
                                        </div>
                                        <p className="leading-loose font-medium text-on-surface dark:text-white">
                                            {__(`messages.terms.${section.content[0]}`)}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4 leading-loose text-on-surface dark:text-white/80">
                                        {section.content.map(
                                            (paragraph, idx) => (
                                                <p key={idx}>
                                                    {__(
                                                        `messages.terms.${paragraph}`,
                                                    )}
                                                </p>
                                            ),
                                        )}
                                        {section.list && (
                                            <ul className="text-on-surface-variant mr-4 list-inside list-disc space-y-2">
                                                {section.list.map(
                                                    (item, idx) => (
                                                        <li key={idx}>
                                                            {__(`messages.terms.${item}`)}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </section>
                        ))}
                    </article>

                    <aside className="md:w-1/4">
                        <div className="bg-surface-container-low sticky top-32 rounded-xl p-8">
                            <h3 className="mb-6 text-lg font-bold text-on-surface dark:text-white">
                                {__('messages.terms.content_index_title')}
                            </h3>
                            <nav className="space-y-4">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="group flex items-center gap-3 font-bold text-primary transition-transform hover:-translate-x-1"
                                    >
                                        <span className="text-xs opacity-50">
                                            {section.number}
                                        </span>
                                        <span className="group-hover:underline">
                                            {__(`messages.terms.${section.title}`)}
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
