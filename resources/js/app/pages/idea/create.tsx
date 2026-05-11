import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    ShoppingBag,
    Home,
    Palette,
    Cpu,
    MoreHorizontal,
    Rocket,
    UploadCloud,
    FileText,
    Leaf,
    GraduationCap,
    Heart
} from 'lucide-react';
import type { ChangeEvent, SubmitEvent, DragEvent } from 'react';
import { useState } from 'react';
import { store } from '@/actions/App/Http/Controllers/App/IdeaController';
import { CountrySelect } from '@/app/components/country-select';
import { Button } from '@/app/components/ui/button';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

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

export default function SubmitIdea({ categories, countries }: { categories: Category[], countries: Country[] }) {
    const { __ } = useLang();
    const { locale } = usePage().props as any;
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragCounter, setDragCounter] = useState(0);

    const categoryIcons: Record<string, any> = {
        'shopping-bag': ShoppingBag,
        'home': Home,
        'palette': Palette,
        'cpu': Cpu,
        'leaf': Leaf,
        'graduation-cap': GraduationCap,
        'heart': Heart,
        'more-horizontal': MoreHorizontal,
    };

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category_id: '',
        country_id: '',
        city: '',
        marketing_channel: [] as string[],
        target_audience: [] as string[],
        implementation_time: '',
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

    const handleDragEnter = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter(prev => prev + 1);
        setIsDragging(true);
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter(prev => {
            const next = prev - 1;

            if (next === 0) {
                setIsDragging(false);
            }

            return next;
        });
    };

    const handleDrop = (e: DragEvent) => {
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

    const submit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(store.url(), {
            preserveScroll: 'errors',
        });
    };

    return (
        <>
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
                                <Label htmlFor="category" className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.category_label')}
                                </Label>
                                <Select
                                    value={data.category_id}
                                    onValueChange={value => setData('category_id', value)}
                                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                >
                                    <SelectTrigger id="category" size="lg" className="w-full bg-surface-container-low dark:bg-surface-container-high border-none px-4 text-on-surface dark:text-white focus:ring-2 focus:ring-primary">
                                        <SelectValue placeholder={__('messages.submit_idea.category_placeholder')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => {
                                            const Icon = categoryIcons[category.icon] || MoreHorizontal;

                                            return (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    <div className="flex items-center gap-2">
                                                        <Icon className="size-4 text-primary" />
                                                        {locale === 'ar' ? category.name_ar : category.name_en}
                                                    </div>
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category_id ? __(errors.category_id) : undefined} />
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <CountrySelect
                                    value={data.country_id}
                                    onValueChange={value => setData('country_id', value)}
                                    countries={countries}
                                    label={__('messages.submit_idea.country_label')}
                                    error={errors.country_id ? __(errors.country_id) : undefined}
                                    required
                                    variant="flat"
                                />
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
                                <Label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    {__('messages.submit_idea.target_audience_label')}
                                </Label>
                                <MultiSelect
                                    options={[
                                        { label: __('messages.submit_idea.audiences.youth'), value: 'youth' },
                                        { label: __('messages.submit_idea.audiences.students'), value: 'students' },
                                        { label: __('messages.submit_idea.audiences.entrepreneurs'), value: 'entrepreneurs' },
                                        { label: __('messages.submit_idea.audiences.housewives'), value: 'housewives' },
                                        { label: __('messages.submit_idea.audiences.professionals'), value: 'professionals' },
                                        { label: __('messages.submit_idea.audiences.small_business_owners'), value: 'small_business_owners' },
                                        { label: __('messages.submit_idea.audiences.children'), value: 'children' },
                                        { label: __('messages.submit_idea.audiences.elderly'), value: 'elderly' },
                                    ]}
                                    onValueChange={value => setData('target_audience', value)}
                                    defaultValue={data.target_audience}
                                    placeholder={__('messages.submit_idea.target_audience_placeholder')}
                                    variant="inverted"
                                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                    className="bg-surface-container-low dark:bg-surface-container-high border-none min-h-[48px]"
                                />
                                <InputError message={errors.target_audience ? __(errors.target_audience) : undefined} />
                            </div>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div className="space-y-4">
                                    <Label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                        {__('messages.submit_idea.marketing_channel_label')}
                                    </Label>
                                    <div className="grid grid-cols-1 gap-3" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                                        {['social_media', 'word_of_mouth', 'physical', 'whatsapp', 'other'].map((channel) => (
                                            <div key={channel} className="flex items-center gap-3">
                                                <Checkbox
                                                    id={`channel-${channel}`}
                                                    checked={data.marketing_channel.includes(channel)}
                                                    onCheckedChange={(checked) => {
                                                        const newValue = checked
                                                            ? [...data.marketing_channel, channel]
                                                            : data.marketing_channel.filter((c) => c !== channel);
                                                        setData('marketing_channel', newValue);
                                                    }}
                                                />
                                                <Label htmlFor={`channel-${channel}`} className="cursor-pointer font-normal text-on-surface dark:text-white/80 text-start">
                                                    {__(`messages.submit_idea.channels.${channel}`)}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                    <InputError message={errors.marketing_channel ? __(errors.marketing_channel) : undefined} />
                                </div>

                                <div className="space-y-4">
                                    <Label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                        {__('messages.submit_idea.implementation_time_label')}
                                    </Label>
                                    <RadioGroup
                                        value={data.implementation_time}
                                        onValueChange={value => setData('implementation_time', value)}
                                        className="grid grid-cols-1 gap-3"
                                        dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                    >
                                        {['less_than_week', 'one_two_weeks', 'month', 'more_than_month'].map((time) => (
                                            <div key={time} className="flex items-center gap-3">
                                                <RadioGroupItem value={time} id={`time-${time}`} />
                                                <Label htmlFor={`time-${time}`} className="cursor-pointer font-normal text-on-surface dark:text-white/80 text-start">
                                                    {__(`messages.submit_idea.times.${time}`)}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    <InputError message={errors.implementation_time ? __(errors.implementation_time) : undefined} />
                                </div>
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

                            <div className="border-outline-variant/20 dark:border-outline-variant/10 space-y-4 border-t pt-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                                <div className="group flex items-start gap-3">
                                    <Checkbox
                                        id="agreed_terms"
                                        className="mt-1"
                                        checked={data.agreed_terms}
                                        onCheckedChange={checked => setData('agreed_terms', !!checked)}
                                    />
                                    <Label htmlFor="agreed_terms" className="text-sm leading-relaxed text-on-surface dark:text-white/80 group-hover:text-on-surface dark:text-white cursor-pointer font-normal text-start">
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
                                    <Label htmlFor="agreed_privacy" className="text-sm leading-relaxed text-on-surface dark:text-white/80 group-hover:text-on-surface dark:text-white cursor-pointer font-normal text-start">
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
                                    <Label htmlFor="agreed_legal" className="text-sm leading-relaxed text-on-surface dark:text-white/80 group-hover:text-on-surface dark:text-white cursor-pointer font-normal text-start">
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
        </>
    );
}

