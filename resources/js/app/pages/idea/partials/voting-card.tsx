import { useLang } from '@erag/lang-sync-inertia/react';
import { usePage } from '@inertiajs/react';
import { Clock, Hourglass, Loader2, Award, ThumbsUp } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { formatDuration } from '@/lib/utils';
import type { Idea } from '@/types';

interface VotingCardProps {
    idea: Idea & {
        votes_count: number;
        target_votes?: number;
        progress?: number;
    };
    onVoteClick: () => void;
    isLoading?: boolean;
    isBlocked?: boolean;
    isOwner?: boolean;
    remainingSeconds?: number;
    isVoted?: boolean;
}

export const VotingCard = ({
    idea,
    onVoteClick,
    isLoading = false,
    isBlocked = false,
    isOwner = false,
    remainingSeconds = 0,
    isVoted = false,
}: VotingCardProps) => {
    const { __ } = useLang();
    const { locale } = usePage().props as any;

    // Data Sync
    const targetVotes = Number(idea?.target_votes ?? 0);
    const serverProgress = Number(idea?.progress ?? 0);
    const currentVotes = idea?.votes_count ?? 0;

    const votePercentage = idea?.is_winner
        ? 100
        : targetVotes > 0
          ? Math.min(Math.round((currentVotes / targetVotes) * 100), 100)
          : serverProgress;

    // Circular Progress Calculation
    const r = 72;
    const circumference = 2 * Math.PI * r; // ~452.39
    const strokeDashoffset =
        circumference - (votePercentage / 100) * circumference;

    return (
        <div
            className={`group relative overflow-hidden rounded-3xl border bg-surface-container-lowest p-8 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] transition-all ${
                isVoted ? 'border-primary' : 'border-outline-variant/10'
            }`}
        >
            {isVoted && (
                <div className="absolute end-0 top-0 z-20">
                    <div className="rounded-bs-2xl bg-primary px-4 py-1.5 text-[10px] font-black tracking-widest text-on-primary uppercase shadow-lg">
                        {__('messages.home.voted_badge')}
                    </div>
                </div>
            )}

            {/* Ambient Background Glow */}
            <div
                className={`absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl transition-colors duration-700 ${
                    isVoted
                        ? 'bg-primary/10'
                        : 'bg-primary/5 group-hover:bg-primary/10'
                }`}
            />

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* High-Fidelity Circular Progress */}
                <div className="relative mb-8 flex h-40 w-40 items-center justify-center">
                    <svg className="h-full w-full -rotate-90 transform drop-shadow-sm filter">
                        <circle
                            className="text-surface-container-highest"
                            cx="80"
                            cy="80"
                            fill="transparent"
                            r={r}
                            stroke="currentColor"
                            strokeWidth="10"
                        />
                        <circle
                            className="text-primary transition-all duration-1000 ease-out"
                            cx="80"
                            cy="80"
                            fill="transparent"
                            r={r}
                            stroke="currentColor"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            strokeWidth="10"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl leading-none font-black text-on-surface">
                            {votePercentage}%
                        </span>
                        <span className="mt-1 text-[10px] font-bold tracking-widest text-outline uppercase">
                            {__('messages.home.community_support')}
                        </span>
                    </div>
                </div>

                <h3 className="mb-3 font-headline text-2xl font-black text-on-surface">
                    {__('messages.home.support_idea_question')}
                </h3>
                <p className="mb-8 px-4 text-sm leading-relaxed font-medium text-on-surface-variant/70">
                    {__('messages.home.support_idea_desc')}
                </p>

                {/* Enhanced Vote Button */}
                <Button
                    onClick={onVoteClick}
                    disabled={isVoted || isLoading || isBlocked || isOwner}
                    className={`mb-6 h-14 w-full gap-3 rounded-2xl text-lg font-black shadow-xl transition-all active:scale-[0.97] ${
                        isVoted
                            ? 'bg-primary text-on-primary opacity-100 shadow-primary/20'
                            : 'animate-sparkle cursor-pointer shadow-primary/10'
                    }`}
                >
                    {isLoading ? (
                        <Loader2 className="size-5 animate-spin" />
                    ) : isVoted ? (
                        <>
                            {__('messages.home.voted')}
                            <Award className="size-5" />
                        </>
                    ) : isOwner ? (
                        <span className="text-sm">
                            {__('messages.vote_pin.owner_cannot_vote')}
                        </span>
                    ) : isBlocked ? (
                        <span className="text-sm">
                            {formatDuration(remainingSeconds, locale)}
                        </span>
                    ) : (
                        <>
                            {__('messages.home.vote_now')}
                            <ThumbsUp className="size-5 text-primary-fixed" />
                        </>
                    )}
                </Button>

                {/* Voting Window Status */}
                {idea.voting_ends_at && (
                    <div className="mb-4 flex items-center justify-center gap-2 rounded-xl bg-surface-container-high px-4 py-2">
                        {new Date(idea.voting_ends_at) > new Date() ? (
                            <>
                                <Hourglass className="size-4 text-primary" />
                                <span className="text-xs font-bold text-on-surface-variant">
                                    {__('messages.home.voting_ends_in', {
                                        days: Math.max(
                                            0,
                                            Math.ceil(
                                                (new Date(idea.voting_ends_at).getTime() -
                                                    new Date().getTime()) /
                                                    (1000 * 60 * 60 * 24),
                                            ),
                                        ),
                                    })}
                                </span>
                            </>
                        ) : (
                            <>
                                <Clock className="size-4 text-outline" />
                                <span className="text-xs font-bold text-outline">
                                    {__('messages.home.voting_ended')}
                                </span>
                            </>
                        )}
                    </div>
                )}

                <div className="mb-2 flex items-center gap-3">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-6 w-6 rounded-full border-2 border-surface-container-lowest bg-surface-container-high"
                            />
                        ))}
                    </div>
                    <span className="text-[12px] font-medium text-outline">
                        {__('messages.home.people_voted', {
                            count: currentVotes.toLocaleString(),
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
};
