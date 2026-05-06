import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Mail,
    AlertCircle,
    MoreHorizontal,
    Rocket,
    Phone,
    Clock
} from 'lucide-react';
import type { SubmitEvent } from 'react';
import { store } from '@/actions/App/Http/Controllers/App/ContactController';
import { Button } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/toast';
import AppLayout from '@/app/layouts/app-layout';
import InputError from '@/components/input-error';
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


export default function Contact() {
    const { __ } = useLang();

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(store().url, {
            preserveScroll: 'errors',
            onSuccess: () => {
                reset();
                toast.success(__('messages.contact.success_message'));
            },
        });
    };

    const contactCards = [
        {
            icon: Mail,
            label: __('messages.contact.email_card_label'),
            value: __('messages.contact.email_value'),
        },
        {
            icon: Phone,
            label: __('messages.contact.whatsapp_card_label'),
            value: __('messages.contact.whatsapp_value'),
            dir: 'ltr' as const,
        },
        {
            icon: Clock,
            label: __('messages.contact.working_hours_card_label'),
            value: __('messages.contact.working_hours_value'),
        },
    ];

    const subjects = [
        { value: 'general', label: __('messages.contact.subject_general'), icon: Mail },
        { value: 'sponsorship', label: __('messages.contact.subject_sponsorship'), icon: Rocket },
        { value: 'complaint', label: __('messages.contact.subject_complaint'), icon: AlertCircle },
        { value: 'other', label: __('messages.contact.subject_other'), icon: MoreHorizontal },
    ];

    return (
        <AppLayout activeRoute="/contact">
            <Head title={__('messages.nav.contact')} />

            <section className="relative flex h-[320px] items-center justify-center overflow-hidden bg-deep-navy md:h-[400px]">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Modern illustrative communication background"
                        className="h-full w-full object-cover opacity-20 mix-blend-luminosity"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQmrXjQNj4mqHs1qLAEf1hXrItF0RD87tQiaVV50MiQvqVP02ptbOPzACCAo_vsrefiL1nrJATB1tdhBi5RRff9HjEOjl-zaGGMbTScRAt4EJQazcXFkVtIZwz9x9syXGCYhtWBtrzG4MWe2jV8oyxUBwDLqTJ5UFa1tQ87ZpZW5_8Ghg8vAkmVfFDjHGX-z_RWIK9YNNXXf2BjHych6RF6O6SEaVbu8yerNL9OaqAF8VV_RPiPo_gozxjB97qbBsp-B5e4eiAM8g"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/80 via-deep-navy/70 to-deep-navy/90" />
                    <div className="pointer-events-none absolute inset-0 opacity-20">
                        <span className="material-symbols-outlined absolute top-10 start-10 scale-150 rotate-12 text-primary">
                            mail
                        </span>
                        <span className="material-symbols-outlined absolute end-20 bottom-20 scale-125 -rotate-12 text-primary">
                            call
                        </span>
                    </div>
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <h1 className="relative mb-6 inline-block font-headline text-2xl font-extrabold text-white md:text-4xl">
                        {__('messages.contact.hero_title')}
                        <span className="absolute end-0 -bottom-3 start-0 mx-auto h-1 w-16 rounded-full bg-primary shadow-lg" />
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/90">
                        {__('messages.contact.hero_desc')}
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-8 py-24">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                    <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-sm md:p-12 lg:col-span-7 dark:border-white/5 dark:bg-card">
                        <h2 className="mb-8 text-2xl font-bold text-on-surface dark:text-white">
                            {__('messages.contact.send_message_title')}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <Label className="pe-2 text-sm font-bold text-on-surface-variant">
                                        {__('messages.contact.name_label')}
                                    </Label>
                                    <Input
                                        size="lg"
                                        className="bg-surface-container-low dark:bg-surface-container-high w-full border-none px-4 text-on-surface dark:text-white transition-all focus:bg-white dark:focus:bg-surface-container-highest focus:ring-2 focus:ring-primary"
                                        placeholder={__('messages.contact.name_placeholder')}
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name ? __(errors.name) : undefined} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="pe-2 text-sm font-bold text-on-surface-variant">
                                        {__('messages.contact.email_label')}
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
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="pe-2 text-sm font-bold text-on-surface-variant">
                                    {__('messages.contact.subject_label')}
                                </Label>
                                <Select
                                    value={data.subject}
                                    onValueChange={(val) => setData('subject', val)}
                                    required
                                >
                                    <SelectTrigger size="lg" className="w-full bg-surface-container-low dark:bg-surface-container-high border-none px-4 text-on-surface dark:text-white focus:ring-2 focus:ring-primary">
                                        <SelectValue placeholder={__('messages.contact.subject_label')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem key={subject.value} value={subject.value}>
                                                <div className="flex items-center gap-2">
                                                    <subject.icon className="size-4 text-primary" />
                                                    {subject.label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.subject ? __(errors.subject) : undefined} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="pe-2 text-sm font-bold text-on-surface-variant">
                                    {__('messages.contact.message_label')}
                                </Label>
                                <Textarea
                                    className="h-32 bg-surface-container-low dark:bg-surface-container-high w-full resize-none border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white dark:focus:bg-surface-container-highest focus:ring-2 focus:ring-primary"
                                    placeholder={__('messages.contact.message_placeholder')}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    required
                                />
                                <InputError message={errors.message ? __(errors.message) : undefined} />
                            </div>
                            <Button
                                className="w-full h-12 text-lg font-bold md:w-auto md:px-12"
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? __('messages.common.processing') : __('messages.contact.send_button')}
                            </Button>
                            {recentlySuccessful && (
                                <p className="text-sm font-medium text-success">
                                    {__('messages.contact.success_message')}
                                </p>
                            )}
                        </form>
                    </div>

                    <div className="flex flex-col gap-6 lg:col-span-5">
                        {contactCards.map((card) => (
                            <div
                                key={card.label}
                                className="flex items-start gap-6 rounded-xl border border-outline-variant/20 bg-surface-container-low p-8 transition-transform hover:-translate-x-2 dark:border-white/5 dark:bg-white/5"
                            >
                                <div className="flex items-center justify-center rounded-lg bg-primary/10 p-4">
                                    <card.icon className="size-6 text-primary" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="mb-1 text-sm font-bold tracking-wider text-outline uppercase">
                                        {card.label}
                                    </span>
                                    <span
                                        className="text-lg font-bold text-on-surface dark:text-white"
                                        dir={card.dir}
                                    >
                                        {card.value}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="mt-4 overflow-hidden rounded-xl border border-outline-variant/20 shadow-sm dark:border-white/5">
                            <div className="group relative h-48">
                                <img
                                    alt="Modern collaborative space"
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDajC8yjkqysfCz6mqaKhjI-hDDpBiWe02Jzt39vG2lLz1VemVnPjWRRTLd3qhNFOeb-0_fBQ9DEMMOOQvons-Km57oC8YgyLi68fd63zNBETjr5Vx4w-FgiMbV0ZEaLU57reIxcZ-qWbC3K4rBZjY-YK3YlTAfsJF2X63oZt6p2UuaKojTGoOyI7sTi5bK2FSGsdg-KFGknkvNja9sS3nwaqYlZXoT6nv9lgrlv_mBylZmOwbsi2KboK-P-zqNmn-Tl6Sq7pdQkvs"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-8 rounded-2xl border border-primary/10 bg-primary/5 p-8 text-center md:flex-row md:p-12 md:text-right dark:border-white/10 dark:bg-white/5">
                    <div>
                        <h3 className="ltr:text-left mb-2 text-2xl font-extrabold text-on-surface dark:text-white">
                            {__('messages.contact.sponsor_cta_title')}
                        </h3>
                        <p className="text-on-surface-variant dark:text-gray-400">
                            {__('messages.contact.sponsor_cta_desc')}
                        </p>
                    </div>
                    <Button asChild variant="secondary" size="lg" className="rounded-xl font-bold whitespace-nowrap">
                        <Link href="/sponsors">
                            {__('messages.contact.learn_more')}
                        </Link>
                    </Button>
                </div>
            </section>
        </AppLayout>
    );
}
