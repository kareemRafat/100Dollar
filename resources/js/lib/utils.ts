import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number, locale: string = 'en'): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const isAr = locale.startsWith('ar');

    if (isAr) {
        const getArLabel = (value: number, type: 'minute' | 'second') => {
            if (value === 1) return type === 'minute' ? 'دقيقة' : 'ثانية';
            if (value === 2) return type === 'minute' ? 'دقيقتان' : 'ثانيتان';
            if (value >= 3 && value <= 10) return type === 'minute' ? 'دقائق' : 'ثواني';
            return type === 'minute' ? 'دقيقة' : 'ثانية';
        };

        const parts: string[] = [];
        if (minutes > 0) {
            parts.push(`${minutes.toLocaleString('ar-EG')} ${getArLabel(minutes, 'minute')}`);
        }
        if (remainingSeconds > 0) {
            parts.push(`${remainingSeconds.toLocaleString('ar-EG')} ${getArLabel(remainingSeconds, 'second')}`);
        }
        if (parts.length === 0) return '٠ ثانية';
        return parts.join(' و ');
    }

    const labels = {
        minute: 'minute',
        minutes: 'minutes',
        second: 'second',
        seconds: 'seconds',
        and: 'and',
    };

    const parts: string[] = [];
    if (minutes > 0) {
        parts.push(`${minutes} ${minutes === 1 ? labels.minute : labels.minutes}`);
    }
    if (remainingSeconds > 0) {
        parts.push(`${remainingSeconds} ${remainingSeconds === 1 ? labels.second : labels.seconds}`);
    }
    if (parts.length === 0) return `0 ${labels.seconds}`;
    if (parts.length === 2) return `${parts[0]} ${labels.and} ${parts[1]}`;
    return parts[0];
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}
