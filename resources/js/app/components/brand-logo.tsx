import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

type BrandLogoProps = {
    /**
     * 'auto' follows the active colour scheme. Use 'light' or 'dark' to pin a
     * variant for surfaces that are always one or the other, such as the
     * deep-navy footer or the auth split panel.
     */
    tone?: 'auto' | 'light' | 'dark';
    /** Appearance key to read when tone is 'auto'. Admin keeps its own. */
    scope?: 'app' | 'admin';
    className?: string;
    alt?: string;
};

const SOURCES = {
    light: '/images/logo.webp',
    dark: '/images/logo-dark.webp',
} as const;

export function BrandLogo({
    tone = 'auto',
    scope = 'app',
    className,
    alt = 'Ideas for 100 Dollars',
}: BrandLogoProps) {
    const { resolvedAppearance } = useAppearance(scope);
    const variant = tone === 'auto' ? resolvedAppearance : tone;

    return (
        <img
            alt={alt}
            className={cn('w-auto', className)}
            decoding="async"
            height={40}
            src={SOURCES[variant]}
            width={142}
        />
    );
}