import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    Lock,
    ShieldCheck,
    User as UserIcon,
    Lightbulb,
    Vote as VoteIcon,
    Heart,
    Users,
    Bell,
} from 'lucide-react';
import { MobileBottomNav } from '@/app/components/mobile-bottom-nav';
import { SideNav } from '@/app/components/side-nav';
import AppLayout from '@/app/layouts/app-layout';
import PersonalInfoForm from './profile/partials/profile-information-form';
import ProtectionSettings from './profile/partials/protection-settings';
import PasswordUpdateForm from './profile/partials/update-password-form';
import VotedIdeas from './profile/partials/voted-ideas';
import FollowedIdeas from './profile/partials/followed-ideas';
import FollowedPeople from './profile/partials/followed-people';
import Notifications from './profile/partials/notifications';
import profile from '@/routes/app/profile';

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
    votedIdeas?: any[];
    followedIdeas?: any[];
    followedPeople?: any[];
    notifications?: any[];
};

export default function Profile({
    user,
    canManageTwoFactor = false,
    twoFactorEnabled = false,
    requiresConfirmation = false,
    votedIdeas = [],
    followedIdeas = [],
    followedPeople = [],
    notifications = [],
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

    const sideNavItems = [
        {
            id: 'personal-info',
            label: __('messages.profile.personal_info'),
            icon: UserIcon,
            href: profile.personalInfo.url(),
        },
        {
            id: 'voted-ideas',
            label: __('messages.profile.voted_ideas'),
            icon: VoteIcon,
            href: profile.votedIdeas.url(),
        },
        {
            id: 'followed-ideas',
            label: __('messages.profile.followed_ideas'),
            icon: Heart,
            href: profile.followedIdeas.url(),
        },
        {
            id: 'followed-people',
            label: __('messages.profile.followed_people'),
            icon: Users,
            href: profile.followedPeople.url(),
        },
        {
            id: 'notifications',
            label: __('messages.profile.notifications'),
            icon: Bell,
            href: profile.notifications.url(),
        },
        {
            id: 'security',
            label: __('messages.profile.protection_settings'),
            icon: Lock,
            href: profile.security.url(),
        },
    ];

    const mobileNavItems = [
        {
            id: 'personal-info',
            label: __('messages.profile.personal_tab'),
            icon: UserIcon,
            href: profile.personalInfo.url(),
        },
        {
            id: 'voted-ideas',
            label: __('messages.profile.voted_ideas'),
            icon: VoteIcon,
            href: profile.votedIdeas.url(),
        },
        {
            id: 'followed-ideas',
            label: __('messages.profile.followed_ideas'),
            icon: Heart,
            href: profile.followedIdeas.url(),
        },
        {
            id: 'followed-people',
            label: __('messages.profile.followed_people'),
            icon: Users,
            href: profile.followedPeople.url(),
        },
        {
            id: 'notifications',
            label: __('messages.profile.notifications'),
            icon: Bell,
            href: profile.notifications.url(),
        },
        {
            id: 'security',
            label: __('messages.profile.protection_tab'),
            icon: Lock,
            href: profile.security.url(),
        },
    ];

    const handleItemClick = (id: string) => {
        const item = sideNavItems.find((i) => i.id === id);

        if (item) {
            router.visit(item.href, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    return (
        <AppLayout activeRoute="/profile">
            <Head title={__('messages.profile.hero_title')} />

            <div className="mx-auto max-w-7xl px-6">
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

                            {activeSection === 'personal-info' && (
                                <PersonalInfoForm user={user} />
                            )}
                            {activeSection === 'voted-ideas' && (
                                <VotedIdeas ideas={votedIdeas} />
                            )}
                            {activeSection === 'followed-ideas' && (
                                <FollowedIdeas ideas={followedIdeas} />
                            )}
                            {activeSection === 'followed-people' && (
                                <FollowedPeople people={followedPeople} />
                            )}
                            {activeSection === 'notifications' && (
                                <Notifications notifications={notifications} />
                            )}
                            {activeSection === 'security' && (
                                <div className="space-y-12">
                                    <PasswordUpdateForm />
                                    <hr className="border-outline-variant/10 dark:border-white/5" />
                                    <ProtectionSettings
                                        canManageTwoFactor={canManageTwoFactor}
                                        twoFactorEnabled={twoFactorEnabled}
                                        requiresConfirmation={requiresConfirmation}
                                    />
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>

            <MobileBottomNav
                activeSection={activeSection}
                items={mobileNavItems}
                onItemClick={handleItemClick}
            />
        </AppLayout>
    );
}

