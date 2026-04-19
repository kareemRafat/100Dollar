import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/app/layouts/app-layout';

const contactCards = [
    {
        icon: 'mail',
        label: 'البريد الإلكتروني',
        value: 'contact@goldenledger.sa',
    },
    {
        icon: 'chat',
        label: 'واتساب',
        value: '+966 50 000 0000',
        dir: 'ltr' as const,
    },
    {
        icon: 'schedule',
        label: 'ساعات العمل',
        value: 'الأحد - الخميس: 9ص - 6م',
    },
];

export default function Contact() {
    return (
        <AppLayout activeRoute="/contact">
            <Head title="تواصل معنا" />

            <section className="relative flex h-[400px] items-center justify-center overflow-hidden bg-deep-navy md:h-[500px]">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Modern illustrative communication background"
                        className="h-full w-full object-cover opacity-30 mix-blend-luminosity"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQmrXjQNj4mqHs1qLAEf1hXrItF0RD87tQiaVV50MiQvqVP02ptbOPzACCAo_vsrefiL1nrJATB1tdhBi5RRff9HjEOjl-zaGGMbTScRAt4EJQazcXFkVtIZwz9x9syXGCYhtWBtrzG4MWe2jV8oyxUBwDLqTJ5UFa1tQ87ZpZW5_8Ghg8vAkmVfFDjHGX-z_RWIK9YNNXXf2BjHych6RF6O6SEaVbu8yerNL9OaqAF8VV_RPiPo_gozxjB97qbBsp-B5e4eiAM8g"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/90 via-deep-navy/80 to-deep-navy/95" />
                    <div className="pointer-events-none absolute inset-0 opacity-20">
                        <span className="material-symbols-outlined absolute top-10 left-10 scale-150 rotate-12 text-primary">
                            mail
                        </span>
                        <span className="material-symbols-outlined absolute right-20 bottom-20 scale-125 -rotate-12 text-primary">
                            call
                        </span>
                        <span className="material-symbols-outlined absolute top-1/2 left-[15%] text-primary opacity-50">
                            chat_bubble
                        </span>
                        <span className="material-symbols-outlined absolute top-[20%] right-[10%] scale-110 text-primary opacity-40">
                            location_on
                        </span>
                    </div>
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <h1 className="relative mb-6 inline-block text-4xl font-extrabold text-white drop-shadow-2xl md:text-6xl">
                        تواصل معنا
                        <span className="absolute right-0 -bottom-4 left-0 mx-auto h-1.5 w-24 rounded-full bg-primary shadow-lg" />
                    </h1>
                    <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed font-medium text-gray-200 drop-shadow-lg md:text-xl">
                        نحن هنا للإجابة على استفساراتك ودعم أفكارك الطموحة. لا
                        تتردد في مراسلتنا عبر النموذج أو من خلال قنوات التواصل
                        المباشرة.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-8 py-24">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                    <div className="rounded-xl border-outline-variant/30 bg-surface-container-lowest p-8 shadow-sm md:p-12 lg:col-span-7">
                        <h2 className="mb-8 text-2xl font-bold text-on-surface dark:text-white">
                            أرسل لنا رسالة
                        </h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <label className="pr-2 text-sm font-bold text-on-surface-variant">
                                        الاسم
                                    </label>
                                    <input
                                        className="rounded-lg border-none bg-surface-container-low p-3 text-on-surface transition-all placeholder:text-outline/50 focus:ring-1 focus:ring-primary"
                                        placeholder="أدخل اسمك الكامل"
                                        type="text"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="pr-2 text-sm font-bold text-on-surface-variant">
                                        البريد الإلكتروني
                                    </label>
                                    <input
                                        className="rounded-lg border-none bg-surface-container-low p-3 text-on-surface transition-all placeholder:text-outline/50 focus:ring-1 focus:ring-primary"
                                        placeholder="example@domain.com"
                                        type="email"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="pr-2 text-sm font-bold text-on-surface-variant">
                                    الموضوع
                                </label>
                                <select className="appearance-none rounded-lg border-none bg-surface-container-low p-3 text-on-surface transition-all focus:ring-1 focus:ring-primary">
                                    <option>استفسار عام</option>
                                    <option>رعاية</option>
                                    <option>شكوى</option>
                                    <option>أخرى</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="pr-2 text-sm font-bold text-on-surface-variant">
                                    الرسالة
                                </label>
                                <textarea
                                    className="h-28 resize-none rounded-lg border-none bg-surface-container-low p-3 text-on-surface transition-all placeholder:text-outline/50 focus:ring-1 focus:ring-primary"
                                    placeholder="اكتب رسالتك هنا..."
                                    rows={5}
                                />
                            </div>
                            <button
                                className="w-full rounded-lg bg-primary px-12 py-4 text-lg font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-95 md:w-auto"
                                type="submit"
                            >
                                إرسال
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
                            هل أنت شركة وتريد رعاية يوم؟
                        </h3>
                        <p className="text-on-surface-variant">
                            ساهم في دعم الابتكار وكن شريكاً في نجاح الأفكار
                            السعودية القادمة.
                        </p>
                    </div>
                    <Link
                        href="/sponsors"
                        className="rounded-lg bg-deep-navy px-8 py-3 font-bold whitespace-nowrap text-primary transition-all hover:bg-deep-navy/90"
                    >
                        اعرف المزيد
                    </Link>
                </div>
            </section>
        </AppLayout>
    );
}
