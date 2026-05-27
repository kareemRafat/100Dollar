import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    MessageSquare,
    ShieldCheck,
    Rocket,
} from 'lucide-react';
import type { SubmitEvent } from 'react';
import { toast } from '@/app/components/ui/toast';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { sponsors as sponsorsIndex } from '@/routes/app';
import { store } from '@/routes/app/sponsors';

import { ApplyFormActions } from './partials/apply-form-actions';
import { CompanyInfoFields } from './partials/company-info-fields';
import { SponsorLogoUploader } from './partials/sponsor-logo-uploader';

interface Country {
    id: number;
    name_en: string;
    name_ar: string;
    code: string;
}

export default function SponsorshipApply({
    countries,
}: {
    countries: Country[];
}) {
    const { __ } = useLang();
    const { locale } = usePage().props as any;
    const isRtl = locale === 'ar';
    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: '',
        email: '',
        phone: '',
        website: '',
        country_id: '',
        logo: null as File | null,
        message: '',
    });

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(store().url, {
            preserveScroll: 'errors',
            onSuccess: () => {
                reset();
                toast.success(__('messages.sponsors.application_success'));
            },
        });
    };

    return (
        <>
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
                        <span className="text-sm font-bold tracking-wider uppercase">
                            {__('messages.sponsors.inspire_youth_title')}
                        </span>
                    </div>
                    <h1 className="mb-6 font-headline text-3xl font-black text-white md:text-5xl">
                        {__('messages.sponsors.become_sponsor_button')}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80">
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
                                className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant transition-colors hover:text-primary"
                            >
                                {isRtl ? (
                                    <ArrowRight className="size-4" />
                                ) : (
                                    <ArrowLeft className="size-4" />
                                )}
                                {__('messages.ui.back')}
                            </Link>
                        </div>

                        <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-sm md:p-12 dark:border-white/5 dark:bg-card">
                            <h2 className="mb-8 font-headline text-2xl font-bold text-on-surface dark:text-white">
                                {__(
                                    'messages.sponsors.contact_for_sponsorship',
                                )}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-6">
                                    <CompanyInfoFields
                                        data={data}
                                        setData={setData}
                                        errors={errors}
                                        countries={countries}
                                    />

                                    <SponsorLogoUploader
                                        onLogoChange={(file) =>
                                            setData('logo', file)
                                        }
                                        error={
                                            errors.logo
                                                ? __(errors.logo)
                                                : undefined
                                        }
                                    />

                                    <div className="flex flex-col gap-2">
                                        <Label className="flex items-center gap-2 pe-2 text-sm font-bold text-on-surface-variant">
                                            <MessageSquare className="size-3.5 text-primary" />
                                            {__(
                                                'messages.sponsors.message_label',
                                            )}
                                        </Label>
                                        <Textarea
                                            className="min-h-[160px] w-full resize-none border-none bg-surface-container-low p-4 text-on-surface transition-all focus:bg-white focus:ring-2 focus:ring-primary dark:bg-surface-container-high dark:text-white dark:focus:bg-surface-container-highest"
                                            placeholder={__(
                                                'messages.contact.message_placeholder',
                                            )}
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    'message',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={
                                                errors.message
                                                    ? __(errors.message)
                                                    : undefined
                                            }
                                        />
                                    </div>
                                </div>

                                <ApplyFormActions processing={processing} />
                            </form>
                        </div>
                    </div>

                    <div className="space-y-8 lg:col-span-5">
                        <div className="rounded-3xl border border-primary/10 bg-primary/5 p-8 md:p-12">
                            <h3 className="mb-6 font-headline text-2xl font-black text-on-surface dark:text-white">
                                {__('messages.about.core_values_title')}
                            </h3>
                            <div className="space-y-8">
                                <div className="flex gap-5">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                                        <ShieldCheck className="size-6" />
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-bold text-on-surface dark:text-white">
                                            {__(
                                                'messages.about.value_transparency_title',
                                            )}
                                        </h4>
                                        <p className="text-sm leading-relaxed text-on-surface-variant/80">
                                            {__(
                                                'messages.about.value_transparency_desc',
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                                        <Rocket className="size-6" />
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-bold text-on-surface dark:text-white">
                                            {__(
                                                'messages.about.value_innovation_title',
                                            )}
                                        </h4>
                                        <p className="text-sm leading-relaxed text-on-surface-variant/80">
                                            {__(
                                                'messages.about.value_innovation_desc',
                                            )}
                                        </p>
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
                            <div className="absolute right-6 bottom-6 left-6">
                                <p className="text-sm leading-relaxed font-bold text-white/90 italic">
                                    " {__('messages.about.quote')} "
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
