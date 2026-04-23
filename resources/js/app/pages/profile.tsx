import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    Lock,
    ShieldCheck,
    User as UserIcon,
} from 'lucide-react';
import { useState } from 'react';
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
};

export default function Profile({ user }: Props) {
    const { locale } = usePage().props;
    const { __ } = useLang();
    const [activeSection, setActiveSection] = useState('personal-info');
    const isRtl = locale === 'ar';

    const sideNavItems = [
        {
            id: 'personal-info',
            label: __('messages.profile.personal_info'),
            icon: UserIcon,
            href: '#personal-info',
        },
        {
            id: 'password-security',
            label: __('messages.profile.password_security'),
            icon: ShieldCheck,
            href: '#password-security',
        },
        {
            id: 'protection',
            label: __('messages.profile.protection_settings'),
            icon: Lock,
            href: '#protection',
        },
    ];

    const mobileNavItems = [
        {
            id: 'personal-info',
            label: __('messages.profile.personal_tab'),
            icon: UserIcon,
            href: '#personal-info',
        },
        {
            id: 'password-security',
            label: __('messages.profile.security_tab'),
            icon: ShieldCheck,
            href: '#password-security',
        },
        {
            id: 'protection',
            label: __('messages.profile.protection_tab'),
            icon: Lock,
            href: '#protection',
        },
    ];

    return (
        <AppLayout activeRoute="/profile">
            <Head title={__('messages.profile.hero_title')} />

            <div className="md:flex md:min-h-screen">
                <SideNav
                    activeSection={activeSection}
                    items={sideNavItems}
                    onItemClick={setActiveSection}
                />

                <main className="w-full flex-1 p-6 pb-32 md:p-12 md:pb-12">
                    <div className="mx-auto max-w-4xl">
                        <Link
                            href="/"
                            className="mb-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary"
                        >
                            {isRtl ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
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

                        {activeSection === 'personal-info' && <PersonalInfoForm user={user} />}
                        {activeSection === 'password-security' && <PasswordUpdateForm />}
                        {activeSection === 'protection' && <ProtectionSettings user={user} />}
                    </div>
                </main>
            </div>

            <MobileBottomNav
                activeSection={activeSection}
                items={mobileNavItems}
                onItemClick={setActiveSection}
            />
        </AppLayout>
    );
}
