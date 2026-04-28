import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link, useForm } from '@inertiajs/react';
import type { ChangeEvent, FormEvent} from 'react';
import { useState } from 'react';
import { store } from '@/actions/App/Http/Controllers/App/IdeaController';
import AppLayout from '@/app/layouts/app-layout';

export default function SubmitIdea() {
    const { __ } = useLang();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category: '',
        country: '',
        city: '',
        image: null as File | null,
        pdf_file: null as File | null,
        agreed_terms: false,
        agreed_privacy: false,
        agreed_legal: false,
    });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setData('pdf_file', file);
        }
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(store.url());
    };

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

            <main className="bg-surface dark:bg-surface flex-grow px-6 py-16">
                <div className="text-outline dark:text-slate-400 mx-auto mb-8 flex max-w-[800px] items-center gap-2 text-sm">
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
                    <div className="border-outline-variant/10 bg-surface-container-lowest dark:bg-card relative overflow-hidden rounded-xl border p-8 shadow-xl md:p-12">
                        <form onSubmit={submit} className="relative z-10 space-y-8">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                        {__('messages.submit_idea.country_label')}
                                    </label>
                                    <select 
                                        value={data.country}
                                        onChange={e => setData('country', e.target.value)}
                                        className="bg-surface-container-low dark:bg-surface-container-high w-full rounded-lg border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white dark:focus:bg-surface-container-highest focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="">{__('messages.submit_idea.country_placeholder')}</option>
                                        <option value="Saudi Arabia">{__('messages.submit_idea.saudi_arabia')}</option>
                                        <option value="UAE">{__('messages.submit_idea.uae')}</option>
                                        <option value="Egypt">{__('messages.submit_idea.egypt')}</option>
                                        <option value="Jordan">{__('messages.submit_idea.jordan')}</option>
                                    </select>
                                    {errors.country && <div className="text-red-500 text-xs">{errors.country}</div>}
                                </div>
                                <div className="space-y-2">
                                    <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                        {__('messages.submit_idea.city_label')}
                                    </label>
                                    <input
                                        className="bg-surface-container-low dark:bg-surface-container-high w-full rounded-lg border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white dark:focus:bg-surface-container-highest focus:ring-2 focus:ring-primary"
                                        placeholder={__('messages.submit_idea.city_placeholder')}
                                        type="text"
                                        value={data.city}
                                        onChange={e => setData('city', e.target.value)}
                                    />
                                    {errors.city && <div className="text-red-500 text-xs">{errors.city}</div>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.category_label')}
                                </label>
                                <select 
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className="bg-surface-container-low dark:bg-surface-container-high w-full rounded-lg border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white dark:focus:bg-surface-container-highest focus:ring-2 focus:ring-primary"
                                >
                                    <option value="">{__('messages.submit_idea.category_placeholder')}</option>
                                    <option value="e-commerce">تجارة إلكترونية</option>
                                    <option value="home-services">خدمات منزلية</option>
                                    <option value="handicrafts">صناعة يدوية</option>
                                    <option value="tech">تقنية وبرمجيات</option>
                                    <option value="other">أخرى</option>
                                </select>
                                {errors.category && <div className="text-red-500 text-xs">{errors.category}</div>}
                            </div>

                            <div className="space-y-2">
                                <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.title_label')}
                                </label>
                                <input
                                    className="bg-surface-container-low dark:bg-surface-container-high w-full rounded-lg border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white dark:focus:bg-surface-container-highest focus:ring-2 focus:ring-primary"
                                    placeholder={__('messages.submit_idea.title_placeholder')}
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <div className="text-red-500 text-xs">{errors.title}</div>}
                            </div>

                            <div className="space-y-2">
                                <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.details_label')}
                                </label>
                                <textarea
                                    className="bg-surface-container-low dark:bg-surface-container-high w-full resize-none rounded-lg border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white dark:focus:bg-surface-container-highest focus:ring-2 focus:ring-primary"
                                    placeholder={__('messages.submit_idea.details_placeholder')}
                                    rows={6}
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                {errors.description && <div className="text-red-500 text-xs">{errors.description}</div>}
                            </div>

                            <div className="space-y-2">
                                <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.image_label')}
                                </label>
                                <div 
                                    onClick={() => document.getElementById('image-upload')?.click()}
                                    className="group border-outline-variant dark:border-outline-variant/30 bg-surface-container-low dark:bg-surface-container-high hover:bg-surface-container dark:hover:bg-surface-container-highest flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-all hover:border-primary dark:hover:border-primary overflow-hidden relative"
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
                                    ) : (
                                        <span className="material-symbols-outlined mb-3 text-5xl text-primary transition-transform group-hover:scale-110">
                                            add_photo_alternate
                                        </span>
                                    )}
                                    <div className="relative z-10 flex flex-col items-center">
                                        <p className="font-headline text-sm font-bold text-on-surface dark:text-white">
                                            {imagePreview ? __('messages.submit_idea.change_image') : __('messages.submit_idea.image_placeholder')}
                                        </p>
                                        <p className="text-outline mt-1 text-xs dark:text-slate-400">
                                            {__('messages.submit_idea.image_hint')}
                                        </p>
                                    </div>
                                    <input 
                                        id="image-upload"
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                {errors.image && <div className="text-red-500 text-xs">{errors.image}</div>}
                            </div>

                            <div className="space-y-2">
                                <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.file_label')}
                                </label>
                                <div className="border-outline-variant/10 bg-surface-container-low dark:bg-surface-container-high flex items-center gap-4 rounded-lg border p-4">
                                    <span className="material-symbols-outlined text-primary">
                                        upload_file
                                    </span>
                                    <span className="flex-grow text-sm text-on-surface dark:text-white truncate">
                                        {data.pdf_file ? data.pdf_file.name : __('messages.submit_idea.file_placeholder')}
                                    </span>
                                    <button
                                        className="text-sm font-bold text-primary hover:underline"
                                        type="button"
                                        onClick={() => document.getElementById('file-upload')?.click()}
                                    >
                                        {__('messages.submit_idea.browse_device')}
                                    </button>
                                    <input 
                                        id="file-upload"
                                        type="file" 
                                        className="hidden" 
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                {errors.pdf_file && <div className="text-red-500 text-xs">{errors.pdf_file}</div>}
                            </div>

                            <div className="border-outline-variant/20 dark:border-outline-variant/10 space-y-4 border-t pt-6">
                                <label className="group flex cursor-pointer items-start gap-3">
                                    <input
                                        className="border-outline-variant dark:border-outline-variant/30 mt-1 h-5 w-5 rounded text-primary transition-all focus:ring-primary dark:bg-surface-container-high"
                                        type="checkbox"
                                        checked={data.agreed_terms}
                                        onChange={e => setData('agreed_terms', e.target.checked)}
                                    />
                                    <span className="text-sm leading-relaxed text-on-surface dark:text-white/80 group-hover:text-on-surface dark:text-white">
                                        {__('messages.submit_idea.agree_terms')}
                                    </span>
                                </label>
                                {errors.agreed_terms && <div className="text-red-500 text-xs">{errors.agreed_terms}</div>}

                                <label className="group flex cursor-pointer items-start gap-3">
                                    <input
                                        className="border-outline-variant dark:border-outline-variant/30 mt-1 h-5 w-5 rounded text-primary transition-all focus:ring-primary dark:bg-surface-container-high"
                                        type="checkbox"
                                        checked={data.agreed_privacy}
                                        onChange={e => setData('agreed_privacy', e.target.checked)}
                                    />
                                    <span className="text-sm leading-relaxed text-on-surface dark:text-white/80 group-hover:text-on-surface dark:text-white">
                                        {__('messages.submit_idea.pledge_originality')}
                                    </span>
                                </label>
                                {errors.agreed_privacy && <div className="text-red-500 text-xs">{errors.agreed_privacy}</div>}

                                <label className="group flex cursor-pointer items-start gap-3">
                                    <input
                                        className="border-outline-variant dark:border-outline-variant/30 mt-1 h-5 w-5 rounded text-primary transition-all focus:ring-primary dark:bg-surface-container-high"
                                        type="checkbox"
                                        checked={data.agreed_legal}
                                        onChange={e => setData('agreed_legal', e.target.checked)}
                                    />
                                    <span className="text-sm leading-relaxed text-on-surface dark:text-white/80 group-hover:text-on-surface dark:text-white">
                                        أتعهد بأن جميع المعلومات المقدمة صحيحة وأتحمل المسؤولية القانونية عنها.
                                    </span>
                                </label>
                                {errors.agreed_legal && <div className="text-red-500 text-xs">{errors.agreed_legal}</div>}
                            </div>

                            <div className="pt-6">
                                <button
                                    className="font-headline text-on-primary flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-5 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                                    type="submit"
                                    disabled={processing}
                                >
                                    <span>{processing ? __('messages.common.processing') : __('messages.submit_idea.submit_button')}</span>
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

