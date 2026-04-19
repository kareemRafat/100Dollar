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

            <nav className="text-outline mx-auto flex max-w-7xl items-center gap-2 px-6 py-4 text-sm">
                <Link className="transition-colors hover:text-primary" href="/">
                    الرئيسية
                </Link>
                <span className="material-symbols-outlined text-xs">
                    chevron_left
                </span>
                <Link
                    className="transition-colors hover:text-primary"
                    href="/archive"
                >
                    الأرشيف
                </Link>
                <span className="material-symbols-outlined text-xs">
                    chevron_left
                </span>
                <span className="text-on-surface font-medium">
                    {idea.title}
                </span>
            </nav>

            <section className="relative mb-12 h-[400px] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${idea.imageUrl}')` }}
                />
                <div className="from-surface via-surface/60 absolute inset-0 bg-gradient-to-t to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    <div className="text-on-primary mb-4 rounded-full bg-primary/90 px-4 py-1 text-xs font-bold tracking-widest uppercase shadow-xl">
                        {idea.category}
                    </div>
                    <h1 className="font-headline text-on-surface mb-4 text-4xl leading-tight font-extrabold md:text-5xl">
                        {idea.title}
                    </h1>
                    <div className="border-outline-variant/10 text-on-surface flex items-center gap-3 rounded-full border bg-black/20 px-4 py-2 font-medium backdrop-blur-md">
                        <span>صاحب الفكرة: {idea.authorName}</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{idea.authorLocation}</span>
                    </div>
                </div>
            </section>

            <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-6 lg:grid-cols-12">
                <aside className="order-1 space-y-6 lg:order-2 lg:col-span-4">
                    <div className="ambient-shadow border-outline-variant/10 bg-surface-container-low rounded-xl border p-8">
                        <div className="mb-8 flex flex-col items-center text-center">
                            <div className="relative mb-6 flex h-32 w-32 items-center justify-center">
                                <svg className="h-full w-full -rotate-90 transform">
                                    <circle
                                        className="text-outline-variant/10"
                                        cx="64"
                                        cy="64"
                                        fill="transparent"
                                        r="58"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                    />
                                    <circle
                                        className="text-primary"
                                        cx="64"
                                        cy="64"
                                        fill="transparent"
                                        r="58"
                                        stroke="currentColor"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={dashOffset}
                                        strokeLinecap="round"
                                        strokeWidth="8"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-on-surface text-2xl font-extrabold">
                                        {idea.votePercentage}%
                                    </span>
                                    <span className="text-outline text-[10px] font-bold tracking-wider uppercase">
                                        تأييد
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-on-surface mb-2 text-xl font-bold">
                                صوّت لهذه الفكرة
                            </h3>
                            <p className="text-outline text-sm leading-relaxed">
                                ساهم بصوتك لدعم صاحب الفكرة وزيادة فرص تحويلها
                                إلى واقع ملموس.
                            </p>
                        </div>
                        <button className="text-on-primary hover:bg-primary-container mb-4 w-full rounded-xl bg-primary py-4 text-lg font-bold shadow-lg transition-all active:scale-[0.98]">
                            صوّت الآن
                        </button>
                        <p className="text-outline text-center text-[11px] font-medium">
                            إجمالي الأصوات: {idea.totalVotes.toLocaleString()}{' '}
                            صوت
                        </p>
                    </div>

                    <div className="border-outline-variant/10 bg-surface-container-low rounded-xl border p-6">
                        <p className="text-on-surface mb-4 text-center text-sm font-bold">
                            شارك الفكرة مع أصدقائك
                        </p>
                        <div className="flex items-center justify-between gap-3">
                            <button
                                className="border-outline-variant/10 bg-surface-container hover:bg-surface-container-high flex flex-1 items-center justify-center rounded-lg border p-3 transition-all"
                                type="button"
                            >
                                <span className="material-symbols-outlined text-on-surface-variant">
                                    share
                                </span>
                            </button>
                            <button
                                className="border-outline-variant/10 bg-surface-container hover:bg-surface-container-high flex flex-1 items-center justify-center rounded-lg border p-3 transition-all"
                                type="button"
                            >
                                <span className="material-symbols-outlined text-on-surface-variant">
                                    link
                                </span>
                            </button>
                            <button
                                className="border-outline-variant/10 bg-surface-container hover:bg-surface-container-high flex flex-1 items-center justify-center rounded-lg border p-3 transition-all"
                                type="button"
                            >
                                <span className="material-symbols-outlined text-on-surface-variant">
                                    content_copy
                                </span>
                            </button>
                        </div>
                    </div>
                </aside>

                <div className="order-2 space-y-12 lg:order-1 lg:col-span-8">
                    <section className="arabic-dynamic-padding border-outline-variant/10 bg-surface-container-low rounded-xl border p-8 lg:p-12">
                        <h2 className="text-on-surface mb-6 flex items-center gap-3 text-2xl font-bold">
                            <span
                                className="material-symbols-outlined text-primary"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                lightbulb
                            </span>
                            حول الفكرة
                        </h2>
                        <p className="text-on-surface-variant mb-8 text-lg leading-relaxed">
                            {idea.description}
                        </p>

                        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                            {idea.features.map((feature) => (
                                <div
                                    key={feature.label}
                                    className="border-outline-variant/10 bg-surface-container-lowest/50 rounded-xl border p-6"
                                >
                                    <h4 className="text-on-surface mb-4 flex items-center gap-2 font-bold">
                                        <span className="material-symbols-outlined text-primary">
                                            analytics
                                        </span>
                                        {feature.label}
                                    </h4>
                                    <ul className="text-on-surface-variant space-y-3 text-sm">
                                        {feature.items.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-center gap-2"
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {idea.costs.length > 0 && (
                            <>
                                <h3 className="text-on-surface mb-6 flex items-center gap-3 text-xl font-bold">
                                    <span className="material-symbols-outlined text-primary">
                                        receipt_long
                                    </span>
                                    التكلفة الأساسية (100 دولار) تغطي:
                                </h3>
                                <div className="space-y-4">
                                    {idea.costs.map((cost) => (
                                        <div
                                            key={cost.item}
                                            className="bg-surface-container-lowest flex items-center justify-between rounded-lg border-r-4 border-primary p-4"
                                        >
                                            <span className="text-on-surface-variant font-medium">
                                                {cost.item}
                                            </span>
                                            <span className="font-bold text-primary">
                                                {cost.amount}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </section>

                    <section className="space-y-8" id="comments">
                        <div className="flex items-center justify-between">
                            <h2 className="text-on-surface text-2xl font-bold">
                                التعليقات والمقترحات ({comments.length})
                            </h2>
                            <button
                                className="text-sm font-bold text-primary hover:underline"
                                type="button"
                            >
                                الأحدث أولاً
                            </button>
                        </div>

                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className={`bg-surface-container-low rounded-xl p-6 ${
                                        comment.isLiked
                                            ? 'border-r-4 border-primary/40'
                                            : 'border-outline-variant/10 border'
                                    }`}
                                >
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex gap-4">
                                            <div className="border-outline-variant/10 h-12 w-12 overflow-hidden rounded-full border-2 shadow-lg">
                                                <img
                                                    alt={comment.authorName}
                                                    className="h-full w-full object-cover"
                                                    src={comment.authorAvatar}
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-on-surface font-bold">
                                                        {comment.authorName}
                                                    </h4>
                                                    {comment.authorBadge && (
                                                        <span className="rounded-full border border-primary/30 bg-primary/20 px-2 py-0.5 text-[10px] text-primary">
                                                            {
                                                                comment.authorBadge
                                                            }
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-outline flex items-center gap-2 text-xs">
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
                                                className="material-symbols-outlined text-xl"
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
                                            <span className="text-xs font-bold">
                                                {comment.likes}
                                            </span>
                                        </button>
                                    </div>
                                    <p className="text-on-surface-variant text-sm leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="border-outline-variant/10 bg-surface-container-low rounded-xl border p-6 shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="border-outline-variant/10 bg-surface-container-high flex h-10 w-10 shrink-0 items-center justify-center rounded-full border">
                                    <span className="material-symbols-outlined text-on-surface-variant">
                                        person
                                    </span>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <textarea
                                        className="border-outline-variant/5 bg-surface text-on-surface placeholder-outline h-24 w-full resize-none rounded-xl border p-4 text-sm focus:ring-1 focus:ring-primary"
                                        dir="rtl"
                                        placeholder="أضف تعليقك أو مقترحك لتطوير الفكرة..."
                                    />
                                    <div className="flex justify-end">
                                        <button
                                            className="text-on-primary hover:bg-primary-container rounded-xl bg-primary px-8 py-2.5 font-bold shadow-lg transition-all active:scale-95"
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
