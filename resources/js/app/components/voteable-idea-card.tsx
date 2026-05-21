import { usePage } from '@inertiajs/react';
import { lazy, Suspense } from 'react';
import { useIdeaVote } from '@/app/hooks/use-idea-vote';
import { IdeaCard } from './idea-card';

const PinModal = lazy(() =>
    import('@/app/components/pin-modal').then((module) => ({
        default: module.PinModal,
    })),
);

type Props = {
    idea: any; // Using any for simplicity as it maps to Idea type
    isVoted?: boolean;
};

export function VoteableIdeaCard({ idea, isVoted }: Props) {
    const { auth } = usePage().props as any;
    const {
        votesCount,
        isPinModalOpen,
        isAutoSending,
        isBlocked,
        remainingSeconds,
        handleVoteClick,
        handleVoteSuccess,
        setIsPinModalOpen,
    } = useIdeaVote(idea.id, idea.votes_count);
    const targetVotes = Number(idea.target_votes ?? 0);
    const serverProgress = Number(idea.progress ?? 0);
    const voteProgress = idea.is_winner
        ? 100
        : targetVotes > 0
          ? Math.min(Math.round((votesCount / targetVotes) * 100), 100)
          : serverProgress;

    return (
        <>
            <IdeaCard
                id={idea.id}
                category={idea.category}
                categoryIcon={idea.category_icon}
                budget="100$"
                title={idea.title}
                description={idea.description}
                authorName={idea.user?.name || 'Anonymous'}
                timeAgo={idea.date}
                votes={votesCount}
                voteProgress={voteProgress}
                imageUrl={idea.image}
                onVote={handleVoteClick}
                isLoading={isAutoSending}
                blockedUntil={
                    isBlocked ? Date.now() + remainingSeconds * 1000 : null
                }
                remainingSeconds={remainingSeconds}
                isVoted={isVoted}
            />

            <Suspense fallback={null}>
                <PinModal
                    isOpen={isPinModalOpen}
                    onClose={() => setIsPinModalOpen(false)}
                    onSuccess={handleVoteSuccess}
                    ideaId={idea.id}
                    initialEmail={auth.user?.email}
                />
            </Suspense>
        </>
    );
}
