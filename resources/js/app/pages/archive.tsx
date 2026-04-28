import { useLang } from '@erag/lang-sync-inertia/react';
import { Head } from '@inertiajs/react';
import { IdeaCard } from '@/app/components/idea-card';
import AppLayout from '@/app/layouts/app-layout';

const archiveIdeas = [
    {
        id: 1,
        category: 'صناعة يدوية',
        budget: '95$',
        title: 'متجر الحقائب الجلدية المخصصة',
        description:
            'تحويل مخلفات الجلود الطبيعية إلى محافظ وحوامل بطاقات فاخرة بتصاميم عربية أصيلة وتكلفة إنتاج بسيطة.',
        authorName: 'أحمد عمر',
        authorInitial: 'أ',
        timeAgo: '',
        votes: 0,
        voteProgress: 0,
        isWinner: true,
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAYRhbBC4W9XKcQriW1YH27e3hEy1HrZJlDBzSEB69c7uXtz0cnFKWZgVQVxP4LREjRArw_862NBzV-O-JbTTUc7DzdRbTuygWP_NCR1ndET8u54JZrdGf5ORsT3J0tfncdigSDkSgT-u0vqOBuTGR1j5OWYBESDCBSgtqNTF0CTRiK0PBmFYrHsomfyrma29nwuvgbELsadjQEKEX8h73pU011SpTaFv4urjGgJMqWJtk-1TmT-lZp71qDDrGwRMcgY1Bp08pvEBo',
        date: '١٢ مارس ٢٠٢٤',
    },
    {
        id: 2,
        category: 'خدمات رقمية',
        budget: '40$',
        title: 'وكالة تدقيق محتوى الذكاء الاصطناعي',
        description:
            'خدمة متخصصة للشركات لمراجعة وتعديل النصوص المنتجة بواسطة الذكاء الاصطناعي لتناسب الثقافة المحلية.',
        authorName: 'سارة محمود',
        authorInitial: 'س',
        timeAgo: '',
        votes: 0,
        voteProgress: 0,
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuARFGmffWnMbQhQnqL_idGl_J4KQi92_j9Obi2mHSsj1ysUBAYNWp-QZaWZPa9yQTHaIEkuydxbs116a8TRco7c-7ii0xfBW2Pz4DA05EjrdBkobBCcmKPB0KqcRXH8_5nn5rTvlTcCM1bYeNXM-U8x0iXaVBE0UDZLe_HDQwYFMSVjfS-VwD73D4NlG5i5jDPPjzkShiCImT6yrLCtC8nJkWcS2vyQFQgz-OSXOYvarBYX266WLtvMc4CdpeuPYsiVagkvof3SPIM',
        date: '١٠ مارس ٢٠٢٤',
    },
    {
        id: 3,
        category: 'تجارة إلكترونية',
        budget: '100$',
        title: 'نظام الاشتراك في الخضروات العضوية',
        description:
            'منصة بسيطة لربط صغار المزارعين بسكان المجمعات السكنية عبر اشتراكات أسبوعية مسبقة الدفع.',
        authorName: 'خالد سعيد',
        authorInitial: 'خ',
        timeAgo: '',
        votes: 0,
        voteProgress: 0,
        isWinner: true,
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBvYNmn5AI7BhFaLQQDWujxCBIJErRYuKSJvLZfkoMC7eB4K0H7zT7WmU0loVmiTQnk3ZeTF-HAlnd2A0K9-yjNq_5XdX8ZkGxckKPg0ARXrJXyfa4sVkoAGOOtV88tGaarzKhlRAOBcsULkohzsm4LAMuR_2lix6UXWx_7ROvxYizxw4owhbdNccgRKtbFydR0FfBHJ_HiAX605L7MnCwqcmDW80R0HBAH9UgsjmARnyZHxlp1YHBTWAt_Y_gAIN9JxcQ5P6ROBXI',
        date: '٠٥ مارس ٢٠٢٤',
    },
    {
        id: 4,
        category: 'محتوى إبداعي',
        budget: '65$',
        title: 'منصة لبيع المؤثرات الصوتية العربية',
        description:
            'مكتبة رقمية توفر مؤثرات صوتية وبيئية مسجلة من الواقع العربي لاستخدامها في البودكاست والأفلام.',
        authorName: 'منى علي',
        authorInitial: 'م',
        timeAgo: '',
        votes: 0,
        voteProgress: 0,
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDj_vlgZFSH8Clj-0hlr02OVFxqUtisFxNjiLGz6xfMvIAb8SJwmaZZ4-cYGxBFkm1KUkNY4hj3Yi2ggK6uc4HWs8FVFhR9pIurkOFmk8swBHgYSz33CIWwxh8i46fukKN6GWY5_8HKj3srPE0zMI0JocKZUDs_y59eURDAV2R-EVcjmz_eaHwWDb8tLwICE4uZXqLru_y6czqgYP7cM3aKzhQdVBDMJ4LcoqEFnV8KvOWWWVdRddMkwj-voHArM3ON2jKqn-zPEIE',
        date: '٠٢ مارس ٢٠٢٤',
    },
    {
        id: 5,
        category: 'تنسيق حدائق',
        budget: '80$',
        title: 'صناديق الزراعة المنزلية الذكية',
        description:
            'تصنيع صناديق خشبية مجهزة بتربة عضوية وبذور نادرة للأشخاص الراغبين في بدء حديقتهم في الشرفات الصغيرة.',
        authorName: 'ياسر فهد',
        authorInitial: 'ي',
        timeAgo: '',
        votes: 0,
        voteProgress: 0,
        isWinner: true,
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBrlFQ2ifDe5-Am_bXAN3u4X2T1vFkeinQ8EHUm7-scBVmj2bIum3hUgKpcPI4xqO9-BeWHbxjJCM_j3Kd2d4a11EaioX_esbWV1iuCVDRqJNdSSln9UPzaCpie6Z0nZhEL2OeQJVcRh_7a80EI5Cdy02TvFvw06CjBMYY6x2ig0xZFn5u2Oy629uCjIn007z6m2ZGWivtUe3z01FOgvQXKq584yG9iXsTqe1IJdK3kt7a_69f3xNV0SOEjmJNdHYBi0lhc83RbCzs',
        date: '٢٨ فبراير ٢٠٢٤',
    },
    {
        id: 6,
        category: 'إعادة تدوير',
        budget: '35$',
        title: 'تحويل البلاستيك إلى ديكورات مكتبية',
        description:
            'استخدام تقنيات الصهر البسيطة لتحويل الأغطية البلاستيكية الملونة إلى حوامل أقلام وأدوات مكتبية فنية.',
        authorName: 'ليلى سامي',
        authorInitial: 'ل',
        timeAgo: '',
        votes: 0,
        voteProgress: 0,
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAgvEM-Ot4199hbEP41RHL54RMUEDB0TX2v9rkm2Qe3x7cOfDDhxtVtd8yIwapZDhEwlKpQq2gInRfr5MZ-yLXffTvjYeiZOt9gE5O3y-udpRFfnedAlMRuyrmdpwOedoQ6ZeZC__UHoY4EoQ4G-lBfzy-phiNx1o6btFyt6LNi7JNDcWMEYQ6_TAKbbye3Bg78yysk32fuRhZp-evKKdSKP1SRa11rUT_1_L15_mhZvEhYCVr0uXeUeWBg8_q2fZxPzQM9bD5hBn0',
        date: '٢٥ فبراير ٢٠٢٤',
    },
];

const paginationPages = [1, 2, 3, 12];

export default function Archive() {
    const { __ } = useLang();

    return (
        <AppLayout activeRoute="/archive">
            <Head title={__('messages.nav.archive')} />

            <header className="relative mb-8 h-[250px] w-full overflow-hidden md:h-[320px]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYJIXHhzvWUAYG3UbBV4YWSs9_TjTwPATiiFM6b4eZgtWu4Qz79GIoS3lRB0GNcdffoKtJqmkT-2YWyvDM-MpjyqujFb-LBsqRqbjA1YlRDnXCDfjIjmGlS8ElgbR-6qZTkkGAf2S-97DlJeUF91nupHwhfPDiypG0ft833vmyPhWQvEWZo6Dn-KW_RyP_qb-qFLT5l3_lBTsD05wms2KR3nm3rUaHqcxEx3WHiFO2mzrPn1ywDEl3Ig-o9EZeFUB6WK2PDeYMGng')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/70 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    <div className="mb-4 rounded-full bg-primary/90 px-4 py-1 text-[10px] font-bold tracking-widest text-on-primary uppercase shadow-xl">
                        {__('messages.archive.hero_badge')}
                    </div>
                    <h1 className="mb-4 font-headline text-3xl leading-tight font-extrabold text-white md:text-4xl">
                        {__('messages.archive.hero_title')}{' '}
                        <span className="text-inverse-primary dark:text-primary">
                            {__('messages.archive.golden')}
                        </span>
                    </h1>
                    <p className="max-w-2xl text-base leading-relaxed text-white/80">
                        {__('messages.archive.hero_desc')}
                    </p>
                </div>
            </header>

            <div className="mx-auto flex max-w-7xl flex-col px-4 pb-12 sm:px-6">
                <div className="relative z-10 mx-auto -mt-16 mb-10 w-full max-w-2xl">
                    <div className="pointer-events-none absolute inset-y-0 end-4 flex items-center">
                        <span className="material-symbols-outlined text-outline">
                            search
                        </span>
                    </div>
                    <input
                        className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-lowest py-5 ps-6 pe-12 text-lg shadow-xl transition-all focus:bg-white focus:ring-2 focus:ring-primary dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-surface-container-lowest dark:border-white dark:border-2"
                        placeholder={__('messages.archive.search_placeholder')}
                        type="text"
                    />
                </div>

                <div className="mb-8 w-full">
                    <div className="-mx-4 flex items-start gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-row sm:flex-wrap sm:items-center sm:overflow-visible sm:px-0 sm:pb-0">
                        <div className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-surface-container-low px-4 py-2 transition-colors hover:bg-surface-container-high">
                            <span className="material-symbols-outlined text-primary transition-transform group-hover:scale-110">
                                category
                            </span>
                            <select className="border-0 bg-transparent pe-8 text-sm font-medium focus:ring-0 dark:text-on-surface">
                                <option className="dark:bg-surface-container-low">
                                    {__('messages.archive.all_fields')}
                                </option>
                                <option className="dark:bg-surface-container-low">
                                    تجارة إلكترونية
                                </option>
                                <option className="dark:bg-surface-container-low">
                                    خدمات رقمية
                                </option>
                                <option className="dark:bg-surface-container-low">
                                    صناعة يدوية
                                </option>
                            </select>
                        </div>
                        <div className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-surface-container-low px-4 py-2 transition-colors hover:bg-surface-container-high">
                            <span className="material-symbols-outlined text-primary transition-transform group-hover:scale-110">
                                calendar_today
                            </span>
                            <select className="border-0 bg-transparent pe-8 text-sm font-medium focus:ring-0 dark:text-on-surface">
                                <option className="dark:bg-surface-container-low">
                                    {__('messages.archive.today')}
                                </option>
                                <option className="dark:bg-surface-container-low">
                                    {__('messages.archive.yesterday')}
                                </option>
                                <option className="dark:bg-surface-container-low">
                                    {__('messages.archive.this_week')}
                                </option>
                            </select>
                        </div>
                        <div className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-surface-container-low px-4 py-2 transition-colors hover:bg-surface-container-high">
                            <span className="material-symbols-outlined text-primary transition-transform group-hover:scale-110">
                                event_note
                            </span>
                            <select className="border-0 bg-transparent pe-8 text-sm font-medium focus:ring-0 dark:text-on-surface">
                                <option className="dark:bg-surface-container-low">
                                    {__('messages.archive.all_months')}
                                </option>
                                <option className="dark:bg-surface-container-low">
                                    يناير
                                </option>
                                <option className="dark:bg-surface-container-low">
                                    فبراير
                                </option>
                                <option className="dark:bg-surface-container-low">
                                    مارس
                                </option>
                            </select>
                        </div>
                        <div className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-surface-container-low px-4 py-2 transition-colors hover:bg-surface-container-high">
                            <span className="material-symbols-outlined text-primary transition-transform group-hover:scale-110">
                                military_tech
                            </span>
                            <select className="border-0 bg-transparent pe-8 text-sm font-medium focus:ring-0 dark:text-on-surface">
                                <option className="dark:bg-surface-container-low">
                                    {__('messages.archive.all_statuses')}
                                </option>
                                <option className="dark:bg-surface-container-low">
                                    {__('messages.archive.winner_status')}
                                </option>
                                <option className="dark:bg-surface-container-low">
                                    {__('messages.archive.non_winner_status')}
                                </option>
                            </select>
                        </div>
                        <button className="ms-auto hidden shrink-0 items-center gap-1 text-sm font-bold text-primary hover:underline sm:flex">
                            <span className="material-symbols-outlined text-sm">
                                filter_list_off
                            </span>
                            {__('messages.archive.clear_filter')}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                    {archiveIdeas.map((idea) => (
                        <IdeaCard
                            key={idea.title}
                            variant="archive"
                            {...idea}
                        />
                    ))}
                </div>

                <div className="mt-16 flex items-center justify-center gap-4">
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant/30 text-outline transition-all hover:bg-primary hover:text-white">
                        <span className="material-symbols-outlined text-sm">
                            chevron_right
                        </span>
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-bold text-on-primary">
                        1
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:bg-surface-container-high dark:text-on-surface">
                        2
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:bg-surface-container-high dark:text-on-surface">
                        3
                    </button>
                    <span className="text-outline">...</span>
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:bg-surface-container-high dark:text-on-surface">
                        12
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant/30 text-outline transition-all hover:bg-primary hover:text-white">
                        <span className="material-symbols-outlined text-sm">
                            chevron_left
                        </span>
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
