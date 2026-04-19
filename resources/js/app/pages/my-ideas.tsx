import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/app/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const stats = [
    {
        label: 'إجمالي الأفكار',
        value: '12',
        unit: 'فكرة',
        icon: 'lightbulb',
    },
    {
        label: 'إجمالي الأصوات',
        value: '1,402',
        unit: 'صوت',
        icon: 'how_to_vote',
    },
    {
        label: 'الأفكار الفائزة',
        value: '03',
        unit: 'جوائز',
        icon: 'emoji_events',
    },
];

const ideas = [
    {
        id: 1,
        category: 'بيئة',
        title: 'مشروع إعادة تدوير البلاستيك في الأحياء السكنية',
        status: 'pending',
        statusLabel: 'قيد الانتظار',
        date: '12 مايو 2024',
        currentVotes: 142,
        targetVotes: 200,
        progress: 71,
    },
    {
        id: 2,
        category: 'تكنولوجيا',
        title: 'منصة رقمية لربط المزارعين المحليين بالمستهلكين',
        status: 'approved',
        statusLabel: 'مُعتمَدة',
        date: '28 أبريل 2024',
        currentVotes: 856,
        targetVotes: 1000,
        progress: 85,
    },
    {
        id: 3,
        category: 'التعليم',
        title: 'تطبيق "جسور" لتعليم لغة الإشارة بالذكاء الاصطناعي',
        status: 'winner',
        statusLabel: 'فائزة 🏆',
        date: '15 مارس 2024',
        currentVotes: 2410,
        targetVotes: null,
        progress: 100,
        funded: true,
    },
    {
        id: 4,
        category: 'الصحة',
        title: 'نظام ذكي لمراقبة استهلاك الأدوية لكبار السن',
        status: 'approved',
        statusLabel: 'مُعتمَدة',
        date: '02 فبراير 2024',
        currentVotes: 420,
        targetVotes: 500,
        progress: 84,
    },
];

export default function MyIdeas() {
    return (
        <AppLayout activeRoute="/my-ideas">
            <Head title="أفكاري" />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative flex h-[380px] items-center justify-center overflow-hidden bg-[#0F172A]">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
                        {/* You can add a background image here if needed */}
                    </div>
                    <div className="relative z-10 text-center">
                        <h1 className="mb-4 font-headline text-5xl font-extrabold tracking-tight text-white md:text-6xl">
                            أفكاري
                        </h1>
                        <p className="font-body mx-auto max-w-xl px-6 text-lg text-white/80">
                            أدر سجل ابتكاراتك وتابع رحلة تحول أفكارك إلى واقع ملموس في السجل الذهبي
                        </p>
                    </div>
                </section>

                {/* Main Content Area */}
                <div className="relative z-20 mx-auto -mt-16 max-w-7xl px-8 pb-20">
                    {/* Stats Row */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="group relative flex flex-col gap-2 overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-lg shadow-black/5 dark:bg-surface-container-low"
                            >
                                <div className="absolute -top-2 -right-2 h-16 w-16 bg-primary/5 blur-xl transition-colors group-hover:bg-primary/10 rounded-full"></div>
                                <div className="relative z-10 flex items-center justify-between">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined text-2xl">
                                            {stat.icon}
                                        </span>
                                    </div>
                                    <span className="text-xs font-bold text-on-surface-variant dark:text-slate-400">
                                        {stat.label}
                                    </span>
                                </div>
                                <div className="relative z-10 flex items-baseline gap-2">
                                    <span className="text-3xl font-extrabold tracking-tight text-on-surface dark:text-white">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs font-semibold text-on-surface-variant dark:text-slate-400">
                                        {stat.unit}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Filter & Search Section */}
                    <div className="mb-10 flex flex-col items-center justify-between gap-6 rounded-xl bg-surface-container-low p-6 md:flex-row dark:bg-surface-container-high">
                        <div className="relative w-full md:w-96">
                            <span className="material-symbols-outlined absolute top-1/2 right-4 -translate-y-1/2 text-on-surface-variant">
                                search
                            </span>
                            <Input
                                className="h-12 border-none bg-surface-container-lowest pr-12 pl-4 text-right focus:ring-1 focus:ring-primary dark:bg-surface-container-low"
                                placeholder="ابحث في أفكارك..."
                                dir="rtl"
                            />
                        </div>
                        <div className="no-scrollbar flex w-full gap-2 overflow-x-auto pb-2 md:w-auto md:pb-0">
                            <Button className="rounded-full px-6 font-bold" variant="default">
                                الكل
                            </Button>
                            <Button
                                className="rounded-full px-6 font-bold"
                                variant="secondary"
                            >
                                قيد الانتظار
                            </Button>
                            <Button
                                className="rounded-full px-6 font-bold"
                                variant="secondary"
                            >
                                مُعتمدة
                            </Button>
                            <Button
                                className="rounded-full px-6 font-bold"
                                variant="secondary"
                            >
                                فائزة
                            </Button>
                        </div>
                    </div>

                    {/* Ideas Grid */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {ideas.map((idea) => (
                            <div
                                key={idea.id}
                                className={`group flex h-full flex-col rounded-xl border p-8 transition-all duration-300 hover:shadow-xl ${
                                    idea.status === 'winner'
                                        ? 'relative overflow-hidden border-2 border-primary/20 bg-surface-container-lowest shadow-lg dark:bg-surface-container-low'
                                        : 'border-outline-variant/5 bg-surface-container-lowest dark:bg-surface-container-low'
                                }`}
                            >
                                {idea.status === 'winner' && (
                                    <div className="absolute top-0 left-0 h-24 w-24 rotate-45 -translate-x-12 -translate-y-12 bg-primary/10"></div>
                                )}
                                <div className="mb-6 flex items-start justify-between relative z-10">
                                    <span
                                        className={`rounded px-3 py-1 text-xs font-bold tracking-wider uppercase ${
                                            idea.status === 'winner'
                                                ? 'bg-primary/10 text-primary'
                                                : 'bg-surface-container-highest text-on-surface-variant dark:bg-white/10 dark:text-white/60'
                                        }`}
                                    >
                                        {idea.category}
                                    </span>
                                    <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                        <span className="material-symbols-outlined cursor-pointer text-on-surface-variant transition-colors hover:text-primary">
                                            edit
                                        </span>
                                        <span className="material-symbols-outlined cursor-pointer text-on-surface-variant transition-colors hover:text-red-500">
                                            delete
                                        </span>
                                    </div>
                                </div>
                                <h3 className="mb-4 text-right text-xl font-bold leading-tight text-on-surface dark:text-white">
                                    {idea.title}
                                </h3>
                                <div className="mb-6 flex items-center gap-2 relative z-10">
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                                            idea.status === 'pending'
                                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                : idea.status === 'approved'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-primary-fixed text-on-primary-fixed-variant'
                                        }`}
                                    >
                                        {(idea.status === 'pending' ||
                                            idea.status === 'approved') && (
                                            <span
                                                className={`ml-2 h-1.5 w-1.5 rounded-full ${
                                                    idea.status === 'pending'
                                                        ? 'bg-amber-500'
                                                        : 'bg-green-500'
                                                }`}
                                            ></span>
                                        )}
                                        {idea.statusLabel}
                                    </span>
                                    <span className="mr-auto text-xs text-on-surface-variant dark:text-slate-400">
                                        {idea.date}
                                    </span>
                                </div>
                                <div className="mt-auto relative z-10">
                                    <div className="mb-2 flex items-end justify-between">
                                        <span className="text-xs font-bold text-on-surface-variant dark:text-slate-400">
                                            {idea.status === 'winner'
                                                ? 'الأصوات النهائية'
                                                : 'الأصوات الحالية'}
                                        </span>
                                        <span className="text-sm font-bold text-primary">
                                            {idea.currentVotes.toLocaleString()}
                                            {idea.targetVotes && `/${idea.targetVotes}`}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high dark:bg-white/10">
                                        <div
                                            className="h-full bg-gradient-to-l from-primary to-primary-container"
                                            style={{ width: `${idea.progress}%` }}
                                        ></div>
                                    </div>
                                    {idea.funded && (
                                        <div className="mt-4 flex items-center justify-center gap-1 border-t border-outline-variant/10 pt-4 text-xs font-bold text-primary">
                                            <span className="material-symbols-outlined text-base">
                                                workspace_premium
                                            </span>
                                            تم تمويل المشروع بنجاح
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Add New Idea Placeholder */}
                        <Link
                            href="/ideas/create"
                            className="group flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-outline-variant/30 bg-surface/30 p-8 transition-colors hover:border-primary/50"
                        >
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant transition-all duration-300 group-hover:bg-primary-fixed group-hover:text-primary dark:bg-white/10">
                                <span className="material-symbols-outlined text-4xl">
                                    add_circle
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-on-surface-variant transition-colors group-hover:text-primary dark:text-slate-400">
                                شارك فكرة جديدة
                            </h3>
                            <p className="mt-2 px-4 text-center text-sm text-on-surface-variant dark:text-slate-400">
                                حول رؤيتك إلى مشروع حقيقي ونافس في المسابقات القادمة
                            </p>
                        </Link>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
