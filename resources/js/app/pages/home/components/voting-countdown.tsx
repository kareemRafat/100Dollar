import { useLang } from '@erag/lang-sync-inertia/react';
import { Clock } from 'lucide-react';
import { CountdownTimer } from '@/app/components/countdown-timer';

interface Props {
    votingEndsAt: string;
}

export default function VotingCountdown({ votingEndsAt }: Props) {
    const { __ } = useLang();

    return (
        <div className="group relative flex h-full flex-col items-start justify-between overflow-hidden rounded-3xl border border-outline-variant/10 bg-surface-container-low p-6 shadow-md transition-all hover:shadow-lg md:col-span-8 md:flex-row md:items-center">
            {/* Left Content Block */}
            <div className="relative z-10 mb-4 md:mb-0">
                <div className="mb-3 inline-flex items-center rounded-full border border-primary/10 bg-primary/10 px-3 py-1.5 text-[10px] font-black tracking-wider text-primary uppercase backdrop-blur-md">
                    <span className="relative me-2 flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                    </span>
                    {__('messages.home.voting_time')}
                </div>

                <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Clock className="size-4" />
                    </div>
                    <h4 className="font-headline text-xl leading-tight font-black text-on-surface dark:text-white">
                        {__('messages.home.voting_ends_in')}
                    </h4>
                </div>
                <p className="text-sm text-on-surface-variant">
                    {__('messages.home.voting_chance_still')}
                </p>
            </div>

            {/* Timer Block */}
            <div className="relative z-10 flex w-full justify-center md:w-auto md:justify-end">
                <div>
                    <CountdownTimer targetDate={new Date(votingEndsAt)} />
                </div>
            </div>

            {/* Decorative Light Glow */}
            <div className="pointer-events-none absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
        </div>
    );
}
