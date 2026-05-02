import { useLang } from '@erag/lang-sync-inertia/react';
import React from 'react';
import { Button } from '@/app/components/ui/button';
import type { Idea } from '@/types';

interface VotingCardProps {
    idea: Idea & { votes_count: number };
    onVoteClick: () => void;
}

export const VotingCard = ({ idea, onVoteClick }: VotingCardProps) => {
    const { __ } = useLang();

    // Calculate voting progress
    const voteGoal = 500;
    const currentVotes = idea?.votes_count ?? 0;
    const votePercentage = Math.min(Math.round((currentVotes / voteGoal) * 100), 100);
    const circumference = 364.4; // Matching info22.html dasharray
    const strokeDashoffset = circumference - (votePercentage / 100) * circumference;

    return (
        <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-[0_32px_48px_-4px_rgba(26,28,27,0.05)]">
            <div className="flex flex-col items-center text-center mb-8">
                <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle className="text-outline-variant/20" cx="64" cy="64" fill="transparent" r="58"
                            stroke="currentColor" strokeWidth="8"></circle>
                        <circle className="text-primary" cx="64" cy="64" fill="transparent" r="58"
                            stroke="currentColor" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                            strokeWidth="8" strokeLinecap="round"></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-extrabold text-on-surface">{votePercentage}%</span>
                        <span className="text-[10px] text-outline font-bold uppercase tracking-wider">{__('messages.home.vote_progress')}</span>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-2 font-headline">{__('messages.home.vote_now')}</h3>
                <p className="text-sm text-outline leading-relaxed">{__('messages.home.voting_chance_still')}</p>
            </div>
            <Button
                onClick={onVoteClick}
                className="w-full py-7 rounded-xl text-lg shadow-lg mb-4">
                {__('messages.home.vote_now')}
            </Button>
            <p className="text-[11px] text-center text-outline-variant font-medium">
                {__('messages.my_ideas.unit_vote')}: {(idea?.votes_count ?? 0).toLocaleString()}
            </p>
        </div>
    );
};
