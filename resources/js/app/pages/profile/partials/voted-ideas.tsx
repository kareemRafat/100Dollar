import { useLang } from '@erag/lang-sync-inertia/react';
import { Link, usePage } from '@inertiajs/react';
import { Vote as VoteIcon, ArrowRight, User } from 'lucide-react';
import { memo } from 'react';
import { Pagination } from '@/components/ui/pagination';

type Idea = {
    id: number;
    title: string;
    category?: {
        name_en: string;
        name_ar: string;
    };
    user: {
        name: string;
    };
};

type Props = {
    ideas: {
        data: Idea[];
        links: any[];
        meta: any;
    };
};

function VotedIdeas({ ideas }: Props) {
    const { __ } = useLang();
    const { props: pageProps } = usePage();
    const locale = pageProps.locale as string;
    const isRtl = locale === 'ar';
    const items = Array.isArray(ideas) ? ideas : ideas?.data || [];

    // Standardized pagination data retrieval
    const meta = (ideas as any)?.meta;
    const links = meta?.links || (ideas as any)?.links || [];
    const lastPage = meta?.last_page || (ideas as any)?.last_page || 1;
    const total = meta?.total || (ideas as any)?.total || items.length;

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-outline-variant/20 bg-surface-container-lowest p-12 text-center dark:bg-surface-container-low">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <VoteIcon className="size-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-secondary dark:text-white">
                    {__('messages.profile.no_voted_ideas')}
                </h3>
                <p className="mb-6 max-w-sm text-on-surface-variant/60">
                    {__('messages.home.voting_chance_still')}
                </p>
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                >
                    {__('messages.ui.browse_full_archive')}
                    <ArrowRight className="size-4 rtl:rotate-180" />
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-secondary dark:text-white">
                {__('messages.profile.voted_ideas')} ({total})
            </h2>

            <div className="space-y-4">
                {items.map((idea) => (
                    <div
                        key={idea.id}
                        className="flex items-center justify-between gap-4 rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-4 transition-all hover:border-primary/20 hover:shadow-md dark:bg-surface-container-low"
                    >
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-bold text-secondary uppercase dark:bg-white/10 dark:text-white/60">
                                    {isRtl
                                        ? idea.category?.name_ar
                                        : idea.category?.name_en}
                                </span>
                            </div>
                            <h3 className="text-sm font-bold text-secondary group-hover:text-primary dark:text-white">
                                <Link href={`/ideas/${idea.id}`}>
                                    {idea.title}
                                </Link>
                            </h3>
                            <div className="flex items-center gap-1 text-[10px] text-on-surface-variant/60">
                                <User className="size-3" />
                                {idea.user?.name ||
                                    __('messages.home.anonymous')}
                            </div>
                        </div>

                        <Link
                            href={`/ideas/${idea.id}`}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high transition-colors hover:bg-primary/10 hover:text-primary dark:bg-white/5"
                        >
                            <ArrowRight className="size-5 rtl:rotate-180" />
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {lastPage > 1 && (
                <div className="mt-8">
                    <Pagination links={links} only={['votedIdeas']} />
                </div>
            )}
        </div>
    );
}

export default memo(VotedIdeas);
