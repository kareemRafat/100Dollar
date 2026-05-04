import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ShoppingBag,
    Home,
    Palette,
    Cpu,
    MoreHorizontal,
    MapPin,
    Flag,
    Rocket,
    UploadCloud,
    FileText
} from 'lucide-react';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { store } from '@/actions/App/Http/Controllers/App/IdeaController';
import { Button } from '@/app/components/ui/button';
import AppLayout from '@/app/layouts/app-layout';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';


export default function SubmitIdea() {
    const { __ } = useLang();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragCounter, setDragCounter] = useState(0);

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

    const processImage = (file: File) => {
        setData('image', file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            processImage(file);
        }
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter(prev => prev + 1);
        setIsDragging(true);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter(prev => {
            const next = prev - 1;
            if (next === 0) setIsDragging(false);
            return next;
        });
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        setDragCounter(0);

        const file = e.dataTransfer.files?.[0];

        if (file && file.type.startsWith('image/')) {
            processImage(file);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setData('pdf_file', file);
        }
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(store.url(), {
            preserveScroll: 'errors',
        });
    };

    return (
        <AppLayout activeRoute="/submit-idea">
            <Head title={__('messages.submit_idea.hero_badge')} />

            <section className="relative flex h-[320px] items-center justify-center overflow-hidden bg-deep-navy md:h-[400px]">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Background"
                        className="h-full w-full object-cover opacity-20 mix-blend-luminosity"
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/80 via-deep-navy/70 to-deep-navy/90" />
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <div className="mb-4 inline-block rounded-full bg-primary/90 px-4 py-1 text-xs font-bold tracking-widest text-on-primary uppercase shadow-xl">
                        {__('messages.submit_idea.hero_badge')}
                    </div>
                    <h1 className="mb-4 font-headline text-2xl leading-tight font-extrabold text-white md:text-4xl">
                        {__('messages.submit_idea.hero_title')}{' '}
                        <span className="text-primary-fixed-dim">{__('messages.submit_idea.hero_title_highlight')}</span>
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
                                    <Label htmlFor="country" className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                        {__('messages.submit_idea.country_label')}
                                    </Label>
                                    <Select
                                        value={data.country}
                                        onValueChange={value => setData('country', value)}
                                    >
                                        <SelectTrigger id="country" size="lg" className="w-full bg-surface-container-low dark:bg-surface-container-high border-none px-4 text-on-surface dark:text-white focus:ring-2 focus:ring-primary">
                                            <SelectValue placeholder={__('messages.submit_idea.country_placeholder')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Saudi Arabia">
                                                <div className="flex items-center gap-2">
                                                    <Flag className="size-4 text-primary" />
                                                    {__('messages.countries.saudi_arabia')}
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="UAE">
                                                <div className="flex items-center gap-2">
                                                    <Flag className="size-4 text-primary" />
                                                    {__('messages.countries.uae')}
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="Egypt">
                                                <div className="flex items-center gap-2">
                                                    <Flag className="size-4 text-primary" />
                                                    {__('messages.countries.egypt')}
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="Jordan">
                                                <div className="flex items-center gap-2">
                                                    <Flag className="size-4 text-primary" />
                                                    {__('messages.countries.jordan')}
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.country ? __(errors.country) : undefined} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city" className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                        {__('messages.submit_idea.city_label')}
                                    </Label>
                                    <Input
                                        id="city"
                                        size="lg"
                                        className="bg-surface-container-low dark:bg-surface-container-high w-full border-none px-4 text-on-surface dark:text-white transition-all focus:bg-white dark:focus:bg-surface-container-highest focus:ring-2 focus:ring-primary"
                                        placeholder={__('messages.submit_idea.city_placeholder')}
                                        type="text"
                                        value={data.city}
                                        onChange={e => setData('city', e.target.value)}
                                    />
                                    <InputError message={errors.city ? __(errors.city) : undefined} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category" className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.category_label')}
                                </Label>
                                <Select
                                    value={data.category}
                                    onValueChange={value => setData('category', value)}
                                >
                                    <SelectTrigger id="category" size="lg" className="w-full bg-surface-container-low dark:bg-surface-container-high border-none px-4 text-on-surface dark:text-white focus:ring-2 focus:ring-primary">
                                        <SelectValue placeholder={__('messages.submit_idea.category_placeholder')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="e-commerce">
                                            <div className="flex items-center gap-2">
                                                <ShoppingBag className="size-4 text-primary" />
                                                {__('messages.categories.ecommerce')}
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="digital-services">
                                            <div className="flex items-center gap-2">
                                                <Cpu className="size-4 text-primary" />
                                                {__('messages.categories.digital_services')}
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="home-services">
                                            <div className="flex items-center gap-2">
                                                <Home className="size-4 text-primary" />
                                                {__('messages.categories.home_services')}
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="handicrafts">
                                            <div className="flex items-center gap-2">
                                                <Palette className="size-4 text-primary" />
                                                {__('messages.categories.handicrafts')}
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="tech">
                                            <div className="flex items-center gap-2">
                                                <Cpu className="size-4 text-primary" />
                                                {__('messages.categories.tech')}
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="other">
                                            <div className="flex items-center gap-2">
                                                <MoreHorizontal className="size-4 text-primary" />
                                                {__('messages.categories.other')}
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category ? __(errors.category) : undefined} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title" className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.title_label')}
                                </Label>
                                <Input
                                    id="title"
                                    size="lg"
                                    className="bg-surface-container-low dark:bg-surface-container-high w-full border-none px-4 text-on-surface dark:text-white transition-all focus:bg-white dark:focus:bg-surface-container-highest focus:ring-2 focus:ring-primary"
                                    placeholder={__('messages.submit_idea.title_placeholder')}
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                <InputError message={errors.title ? __(errors.title) : undefined} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.details_label')}
                                </Label>
                                <Textarea
                                    id="description"
                                    className="bg-surface-container-low dark:bg-surface-container-high w-full resize-none border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white dark:focus:bg-surface-container-highest focus:ring-2 focus:ring-primary"
                                    placeholder={__('messages.submit_idea.details_placeholder')}
                                    rows={6}
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description ? __(errors.description) : undefined} />
                            </div>

                            <div className="space-y-2">
                                <Label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.image_label')}
                                </Label>
                                <div
                                    onClick={() => document.getElementById('image-upload')?.click()}
                                    onDragEnter={handleDragEnter}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={cn(
                                        "group border-outline-variant dark:border-outline-variant/30 bg-surface-container-low dark:bg-surface-container-high hover:bg-surface-container dark:hover:bg-surface-container-highest flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-all overflow-hidden relative",
                                        isDragging ? "border-primary bg-primary/5 dark:bg-primary/10 scale-[1.02]" : "hover:border-primary dark:hover:border-primary"
                                    )}
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
                                    ) : (
                                        <UploadCloud className={cn(
                                            "mb-3 size-12 transition-transform",
                                            isDragging ? "text-primary scale-110" : "text-primary group-hover:scale-110"
                                        )} />
                                    )}
                                    <div className="relative z-10 flex flex-col items-center">
                                        <p className="font-headline text-sm font-bold text-on-surface dark:text-white text-center">
                                            {isDragging
                                                ? __('messages.submit_idea.drop_to_upload')
                                                : (imagePreview ? __('messages.submit_idea.change_image') : __('messages.submit_idea.image_placeholder'))
                                            }
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
                                <InputError message={errors.image ? __(errors.image) : undefined} />
                            </div>

                            <div className="space-y-2">
                                <Label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.file_label')}
                                </Label>
                                <div className="border-outline-variant/10 bg-surface-container-low dark:bg-surface-container-high flex items-center gap-4 rounded-lg border p-4">
                                    <FileText className="text-primary size-6" />
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
                                <InputError message={errors.pdf_file ? __(errors.pdf_file) : undefined} />
                            </div>

                            <div className="border-outline-variant/20 dark:border-outline-variant/10 space-y-4 border-t pt-6">
                                <div className="group flex items-start gap-3">
                                    <Checkbox
                                        id="agreed_terms"
                                        className="mt-1"
                                        checked={data.agreed_terms}
                                        onCheckedChange={checked => setData('agreed_terms', !!checked)}
                                    />
                                    <Label htmlFor="agreed_terms" className="text-sm leading-relaxed text-on-surface dark:text-white/80 group-hover:text-on-surface dark:text-white cursor-pointer font-normal">
                                        {__('messages.submit_idea.agree_terms')}
                                    </Label>
                                </div>
                                <InputError message={errors.agreed_terms ? __(errors.agreed_terms) : undefined} />

                                <div className="group flex items-start gap-3">
                                    <Checkbox
                                        id="agreed_privacy"
                                        className="mt-1"
                                        checked={data.agreed_privacy}
                                        onCheckedChange={checked => setData('agreed_privacy', !!checked)}
                                    />
                                    <Label htmlFor="agreed_privacy" className="text-sm leading-relaxed text-on-surface dark:text-white/80 group-hover:text-on-surface dark:text-white cursor-pointer font-normal">
                                        {__('messages.submit_idea.pledge_originality')}
                                    </Label>
                                </div>
                                <InputError message={errors.agreed_privacy ? __(errors.agreed_privacy) : undefined} />

                                <div className="group flex items-start gap-3">
                                    <Checkbox
                                        id="agreed_legal"
                                        className="mt-1"
                                        checked={data.agreed_legal}
                                        onCheckedChange={checked => setData('agreed_legal', !!checked)}
                                    />
                                    <Label htmlFor="agreed_legal" className="text-sm leading-relaxed text-on-surface dark:text-white/80 group-hover:text-on-surface dark:text-white cursor-pointer font-normal">
                                        {__('messages.submit_idea.agreed_legal')}
                                    </Label>
                                </div>
                                <InputError message={errors.agreed_legal ? __(errors.agreed_legal) : undefined} />
                            </div>

                            <div className="pt-6">
                                <Button
                                    className="font-headline text-on-primary flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-primary text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                                    type="submit"
                                    disabled={processing}
                                >
                                    <span>{processing ? __('messages.common.processing') : __('messages.submit_idea.submit_button')}</span>
                                    <Rocket className="size-6" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
