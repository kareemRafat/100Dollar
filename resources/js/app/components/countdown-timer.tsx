import { useLang } from '@erag/lang-sync-inertia/react';
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

type Props = {
    targetDate: Date;
};

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

function calculateTimeLeft(target: Date): TimeLeft {
    const diff = target.getTime() - Date.now();

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

function TimeBlock({
    value,
    label,
    locale = 'en',
}: {
    value: number;
    label: string;
    locale?: string;
}) {
    const formattedValue = locale?.startsWith('ar')
        ? value.toLocaleString('ar-EG', {
              minimumIntegerDigits: 2,
              useGrouping: false,
          })
        : String(value).padStart(2, '0');

    return (
        <div className="group/time flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-outline-variant/5 bg-surface-container-lowest text-2xl font-black text-primary shadow-sm transition-all group-hover/time:scale-110 group-hover/time:bg-primary group-hover/time:text-on-primary">
                <span className="tabular-nums">{formattedValue}</span>
            </div>
            <div className="mt-2 flex items-center gap-1 opacity-60 transition-opacity group-hover/time:opacity-100">
                <span className="text-[10px] font-black tracking-tighter text-on-surface-variant uppercase">
                    {label}
                </span>
            </div>
        </div>
    );
}

export function CountdownTimer({ targetDate }: Props) {
    const { __ } = useLang();
    const { locale } = usePage().props as any;
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(
        calculateTimeLeft(targetDate),
    );

    useEffect(() => {
        setTimeLeft(calculateTimeLeft(targetDate));
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex gap-4" dir="ltr">
            {timeLeft.days > 0 && (
                <TimeBlock
                    value={timeLeft.days}
                    label={__('messages.home.days')}
                    locale={locale}
                />
            )}
            <TimeBlock
                value={timeLeft.hours}
                label={__('messages.home.hours')}
                locale={locale}
            />
            <TimeBlock
                value={timeLeft.minutes}
                label={__('messages.home.minutes')}
                locale={locale}
            />
            <TimeBlock
                value={timeLeft.seconds}
                label={__('messages.home.seconds')}
                locale={locale}
            />
        </div>
    );
}

