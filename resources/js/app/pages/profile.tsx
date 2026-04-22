import { useLang } from '@erag/lang-sync-inertia/react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { MobileBottomNav } from '@/app/components/mobile-bottom-nav';
import { SideNav } from '@/app/components/side-nav';
import AppLayout from '@/app/layouts/app-layout';

type Props = {
    user: {
        name: string;
        email: string;
        phone?: string;
        bio?: string;
        avatar?: string;
    };
};

export default function Profile({ user }: Props) {
    const { __ } = useLang();
    const [activeSection, setActiveSection] = useState('personal-info');
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
    const [profileVisible, setProfileVisible] = useState(false);

    const sideNavItems = [
        {
            id: 'personal-info',
            label: __('messages.profile.personal_info'),
            icon: 'person',
            href: '#personal-info',
        },
        {
            id: 'password-security',
            label: __('messages.profile.password_security'),
            icon: 'shield',
            href: '#password-security',
        },
        {
            id: 'protection',
            label: __('messages.profile.protection_settings'),
            icon: 'lock_person',
            href: '#protection',
        },
    ];

    const mobileNavItems = [
        {
            id: 'personal-info',
            label: __('messages.profile.personal_tab'),
            icon: 'person',
            href: '#personal-info',
        },
        {
            id: 'password-security',
            label: __('messages.profile.security_tab'),
            icon: 'shield',
            href: '#password-security',
        },
        {
            id: 'protection',
            label: __('messages.profile.protection_tab'),
            icon: 'lock_person',
            href: '#protection',
        },
    ];

    return (
        <AppLayout activeRoute="/profile">
            <Head title={__('messages.profile.hero_title')} />

            <div className="md:flex md:min-h-screen">
                <SideNav activeSection={activeSection} items={sideNavItems} />

                <main className="w-full flex-1 p-6 pb-24 md:p-12 md:pb-12">
                    <header className="mb-12">
                        <h1 className="mb-2 text-4xl font-black text-secondary dark:text-white">
                            {__('messages.profile.hero_title')}
                        </h1>
                        <p className="text-secondary opacity-60 dark:text-slate-400">
                            {__('messages.profile.hero_desc')}
                        </p>
                    </header>

                    <div className="grid gap-10">
                        <section
                            className="rounded-xl border-e-4 border-primary bg-surface-container-lowest p-6 shadow-sm dark:bg-card"
                            id="personal-info"
                            onClick={() => setActiveSection('personal-info')}
                        >
                            <div className="mb-6 flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl text-primary">
                                    account_circle
                                </span>
                                <h2 className="text-xl font-bold text-secondary dark:text-white">
                                    {__('messages.profile.personal_info')}
                                </h2>
                            </div>
                            <div className="flex flex-col gap-8 md:flex-row">
                                <div className="flex w-full flex-col items-center gap-3 md:w-1/3">
                                    <div className="group relative">
                                        <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-surface-container-low shadow-lg">
                                            <img
                                                alt="User Avatar"
                                                className="h-full w-full object-cover"
                                                src={
                                                    user.avatar ||
                                                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBQVMjRYnu_xbDJCQxZTTKXx5UAyF1WWDdqbTJ9yqP5yKhcffWDz6QfFK4Y7ZLvMqKmyl5jHFRsuJtS79XfiqBWRWt-W-mcdR2S3fFe3WxwtJx6eDpsLAAHp8IgbYzlidlHyH2Q71ZKbAEpJwxv3dmU4iymTlEhVgXfaHgkZ8sqhVN-J5Dfk1T2nUinVKSlYVhnueBy14LmudBIz-Y12yxAcwSWqQcsT_iY9Zt9alYJA9igFX0T-UrVeXjiQcuGqO5tMtgcN_feL8U'
                                                }
                                            />
                                        </div>
                                        <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-secondary/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                                            <span className="material-symbols-outlined text-2xl text-white">
                                                photo_camera
                                            </span>
                                            <input
                                                className="hidden"
                                                type="file"
                                            />
                                        </label>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-secondary dark:text-white">
                                            {__(
                                                'messages.profile.account_image',
                                            )}
                                        </p>
                                        <p className="text-[10px] text-secondary/60">
                                            {__('messages.profile.image_hint')}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid flex-1 grid-cols-1 gap-5 md:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <label className="pe-1 text-xs font-bold text-secondary dark:text-white">
                                            {__('messages.profile.full_name')}
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-none bg-surface-container-low p-2.5 text-xs text-secondary transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary dark:text-white"
                                            type="text"
                                            defaultValue={user.name}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="pe-1 text-xs font-bold text-secondary dark:text-white">
                                            {__('messages.profile.email')}
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-none bg-surface-container-low p-2.5 text-xs text-secondary transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary dark:text-white"
                                            type="email"
                                            defaultValue={user.email}
                                        />
                                    </div>
                                    <div className="space-y-1.5 sm:col-span-full">
                                        <label className="pe-1 text-xs font-bold text-secondary dark:text-white">
                                            {__('messages.profile.phone')}
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-none bg-surface-container-low p-2.5 text-end text-xs text-secondary transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary dark:text-white"
                                            dir="ltr"
                                            type="tel"
                                            defaultValue={
                                                user.phone || '+966 50 123 4567'
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1.5 md:col-span-2">
                                        <label className="pe-1 text-xs font-bold text-secondary dark:text-white">
                                            {__('messages.profile.bio')}
                                        </label>
                                        <textarea
                                            className="w-full rounded-lg border-none bg-surface-container-low p-2.5 text-xs text-secondary transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary dark:text-white"
                                            rows={3}
                                            defaultValue={
                                                user.bio ||
                                                __(
                                                    'messages.profile.bio_placeholder',
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            className="rounded-xl border-e-4 border-deep-navy bg-surface-container-lowest p-6 shadow-sm dark:bg-card"
                            id="password-security"
                            onClick={() =>
                                setActiveSection('password-security')
                            }
                        >
                            <div className="mb-6 flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl text-secondary dark:text-white">
                                    lock
                                </span>
                                <h2 className="text-xl font-bold text-secondary dark:text-white">
                                    {__('messages.profile.password_security')}
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                <div className="space-y-1.5">
                                    <label className="pe-1 text-xs font-bold text-secondary dark:text-white">
                                        {__(
                                            'messages.profile.current_password',
                                        )}
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-none bg-surface-container-low p-2.5 text-xs transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary dark:text-white"
                                        placeholder="••••••••"
                                        type="password"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="pe-1 text-xs font-bold text-secondary dark:text-white">
                                        {__('messages.profile.new_password')}
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-none bg-surface-container-low p-2.5 text-xs transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary dark:text-white"
                                        placeholder="••••••••"
                                        type="password"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="pe-1 text-xs font-bold text-secondary dark:text-white">
                                        {__(
                                            'messages.profile.confirm_password',
                                        )}
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-none bg-surface-container-low p-2.5 text-xs transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary dark:text-white"
                                        placeholder="••••••••"
                                        type="password"
                                    />
                                </div>
                            </div>
                            <div className="mt-5 flex justify-end">
                                <button
                                    className="rounded-lg bg-secondary px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-secondary/90"
                                    type="button"
                                >
                                    {__('messages.profile.update_password')}
                                </button>
                            </div>
                        </section>

                        <section
                            className="rounded-xl border-e-4 border-[#D3C4AF] bg-surface-container-lowest p-6 shadow-sm dark:bg-card"
                            id="protection"
                            onClick={() => setActiveSection('protection')}
                        >
                            <div className="mb-6 flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl text-outline">
                                    verified_user
                                </span>
                                <h2 className="text-xl font-bold text-secondary dark:text-white">
                                    {__('messages.profile.protection_privacy')}
                                </h2>
                            </div>
                            <div className="space-y-5">
                                <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-md bg-white p-2 shadow-sm dark:bg-surface-container-highest">
                                            <span className="material-symbols-outlined text-xl text-primary">
                                                phonelink_lock
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-secondary dark:text-white">
                                                {__(
                                                    'messages.profile.two_factor_title',
                                                )}
                                            </h4>
                                            <p className="text-xs text-secondary/60 dark:text-slate-400">
                                                {__(
                                                    'messages.profile.two_factor_desc',
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input
                                            className="peer sr-only"
                                            type="checkbox"
                                            checked={twoFactorEnabled}
                                            onChange={() =>
                                                setTwoFactorEnabled(
                                                    !twoFactorEnabled,
                                                )
                                            }
                                        />
                                        <div className="peer h-5 w-9 rounded-full bg-gray-300 peer-checked:bg-primary peer-focus:outline-none after:absolute after:top-[2px] after:right-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:after:translate-x-[-100%] peer-checked:after:border-white rtl:peer-checked:after:translate-x-[-100%]" />
                                    </label>
                                </div>
                                <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-md bg-white p-2 shadow-sm dark:bg-surface-container-highest">
                                            <span className="material-symbols-outlined text-xl text-primary">
                                                visibility
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-secondary dark:text-white">
                                                {__(
                                                    'messages.profile.visibility_title',
                                                )}
                                            </h4>
                                            <p className="text-xs text-secondary/60 dark:text-slate-400">
                                                {__(
                                                    'messages.profile.visibility_desc',
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input
                                            className="peer sr-only"
                                            type="checkbox"
                                            checked={profileVisible}
                                            onChange={() =>
                                                setProfileVisible(
                                                    !profileVisible,
                                                )
                                            }
                                        />
                                        <div className="peer h-5 w-9 rounded-full bg-gray-300 peer-checked:bg-primary peer-focus:outline-none after:absolute after:top-[2px] after:right-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:after:translate-x-[-100%] peer-checked:after:border-white rtl:peer-checked:after:translate-x-[-100%]" />
                                    </label>
                                </div>
                            </div>
                        </section>

                        <div className="mb-16 flex items-center justify-end gap-4">
                            <button
                                className="rounded-lg px-6 py-2.5 text-xs font-bold text-secondary transition-colors hover:bg-surface-container-high dark:text-white"
                                type="button"
                            >
                                {__('messages.profile.cancel')}
                            </button>
                            <button
                                className="rounded-lg bg-primary px-10 py-2.5 text-xs font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                                type="button"
                            >
                                {__('messages.profile.save_changes')}
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            <MobileBottomNav
                activeSection={activeSection}
                items={mobileNavItems}
            />
        </AppLayout>
    );
}
