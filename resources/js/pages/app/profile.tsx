import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { SideNav } from '@/components/app/side-nav';
import { MobileBottomNav } from '@/components/app/mobile-bottom-nav';
import AppLayout from '@/layouts/app/app-layout';

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
    const [activeSection, setActiveSection] = useState('personal-info');
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
    const [profileVisible, setProfileVisible] = useState(false);

    const sideNavItems = [
        {
            id: 'personal-info',
            label: 'المعلومات الشخصية',
            icon: 'person',
            href: '#personal-info',
        },
        {
            id: 'password-security',
            label: 'كلمة المرور والأمان',
            icon: 'shield',
            href: '#password-security',
        },
        {
            id: 'protection',
            label: 'إعدادات الحماية',
            icon: 'lock_person',
            href: '#protection',
        },
    ];

    const mobileNavItems = [
        {
            id: 'personal-info',
            label: 'الشخصية',
            icon: 'person',
            href: '#personal-info',
        },
        {
            id: 'password-security',
            label: 'الأمان',
            icon: 'shield',
            href: '#password-security',
        },
        {
            id: 'protection',
            label: 'الحماية',
            icon: 'lock_person',
            href: '#protection',
        },
    ];

    return (
        <AppLayout activeRoute="/profile">
            <Head title="إدارة حسابك" />

            <div className="md:flex md:min-h-screen">
                <SideNav activeSection={activeSection} items={sideNavItems} />

                <main className="w-full flex-1 p-6 pb-24 md:p-12 md:pb-12">
                    <header className="mb-12">
                        <h1 className="mb-2 text-4xl font-black text-secondary">
                            إدارة حسابك
                        </h1>
                        <p className="text-secondary opacity-60">
                            خصص بياناتك الشخصية وحافظ على أمان استثماراتك في
                            السجل الذهبي.
                        </p>
                    </header>

                    <div className="grid gap-12">
                        <section
                            className="rounded-xl border-r-4 border-primary bg-surface-container-lowest p-8 shadow-sm"
                            id="personal-info"
                            onClick={() => setActiveSection('personal-info')}
                        >
                            <div className="mb-8 flex items-center gap-4">
                                <span className="material-symbols-outlined text-3xl text-primary">
                                    account_circle
                                </span>
                                <h2 className="text-2xl font-bold text-secondary">
                                    المعلومات الشخصية
                                </h2>
                            </div>
                            <div className="flex flex-col gap-10 md:flex-row">
                                <div className="flex w-full flex-col items-center gap-4 md:w-1/3">
                                    <div className="group relative">
                                        <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-surface-container-low shadow-lg">
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
                                            <span className="material-symbols-outlined text-3xl text-white">
                                                photo_camera
                                            </span>
                                            <input
                                                className="hidden"
                                                type="file"
                                            />
                                        </label>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-secondary">
                                            صورة الحساب
                                        </p>
                                        <p className="text-xs text-secondary/60">
                                            JPG أو PNG بحد أقصى 5 ميجابايت
                                        </p>
                                    </div>
                                </div>
                                <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="pr-1 text-sm font-bold text-secondary">
                                            الاسم الكامل
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-none bg-surface-container-low p-3 text-secondary transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
                                            type="text"
                                            defaultValue={user.name}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="pr-1 text-sm font-bold text-secondary">
                                            البريد الإلكتروني
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-none bg-surface-container-low p-3 text-secondary transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
                                            type="email"
                                            defaultValue={user.email}
                                        />
                                    </div>
                                    <div className="space-y-2 sm:col-span-full ">
                                        <label className="pr-1 text-sm font-bold text-secondary">
                                            رقم الهاتف
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-none bg-surface-container-low p-3 text-right text-secondary transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
                                            dir="ltr"
                                            type="tel"
                                            defaultValue={
                                                user.phone || '+966 50 123 4567'
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="pr-1 text-sm font-bold text-secondary">
                                            النبذة الشخصية
                                        </label>
                                        <textarea
                                            className="w-full rounded-lg border-none bg-surface-container-low p-3 text-secondary transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
                                            rows={3}
                                            defaultValue={
                                                user.bio ||
                                                'مستثمر مهتم بالأفكار الناشئة والتقنيات المالية الحديثة.'
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            className="rounded-xl border-r-4 border-deep-navy bg-surface-container-lowest p-8 shadow-sm"
                            id="password-security"
                            onClick={() =>
                                setActiveSection('password-security')
                            }
                        >
                            <div className="mb-8 flex items-center gap-4">
                                <span className="material-symbols-outlined text-3xl text-secondary">
                                    lock
                                </span>
                                <h2 className="text-2xl font-bold text-secondary">
                                    كلمة المرور والأمان
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <div className="space-y-2">
                                    <label className="pr-1 text-sm font-bold text-secondary">
                                        كلمة المرور الحالية
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-none bg-surface-container-low p-3 transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
                                        placeholder="••••••••"
                                        type="password"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="pr-1 text-sm font-bold text-secondary">
                                        كلمة المرور الجديدة
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-none bg-surface-container-low p-3 transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
                                        placeholder="••••••••"
                                        type="password"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="pr-1 text-sm font-bold text-secondary">
                                        تأكيد كلمة المرور
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-none bg-surface-container-low p-3 transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
                                        placeholder="••••••••"
                                        type="password"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    className="rounded-lg bg-secondary px-6 py-2 font-bold text-white transition-colors hover:bg-secondary/90"
                                    type="button"
                                >
                                    تحديث كلمة المرور
                                </button>
                            </div>
                        </section>

                        <section
                            className="rounded-xl border-r-4 border-[#D3C4AF] bg-surface-container-lowest p-8 shadow-sm"
                            id="protection"
                            onClick={() => setActiveSection('protection')}
                        >
                            <div className="mb-8 flex items-center gap-4">
                                <span className="material-symbols-outlined text-3xl text-outline">
                                    verified_user
                                </span>
                                <h2 className="text-2xl font-bold text-secondary">
                                    إعدادات الحماية والخصوصية
                                </h2>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-md bg-white p-2 shadow-sm">
                                            <span className="material-symbols-outlined text-primary">
                                                phonelink_lock
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-secondary">
                                                المصادقة الثنائية (2FA)
                                            </h4>
                                            <p className="text-sm text-secondary/60">
                                                إضافة طبقة حماية إضافية لحسابك
                                                عبر رسائل SMS.
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
                                        <div className="peer h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-primary peer-focus:outline-none after:absolute after:top-[2px] after:right-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:after:translate-x-[-100%] peer-checked:after:border-white rtl:peer-checked:after:translate-x-[-100%]" />
                                    </label>
                                </div>
                                <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-md bg-white p-2 shadow-sm">
                                            <span className="material-symbols-outlined text-primary">
                                                visibility
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-secondary">
                                                ظهور الملف الشخصي
                                            </h4>
                                            <p className="text-sm text-secondary/60">
                                                السماح للمستثمرين الآخرين برؤية
                                                اهتماماتك الاستثمارية.
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
                                        <div className="peer h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-primary peer-focus:outline-none after:absolute after:top-[2px] after:right-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:after:translate-x-[-100%] peer-checked:after:border-white rtl:peer-checked:after:translate-x-[-100%]" />
                                    </label>
                                </div>
                            </div>
                        </section>

                        <div className="mb-20 flex items-center justify-end gap-4">
                            <button
                                className="rounded-lg px-8 py-3 font-bold text-secondary transition-colors hover:bg-surface-container-high"
                                type="button"
                            >
                                إلغاء
                            </button>
                            <button
                                className="rounded-lg bg-primary px-12 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                                type="button"
                            >
                                حفظ جميع التغييرات
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
