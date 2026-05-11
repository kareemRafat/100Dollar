import { useLang } from '@erag/lang-sync-inertia/react';
import { WhenVisible, InfiniteScroll } from '@inertiajs/react';
import { IdeaCard } from '@/app/components/idea-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Shapes } from 'lucide-react';

type Idea = {
    id: number;
    title: string;
    description: string;
    budget: string;
    category: string;
    category_icon: string;
    user: {
        name: string;
        avatar: string;
    };
    is_winner: boolean;
    votes_count: number;
    date: string;
    image?: string;
    progress: number;
};

type Props = {
    ideas: {
        data: Idea[];
        links: any;
        meta: any;
    } | null;
    locale: string;
};

function IdeaSkeleton() {
    return (
        <div className="flex flex-col gap-4 p-5 rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-sm">
            <Skeleton className="h-40 w-full rounded-lg" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    );
}

export function IdeaList({ ideas, locale }: Props) {
    const { __ } = useLang();

    return (
        <WhenVisible 
            data="ideas" 
            fallback={
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => <IdeaSkeleton key={i} />)}
                </div>
            }
        >
            {() => {
                if (!ideas || ideas.data.length === 0) {
                    return (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="mb-4 rounded-full bg-surface-container-high p-6">
                                <Shapes className="size-12 text-outline" />
                            </div>
                            <h3 className="text-xl font-bold text-on-surface">
                                {__('messages.archive.no_results_title')}
                            </h3>
                            <p className="text-on-surface-variant">
                                {__('messages.archive.no_results_desc')}
                            </p>
                        </div>
                    );
                }

                return (
                    <>
                        <div className="mb-4 text-sm font-medium text-outline">
                            {__('messages.archive.results_found', { count: ideas.meta?.total ?? ideas.data.length })}
                        </div>
                        <InfiniteScroll 
                            data="ideas"
                            className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
                        >
                            {ideas.data.map((idea) => (
                                <IdeaCard
                                    key={idea.id}
                                    id={idea.id}
                                    variant="archive"
                                    title={idea.title}
                                    description={idea.description}
                                    budget="100$"
                                    category={idea.category}
                                    categoryIcon={idea.category_icon}
                                    authorName={idea.user.name}
                                    authorAvatar={idea.user.avatar}
                                    votes={idea.votes_count}
                                    isWinner={idea.is_winner}
                                    imageUrl={idea.image}
                                    date={idea.date}
                                    voteProgress={idea.progress}
                                    timeAgo="" 
                                />
                            ))}
                        </InfiniteScroll>
                    </>
                );
            }}
        </WhenVisible>
    );
}
