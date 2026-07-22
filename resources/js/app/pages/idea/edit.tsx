import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link } from '@inertiajs/react';
import ideasRoute from '@/routes/app/ideas';
import IdeaForm from './partials/idea-form';

interface Category {
    id: number;
    name_en: string;
    name_ar: string;
    slug: string;
    icon: string;
}

interface Country {
    id: number;
    name_en: string;
    name_ar: string;
    code: string;
}

export default function EditIdea({
    idea,
    categories,
    countries,
}: {
    idea: any;
    categories: Category[];
    countries: Country[];
}) {
    const { __ } = useLang();

    return (
        <>
            <Head title={__('messages.submit_idea.hero_badge')} />

            <section className="relative flex h-[320px] items-center justify-center overflow-hidden bg-deep-navy md:h-[400px]">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Background"
                        className="h-full w-full object-cover opacity-20 mix-blend-luminosity"
                        src="/images/idea.create.webp"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/80 via-deep-navy/70 to-deep-navy/90" />
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <div className="mb-4 inline-block rounded-full bg-primary/90 px-4 py-1 text-xs font-bold tracking-widest text-on-primary uppercase shadow-xl">
                        {__('messages.submit_idea.hero_badge')}
                    </div>
                    <h1 className="mb-4 font-headline text-2xl leading-tight font-extrabold text-white md:text-4xl">
                        {__('messages.submit_idea.hero_title')}{' '}
                        <span className="text-primary-fixed-dim">
                            {__('messages.submit_idea.hero_title_highlight')}
                        </span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/90">
                        {__('messages.submit_idea.hero_desc')}
                    </p>
                </div>
            </section>

            <main className="flex-grow bg-surface px-6 py-16 dark:bg-surface">
                <div className="mx-auto mb-8 flex max-w-[800px] items-center gap-2 text-sm text-outline dark:text-slate-400">
                    <Link
                        className="transition-colors hover:text-primary"
                        href="/"
                    >
                        {__('messages.nav.home')}
                    </Link>
                    <span className="material-symbols-outlined text-xs rtl:rotate-180">
                        chevron_left
                    </span>
                    <Link
                        className="transition-colors hover:text-primary"
                        href={ideasRoute.index.url()}
                    >
                        {__('messages.auth.my_ideas')}
                    </Link>
                    <span className="material-symbols-outlined text-xs rtl:rotate-180">
                        chevron_left
                    </span>
                    <span className="font-medium text-on-surface dark:text-white">
                        {__('messages.submit_idea.hero_badge')}
                    </span>
                </div>

                <div className="mx-auto max-w-[800px]">
                    <div className="relative overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-xl md:p-12 dark:bg-card">
                        <IdeaForm 
                            categories={categories} 
                            countries={countries} 
                            initialData={idea}
                        />
                    </div>
                </div>
            </main>
        </>
    );
}
