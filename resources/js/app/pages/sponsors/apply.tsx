import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { 
    ArrowLeft, 
    ArrowRight, 
    Building2, 
    Mail, 
    Phone, 
    Globe, 
    MessageSquare, 
    ShieldCheck, 
    Rocket, 
    ImagePlus,
    UploadCloud
} from 'lucide-react';
import { useState  } from 'react';
import type {ChangeEvent} from 'react';
import { CountrySelect } from '@/app/components/country-select';
import { Button } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/toast';
import AppLayout from '@/app/layouts/app-layout';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { sponsors as sponsorsIndex } from '@/routes/app';
import { store } from '@/routes/app/sponsors';

export default function SponsorshipApply({ countries }: { countries: Record<string, string> }) {
    const { __ } = useLang();
    const { locale } = usePage().props as any;
    const isRtl = locale === 'ar';
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: '',
        email: '',
        phone: '',
        website: '',
        country: '',
        logo: null as File | null,
        message: '',
    });

    const processLogo = (file: File) => {
        setData('logo', file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setLogoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            processLogo(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];

        if (file && file.type.startsWith('image/')) {
            processLogo(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store().url, {
            preserveScroll: 'errors',
            onSuccess: () => {
                reset();
                setLogoPreview(null);
                toast.success(__('messages.sponsors.application_success'));
            },
        });
    };

    return (
        <AppLayout activeRoute="/sponsors">
            <Head title={__('messages.sponsors.become_sponsor_button')} />

            <section className="relative flex h-[320px] items-center justify-center overflow-hidden bg-deep-navy md:h-[400px]">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Corporate partnership and growth"
                        className="h-full w-full object-cover opacity-20 mix-blend-luminosity"
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/80 via-deep-navy/70 to-deep-navy/90" />
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-4 py-1.5 text-primary-fixed">
                        <Rocket className="size-4" />
                        <span className="text-sm font-bold uppercase tracking-wider">
                            {__('messages.sponsors.inspire_youth_title')}
                        </span>
                    </div>
                    <h1 className="mb-6 font-headline text-3xl font-black text-white md:text-5xl">
                        {__('messages.sponsors.become_sponsor_button')}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-white/80 leading-relaxed">
                        {__('messages.sponsors.inspire_youth_desc')}
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-8 py-24">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <div className="mb-8">
                            <Link
                                href={sponsorsIndex().url}
                                className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
                            >
                                {isRtl ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
                                {__('messages.ui.back')}
                            </Link>
                        </div>

                        <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-sm md:p-12 dark:border-white/5 dark:bg-card">
                            <h2 className="mb-8 font-headline text-2xl font-bold text-on-surface dark:text-white">
                                {__('messages.sponsors.contact_for_sponsorship')}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <Label className="flex items-center gap-2 pe-2 text-sm font-bold text-on-surface-variant">
                                            <Building2 className="size-3.5 text-primary" />
                                            {__('messages.sponsors.company_name')}
                                        </Label>
                                        <Input
                                            size="lg"
                                            className="bg-surface-container-low dark:bg-surface-container-high w-full border-none px-4 text-on-surface dark:text-white transition-all focus:bg-white dark:focus:bg-surface-container-highest focus:ring-2 focus:ring-primary"
                                            placeholder={__('messages.sponsors.company_name_placeholder')}
                                            value={data.company_name}
                                            onChange={(e) => setData('company_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.company_name ? __(errors.company_name) : undefined} />
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div className="flex flex-col gap-2">
                                            <Label className="flex items-center gap-2 pe-2 text-sm font-bold text-on-surface-variant">
                                                <Mail className="size-3.5 text-primary" />
                                                {__('messages.sponsors.company_email')}
                                            </Label>
                                            <Input
                                                size="lg"
                                                className="bg-surface-container-low dark:bg-surface-container-high w-full border-none px-4 text-on-surface dark:text-white transition-all focus:bg-white dark:focus:bg-surface-container-highest focus:ring-2 focus:ring-primary"
                                                placeholder={__('messages.contact.email_placeholder')}
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.email ? __(errors.email) : undefined} />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label className="flex items-center gap-2 pe-2 text-sm font-bold text-on-surface-variant">
                                                <Phone className="size-3.5 text-primary" />
                                                {__('messages.sponsors.company_phone')}
                                            </Label>
                                            <Input
                                                size="lg"
                                                className="bg-surface-container-low dark:bg-surface-container-high w-full border-none px-4 text-on-surface dark:text-white transition-all focus:bg-white dark:focus:bg-surface-container-highest focus:ring-2 focus:ring-primary"
                                                placeholder="+966 50 000 0000"
                                                type="tel"
                                                dir="ltr"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.phone ? __(errors.phone) : undefined} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div className="flex flex-col gap-2">
                                            <Label className="flex items-center gap-2 pe-2 text-sm font-bold text-on-surface-variant">
                                                <Globe className="size-3.5 text-primary" />
                                                {__('messages.sponsors.company_website')}
                                            </Label>
                                            <Input
                                                size="lg"
                                                className="bg-surface-container-low dark:bg-surface-container-high w-full border-none px-4 text-on-surface dark:text-white transition-all focus:bg-white dark:focus:bg-surface-container-highest focus:ring-2 focus:ring-primary"
                                                placeholder="https://company.com"
                                                type="url"
                                                dir="ltr"
                                                value={data.website}
                                                onChange={(e) => setData('website', e.target.value)}
                                            />
                                            <InputError message={errors.website ? __(errors.website) : undefined} />
                                        </div>
                                        <CountrySelect
                                            value={data.country}
                                            onValueChange={(val) => setData('country', val)}
                                            label={
                                                <>
                                                    <Globe className="size-3.5 text-primary" />
                                                    {__('messages.submit_idea.country_label')}
                                                </>
                                            }
                                            labelClassName="flex items-center gap-2 pe-2 text-sm font-bold text-on-surface-variant"
                                            variant="flat"
                                            required
                                            error={errors.country ? __(errors.country) : undefined}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label className="flex items-center gap-2 pe-2 text-sm font-bold text-on-surface-variant">
                                            <ImagePlus className="size-3.5 text-primary" />
                                            {__('messages.sponsors.company_logo')}
                                        </Label>
                                        <div
                                            onClick={() => document.getElementById('logo-upload')?.click()}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            className={cn(
                                                "group border-outline-variant dark:border-outline-variant/30 bg-surface-container-low dark:bg-surface-container-high hover:bg-surface-container dark:hover:bg-surface-container-highest flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all overflow-hidden relative min-h-[140px]",
                                                isDragging ? "border-primary bg-primary/5 dark:bg-primary/10 scale-[1.02]" : "hover:border-primary dark:hover:border-primary"
                                            )}
                                        >
                                            {logoPreview ? (
                                                <img src={logoPreview} alt="Preview" className="absolute inset-0 w-full h-full object-contain opacity-80 group-hover:opacity-60 transition-opacity p-2" />
                                            ) : (
                                                <UploadCloud className={cn(
                                                    "mb-2 size-10 transition-transform",
                                                    isDragging ? "text-primary scale-110" : "text-primary group-hover:scale-110"
                                                )} />
                                            )}
                                            <div className="relative z-10 flex flex-col items-center">
                                                <p className="font-headline text-sm font-bold text-on-surface dark:text-white text-center">
                                                    {logoPreview ? __('messages.submit_idea.change_image') : __('messages.submit_idea.image_placeholder')}
                                                </p>
                                                <p className="text-outline mt-1 text-xs dark:text-slate-400">
                                                    {__('messages.submit_idea.image_hint')}
                                                </p>
                                            </div>
                                            <input
                                                id="logo-upload"
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleLogoChange}
                                            />
                                        </div>
                                        <InputError message={errors.logo ? __(errors.logo) : undefined} />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label className="flex items-center gap-2 pe-2 text-sm font-bold text-on-surface-variant">
                                            <MessageSquare className="size-3.5 text-primary" />
                                            {__('messages.sponsors.message_label')}
                                        </Label>
                                        <Textarea
                                            className="min-h-[160px] bg-surface-container-low dark:bg-surface-container-high w-full resize-none border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white dark:focus:bg-surface-container-highest focus:ring-2 focus:ring-primary"
                                            placeholder={__('messages.contact.message_placeholder')}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.message ? __(errors.message) : undefined} />
                                    </div>
                                </div>

                                <Button
                                    className="h-12 w-full rounded-xl text-lg font-bold shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] md:w-auto md:px-12"
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? __('messages.common.processing') : __('messages.sponsors.become_sponsor_button')}
                                </Button>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-8">
                        <div className="rounded-3xl bg-primary/5 border border-primary/10 p-8 md:p-12">
                            <h3 className="mb-6 font-headline text-2xl font-black text-on-surface dark:text-white">
                                {__('messages.about.core_values_title')}
                            </h3>
                            <div className="space-y-8">
                                <div className="flex gap-5">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                                        <ShieldCheck className="size-6" />
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-bold text-on-surface dark:text-white">{__('messages.about.value_transparency_title')}</h4>
                                        <p className="text-sm leading-relaxed text-on-surface-variant/80">{__('messages.about.value_transparency_desc')}</p>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                                        <Rocket className="size-6" />
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-bold text-on-surface dark:text-white">{__('messages.about.value_innovation_title')}</h4>
                                        <p className="text-sm leading-relaxed text-on-surface-variant/80">{__('messages.about.value_innovation_desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="group relative h-64 overflow-hidden rounded-3xl border border-outline-variant/20">
                            <img
                                alt="Modern partnership visual"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-deep-navy/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-sm font-bold text-white/90 italic leading-relaxed">
                                    " {__('messages.about.quote')} "
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
