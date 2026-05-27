import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, usePage, router } from '@inertiajs/react';
import { getLocalizedPath } from '@/lib/utils';
import profile from '@/routes/app/profile';

import { ProfileTabs } from './profile/partials/profile-tabs';
import { ProfileDetails } from './profile/partials/profile-details';

type PaginatedData<T> = {
    data: T[];
    links: any[];
    meta: any;
};

type Props = {
    user: {
        id: number;
        name: string;
        email: string;
        phone?: string;
        bio?: string;
        avatar?: string;
        locale: string;
    };
    canManageTwoFactor?: boolean;
    twoFactorEnabled?: boolean;
    requiresConfirmation?: boolean;
    votedIdeas?: PaginatedData<any>;
    followedIdeas?: PaginatedData<any>;
    followedPeople?: PaginatedData<any>;
    notifications?: PaginatedData<any>;
};

export default function Profile({
    user,
    canManageTwoFactor = false,
    twoFactorEnabled = false,
    requiresConfirmation = false,
    votedIdeas,
    followedIdeas,
    followedPeople,
    notifications,
}: Props) {
    const { url, props: pageProps } = usePage();
    const { locale } = pageProps;
    const { __ } = useLang();

    const activeSection = url.includes(
        getLocalizedPath(profile.security.url(), locale),
    )
        ? 'security'
        : url.includes(getLocalizedPath(profile.votedIdeas.url(), locale))
          ? 'voted-ideas'
          : url.includes(getLocalizedPath(profile.followedIdeas.url(), locale))
            ? 'followed-ideas'
            : url.includes(
                    getLocalizedPath(profile.followedPeople.url(), locale),
                )
              ? 'followed-people'
              : url.includes(
                        getLocalizedPath(profile.notifications.url(), locale),
                    )
                ? 'notifications'
                : 'personal-info';

    const handleItemClick = (id: string) => {
        const items = [
            {
                id: 'personal-info',
                href: getLocalizedPath(profile.personalInfo.url(), locale),
                only: ['user'],
            },
            {
                id: 'voted-ideas',
                href: getLocalizedPath(profile.votedIdeas.url(), locale),
                only: ['votedIdeas'],
            },
            {
                id: 'followed-ideas',
                href: getLocalizedPath(profile.followedIdeas.url(), locale),
                only: ['followedIdeas'],
            },
            {
                id: 'followed-people',
                href: getLocalizedPath(profile.followedPeople.url(), locale),
                only: ['followedPeople'],
            },
            {
                id: 'notifications',
                href: getLocalizedPath(profile.notifications.url(), locale),
                only: ['notifications'],
            },
            {
                id: 'security',
                href: getLocalizedPath(profile.security.url(), locale),
                only: [
                    'canManageTwoFactor',
                    'twoFactorEnabled',
                    'requiresConfirmation',
                ],
            },
        ];

        const item = items.find((i) => i.id === id);

        if (item) {
            if (item.id === 'security') {
                window.location.href = item.href;

                return;
            }

            router.visit(item.href, {
                preserveScroll: true,
                preserveState: true,
                only: item.only as any,
            });
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-6">
            <Head title={__('messages.profile.hero_title')} />

            <div className="md:flex md:min-h-[calc(100vh-80px)]">
                <ProfileTabs
                    activeSection={activeSection}
                    onItemClick={handleItemClick}
                />

                <ProfileDetails
                    activeSection={activeSection}
                    user={user}
                    canManageTwoFactor={canManageTwoFactor}
                    twoFactorEnabled={twoFactorEnabled}
                    requiresConfirmation={requiresConfirmation}
                    votedIdeas={votedIdeas}
                    followedIdeas={followedIdeas}
                    followedPeople={followedPeople}
                    notifications={notifications}
                />
            </div>
        </div>
    );
}
