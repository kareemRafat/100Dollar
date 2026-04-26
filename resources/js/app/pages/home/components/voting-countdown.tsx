import { useLang } from '@erag/lang-sync-inertia/react';
import { CountdownTimer } from '@/app/components/countdown-timer';

interface Props {
    secondsUntilEnd: number;
}

export default function VotingCountdown({ secondsUntilEnd }: Props) {
    const { __ } = useLang();
    const targetDate = new Date(Date.now() + secondsUntilEnd * 1000);

    return (
        <div className="flex flex-col items-center justify-between rounded-2xl bg-surface-container-low p-6 md:col-span-8 md:flex-row h-full">
            <div className="mb-6 md:mb-0">
                <h4 className="mb-2 font-headline text-lg font-bold text-on-surface dark:text-white">
                    {__('messages.home.voting_ends_in')}
                </h4>
                <p className="text-sm text-on-surface-variant dark:text-on-surface-variant">
                    {__('messages.home.voting_chance_still')}
                </p>
            </div>
            <CountdownTimer targetDate={targetDate} />
        </div>
    );
}
