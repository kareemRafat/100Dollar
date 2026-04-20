import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/app/layouts/app-layout';

export default function Contact() {
    const { __ } = useLang();

    const contactCards = [
        {
            icon: 'mail',
            label: __('messages.contact.email_card_label'),
            value: 'contact@goldenledger.sa',
        },
        {
            icon: 'chat',
            label: __('messages.contact.whatsapp_card_label'),
            value: '+966 50 000 0000',
            dir: 'ltr' as const,
        },
        {
            icon: 'schedule',
            label: __('messages.contact.working_hours_card_label'),
            value: __('messages.contact.working_hours_value'),
        },
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
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90">
                        {__('messages.contact.hero_desc')}
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-8 py-24">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                    <div className="rounded-xl border-outline-variant/30 bg-surface-container-lowest p-8 shadow-sm md:p-12 lg:col-span-7">
                        <h2 className="mb-8 text-2xl font-bold text-on-surface dark:text-white">
                            {__('messages.contact.send_message_title')}
                        </h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <label className="pe-2 text-sm font-bold text-on-surface-variant">
                                        {__('messages.contact.name_label')}
                                    </label>
                                    <input
                                        className="rounded-lg border-none bg-surface-container-low p-3 text-on-surface transition-all placeholder:text-outline/50 focus:ring-1 focus:ring-primary"
                                        placeholder={__('messages.contact.name_placeholder')}
                                        type="text"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="pe-2 text-sm font-bold text-on-surface-variant">
                                        {__('messages.contact.email_label')}
                                    </label>
                                    <input
                                        className="rounded-lg border-none bg-surface-container-low p-3 text-on-surface transition-all placeholder:text-outline/50 focus:ring-1 focus:ring-primary"
                                        placeholder={__('messages.contact.email_placeholder')}
                                        type="email"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="pe-2 text-sm font-bold text-on-surface-variant">
                                    {__('messages.contact.subject_label')}
                                </label>
                                <select className="appearance-none rounded-lg border-none bg-surface-container-low p-3 text-on-surface transition-all focus:ring-1 focus:ring-primary">
                                    <option>{__('messages.contact.subject_general')}</option>
                                    <option>{__('messages.contact.subject_sponsorship')}</option>
                                    <option>{__('messages.contact.subject_complaint')}</option>
                                    <option>{__('messages.contact.subject_other')}</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="pe-2 text-sm font-bold text-on-surface-variant">
                                    {__('messages.contact.message_label')}
                                </label>
                                <textarea
                                    className="h-28 resize-none rounded-lg border-none bg-surface-container-low p-3 text-on-surface transition-all placeholder:text-outline/50 focus:ring-1 focus:ring-primary"
                                    placeholder={__('messages.contact.message_placeholder')}
                                    rows={5}
                                />
                            </div>
                            <button
                                className="w-full rounded-lg bg-primary px-12 py-4 text-lg font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-95 md:w-auto"
                                type="submit"
                            >
                                {__('messages.contact.send_button')}
                            </button>
                        </form>
                    </div>

                    <div className="flex flex-col gap-6 lg:col-span-5">
                        {contactCards.map((card) => (
                            <div
                                key={card.icon}
                                className="flex items-start gap-6 rounded-xl border-outline-variant/20 bg-surface-container-low p-8 transition-transform hover:-translate-x-2"
                            >
                                <div className="flex items-center justify-center rounded-lg bg-primary/10 p-4">
                                    <span className="material-symbols-outlined text-primary">
                                        {card.icon}
                                    </span>
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
                        <div className="mt-4 overflow-hidden rounded-xl border border-outline-variant/20 shadow-sm">
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

                <div className="mt-16 flex flex-col items-center justify-between gap-8 rounded-2xl border-primary/10 bg-primary/5 p-8 text-center md:flex-row md:p-12 md:text-right">
                    <div>
                        <h3 className="mb-2 text-2xl font-extrabold text-on-surface dark:text-white">
                            {__('messages.contact.sponsor_cta_title')}
                        </h3>
                        <p className="text-on-surface-variant">
                            {__('messages.contact.sponsor_cta_desc')}
                        </p>
                    </div>
                    <Link
                        href="/sponsors"
                        className="rounded-lg bg-deep-navy px-8 py-3 font-bold whitespace-nowrap text-primary-fixed-dim transition-all hover:bg-deep-navy/90"
                    >
                        {__('messages.contact.learn_more')}
                    </Link>
                </div>
            </section>
        </AppLayout>
    );
}
