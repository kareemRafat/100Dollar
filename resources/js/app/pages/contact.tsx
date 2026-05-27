import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link, useForm } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import { store } from '@/actions/App/Http/Controllers/App/ContactController';
import { Button } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/toast';

import { ContactForm } from './contact/partials/contact-form';
import { ContactInfoCard } from './contact/partials/contact-info-card';

export default function Contact() {
    const { __ } = useLang();

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
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

    return (
        <>
            <Head title={__('messages.nav.contact')} />

            <section className="relative flex h-[320px] items-center justify-center overflow-hidden bg-deep-navy md:h-[400px]">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Modern customer support team"
                        className="h-full w-full object-cover object-center opacity-40"
                        src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&q=80&w=2000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/80 via-deep-navy/40 to-deep-navy/90" />
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <h1 className="relative mb-6 inline-block font-headline text-2xl font-extrabold text-white md:text-4xl">
                        {__('messages.contact.hero_title')}
                        <span className="absolute start-0 end-0 -bottom-3 mx-auto h-1 w-16 rounded-full bg-primary shadow-lg" />
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
                        <ContactForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            recentlySuccessful={recentlySuccessful}
                            onSubmit={handleSubmit}
                        />
                    </div>

                    <ContactInfoCard />
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-8 rounded-2xl border border-primary/10 bg-primary/5 p-8 text-center md:flex-row md:p-12 md:text-right dark:border-white/10 dark:bg-white/5">
                    <div>
                        <h3 className="mb-2 text-2xl font-extrabold text-on-surface ltr:text-left dark:text-white">
                            {__('messages.contact.sponsor_cta_title')}
                        </h3>
                        <p className="text-on-surface-variant dark:text-gray-400">
                            {__('messages.contact.sponsor_cta_desc')}
                        </p>
                    </div>
                    <Button
                        asChild
                        variant="secondary"
                        size="lg"
                        className="rounded-xl font-bold whitespace-nowrap"
                    >
                        <Link href="/sponsors">
                            {__('messages.contact.learn_more')}
                        </Link>
                    </Button>
                </div>
            </section>
        </>
    );
}
