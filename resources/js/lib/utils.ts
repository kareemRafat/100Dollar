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

    const labels = {
        en: {
            minute: 'minute',
            minutes: 'minutes',
            second: 'second',
            seconds: 'seconds',
            and: 'and',
        },
        ar: {
            minute: 'دقيقة',
            minutes: 'دقائق',
            second: 'ثانية',
            seconds: 'ثواني',
            and: 'و',
        },
    }[locale === 'ar' ? 'ar' : 'en']!;

    const parts: string[] = [];

    if (minutes > 0) {
        parts.push(`${minutes} ${minutes === 1 ? labels.minute : labels.minutes}`);
    }

    if (remainingSeconds > 0) {
        parts.push(`${remainingSeconds} ${remainingSeconds === 1 ? labels.second : labels.seconds}`);
    }

    if (parts.length === 0) {
        return `0 ${labels.seconds}`;
    }

    if (parts.length === 2) {
        return `${parts[0]} ${labels.and} ${parts[1]}`;
    }

    return parts[0];
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}
