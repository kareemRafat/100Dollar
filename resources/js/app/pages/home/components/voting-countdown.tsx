import { useLang } from '@erag/lang-sync-inertia/react';
import { Watch, Clock } from 'lucide-react';
import { CountdownTimer } from '@/app/components/countdown-timer';

interface Props {
    secondsUntilEnd: number;
}

export default function VotingCountdown({ secondsUntilEnd }: Props) {
    const { __ } = useLang();
    const targetDate = new Date(Date.now() + secondsUntilEnd * 1000);

    return (
        <div className="group relative flex flex-col items-start justify-between overflow-hidden rounded-3xl bg-surface-container-low p-6 md:col-span-8 md:flex-row md:items-center h-full border border-outline-variant/10 shadow-md transition-all hover:shadow-lg">
            {/* Left Content Block */}
            <div className="relative z-10 mb-4 md:mb-0">

                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary backdrop-blur-md border border-primary/10 mb-3">
                   <span className="relative flex h-2 w-2 me-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    {__('messages.home.voting_time')}
                </div>

                <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Clock className="size-4" />
                    </div>
                    <h4 className="font-headline text-xl font-black text-on-surface dark:text-white leading-tight">
                        {__('messages.home.voting_ends_in')}
                    </h4>
                </div>
                <p className="text-sm text-on-surface-variant">
                    {__('messages.home.voting_chance_still')}
                </p>
            </div>

            {/* Timer Block */}
            <div className="relative z-10 w-full md:w-auto flex justify-center md:justify-end">
                <div>
                    <CountdownTimer targetDate={targetDate} />
                </div>
            </div>

            {/* Decorative Light Glow */}
            <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
        </div>
    );
}
