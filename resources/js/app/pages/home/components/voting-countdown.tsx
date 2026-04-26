import { useLang } from '@erag/lang-sync-inertia/react';
import { CountdownTimer } from '@/app/components/countdown-timer';

interface Props {
    secondsUntilEnd: number;
}

export default function VotingCountdown({ secondsUntilEnd }: Props) {
    const { __ } = useLang();
    const targetDate = new Date(Date.now() + secondsUntilEnd * 1000);

    return (
        <div className="group relative flex flex-col items-start justify-between overflow-hidden rounded-2xl bg-surface-container-low p-6 md:col-span-8 md:flex-row md:items-center h-full border border-outline-variant/10">
            {/* Left/Right Content Block */}
            <div className="relative z-10 mb-8 md:mb-0">
                <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-2xl">
                            schedule
                        </span>
                    </div>
                    <h4 className="font-headline text-lg font-bold text-on-surface dark:text-white leading-tight">
                        {__('messages.home.voting_ends_in')}
                    </h4>
                </div>
                <p className="text-sm text-on-surface-variant dark:text-on-surface-variant max-w-xs leading-relaxed">
                    {__('messages.home.voting_chance_still')}
                </p>
            </div>
            
            {/* Timer Block */}
            <div className="relative z-10 w-full md:w-auto flex justify-center md:justify-end">
                <CountdownTimer targetDate={targetDate} />
            </div>

            {/* Background Decorative Icon - Positioned to be fully visible but subtle */}
            <span className="material-symbols-outlined absolute bottom-4 end-0 translate-x-1/3 scale-[5] text-on-surface/[0.03] transition-all group-hover:-rotate-12 group-hover:text-on-surface/[0.05] pointer-events-none">
                timer
            </span>
        </div>
    );
}
