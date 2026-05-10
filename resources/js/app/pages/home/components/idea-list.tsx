import { useLang } from '@erag/lang-sync-inertia/react';
import { InfiniteScroll } from '@inertiajs/react';
import { Loader2, Lightbulb } from 'lucide-react';
import { VoteableIdeaCard } from '@/app/components/voteable-idea-card';
import { Button } from '@/app/components/ui/button';
import type { Idea, Paginated } from '@/types';

interface Props {
    ideas: Paginated<Idea>;
    votedIdeaId: number | null;
}

export default function IdeaList({ ideas, votedIdeaId }: Props) {
    const { __ } = useLang();

    if (!ideas) {
        return null;
    }

    const ideasData = ideas?.data || [];

    if (ideasData.length === 0) {
        return (
            <div className="mx-auto mb-20 flex max-w-7xl flex-col items-center justify-center rounded-3xl border-2 border-dashed border-outline-variant/30 py-20 px-6 text-center">
                <Lightbulb className="size-16 text-outline-variant" />
                <h3 className="mt-4 text-xl font-bold text-on-surface dark:text-white">
                    {__('messages.home.no_ideas_yet')}
                </h3>
                <p className="mt-2 text-on-surface-variant">
                    {__('messages.home.be_the_first')}
                </p>
            </div>
        );
    }

    return (
        <section className="mx-auto mb-20 max-w-7xl px-6">
            <InfiniteScroll
                data="ideas"
                manual
                next={({ loading, fetch, hasMore }) => (
                    <div className="mt-12 flex justify-center">
                        {hasMore && (
                            <Button
                                onClick={fetch}
                                disabled={loading}
                                variant="outline"
                                className="h-12 rounded-xl border-primary/20 bg-surface-container-low px-8 font-bold text-primary transition-all hover:bg-primary hover:text-white"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="me-2 h-4 w-4 animate-spin" />
                                        {__('messages.ui.loading')}
                                    </>
                                ) : (
                                    __('messages.ui.read_more')
                                )}
                            </Button>
                        )}
                    </div>
                )}
            >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {ideasData.map((idea, index) => (
                        idea && (
                            <VoteableIdeaCard
                                key={`${idea.id}-${index}`}
                                idea={idea}
                                isVoted={votedIdeaId === idea.id}
                            />
                        )
                    ))}
                </div>
            </InfiniteScroll>
        </section>
    );
}
