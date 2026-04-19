import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/app/layouts/app-layout';

export default function SubmitIdea() {
    const { __ } = useLang();

    return (
        <AppLayout activeRoute="/submit-idea">
            <Head title={__('messages.submit_idea.hero_badge')} />

            <section className="relative flex h-[320px] items-center justify-center overflow-hidden bg-deep-navy md:h-[400px]">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Background"
                        className="h-full w-full object-cover opacity-20 mix-blend-luminosity"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYJIXHhzvWUAYG3UbBV4YWSs9_TjTwPATiiFM6b4eZgtWu4Qz79GIoS3lRB0GNcdffoKtJqmkT-2YWyvDM-MpjyqujFb-LBsqRqbjA1YlRDnXCDfjIjmGlS8ElgbR-6qZTkkGAf2S-97DlJeUF91nupHwhfPDiypG0ft833vmyPhWQvEWZo6Dn-KW_RyP_qb-qFLT5l3_lBTsD05wms2KR3nm3rUaHqcxEx3WHiFO2mzrPn1ywDEl3Ig-o9EZeFUB6WK2PDeYMGng')"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/80 via-deep-navy/70 to-deep-navy/90" />
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <div className="mb-4 inline-block rounded-full bg-primary/90 px-4 py-1 text-xs font-bold tracking-widest text-on-primary uppercase shadow-xl">
                        {__('messages.submit_idea.hero_badge')}
                    </div>
                    <h1 className="mb-4 font-headline text-2xl leading-tight font-extrabold text-white md:text-4xl">
                        {__('messages.submit_idea.hero_title')}{' '}
                        <span className="text-primary">{__('messages.submit_idea.hero_title_highlight')}</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/90">
                        {__('messages.submit_idea.hero_desc')}
                    </p>
                </div>
            </section>

            <main className="bg-surface flex-grow px-6 py-16">
                <div className="text-outline mx-auto mb-8 flex max-w-[800px] items-center gap-2 text-sm">
                    <Link
                        className="transition-colors hover:text-primary"
                        href="/"
                    >
                        {__('messages.nav.home')}
                    </Link>
                    <span className="material-symbols-outlined text-xs rtl:rotate-180">
                        chevron_left
                    </span>
                    <span className="font-medium text-on-surface dark:text-white">
                        {__('messages.submit_idea.hero_badge')}
                    </span>
                </div>

                <div className="mx-auto max-w-[800px]">
                    <div className="border-outline-variant/10 bg-surface-container-lowest relative overflow-hidden rounded-xl border p-8 shadow-xl md:p-12">
                        <form className="relative z-10 space-y-8">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                        {__('messages.submit_idea.country_label')}
                                    </label>
                                    <select className="bg-surface-container-low w-full rounded-lg border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white focus:ring-2 focus:ring-primary">
                                        <option>{__('messages.submit_idea.country_placeholder')}</option>
                                        <option>{__('messages.submit_idea.saudi_arabia')}</option>
                                        <option>{__('messages.submit_idea.uae')}</option>
                                        <option>{__('messages.submit_idea.egypt')}</option>
                                        <option>{__('messages.submit_idea.jordan')}</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                        {__('messages.submit_idea.city_label')}
                                    </label>
                                    <input
                                        className="bg-surface-container-low w-full rounded-lg border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white focus:ring-2 focus:ring-primary"
                                        placeholder={__('messages.submit_idea.city_placeholder')}
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.category_label')}
                                </label>
                                <select className="bg-surface-container-low w-full rounded-lg border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white focus:ring-2 focus:ring-primary">
                                    <option>{__('messages.submit_idea.category_placeholder')}</option>
                                    <option>تجارة إلكترونية</option>
                                    <option>خدمات منزلية</option>
                                    <option>صناعة يدوية</option>
                                    <option>تقنية وبرمجيات</option>
                                    <option>أخرى</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.title_label')}
                                </label>
                                <input
                                    className="bg-surface-container-low w-full rounded-lg border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white focus:ring-2 focus:ring-primary"
                                    placeholder={__('messages.submit_idea.title_placeholder')}
                                    type="text"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.details_label')}
                                </label>
                                <textarea
                                    className="bg-surface-container-low w-full resize-none rounded-lg border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white focus:ring-2 focus:ring-primary"
                                    placeholder={__('messages.submit_idea.details_placeholder')}
                                    rows={6}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.image_label')}
                                </label>
                                <div className="group border-outline-variant bg-surface-container-low hover:bg-surface-container flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-all hover:border-primary">
                                    <span className="material-symbols-outlined mb-3 text-5xl text-primary transition-transform group-hover:scale-110">
                                        add_photo_alternate
                                    </span>
                                    <p className="font-headline text-sm font-bold text-on-surface dark:text-white">
                                        {__('messages.submit_idea.image_placeholder')}
                                    </p>
                                    <p className="text-outline mt-1 text-xs">
                                        {__('messages.submit_idea.image_hint')}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.file_label')}
                                </label>
                                <div className="border-outline-variant/10 bg-surface-container-low flex items-center gap-4 rounded-lg border p-4">
                                    <span className="material-symbols-outlined text-primary">
                                        upload_file
                                    </span>
                                    <span className="flex-grow text-sm text-on-surface dark:text-white">
                                        {__('messages.submit_idea.file_placeholder')}
                                    </span>
                                    <button
                                        className="text-sm font-bold text-primary hover:underline"
                                        type="button"
                                    >
                                        {__('messages.submit_idea.browse_device')}
                                    </button>
                                </div>
                            </div>

                            <div className="border-outline-variant/20 space-y-4 border-t pt-6">
                                <label className="group flex cursor-pointer items-start gap-3">
                                    <input
                                        className="border-outline-variant mt-1 h-5 w-5 rounded text-primary transition-all focus:ring-primary"
                                        type="checkbox"
                                    />
                                    <span className="text-sm leading-relaxed text-on-surface dark:text-white/80 group-hover:text-on-surface dark:text-white">
                                        {__('messages.submit_idea.agree_terms')}
                                    </span>
                                </label>
                                <label className="group flex cursor-pointer items-start gap-3">
                                    <input
                                        className="border-outline-variant mt-1 h-5 w-5 rounded text-primary transition-all focus:ring-primary"
                                        type="checkbox"
                                    />
                                    <span className="text-sm leading-relaxed text-on-surface dark:text-white/80 group-hover:text-on-surface dark:text-white">
                                        {__('messages.submit_idea.pledge_originality')}
                                    </span>
                                </label>
                            </div>

                            <div className="pt-6">
                                <button
                                    className="font-headline text-on-primary flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-5 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95"
                                    type="submit"
                                >
                                    <span>{__('messages.submit_idea.submit_button')}</span>
                                    <span
                                        className="material-symbols-outlined"
                                        style={{
                                            fontVariationSettings: "'FILL' 1",
                                        }}
                                    >
                                        rocket_launch
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
