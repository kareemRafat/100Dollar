import { useLang } from '@erag/lang-sync-inertia/react';
import React from 'react';
import { Button } from '@/app/components/ui/button';
import type { Idea } from '@/types';

interface VotingCardProps {
    idea: Idea & {
        votes_count: number;
        target_votes?: number;
        progress?: number;
    };
    onVoteClick: () => void;
}

export const VotingCard = ({ idea, onVoteClick }: VotingCardProps) => {
    const { __ } = useLang();

    // Data Sync
    const voteGoal = idea?.target_votes ?? 100;
    const currentVotes = idea?.votes_count ?? 0;
    const votePercentage = idea?.progress ?? Math.min(Math.round((currentVotes / voteGoal) * 100), 100);

    // Circular Progress Calculation
    const r = 72;
    const circumference = 2 * Math.PI * r; // ~452.39
    const strokeDashoffset = circumference - (votePercentage / 100) * circumference;

    return (
        <div className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] relative overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700" />

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* High-Fidelity Circular Progress */}
                <div className="relative w-40 h-40 flex items-center justify-center mb-8">
                    <svg className="w-full h-full transform -rotate-90 filter drop-shadow-sm">
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
                        <span className="text-4xl font-black text-on-surface leading-none">{votePercentage}%</span>
                        <span className="text-[10px] text-outline font-bold uppercase tracking-widest mt-1">
                            {__('messages.home.community_support')}
                        </span>
                    </div>
                </div>

                <h3 className="text-2xl font-black text-on-surface mb-3 font-headline">
                    {__('messages.home.support_idea_question')}
                </h3>
                <p className="text-sm text-on-surface-variant/70 leading-relaxed mb-8 px-4 font-medium">
                    {__('messages.home.support_idea_desc')}
                </p>

                {/* Enhanced Vote Button */}
                <Button
                    onClick={onVoteClick}
                    className="w-full h-14 rounded-2xl text-lg font-black transition-all active:scale-[0.97] mb-6 shadow-xl shadow-primary/10 gap-3"
                >
                    {__('messages.home.vote_now')}
                    <span className="material-symbols-outlined text-primary-fixed">thumb_up</span>
                </Button>

                <div className="flex items-center gap-3 mb-2">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-surface-container-high" />
                        ))}
                    </div>
                    <span className="text-[12px] text-outline font-medium">
                        {__('messages.home.people_voted', { count: currentVotes.toLocaleString() })}
                    </span>
                </div>
            </div>
        </div>
    );
};
