import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AuthLayout from '@/layouts/app/auth/auth-layout';

type Props = {
    canLogin: boolean;
};

export default function Register({ canLogin }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayout>
            <Head title="تسجيل جديد" />

            <header className="mb-10 text-center md:text-right">
                <h2 className="font-headline mb-2 text-3xl font-extrabold tracking-tight text-on-surface dark:text-white">
                    ابدأ رحلتك المالية اليوم
                </h2>
                <p className="text-on-surface-variant">
                    انضم إلى أكثر من ٥٠,٠٠٠ مستثمر ورائد أعمال في Golden Ledger
                </p>
            </header>

            <Form
                action="/register"
                method="post"
                resetOnSuccess={['password', 'password_confirmation']}
                className="space-y-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="font-label text-sm font-semibold text-on-surface dark:text-white"
                                    htmlFor="name"
                                >
                                    الاسم الكامل
                                </label>
                                <input
                                    className="bg-surface-container-lowest ring-outline-variant w-full rounded-lg px-4 py-3 ring-1 transition-all outline-none focus:ring-2 focus:ring-primary dark:placeholder:text-slate-500"
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoFocus
                                    placeholder="محمد أحمد"
                                />
                                {errors.name && (
                                    <p className="text-error text-sm">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label
                                    className="font-label text-sm font-semibold text-on-surface dark:text-white"
                                    htmlFor="email"
                                >
                                    البريد الإلكتروني
                                </label>
                                <input
                                    className="bg-surface-container-lowest ring-outline-variant w-full rounded-lg px-4 py-3 ring-1 transition-all outline-none focus:ring-2 focus:ring-primary dark:placeholder:text-slate-500"
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="example@ledger.com"
                                />
                                {errors.email && (
                                    <p className="text-error text-sm">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label
                                        className="font-label text-sm font-semibold text-on-surface dark:text-white"
                                        htmlFor="password"
                                    >
                                        كلمة المرور
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="bg-surface-container-lowest ring-outline-variant w-full rounded-lg px-4 py-3 ring-1 transition-all outline-none focus:ring-2 focus:ring-primary dark:placeholder:text-slate-500"
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            required
                                            placeholder="••••••••"
                                        />
                                        <button
                                            className="text-on-surface-variant/60 absolute top-1/2 left-3 -translate-y-1/2 transition-colors hover:text-primary"
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            <span className="material-symbols-outlined text-xl">
                                                {showPassword
                                                    ? 'visibility_off'
                                                    : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-error text-sm">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label
                                        className="font-label text-sm font-semibold text-on-surface dark:text-white"
                                        htmlFor="password_confirmation"
                                    >
                                        تأكيد كلمة المرور
                                    </label>
                                    <input
                                        className="bg-surface-container-lowest ring-outline-variant w-full rounded-lg px-4 py-3 ring-1 transition-all outline-none focus:ring-2 focus:ring-primary dark:placeholder:text-slate-500"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                    />
                                    {errors.password_confirmation && (
                                        <p className="text-error text-sm">
                                            {errors.password_confirmation}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <input
                                className="border-outline-variant mt-1 rounded text-primary focus:ring-primary"
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                            />
                            <label
                                className="text-on-surface-variant text-sm leading-relaxed"
                                htmlFor="terms"
                            >
                                أوافق على{' '}
                                <Link
                                    className="font-bold text-primary hover:underline"
                                    href="/terms"
                                >
                                    شروط الخدمة
                                </Link>{' '}
                                و{' '}
                                <Link
                                    className="font-bold text-primary hover:underline"
                                    href="#"
                                >
                                    سياسة الخصوصية
                                </Link>{' '}
                                الخاصة بـ Golden Ledger.
                            </label>
                        </div>

                        <button
                            className="font-headline hover:bg-primary-container flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all"
                            type="submit"
                            disabled={processing}
                        >
                            <span>إنشاء الحساب الآن</span>
                            <span className="material-symbols-outlined text-xl">
                                arrow_back
                            </span>
                        </button>
                    </>
                )}
            </Form>

            <div className="mt-8 flex flex-col items-center gap-6">
                <div className="flex w-full items-center gap-4">
                    <div className="bg-outline-variant h-px flex-1" />
                    <span className="text-on-surface-variant text-xs font-medium">
                        أو سجل عبر
                    </span>
                    <div className="bg-outline-variant h-px flex-1" />
                </div>
                <div className="w-full">
                    <button
                        className="border-outline-variant hover:bg-surface-container flex w-full items-center justify-center gap-3 rounded-lg border bg-surface-container-lowest dark:bg-surface-container-low dark:text-white dark:border-outline-variant/30"
                        type="button"
                    >
                        <img
                            alt="google"
                            className="h-5 w-5"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjb_h-xl-sZGM_5JkslKcSMNBL1nG53BtElOnny9WQlrPr7JEw-W_-MXu4ItLQ_6B4SjtRXpOHD7xAZaPm4Vm23TtPnV8ibARsEAlUp-ntQgMtrK1-W61m7j3xVK_nNrgaP8hiDWP9vFXsSglTJ81aPEzg0KSN3TDCm9EIzgctlJNAQC6y2ilJpRmcCrgeZvB7GolKLOWRiB78yAUC0oIN3c-HvNd-Y-bdfHntlT0zIdhn6cG6Ac2SbX968e66fjHWxgwCs-4tk5s"
                        />
                        <span className="text-sm font-bold text-on-surface dark:text-white">
                            التسجيل باستخدام Google
                        </span>
                    </button>
                </div>
                {canLogin && (
                    <p className="text-on-surface-variant text-sm">
                        لديك حساب بالفعل؟{' '}
                        <Link
                            className="font-bold text-primary hover:underline"
                            href="/login"
                        >
                            تسجيل الدخول
                        </Link>
                    </p>
                )}
            </div>

            <footer className="text-on-surface-variant mx-auto mt-16 flex w-full max-w-xl items-center justify-between text-[10px] opacity-60">
                <span>© 2024 Golden Ledger Fintech. جميع الحقوق محفوظة.</span>
                <div className="flex gap-4">
                    <Link
                        className="transition-colors hover:text-primary"
                        href="/contact"
                    >
                        الدعم الفني
                    </Link>
                    <Link
                        className="transition-colors hover:text-primary"
                        href="#"
                    >
                        سياسة الكوكيز
                    </Link>
                </div>
            </footer>
        </AuthLayout>
    );
}
