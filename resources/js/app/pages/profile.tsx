import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    Lock,
    ShieldCheck,
    User as UserIcon,
} from 'lucide-react';
import { MobileBottomNav } from '@/app/components/mobile-bottom-nav';
import { SideNav } from '@/app/components/side-nav';
import AppLayout from '@/app/layouts/app-layout';
import PersonalInfoForm from './profile/partials/profile-information-form';
import ProtectionSettings from './profile/partials/protection-settings';
import PasswordUpdateForm from './profile/partials/update-password-form';

type Props = {
    user: {
        name: string;
        email: string;
        phone?: string;
        bio?: string;
        avatar?: string;
        is_active: boolean;
    };
    canManageTwoFactor?: boolean;
    twoFactorEnabled?: boolean;
};

export default function Profile({
    user,
    canManageTwoFactor = false,
    twoFactorEnabled = false,
}: Props) {
    const { url, props: pageProps } = usePage();
    const { locale } = pageProps;
    const { __ } = useLang();
    const isRtl = locale === 'ar';

    // Determine active section from URL
    const activeSection = url.includes('/profile/security')
        ? 'security'
        : url.includes('/profile/password-security')
          ? 'password-security'
          : 'personal-info';

    const sideNavItems = [
        {
            id: 'personal-info',
            label: __('messages.profile.personal_info'),
            icon: UserIcon,
            href: '/profile/personal-info',
        },
        {
            id: 'password-security',
            label: __('messages.profile.password_security'),
            icon: ShieldCheck,
            href: '/profile/password-security',
        },
        {
            id: 'security',
            label: __('messages.profile.protection_settings'),
            icon: Lock,
            href: '/profile/security',
        },
    ];

    const mobileNavItems = [
        {
            id: 'personal-info',
            label: __('messages.profile.personal_tab'),
            icon: UserIcon,
            href: '/profile/personal-info',
        },
        {
            id: 'password-security',
            label: __('messages.profile.security_tab'),
            icon: ShieldCheck,
            href: '/profile/password-security',
        },
        {
            id: 'security',
            label: __('messages.profile.protection_tab'),
            icon: Lock,
            href: '/profile/security',
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
                            {activeSection === 'password-security' && (
                                <PasswordUpdateForm />
                            )}
                            {activeSection === 'security' && (
                                <ProtectionSettings
                                    user={user}
                                    canManageTwoFactor={canManageTwoFactor}
                                    twoFactorEnabled={twoFactorEnabled}
                                />
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
