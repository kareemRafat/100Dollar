import { useLang } from '@erag/lang-sync-inertia/react';
import { Link, usePage } from '@inertiajs/react';
import { create } from '@/actions/App/Http/Controllers/App/IdeaController';
import { NotificationBell } from '@/app/components/notification-bell';
import { Button } from '@/app/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import {
    about as aboutPage,
    archive as archivePage,
    contact as contactPage,
    home as homeIndex,
    sponsors as sponsorsIndex,
} from '@/routes/app';
import type { NavItem } from '@/types';

import { MobileNavSheet } from './nav/mobile-nav-sheet';
import { DesktopNavLinks } from './nav/desktop-nav-links';
import { UserNavDropdown } from './nav/user-nav-dropdown';
import { GuestNavActions } from './nav/guest-nav-actions';

type Props = {
    activeRoute?: string;
};

export function TopNavBar({ activeRoute }: Props) {
    const { auth, locale } = usePage().props as {
        auth: {
            user: {
                id: number;
                name: string;
                email: string;
                avatar?: string;
                role?: string;
            } | null;
        };
        locale: string;
    };
    const { appearance, updateAppearance } = useAppearance('app');
    const { __ } = useLang();

    const navItems: NavItem[] = [
        { title: __('messages.nav.home'), href: homeIndex().url },
        { title: __('messages.nav.archive'), href: archivePage().url },
        { title: __('messages.nav.sponsors'), href: sponsorsIndex().url },
        { title: __('messages.nav.about'), href: aboutPage().url },
        { title: __('messages.nav.contact'), href: contactPage().url },
    ];

    const getInitials = (name: string) =>
        name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();

    const isRtl = locale === 'ar';

    const hrefToString = (href: string | { url: string }) =>
        typeof href === 'object' ? href.url : href;

    const normalizePath = (path: string) => {
        const cleanPath = path.split('?')[0].split('#')[0];
        const parts = cleanPath.split('/').filter(Boolean);

        if (parts[0] === 'ar' || parts[0] === 'en') {
            parts.shift();
        }

        return '/' + parts.join('/');
    };

    const isActive = (href: string | { url: string }) =>
        normalizePath(activeRoute || '') === normalizePath(hrefToString(href));

    return (
        <header className="fixed top-0 z-40 w-full border-b border-outline-variant/10 bg-surface/80 backdrop-blur-xl dark:border-white/5 dark:bg-surface/80">
            <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
                <div className="flex items-center md:hidden">
                    <MobileNavSheet
                        navItems={navItems}
                        isActive={isActive}
                        isRtl={isRtl}
                        auth={auth}
                        locale={locale}
                        appearance={appearance}
                        updateAppearance={updateAppearance}
                        getInitials={getInitials}
                    />
                </div>

                <div className="flex items-center">
                    <Link
                        className="font-headline text-xl font-black tracking-tighter text-secondary transition-all hover:opacity-80 dark:text-white"
                        href={homeIndex().url}
                    >
                        <span className="text-primary">
                            {__('messages.ideas')}
                        </span>{' '}
                        {__('messages.for_100')}
                    </Link>
                </div>

                <DesktopNavLinks navItems={navItems} isActive={isActive} />

                <div className="flex items-center gap-2">
                    {auth.user ? (
                        <div className="flex items-center gap-1">
                            {auth.user.role === 'admin' ? (
                                <Button
                                    asChild
                                    className="ms-2 hidden h-9 rounded-lg bg-secondary px-4 text-sm font-bold transition-all hover:scale-[1.02] hover:bg-secondary/90 active:scale-95 md:inline-flex"
                                >
                                    <a href="/admin">
                                        {__('messages.ui.dashboard')}
                                    </a>
                                </Button>
                            ) : (
                                <Button
                                    asChild
                                    className="ms-2 hidden h-9 rounded-lg px-4 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 md:inline-flex"
                                >
                                    <Link href={create.url()}>
                                        {__('messages.ui.submit_your_idea')}
                                    </Link>
                                </Button>
                            )}

                            <NotificationBell />

                            <UserNavDropdown
                                user={auth.user}
                                getInitials={getInitials}
                                locale={locale}
                                appearance={appearance}
                                updateAppearance={updateAppearance}
                            />
                        </div>
                    ) : (
                        <GuestNavActions locale={locale} />
                    )}
                </div>
            </nav>
        </header>
    );
}
