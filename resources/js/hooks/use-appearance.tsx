import { useSyncExternalStore } from 'react';

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly resolvedAppearance: ResolvedAppearance;
    readonly updateAppearance: (mode: Appearance) => void;
};

const listeners = new Set<() => void>();
let currentAppAppearance: Appearance = 'system';
let currentAdminAppearance: Appearance = 'system';

const prefersDark = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const getStoredAppearance = (scope: 'app' | 'admin'): Appearance => {
    if (typeof window === 'undefined') {
        return 'system';
    }

    return (
        (localStorage.getItem(`appearance_${scope}`) as Appearance) || 'system'
    );
};

const isDarkMode = (appearance: Appearance): boolean => {
    return appearance === 'dark' || (appearance === 'system' && prefersDark());
};

export const applyTheme = (appearance: Appearance): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const isDark = isDarkMode(appearance);

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

const mediaQuery = (): MediaQueryList | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = (): void => {
    const isAdmin =
        typeof window !== 'undefined' &&
        window.location.pathname.startsWith('/admin');
    const appearance = isAdmin ? currentAdminAppearance : currentAppAppearance;

    if (appearance === 'system') {
        applyTheme('system');
    }
};

export function initializeTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    ['app', 'admin'].forEach((scope) => {
        const key = `appearance_${scope}`;

        if (!localStorage.getItem(key)) {
            // Check if old key exists and migrate it
            const old = localStorage.getItem('appearance');

            if (old) {
                localStorage.setItem(key, old);
            } else {
                localStorage.setItem(key, 'system');
            }
        }
    });

    currentAppAppearance = getStoredAppearance('app');
    currentAdminAppearance = getStoredAppearance('admin');

    // Initial apply based on current URL
    const isAdmin = window.location.pathname.startsWith('/admin');
    applyTheme(isAdmin ? currentAdminAppearance : currentAppAppearance);

    // Set up system theme change listener
    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance(
    scope: 'app' | 'admin' = 'app',
): UseAppearanceReturn {
    const appearance: Appearance = useSyncExternalStore(
        subscribe,
        () =>
            scope === 'admin' ? currentAdminAppearance : currentAppAppearance,
        () => 'system',
    );

    const resolvedAppearance: ResolvedAppearance = isDarkMode(appearance)
        ? 'dark'
        : 'light';

    const updateAppearance = (mode: Appearance): void => {
        if (scope === 'admin') {
            currentAdminAppearance = mode;
        } else {
            currentAppAppearance = mode;
        }

        // Store in localStorage for client-side persistence...
        localStorage.setItem(`appearance_${scope}`, mode);

        // Store in cookie for SSR...
        setCookie(`appearance_${scope}`, mode);

        // Only apply if it's the current scope
        const isAdmin = window.location.pathname.startsWith('/admin');

        if ((isAdmin && scope === 'admin') || (!isAdmin && scope === 'app')) {
            applyTheme(mode);
        }

        notify();
    };

    return { appearance, resolvedAppearance, updateAppearance } as const;
}
