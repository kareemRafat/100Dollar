import { useLang } from '@erag/lang-sync-inertia/react';
import { Link, Deferred, usePage } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { lazy, Suspense } from 'react';

const PersonalInfoForm = lazy(
    () => import('./profile-information-form'),
);
const SecurityAndProtection = lazy(
    () => import('./security-protection'),
);
const PasswordUpdateForm = lazy(
    () => import('./update-password-form'),
);
const VotedIdeas = lazy(() => import('./voted-ideas'));
const FollowedIdeas = lazy(() => import('./followed-ideas'));
const FollowedPeople = lazy(() => import('./followed-people'));
const Notifications = lazy(() => import('./notifications'));

type PaginatedData<T> = {
    data: T[];
    links: any[];
    meta: any;
};

interface ProfileDetailsProps {
    activeSection: string;
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
}

const TabSkeleton = () => (
    <div className="animate-pulse space-y-8">
        <div className="h-8 w-1/3 rounded bg-surface-container-high"></div>
        <div className="space-y-4">
            <div className="h-32 w-full rounded-xl bg-surface-container-high"></div>
            <div className="h-32 w-full rounded-xl bg-surface-container-high"></div>
        </div>
    </div>
);

export function ProfileDetails({
    activeSection,
    user,
    canManageTwoFactor = false,
    twoFactorEnabled = false,
    requiresConfirmation = false,
    votedIdeas,
    followedIdeas,
    followedPeople,
    notifications,
}: ProfileDetailsProps) {
    const { props: pageProps } = usePage();
    const { locale } = pageProps;
    const { __ } = useLang();
    const isRtl = locale === 'ar';

    return (
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
                        <Deferred
                            data="votedIdeas"
                            fallback={<TabSkeleton />}
                        >
                            <VotedIdeas ideas={votedIdeas as any} />
                        </Deferred>
                    )}
                    {activeSection === 'followed-ideas' && (
                        <Deferred
                            data="followedIdeas"
                            fallback={<TabSkeleton />}
                        >
                            <FollowedIdeas
                                ideas={followedIdeas as any}
                            />
                        </Deferred>
                    )}
                    {activeSection === 'followed-people' && (
                        <Deferred
                            data="followedPeople"
                            fallback={<TabSkeleton />}
                        >
                            <FollowedPeople
                                people={followedPeople as any}
                            />
                        </Deferred>
                    )}
                    {activeSection === 'notifications' && (
                        <Deferred
                            data="notifications"
                            fallback={<TabSkeleton />}
                        >
                            <Notifications
                                notifications={notifications as any}
                            />
                        </Deferred>
                    )}
                    {activeSection === 'security' && (
                        <div className="space-y-12">
                            <PasswordUpdateForm />
                            <hr className="border-outline-variant/10 dark:border-white/5" />
                            <SecurityAndProtection
                                canManageTwoFactor={canManageTwoFactor}
                                twoFactorEnabled={twoFactorEnabled}
                                requiresConfirmation={
                                    requiresConfirmation
                                }
                            />
                        </div>
                    )}
                </Suspense>
            </div>
        </main>
    );
}
