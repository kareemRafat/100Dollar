import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link } from '@inertiajs/react';
import { CountdownTimer } from '@/app/components/countdown-timer';
import { IdeaCard } from '@/app/components/idea-card';
import { ParticlesBackground } from '@/app/components/particles-background';
import { WinnerCard } from '@/app/components/winner-card';
import AppLayout from '@/app/layouts/app-layout';
import { usePage } from '@inertiajs/react';

const sampleIdeas = [
    {
        category: 'تجارة إلكترونية',
        budget: '100$',
        title: 'متجر لبيع النباتات المنزلية النادرة عبر واتساب',
        description:
            'فكرة تعتمد على شراء بذور نادرة واستنباتها في المنزل ثم تسويقها من خلال مجموعات الواتساب والفيسبوك المحلية.',
        authorName: 'أحمد العلي',
        timeAgo: 'منذ ساعتين',
        votes: 124,
        voteProgress: 65,
    },
    {
        category: 'خدمات منزلية',
        budget: '100$',
        title: 'صيانة وتركيب الفلاتر المنزلية بنظام الاشتراك',
        description:
            'توفير خدمة دورية لتغيير فلاتر المياه للمنازل بأسعار رمزية تضمن استمرارية الخدمة والربح البسيط.',
        authorName: 'سارة محمود',
        timeAgo: 'منذ 5 ساعات',
        votes: 89,
        voteProgress: 40,
    },
    {
        category: 'صناعات يدوية',
        budget: '100$',
        title: 'صناعة الشموع العطرية بتصاميم تراثية',
        description:
            'استخدام قوالب مستوحاة من العمارة التقليدية لإنتاج شموع فنية تباع كقطع ديكور وهدايا مميزة.',
        authorName: 'يوسف حسن',
        timeAgo: 'منذ 8 ساعات',
        votes: 210,
        voteProgress: 85,
    },
];

const sampleWinners = [
    {
        name: 'ليلى خالد',
        idea: 'إعادة تدوير الأقمشة لإنتاج حقائب تسوق صديقة للبيئة بتصاميم عصرية.',
        badge: 'فائزة الأمس',
    },
    {
        name: 'محمد رامي',
        idea: 'تطبيق لتنظيم المذاكرة التفاعلية للطلاب باستخدام تقنيات التحفيز.',
        badge: 'فائز الجمعة',
    },
    {
        name: 'نور الشامي',
        idea: 'صندوق الوجبات الصحية لطلبة المدارس بمكونات طبيعية وطازجة يومياً.',
        badge: 'فائزة الخميس',
    },
];

const weeklyTabs = [
    'السبت',
    'الأحد (اليوم)',
    'الاثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
];

const votingDeadline = new Date(
    Date.now() + 12 * 60 * 60 * 1000 + 45 * 60 * 1000 + 22 * 1000,
);

export default function Home() {
    const { __ } = useLang();
    const { auth } = usePage().props;

    const submitUrl = ! auth.user
        ? '/login'
        : auth.user.role === 'admin'
          ? '/admin'
          : '/ideas/create';

    const submitText =
        auth.user?.role === 'admin'
            ? __('messages.ui.dashboard')
            : __('messages.ui.submit_your_idea_now');

    return (
        <AppLayout activeRoute="/">
            <Head title={__('messages.welcome')} />

            <section className="airy-dots relative flex flex-col items-center overflow-hidden bg-surface py-20 text-center md:py-32">
                <ParticlesBackground />
                <div className="relative z-10 flex w-full flex-col items-center">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary-fixed px-4 py-2 text-sm font-semibold text-on-primary-fixed">
                        <span className="material-symbols-outlined text-sm">
                            rocket_launch
                        </span>
                        {__('messages.welcome')}
                    </div>
                    <h1 className="mb-8 max-w-4xl font-headline text-5xl leading-tight font-black text-on-surface md:text-7xl dark:text-white">
                        <span className="block">
                            {__('messages.home.hero_title')}{' '}
                        </span>
                        <span className="mx-2 inline-block -rotate-2 transform rounded-lg bg-primary px-4 py-1 text-white shadow-lg">
                            {__('messages.for_100')}
                        </span>
                    </h1>
                    <p className="mb-12 max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl dark:text-slate-300">
                        {__('messages.home.hero_desc')}
                    </p>
                    <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
                        <Link
                            href={submitUrl}
                            className="rounded-xl bg-primary px-10 py-5 text-center text-xl font-bold text-on-primary shadow-lg transition-all hover:translate-y-[-2px]"
                        >
                            {submitText}
                        </Link>
                        <Link
                            href="/how-it-works"
                            className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-10 py-5 text-center text-xl font-bold text-on-surface transition-all hover:bg-surface-container-high dark:text-white"
                        >
                            {__('messages.ui.how_it_works')}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-12">
                <div className="group relative flex items-center justify-between overflow-hidden rounded-2xl bg-secondary-fixed p-6 md:col-span-4">
                    <div className="relative z-10">
                        <p className="mb-1 text-xs font-semibold text-on-secondary-fixed-variant">
                            {__('messages.home.today_sponsor')}
                        </p>
                        <h3 className="mb-4 text-xl font-bold text-on-secondary-fixed">
                            {__('messages.home.sponsor_name_placeholder')}
                        </h3>
                        <div className="flex h-10 w-32 items-center justify-center rounded border border-on-secondary-fixed/20 bg-on-secondary-fixed/10 backdrop-blur-sm">
                            <span className="font-bold text-on-secondary-fixed opacity-50">
                                LOGO
                            </span>
                        </div>
                    </div>
                    <div className="absolute -end-4 -bottom-4 h-32 w-32 rounded-full bg-primary/20 blur-3xl transition-all group-hover:scale-150" />
                    <span className="material-symbols-outlined absolute end-8 top-1/2 -translate-y-1/2 scale-150 text-6xl text-on-secondary-fixed/10">
                        handshake
                    </span>
                </div>
                <div className="flex flex-col items-center justify-between rounded-2xl bg-surface-container-low p-6 md:col-span-8 md:flex-row">
                    <div className="mb-6 md:mb-0">
                        <h4 className="mb-2 font-headline text-lg font-bold text-on-surface dark:text-white">
                            {__('messages.home.voting_ends_in')}
                        </h4>
                        <p className="text-sm text-on-surface-variant dark:text-on-surface-variant">
                            {__('messages.home.voting_chance_still')}
                        </p>
                    </div>
                    <CountdownTimer targetDate={votingDeadline} />
                </div>
            </section>

            <section className="mx-auto mb-10 max-w-7xl px-6">
                <div className="no-scrollbar flex snap-x gap-2 overflow-x-auto pb-4">
                    {weeklyTabs.map((tab, i) => (
                        <button
                            key={tab}
                            className={`rounded-xl px-6 py-3 font-headline text-sm font-bold whitespace-nowrap ${i === 0 ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant transition-all hover:bg-surface-container-high dark:text-on-surface-variant'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </section>

            <section className="mx-auto mb-20 grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
                {sampleIdeas.map((idea) => (
                    <IdeaCard key={idea.title} {...idea} />
                ))}
            </section>

            <section className="mx-auto mb-20 max-w-7xl px-6">
                <div className="mb-10 flex flex-col items-end justify-between gap-4 border-e-4 border-primary pe-6 md:flex-row">
                    <div>
                        <h2 className="font-headline text-3xl font-black text-on-surface md:text-4xl dark:text-white">
                            {__('messages.ui.hall_of_fame')}
                        </h2>
                        <p className="mt-2 text-base text-on-surface-variant dark:text-on-surface-variant">
                            {__('messages.ui.hall_of_fame_desc')}
                        </p>
                    </div>
                    <Link
                        className="group flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-container"
                        href="/archive"
                    >
                        {__('messages.ui.browse_full_archive')}
                        <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">
                            arrow_back
                        </span>
                    </Link>
                </div>
                <div className="no-scrollbar flex snap-x gap-6 overflow-x-auto pb-10">
                    {sampleWinners.map((winner) => (
                        <WinnerCard key={winner.name} {...winner} />
                    ))}
                    <Link
                        href="/archive"
                        className="group flex w-72 flex-shrink-0 cursor-pointer snap-start flex-col items-center justify-center rounded-3xl border-2 border-dashed border-outline-variant/30 bg-surface-container-low p-6 text-center transition-colors hover:border-primary/50"
                    >
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-high transition-colors group-hover:bg-primary/10 dark:bg-surface-container-high">
                            <span className="material-symbols-outlined text-4xl text-on-surface-variant transition-colors group-hover:text-primary">
                                history
                            </span>
                        </div>
                        <p className="font-headline text-lg font-bold text-on-surface dark:text-white">
                            {__('messages.ui.full_archive')}
                        </p>
                        <p className="mt-2 text-xs text-on-surface-variant dark:text-on-surface-variant">
                            {__('messages.ui.full_archive_desc')}
                        </p>
                    </Link>
                </div>
            </section>
        </AppLayout>
    );
}
