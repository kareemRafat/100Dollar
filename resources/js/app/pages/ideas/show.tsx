import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/app/layouts/app-layout';

type Idea = {
    id: number;
    title: string;
    category: string;
    description: string;
    authorName: string;
    authorLocation: string;
    votePercentage: number;
    totalVotes: number;
    imageUrl: string;
    features: { label: string; items: string[] }[];
    costs: { item: string; amount: string }[];
};

type Comment = {
    id: number;
    authorName: string;
    authorAvatar: string;
    authorBadge?: string;
    location: string;
    timeAgo: string;
    content: string;
    likes: number;
    isLiked: boolean;
};

type Props = {
    idea: Idea;
    comments: Comment[];
};

export default function IdeaShow({ idea, comments }: Props) {
    const circumference = 2 * Math.PI * 58;
    const dashOffset =
        circumference - (circumference * idea.votePercentage) / 100;

    return (
        <AppLayout>
            <Head title={idea.title} />

            <nav className="text-outline mx-auto flex max-w-7xl items-center gap-2 px-6 py-3 text-[10px]">
                <Link className="transition-colors hover:text-primary" href="/">
                    الرئيسية
                </Link>
                <span className="material-symbols-outlined text-[10px]">
                    chevron_left
                </span>
                <Link
                    className="transition-colors hover:text-primary"
                    href="/archive"
                >
                    الأرشيف
                </Link>
                <span className="material-symbols-outlined text-[10px]">
                    chevron_left
                </span>
                <span className="text-on-surface font-medium">
                    {idea.title}
                </span>
            </nav>

            <section className="relative mb-8 h-[320px] w-full overflow-hidden md:h-[380px]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${idea.imageUrl}')` }}
                />
                <div className="from-surface via-surface/60 absolute inset-0 bg-gradient-to-t to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    <div className="text-on-primary mb-3 rounded-full bg-primary/90 px-3 py-1 text-[10px] font-bold tracking-widest uppercase shadow-xl">
                        {idea.category}
                    </div>
                    <h1 className="font-headline text-on-surface mb-3 text-3xl leading-tight font-extrabold md:text-4xl">
                        {idea.title}
                    </h1>
                    <div className="border-outline-variant/10 text-on-surface flex items-center gap-2.5 rounded-full border bg-black/20 px-3.5 py-1.5 text-xs font-medium backdrop-blur-md">
                        <span>صاحب الفكرة: {idea.authorName}</span>
                        <span className="h-1 w-1 rounded-full bg-primary" />
                        <span>{idea.authorLocation}</span>
                    </div>
                </div>
            </section>

            <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 px-6 lg:grid-cols-12">
                <aside className="order-1 space-y-5 lg:order-2 lg:col-span-4">
                    <div className="ambient-shadow border-outline-variant/10 bg-surface-container-low rounded-xl border p-6">
                        <div className="mb-6 flex flex-col items-center text-center">
                            <div className="relative mb-5 flex h-28 w-28 items-center justify-center">
                                <svg className="h-full w-full -rotate-90 transform">
                                    <circle
                                        className="text-outline-variant/10"
                                        cx="56"
                                        cy="56"
                                        fill="transparent"
                                        r="52"
                                        stroke="currentColor"
                                        strokeWidth="6"
                                    />
                                    <circle
                                        className="text-primary"
                                        cx="56"
                                        cy="56"
                                        fill="transparent"
                                        r="52"
                                        stroke="currentColor"
                                        strokeDasharray={2 * Math.PI * 52}
                                        strokeDashoffset={2 * Math.PI * 52 - (2 * Math.PI * 52 * idea.votePercentage) / 100}
                                        strokeLinecap="round"
                                        strokeWidth="6"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-on-surface text-xl font-extrabold">
                                        {idea.votePercentage}%
                                    </span>
                                    <span className="text-outline text-[9px] font-bold tracking-wider uppercase">
                                        تأييد
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-on-surface mb-1.5 text-lg font-bold">
                                صوّت لهذه الفكرة
                            </h3>
                            <p className="text-outline text-xs leading-relaxed">
                                ساهم بصوتك لدعم صاحب الفكرة وزيادة فرص تحويلها
                                إلى واقع ملموس.
                            </p>
                        </div>
                        <button className="text-on-primary hover:bg-primary-container mb-3 w-full rounded-xl bg-primary py-3 text-base font-bold shadow-lg transition-all active:scale-[0.98]">
                            صوّت الآن
                        </button>
                        <p className="text-outline text-center text-[10px] font-medium">
                            إجمالي الأصوات: {idea.totalVotes.toLocaleString()}{' '}
                            صوت
                        </p>
                    </div>

                    <div className="border-outline-variant/10 bg-surface-container-low rounded-xl border p-5">
                        <p className="text-on-surface mb-3 text-center text-xs font-bold">
                            شارك الفكرة مع أصدقائك
                        </p>
                        <div className="flex items-center justify-between gap-2.5">
                            <button
                                className="border-outline-variant/10 bg-surface-container hover:bg-surface-container-high flex flex-1 items-center justify-center rounded-lg border p-2.5 transition-all"
                                type="button"
                            >
                                <span className="material-symbols-outlined text-on-surface-variant text-lg">
                                    share
                                </span>
                            </button>
                            <button
                                className="border-outline-variant/10 bg-surface-container hover:bg-surface-container-high flex flex-1 items-center justify-center rounded-lg border p-2.5 transition-all"
                                type="button"
                            >
                                <span className="material-symbols-outlined text-on-surface-variant text-lg">
                                    link
                                </span>
                            </button>
                            <button
                                className="border-outline-variant/10 bg-surface-container hover:bg-surface-container-high flex flex-1 items-center justify-center rounded-lg border p-2.5 transition-all"
                                type="button"
                            >
                                <span className="material-symbols-outlined text-on-surface-variant text-lg">
                                    content_copy
                                </span>
                            </button>
                        </div>
                    </div>
                </aside>

                <div className="order-2 space-y-10 lg:order-1 lg:col-span-8">
                    <section className="arabic-dynamic-padding border-outline-variant/10 bg-surface-container-low rounded-xl border p-6 lg:p-10">
                        <h2 className="text-on-surface mb-5 flex items-center gap-2.5 text-xl font-bold">
                            <span
                                className="material-symbols-outlined text-primary"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                lightbulb
                            </span>
                            حول الفكرة
                        </h2>
                        <p className="text-on-surface-variant mb-6 text-base leading-relaxed">
                            {idea.description}
                        </p>

                        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                            {idea.features.map((feature) => (
                                <div
                                    key={feature.label}
                                    className="border-outline-variant/10 bg-surface-container-lowest/50 rounded-xl border p-5"
                                >
                                    <h4 className="text-on-surface mb-3 flex items-center gap-2 font-bold">
                                        <span className="material-symbols-outlined text-primary">
                                            analytics
                                        </span>
                                        {feature.label}
                                    </h4>
                                    <ul className="text-on-surface-variant space-y-2.5 text-xs">
                                        {feature.items.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-center gap-2"
                                            >
                                                <span className="h-1 w-1 rounded-full bg-primary" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {idea.costs.length > 0 && (
                            <>
                                <h3 className="text-on-surface mb-5 flex items-center gap-2.5 text-lg font-bold">
                                    <span className="material-symbols-outlined text-primary">
                                        receipt_long
                                    </span>
                                    التكلفة الأساسية (100 دولار) تغطي:
                                </h3>
                                <div className="space-y-3">
                                    {idea.costs.map((cost) => (
                                        <div
                                            key={cost.item}
                                            className="bg-surface-container-lowest flex items-center justify-between rounded-lg border-r-4 border-primary p-3"
                                        >
                                            <span className="text-on-surface-variant font-medium text-xs">
                                                {cost.item}
                                            </span>
                                            <span className="font-bold text-primary text-sm">
                                                {cost.amount}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </section>

                    <section className="space-y-6" id="comments">
                        <div className="flex items-center justify-between">
                            <h2 className="text-on-surface text-xl font-bold">
                                التعليقات والمقترحات ({comments.length})
                            </h2>
                            <button
                                className="text-xs font-bold text-primary hover:underline"
                                type="button"
                            >
                                الأحدث أولاً
                            </button>
                        </div>

                        <div className="space-y-3">
                            {comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className={`bg-surface-container-low rounded-xl p-5 ${
                                        comment.isLiked
                                            ? 'border-r-4 border-primary/40'
                                            : 'border-outline-variant/10 border'
                                    }`}
                                >
                                    <div className="mb-3 flex items-start justify-between">
                                        <div className="flex gap-3">
                                            <div className="border-outline-variant/10 h-10 w-10 overflow-hidden rounded-full border-2 shadow-lg">
                                                <img
                                                    alt={comment.authorName}
                                                    className="h-full w-full object-cover"
                                                    src={comment.authorAvatar}
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-on-surface font-bold text-sm">
                                                        {comment.authorName}
                                                    </h4>
                                                    {comment.authorBadge && (
                                                        <span className="rounded-full border border-primary/30 bg-primary/20 px-1.5 py-0.5 text-[9px] text-primary">
                                                            {
                                                                comment.authorBadge
                                                            }
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-outline flex items-center gap-1.5 text-[10px]">
                                                    <span>
                                                        {comment.location}
                                                    </span>
                                                    <span>•</span>
                                                    <span>
                                                        {comment.timeAgo}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className={`flex items-center gap-1 ${
                                                comment.isLiked
                                                    ? 'text-primary'
                                                    : 'text-outline hover:text-primary'
                                            } transition-colors`}
                                            type="button"
                                        >
                                            <span
                                                className="material-symbols-outlined text-lg"
                                                style={
                                                    comment.isLiked
                                                        ? {
                                                              fontVariationSettings:
                                                                  "'FILL' 1",
                                                          }
                                                        : undefined
                                                }
                                            >
                                                favorite
                                            </span>
                                            <span className="text-[10px] font-bold">
                                                {comment.likes}
                                            </span>
                                        </button>
                                    </div>
                                    <p className="text-on-surface-variant text-xs leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="border-outline-variant/10 bg-surface-container-low rounded-xl border p-5 shadow-lg">
                            <div className="flex items-start gap-3">
                                <div className="border-outline-variant/10 bg-surface-container-high flex h-9 w-9 shrink-0 items-center justify-center rounded-full border">
                                    <span className="material-symbols-outlined text-on-surface-variant text-lg">
                                        person
                                    </span>
                                </div>
                                <div className="flex-1 space-y-3">
                                    <textarea
                                        className="border-outline-variant/5 bg-surface text-on-surface placeholder-outline h-20 w-full resize-none rounded-xl border p-3 text-xs focus:ring-1 focus:ring-primary"
                                        dir="rtl"
                                        placeholder="أضف تعليقك أو مقترحك لتطوير الفكرة..."
                                    />
                                    <div className="flex justify-end">
                                        <button
                                            className="text-on-primary hover:bg-primary-container rounded-xl bg-primary px-6 py-2 text-xs font-bold shadow-lg transition-all active:scale-95"
                                            type="button"
                                        >
                                            إرسال
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
