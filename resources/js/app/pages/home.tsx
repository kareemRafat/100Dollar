import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/app/layouts/app-layout';
import { IdeaCard } from '@/app/components/old_app/idea-card';
import { WinnerCard } from '@/app/components/old_app/winner-card';
import { CountdownTimer } from '@/app/components/old_app/countdown-timer';
import { ParticlesBackground } from '@/app/components/old_app/particles-background';

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
    'الأحد (اليوم)',
    'الاثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
];

const votingDeadline = new Date(
    Date.now() + 12 * 60 * 60 * 1000 + 45 * 60 * 1000 + 22 * 1000,
);

export default function Home() {
    return (
        <AppLayout activeRoute="/">
            <Head title="أفكار بـ 100 دولار" />

            <section className="airy-dots relative flex flex-col items-center overflow-hidden bg-surface py-20 text-center md:py-32">
                <ParticlesBackground />
                <div className="relative z-10 flex w-full flex-col items-center">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary-fixed px-4 py-2 text-sm font-semibold text-on-primary-fixed">
                        <span className="material-symbols-outlined text-sm">
                            rocket_launch
                        </span>
                        فرصتك اليوم لتبدأ مشروعك الصغير
                    </div>
                    <h1 className="mb-8 max-w-4xl font-headline text-5xl leading-tight font-black text-on-surface dark:text-white md:text-7xl">
                        شارك فكرتك واربح{' '}
                        <span className="mx-2 inline-block -rotate-2 transform rounded-lg bg-primary px-4 py-1 text-white shadow-lg">
                            100 دولار
                        </span>
                    </h1>
                    <p className="mb-12 max-w-2xl text-lg leading-relaxed text-on-surface-variant dark:text-slate-300 md:text-xl">
                        منصة تهدف لدعم الأفكار والمشاريع الناشئة التي يمكن البدء
                        بها بميزانية بسيطة. صوّت لأفضل فكرة أو قدّم فكرتك الخاصة
                        للمنافسة.
                    </p>
                    <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
                        <Link
                            href="/submit-idea"
                            className="rounded-xl bg-primary px-10 py-5 text-center text-xl font-bold text-on-primary shadow-lg transition-all hover:translate-y-[-2px]"
                        >
                            قدّم فكرتك الآن
                        </Link>
                        <Link
                            href="/how-it-works"
                            className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-10 py-5 text-center text-xl font-bold text-on-surface dark:text-white transition-all hover:bg-surface-container-highest"
                        >
                            كيف نعمل؟
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto mb-20 grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-12">
                <div className="group relative flex items-center justify-between overflow-hidden rounded-2xl bg-secondary-fixed p-8 md:col-span-4">
                    <div className="relative z-10">
                        <p className="mb-1 text-sm font-semibold text-on-surface-variant dark:text-slate-400">
                            راعي جائزة اليوم
                        </p>
                        <h3 className="mb-4 text-2xl font-bold text-on-surface dark:text-white">
                            اسم الشركة الراعية
                        </h3>
                        <div className="flex h-10 w-32 items-center justify-center rounded border border-white/20 bg-white/40 backdrop-blur-sm">
                            <span className="font-bold text-on-surface dark:text-white opacity-50">
                                LOGO
                            </span>
                        </div>
                    </div>
                    <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-primary/20 blur-3xl transition-all group-hover:scale-150" />
                    <span className="material-symbols-outlined absolute top-1/2 left-8 -translate-y-1/2 scale-150 text-6xl text-on-surface dark:text-white/10">
                        handshake
                    </span>
                </div>
                <div className="flex flex-col items-center justify-between rounded-2xl bg-surface-container-low p-8 md:col-span-8 md:flex-row">
                    <div className="mb-6 md:mb-0">
                        <h4 className="mb-2 font-headline text-xl font-bold text-on-surface dark:text-white">
                            ينتهي التصويت الحالي خلال:
                        </h4>
                        <p className="text-on-surface-variant">
                            الفرصة ما زالت قائمة لدعم فكرتك المفضلة
                        </p>
                    </div>
                    <CountdownTimer targetDate={votingDeadline} />
                </div>
            </section>

            <section className="mx-auto mb-12 max-w-7xl px-6">
                <div className="no-scrollbar flex snap-x gap-2 overflow-x-auto pb-4">
                    {weeklyTabs.map((tab, i) => (
                        <button
                            key={tab}
                            className={`rounded-xl px-8 py-4 font-headline font-bold whitespace-nowrap ${i === 0 ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant transition-all hover:bg-surface-container-high'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </section>

            <section className="mx-auto mb-24 grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-2 lg:grid-cols-3">
                {sampleIdeas.map((idea) => (
                    <IdeaCard key={idea.title} {...idea} />
                ))}
            </section>

            <section className="mx-auto mb-24 max-w-7xl px-6">
                <div className="mb-12 flex flex-col items-end justify-between gap-4 border-r-4 border-primary pr-6 md:flex-row">
                    <div>
                        <h2 className="font-headline text-4xl font-black text-on-surface dark:text-white md:text-5xl">
                            قاعة المشاهير
                        </h2>
                        <p className="mt-2 text-lg text-on-surface-variant">
                            مبدعون حولوا أفكارهم إلى واقع بجائزة الـ 100 دولار
                        </p>
                    </div>
                    <Link
                        className="group flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary-container"
                        href="/archive"
                    >
                        تصفح الأرشيف الكامل
                        <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">
                            arrow_back
                        </span>
                    </Link>
                </div>
                <div className="no-scrollbar flex snap-x gap-8 overflow-x-auto pb-10">
                    {sampleWinners.map((winner) => (
                        <WinnerCard key={winner.name} {...winner} />
                    ))}
                    <Link
                        href="/archive"
                        className="group flex w-80 flex-shrink-0 cursor-pointer snap-start flex-col items-center justify-center rounded-3xl border-2 border-dashed border-outline-variant/30 bg-surface-container-low p-8 text-center transition-colors hover:border-primary/50"
                    >
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-surface-container-high transition-colors group-hover:bg-primary/10">
                            <span className="material-symbols-outlined text-5xl text-on-surface-variant transition-colors group-hover:text-primary">
                                history
                            </span>
                        </div>
                        <p className="font-headline text-xl font-bold text-on-surface dark:text-white">
                            الأرشيف الكامل
                        </p>
                        <p className="mt-2 text-sm text-on-surface-variant">
                            استعرض جميع الفائزين السابقين منذ انطلاق المنصة
                        </p>
                    </Link>
                </div>
            </section>
        </AppLayout>
    );
}
