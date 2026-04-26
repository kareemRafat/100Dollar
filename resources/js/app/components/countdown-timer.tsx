import { useState, useEffect } from 'react';
import { useLang } from '@erag/lang-sync-inertia/react';
import { Clock, Timer, Hourglass } from 'lucide-react';

type Props = {
    targetDate: Date;
};

type TimeLeft = {
    hours: number;
    minutes: number;
    seconds: number;
};

function calculateTimeLeft(target: Date): TimeLeft {
    const diff = target.getTime() - Date.now();

    if (diff <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 }
    }

    return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center group/time">
            <div className="bg-surface-container-lowest flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-black text-primary shadow-sm border border-outline-variant/5 transition-all group-hover/time:scale-110 group-hover/time:bg-primary group-hover/time:text-on-primary">
                {String(value).padStart(2, '0')}
            </div>
            <div className="mt-2 flex items-center gap-1 opacity-60 transition-opacity group-hover/time:opacity-100">
                <span className="text-on-surface-variant text-[10px] font-black uppercase tracking-tighter">
                    {label}
                </span>
            </div>
        </div>
    );
}

export function CountdownTimer({ targetDate }: Props) {
    const { __ } = useLang();
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(
        calculateTimeLeft(targetDate),
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex gap-4">
            <TimeBlock value={timeLeft.hours} label={__('messages.home.hours')} />
            <TimeBlock value={timeLeft.minutes} label={__('messages.home.minutes')} />
            <TimeBlock value={timeLeft.seconds} label={__('messages.home.seconds')} />
        </div>
    );
}

