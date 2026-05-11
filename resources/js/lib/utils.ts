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
            if (value === 1) {
return type === 'minute' ? 'دقيقة' : 'ثانية';
}

            if (value >= 2 && value <= 10) {
return type === 'minute' ? 'دقائق' : 'ثواني';
}

            return type === 'minute' ? 'دقيقة' : 'ثانية';
        };

        const parts: string[] = [];

        if (minutes > 0) {
            parts.push(`${minutes.toLocaleString('ar-EG')} ${getArLabel(minutes, 'minute')}`);
        }

        if (remainingSeconds > 0) {
            parts.push(`${remainingSeconds.toLocaleString('ar-EG')} ${getArLabel(remainingSeconds, 'second')}`);
        }

        if (parts.length === 0) {
return '٠ ثانية';
}

        return parts.join(' و ');
    }

    const parts: string[] = [];

    if (minutes > 0) {
        parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
    }

    if (remainingSeconds > 0) {
        parts.push(`${remainingSeconds} ${remainingSeconds === 1 ? 'second' : 'seconds'}`);
    }

    if (parts.length === 0) {
return '0 seconds';
}

    if (parts.length === 2) {
return `${parts[0]} and ${parts[1]}`;
}

    return parts[0];
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}
