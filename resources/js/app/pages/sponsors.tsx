import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/app/layouts/app-layout';
import { cn } from '@/lib/utils';

const sponsors = [
    {
        day: 'saturday',
        name: 'لوجستيك كرو',
        description: 'راعي جائزة يوم السبت',
        logoUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCnEFxUVU82-9W8xsYy28_vXsHkv7NCC55JlavhhbOF91SgV5eq-hzqoPk03t0hkMBMYm3NzWlD0LL7bCWI564BIWU6eTCrB_f7CYJledYBUPbcMtcZQNIBH6zG_qdCjbbiT7Vl6bg04q6uiKhxQv6Mu2aDZ7bD4u2NmoVMsKSvpwFhhei554VU0l8xdEd_wtp8fdPSta2n9MxwTJFWXnuLIOh3wSzGfBNqkF6PuZDVtRr_51V-xh1cCZ9UF4jcVOujA0thJXMnOrg',
        isToday: false,
        available: false,
    },
    {
        day: 'sunday',
        name: 'أرامكو للريادة',
        description: 'راعي جائزة يوم الأحد',
        logoUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuABn0IPB3rbRYwK1ueIh4_LPkcV-2yLNjEydpOzY13bVQH5yJb_sjOxq1VpEDQ0RherGYI9hc36w23Fmh9dcbTPVdyQTTihZU-hr81_c-3obXDkEO_ZSmUhZiWP97h7H_woiMgqlQG4EC19XMBZYq9B4e4KM43T2Kt7oFfUg6FpQz2kBkfJDIDMIolLi1XQtxC6HrszeISDJUyzDqXmzN2ZhHMjW_53b4FhxHu5tXpztW4cAEq0-E2-Gt21dS3K9dHoroDOz-76fPI',
        isToday: true,
        available: false,
    },
    {
        day: 'monday',
        name: 'منصة فنتك',
        description: 'راعي جائزة يوم الاثنين',
        logoUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAhDCY0Vmj6e04qqDvoayFaUNjdrruhDKn7ph-cTdcQF9pobXxXTgwHlJI4YH5dv793GAVsGwVBGqPfN3RQ29-8i-c_4fkEobjWGGmU_0XKsaRLuuc-HYA4lfA27J94lAdK60lyrqynxNEkITw-1Tp0-2G12fdKAw2Ihk2oYM8ChuRGLDfrKtaRSdasxxy5MaQl5xD7e-egMICbJVe1WwFbxLtgcRBA_DGPLO96IgtiX0dCqnaLz9NRn5tDiV19quMzpzGd9mkyhzo',
        isToday: false,
        available: false,
    },
    {
        day: 'tuesday',
        name: 'مدار للحلول',
        description: 'راعي جائزة يوم الثلاثاء',
        logoUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuD1a5Oo6NbYXHGHjIAD8dYhqnYFYEuT1mnP8BvG86x73G8N5BXh_CEv7zP3ylruUCp3BXnnEXY4PHjpSyoUDYHtxpJL7rQu4DriwA5_ivw-wb8KFwygW6MaV5Q6nCCBB_B-dO34jNLvbBfz7FhMD6_fveZD0yirdoo3-mDsoUPy0kEEz4SiCEFYHi_lCfmJpkgzsFay32TjCjmjXzE_Oxipymcuc3WoENQlZxX0eqvgP2zswesj1j77Gwx-Ma09w8LKxVKD43Vb5uw',
        isToday: false,
        available: false,
    },
    {
        day: 'wednesday',
        name: '',
        description: '',
        logoUrl: '',
        isToday: false,
        available: true,
    },
    {
        day: 'thursday',
        name: 'وكالة إبداع',
        description: 'راعي جائزة يوم الخميس',
        logoUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuC4Ntm6SmrIZUvye_m2L_A2YeIN13RLOKVdxdf5aoWyuza6lSGqfi37pO6YJkso8cP_1vxjHXaDyMgqc4J-PHSZLdVMxLU8s20Bu4CI9XEhu0rcFJ3fP9kewI8xhzWwcLcOY_0tnUoSt93GGIl6gYxI_jg1TGJ-qk5yhYYdoVnYFYBYeFwMmH2wRl9KawSqFyQF7Xg4SYOxarRNy18XMEY8ovq6PKv0r3y60Mvgmpn-hqtqYyQLV-iSO9XhmsAVA-LteJ2Eo7qKisE',
        isToday: false,
        available: false,
    },
];

export default function Sponsors() {
    const { __ } = useLang();

    // Get today's day name in English (lowercase) to match our sponsor keys
    const todayDay = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
    })
        .format(new Date())
        .toLowerCase();

    const sponsorBenefits = [
        {
            icon: 'visibility',
            title: __('messages.sponsors.benefit_visibility_title'),
            description: __('messages.sponsors.benefit_visibility_desc'),
        },
        {
            icon: 'handshake',
            title: __('messages.sponsors.benefit_connection_title'),
            description: __('messages.sponsors.benefit_connection_desc'),
        },
        {
            icon: 'analytics',
            title: __('messages.sponsors.benefit_report_title'),
            description: __('messages.sponsors.benefit_report_desc'),
        },
    ];

    return (
        <AppLayout activeRoute="/sponsors">
            <Head title={__('messages.nav.sponsors')} />

            <section className="relative flex h-[320px] items-center justify-center overflow-hidden md:h-[400px]">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Business Partnership"
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuArC4kPVsn7z0CuLq0bCi_lN3qUrqHoz32HH4u3wtyFEu3Wgmenw7-fEwb14cOxx9j7wipVb63s0RYwZ5trIxUHVOOYedwitzPo8u1bVbfigeX_8xVqEPKe6KYi5jyEqb-fbmVzsZkhMaDnHodfPstSp40RZcymvZnJzbPKotJfsDwRkTpyLcVlspnY4spphQGXMP1yWDpNv-5FRIFEkk6aD3uCsjtgBXJWZfT8Ivm91PV5WO-gwT7T5phBBjujf7FuGHNjtBiyakA"
                    />
                    <div
                        className="hero-overlay absolute inset-0"
                        style={{
                            background:
                                'linear-gradient(to bottom, rgba(26, 26, 46, 0.85), rgba(26, 26, 46, 0.95))',
                        }}
                    />
                </div>
                <div className="relative z-10 mx-auto px-8 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-4 py-1 text-primary-fixed">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                        </span>
                        <span className="text-sm font-bold">
                            {__('messages.sponsors.hero_badge')}
                        </span>
                    </div>
                    <h1 className="mb-4 font-headline text-2xl leading-tight font-black text-white md:text-4xl">
                        {__('messages.sponsors.hero_title')}
                    </h1>
                    <p className="mx-auto mb-6 max-w-2xl text-[15px] leading-relaxed text-gray-300">
                        {__('messages.sponsors.hero_desc')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/contact"
                            className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white transition-all hover:bg-primary-container"
                        >
                            {__('messages.sponsors.become_sponsor_button')}
                        </Link>
                        <button className="rounded-lg border border-white/20 bg-white/10 px-6 py-2 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                            {__('messages.sponsors.meet_sponsors_button')}
                        </button>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-8 py-24">
                <div className="flex flex-col gap-10">
                    {[0, 3].map((startIdx) => (
                        <div key={startIdx} className="flex flex-row gap-6">
                            <div className="hidden w-16 items-center justify-center rounded-2xl border border-primary/10 bg-primary/5 md:flex">
                                <span
                                    className="writing-vertical py-8 font-headline text-2xl font-black text-primary"
                                    style={{
                                        writingMode: 'vertical-rl',
                                        textOrientation: 'mixed',
                                    }}
                                >
                                    {__('messages.nav.sponsors')}
                                </span>
                            </div>
                            <div className="grid flex-1 grid-cols-1 items-stretch gap-6 md:grid-cols-3">
                                {sponsors
                                    .slice(startIdx, startIdx + 3)
                                    .map((sponsor) => {
                                        const isToday =
                                            sponsor.day === todayDay;
                                        return sponsor.available ? (
                                            <div
                                                key={sponsor.day}
                                                className="group flex flex-col items-center justify-between rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-low p-8 text-center transition-all duration-300 hover:border-primary/50 dark:bg-surface-container-high"
                                            >
                                                <div className="w-full">
                                                    <div className="mb-6 flex justify-center">
                                                        <span className="rounded-full bg-surface-container-high px-4 py-1.5 text-xs font-bold text-on-surface-variant dark:bg-surface-container-highest dark:text-slate-300">
                                                            {__(
                                                                `messages.sponsors.days.${sponsor.day}`,
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="mb-6 flex aspect-square w-full items-center justify-center rounded-xl bg-surface-container-high transition-colors group-hover:bg-primary/10 dark:bg-surface-container-highest">
                                                        <span className="material-symbols-outlined text-5xl text-outline-variant transition-colors group-hover:text-primary">
                                                            add_circle
                                                        </span>
                                                    </div>
                                                    <h3 className="mb-2 font-headline text-xl font-black text-on-surface dark:text-white">
                                                        {__(
                                                            'messages.sponsors.available_for_sponsorship',
                                                        )}
                                                    </h3>
                                                </div>
                                                <Link
                                                    href="/contact"
                                                    className="mt-4 w-full rounded-lg bg-primary py-3 text-center text-sm font-bold text-on-primary transition-all hover:opacity-90 dark:bg-primary dark:text-on-primary"
                                                >
                                                    {__('messages.nav.contact')}
                                                </Link>
                                            </div>
                                        ) : (
                                            <div
                                                key={sponsor.day}
                                                className={cn(
                                                    'flex flex-col justify-between rounded-2xl border-2 border-primary bg-surface-container-lowest p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-surface-container-low dark:border-primary/50',
                                                    isToday &&
                                                        'relative shadow-xl',
                                                )}
                                            >
                                                {isToday && (
                                                    <div className="absolute -top-3 left-6">
                                                        <span className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white shadow-lg ring-4 ring-surface-container-lowest dark:ring-surface-container-low">
                                                            {__(
                                                                'messages.sponsors.today_badge',
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="flex justify-center mb-6">
                                                        <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full">
                                                            {__(
                                                                `messages.sponsors.days.${sponsor.day}`,
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="w-full aspect-square bg-surface-container-low rounded-xl mb-6 flex items-center justify-center overflow-hidden border border-outline-variant/30">
                                                        <img
                                                            alt={`${sponsor.name} Logo`}
                                                            className="h-2/3 w-2/3 object-contain"
                                                            src={
                                                                sponsor.logoUrl
                                                            }
                                                        />
                                                    </div>
                                                    <div className="text-center">
                                                        <h3 className="mb-1 font-headline text-xl font-black text-on-surface dark:text-white">
                                                            {sponsor.name}
                                                        </h3>
                                                        <p className="mb-4 text-sm text-on-surface-variant dark:text-slate-400">
                                                            {__(
                                                                'messages.sponsors.day_sponsor',
                                                            ).replace(
                                                                ':day',
                                                                __(
                                                                    `messages.sponsors.days.${sponsor.day}`,
                                                                ),
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="border-t border-outline-variant/30 pt-4 text-center">
                                                    <p className="text-primary font-black text-lg">
                                                        {__(
                                                            'messages.sponsors.weekly_prize',
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto mb-24 max-w-7xl px-8">
                <div className="relative overflow-hidden rounded-3xl border-outline-variant/10 bg-surface-container-high/30 p-12">
                    <div className="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-primary/5" />
                    <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-48 w-48 rounded-full bg-primary/5" />
                    <div className="relative z-10 mb-12 text-center">
                        <h2 className="mb-4 font-headline text-4xl leading-tight font-black text-on-surface dark:text-white">
                            {__('messages.sponsors.inspire_youth_title')}
                        </h2>
                        <p className="mx-auto max-w-xl text-on-surface dark:text-white">
                            {__('messages.sponsors.inspire_youth_desc')}
                        </p>
                    </div>
                    <div className="relative z-10 mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {sponsorBenefits.map((benefit) => (
                            <div
                                key={benefit.icon}
                                className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-md backdrop-blur-sm transition-all hover:shadow-lg dark:bg-surface-container-highest"
                            >
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                                    <span className="material-symbols-outlined text-3xl text-primary">
                                        {benefit.icon}
                                    </span>
                                </div>
                                <h4 className="mb-3 font-headline text-xl font-bold text-on-surface dark:text-white">
                                    {benefit.title}
                                </h4>
                                <p className="text-sm leading-relaxed text-on-surface-variant dark:text-slate-200">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="relative z-10 text-center">
                        <Link
                            href="/contact"
                            className="rounded-xl bg-primary px-12 py-4 font-headline text-lg font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 hover:opacity-90"
                        >
                            {__('messages.sponsors.contact_for_sponsorship')}
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
