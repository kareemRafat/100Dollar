import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link, usePage, router, Deferred } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    Lock,
    User as UserIcon,
    Vote as VoteIcon,
    Heart,
    Users,
    Bell,
} from 'lucide-react';
import { lazy, Suspense, useMemo } from 'react';
import { MobileBottomNav } from '@/app/components/mobile-bottom-nav';
import { SideNav } from '@/app/components/side-nav';
import profile from '@/routes/app/profile';

// Lazy load tab components
const PersonalInfoForm = lazy(() => import('./profile/partials/profile-information-form'));
const SecurityAndProtection = lazy(() => import('./profile/partials/security-protection'));
const PasswordUpdateForm = lazy(() => import('./profile/partials/update-password-form'));
const VotedIdeas = lazy(() => import('./profile/partials/voted-ideas'));
const FollowedIdeas = lazy(() => import('./profile/partials/followed-ideas'));
const FollowedPeople = lazy(() => import('./profile/partials/followed-people'));
const Notifications = lazy(() => import('./profile/partials/notifications'));

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
    };
    canManageTwoFactor?: boolean;
    twoFactorEnabled?: boolean;
    requiresConfirmation?: boolean;
    votedIdeas?: PaginatedData<any>;
    followedIdeas?: PaginatedData<any>;
    followedPeople?: PaginatedData<any>;
    notifications?: PaginatedData<any>;
};

const TabSkeleton = () => (
    <div className="animate-pulse space-y-8">
        <div className="h-8 w-1/3 rounded bg-surface-container-high"></div>
        <div className="space-y-4">
            <div className="h-32 w-full rounded-xl bg-surface-container-high"></div>
            <div className="h-32 w-full rounded-xl bg-surface-container-high"></div>
        </div>
    </div>
);

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
    const isRtl = locale === 'ar';

    // Determine active section from URL
    const activeSection = url.includes(profile.security.url())
        ? 'security'
        : url.includes(profile.votedIdeas.url())
          ? 'voted-ideas'
          : url.includes(profile.followedIdeas.url())
            ? 'followed-ideas'
            : url.includes(profile.followedPeople.url())
              ? 'followed-people'
              : url.includes(profile.notifications.url())
                ? 'notifications'
                : 'personal-info';

    const sideNavItems = useMemo(() => [
        {
            id: 'personal-info',
            label: __('messages.profile.personal_info'),
            icon: UserIcon,
            href: profile.personalInfo.url(),
            only: ['user'],
        },
        {
            id: 'voted-ideas',
            label: __('messages.profile.voted_ideas'),
            icon: VoteIcon,
            href: profile.votedIdeas.url(),
            only: ['votedIdeas'],
        },
        {
            id: 'followed-ideas',
            label: __('messages.profile.followed_ideas'),
            icon: Heart,
            href: profile.followedIdeas.url(),
            only: ['followedIdeas'],
        },
        {
            id: 'followed-people',
            label: __('messages.profile.followed_people'),
            icon: Users,
            href: profile.followedPeople.url(),
            only: ['followedPeople'],
        },
        {
            id: 'notifications',
            label: __('messages.profile.notifications'),
            icon: Bell,
            href: profile.notifications.url(),
            only: ['notifications'],
        },
        {
            id: 'security',
            label: __('messages.profile.security_protection'),
            icon: Lock,
            href: profile.security.url(),
            only: ['canManageTwoFactor', 'twoFactorEnabled', 'requiresConfirmation'],
        },
    ], [__]);

    const mobileNavItems = useMemo(() => [
        {
            id: 'personal-info',
            label: __('messages.profile.personal_tab'),
            icon: UserIcon,
            href: profile.personalInfo.url(),
            only: ['user'],
        },
        {
            id: 'voted-ideas',
            label: __('messages.profile.voted_ideas'),
            icon: VoteIcon,
            href: profile.votedIdeas.url(),
            only: ['votedIdeas'],
        },
        {
            id: 'followed-ideas',
            label: __('messages.profile.followed_ideas'),
            icon: Heart,
            href: profile.followedIdeas.url(),
            only: ['followedIdeas'],
        },
        {
            id: 'followed-people',
            label: __('messages.profile.followed_people'),
            icon: Users,
            href: profile.followedPeople.url(),
            only: ['followedPeople'],
        },
        {
            id: 'notifications',
            label: __('messages.profile.notifications'),
            icon: Bell,
            href: profile.notifications.url(),
            only: ['notifications'],
        },
        {
            id: 'security',
            label: __('messages.profile.security_protection_tab'),
            icon: Lock,
            href: profile.security.url(),
            only: ['canManageTwoFactor', 'twoFactorEnabled', 'requiresConfirmation'],
        },
    ], [__]);

    const handleItemClick = (id: string) => {
        const item = sideNavItems.find((i) => i.id === id);

        if (item) {
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
                <SideNav
                    activeSection={activeSection}
                    items={sideNavItems}
                    onItemClick={handleItemClick}
                />

                <main className="w-full flex-1 p-6 pb-32 md:p-12 md:pb-12">
                    <div className="mx-auto max-w-4xl">
                        <Link
                            href="/"
                            className="mb-6 inline-flex items-center gap-2 text-xs font-black tracking-widest text-on-surface-variant uppercase transition-colors hover:text-primary"
                        >
                            {isRtl ? (
                                <ArrowRight className="size-4" />
                            ) : (
                                <ArrowLeft className="size-4" />
                            )}
                            {__('messages.ui.back')}
                        </Link>

                        <header className="mb-12">
                            <h1 className="mb-2 text-4xl font-black text-secondary dark:text-white">
                                {__('messages.profile.hero_title')}
                            </h1>
                            <p className="text-on-surface-variant/60">
                                {__('messages.profile.hero_desc')}
                            </p>
                        </header>

                        <Suspense fallback={<TabSkeleton />}>
                            {activeSection === 'personal-info' && (
                                <PersonalInfoForm user={user} />
                            )}
                            {activeSection === 'voted-ideas' && (
                                <Deferred data="votedIdeas" fallback={<TabSkeleton />}>
                                    <VotedIdeas ideas={votedIdeas as any} />
                                </Deferred>
                            )}
                            {activeSection === 'followed-ideas' && (
                                <Deferred data="followedIdeas" fallback={<TabSkeleton />}>
                                    <FollowedIdeas ideas={followedIdeas as any} />
                                </Deferred>
                            )}
                            {activeSection === 'followed-people' && (
                                <Deferred data="followedPeople" fallback={<TabSkeleton />}>
                                    <FollowedPeople people={followedPeople as any} />
                                </Deferred>
                            )}
                            {activeSection === 'notifications' && (
                                <Deferred data="notifications" fallback={<TabSkeleton />}>
                                    <Notifications notifications={notifications as any} />
                                </Deferred>
                            )}
                            {activeSection === 'security' && (
                                <div className="space-y-12">
                                    <PasswordUpdateForm />
                                    <hr className="border-outline-variant/10 dark:border-white/5" />
                                    <SecurityAndProtection
                                        canManageTwoFactor={canManageTwoFactor}
                                        twoFactorEnabled={twoFactorEnabled}
                                        requiresConfirmation={requiresConfirmation}
                                    />
                                </div>
                            )}
                        </Suspense>
                    </div>
                </main>
            </div>

            <MobileBottomNav
                activeSection={activeSection}
                items={mobileNavItems}
                onItemClick={handleItemClick}
            />
        </div>
    );
}


