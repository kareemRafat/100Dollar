import { useState, useEffect } from 'react';

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
        <div className="flex flex-col items-center">
            <div className="bg-surface-container-lowest flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-bold text-primary shadow-sm">
                {String(value).padStart(2, '0')}
            </div>
            <span className="text-on-surface-variant mt-2 text-[10px] font-bold">
                {label}
            </span>
        </div>
    );
}

export function CountdownTimer({ targetDate }: Props) {
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
            <TimeBlock value={timeLeft.hours} label="ساعة" />
            <TimeBlock value={timeLeft.minutes} label="دقيقة" />
            <TimeBlock value={timeLeft.seconds} label="ثانية" />
        </div>
    );
}
