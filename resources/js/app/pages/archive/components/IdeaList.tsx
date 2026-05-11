import { useLang } from '@erag/lang-sync-inertia/react';
import { Shapes } from 'lucide-react';
import { IdeaCard } from '@/app/components/idea-card';
import { Pagination } from '@/components/ui/pagination';
import type { Idea } from '@/types';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800';

type Props = {
    ideas: {
        data: Idea[];
        links: {
            first: string;
            last: string;
            prev: string | null;
            next: string | null;
        };
        meta: {
            current_page: number;
            from: number;
            last_page: number;
            links: {
                url: string | null;
                label: string;
                active: boolean;
            }[];
            path: string;
            per_page: number;
            to: number;
            total: number;
        };
    };
};

export default function IdeaList({ ideas }: Props) {
    const { __ } = useLang();

    if (!ideas || !ideas.data || ideas.data.length === 0) {
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
        <div className="space-y-10">
            <div>
                <div className="mb-4 text-sm font-medium text-outline">
                    {__('messages.archive.results_found').replace(':count', ideas.meta.total.toString())}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                    {ideas.data.map((idea) => (
                        <IdeaCard
                            key={idea.id}
                            id={idea.id}
                            variant="archive"
                            title={idea.title}
                            description={idea.description}
                            budget="100$"
                            category={idea.category}
                            categoryIcon={idea.category_icon || ''}
                            authorName={idea.user?.name || ''}
                            authorAvatar={idea.user?.avatar || ''}
                            votes={idea.votes_count}
                            isWinner={idea.is_winner}
                            imageUrl={idea.image || DEFAULT_IMAGE}
                            date={idea.date}
                            voteProgress={idea.progress}
                            timeAgo=""
                        />
                    ))}
                </div>
            </div>

            <div className="mt-12 flex justify-center border-t border-outline-variant/10 pt-10">
                <Pagination
                    links={ideas.meta.links}
                    only={['ideas', 'filters']}
                />
            </div>
        </div>
    );
}
