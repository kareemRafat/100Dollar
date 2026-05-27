import { useLang } from '@erag/lang-sync-inertia/react';
import { usePage } from '@inertiajs/react';
import {
    Lock,
    User as UserIcon,
    Vote as VoteIcon,
    Heart,
    Users,
    Bell,
} from 'lucide-react';
import { useMemo } from 'react';
import { MobileBottomNav } from '@/app/components/mobile-bottom-nav';
import { SideNav } from '@/app/components/side-nav';
import { getLocalizedPath } from '@/lib/utils';
import profile from '@/routes/app/profile';

interface ProfileTabsProps {
    activeSection: string;
    onItemClick: (id: string) => void;
}

export function ProfileTabs({ activeSection, onItemClick }: ProfileTabsProps) {
    const { props: pageProps } = usePage();
    const { locale } = pageProps;
    const { __ } = useLang();

    const sideNavItems = useMemo(
        () => [
            {
                id: 'personal-info',
                label: __('messages.profile.personal_info'),
                icon: UserIcon,
                href: getLocalizedPath(profile.personalInfo.url(), locale),
                only: ['user'],
            },
            {
                id: 'voted-ideas',
                label: __('messages.profile.voted_ideas'),
                icon: VoteIcon,
                href: getLocalizedPath(profile.votedIdeas.url(), locale),
                only: ['votedIdeas'],
            },
            {
                id: 'followed-ideas',
                label: __('messages.profile.followed_ideas'),
                icon: Heart,
                href: getLocalizedPath(profile.followedIdeas.url(), locale),
                only: ['followedIdeas'],
            },
            {
                id: 'followed-people',
                label: __('messages.profile.followed_people'),
                icon: Users,
                href: getLocalizedPath(profile.followedPeople.url(), locale),
                only: ['followedPeople'],
            },
            {
                id: 'notifications',
                label: __('messages.profile.notifications'),
                icon: Bell,
                href: getLocalizedPath(profile.notifications.url(), locale),
                only: ['notifications'],
            },
            {
                id: 'security',
                label: __('messages.profile.security_protection'),
                icon: Lock,
                href: getLocalizedPath(profile.security.url(), locale),
                only: [
                    'canManageTwoFactor',
                    'twoFactorEnabled',
                    'requiresConfirmation',
                ],
            },
        ],
        [__, locale],
    );

    const mobileNavItems = useMemo(
        () => [
            {
                id: 'personal-info',
                label: __('messages.profile.personal_tab'),
                icon: UserIcon,
                href: getLocalizedPath(profile.personalInfo.url(), locale),
                only: ['user'],
            },
            {
                id: 'voted-ideas',
                label: __('messages.profile.voted_ideas'),
                icon: VoteIcon,
                href: getLocalizedPath(profile.votedIdeas.url(), locale),
                only: ['votedIdeas'],
            },
            {
                id: 'followed-ideas',
                label: __('messages.profile.followed_ideas'),
                icon: Heart,
                href: getLocalizedPath(profile.followedIdeas.url(), locale),
                only: ['followedIdeas'],
            },
            {
                id: 'followed-people',
                label: __('messages.profile.followed_people'),
                icon: Users,
                href: getLocalizedPath(profile.followedPeople.url(), locale),
                only: ['followedPeople'],
            },
            {
                id: 'notifications',
                label: __('messages.profile.notifications'),
                icon: Bell,
                href: getLocalizedPath(profile.notifications.url(), locale),
                only: ['notifications'],
            },
            {
                id: 'security',
                label: __('messages.profile.security_protection_tab'),
                icon: Lock,
                href: getLocalizedPath(profile.security.url(), locale),
                only: [
                    'canManageTwoFactor',
                    'twoFactorEnabled',
                    'requiresConfirmation',
                ],
            },
        ],
        [__, locale],
    );

    return (
        <>
            <SideNav
                activeSection={activeSection}
                items={sideNavItems}
                onItemClick={onItemClick}
            />
            <MobileBottomNav
                activeSection={activeSection}
                items={mobileNavItems}
                onItemClick={onItemClick}
            />
        </>
    );
}
