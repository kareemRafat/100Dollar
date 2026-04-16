import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AuthLayout from '@/layouts/app/auth/auth-layout';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayout>
            <Head title="تسجيل الدخول" />

            <header className="mb-10 text-right">
                <h2 className="font-headline mb-2 text-3xl font-extrabold tracking-tight text-on-surface dark:text-white">
                    مرحباً بك مجدداً
                </h2>
                <p className="text-on-surface-variant">
                    سجل الدخول للوصول إلى محفظتك الاستثمارية
                </p>
            </header>

            {status && (
                <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    {status}
                </div>
            )}

            <Form
                action="/login"
                method="post"
                resetOnSuccess={['password']}
                className="space-y-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-2">
                            <label
                                className="font-label text-sm font-semibold text-on-surface dark:text-white"
                                htmlFor="email"
                            >
                                البريد الإلكتروني
                            </label>
                            <input
                                className="ring-outline-variant w-full rounded-lg bg-surface-container-lowest dark:bg-surface-container-low dark:text-white dark:border-outline-variant/30 dark:placeholder:text-slate-500"
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoFocus
                                placeholder="example@ledger.com"
                            />
                            {errors.email && (
                                <p className="text-error text-sm">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label
                                    className="font-label text-sm font-semibold text-on-surface dark:text-white"
                                    htmlFor="password"
                                >
                                    كلمة المرور
                                </label>
                                {canResetPassword && (
                                    <Link
                                        className="text-xs font-bold text-primary hover:underline"
                                        href="/forgot-password"
                                    >
                                        نسيت كلمة المرور؟
                                    </Link>
                                )}
                            </div>
                            <div className="relative flex items-center">
                                <input
                                    className="ring-outline-variant w-full rounded-lg bg-surface-container-lowest dark:bg-surface-container-low dark:text-white dark:border-outline-variant/30 dark:placeholder:text-slate-500"
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="••••••••"
                                />
                                <button
                                    className="text-on-surface-variant/60 absolute left-3 transition-colors hover:text-primary"
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

                        <div className="flex items-center gap-3">
                            <input
                                className="border-outline-variant rounded text-primary focus:ring-primary"
                                id="remember-me"
                                name="remember"
                                type="checkbox"
                            />
                            <label
                                className="text-on-surface-variant cursor-pointer text-sm"
                                htmlFor="remember-me"
                            >
                                تذكرني على هذا الجهاز
                            </label>
                        </div>

                        <button
                            className="font-headline flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                            type="submit"
                            disabled={processing}
                        >
                            <span>تسجيل الدخول</span>
                            <span className="material-symbols-outlined text-xl">
                                login
                            </span>
                        </button>
                    </>
                )}
            </Form>

            <div className="mt-8 flex flex-col items-center gap-6">
                <div className="flex w-full items-center gap-4">
                    <div className="bg-outline-variant/30 h-px flex-1" />
                    <span className="text-on-surface-variant text-xs font-medium">
                        أو المتابعة عبر
                    </span>
                    <div className="bg-outline-variant/30 h-px flex-1" />
                </div>
                <div className="w-full">
                    <button
                        className="border-outline-variant/30 hover:bg-surface-container flex w-full items-center justify-center gap-3 rounded-lg border bg-surface-container-lowest dark:bg-surface-container-low dark:text-white dark:border-outline-variant/30"
                        type="button"
                    >
                        <img
                            alt="Google"
                            className="h-5 w-5"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjb_h-xl-sZGM_5JkslKcSMNBL1nG53BtElOnny9WQlrPr7JEw-W_-MXu4ItLQ_6B4SjtRXpOHD7xAZaPm4Vm23TtPnV8ibARsEAlUp-ntQgMtrK1-W61m7j3xVK_nNrgaP8hiDWP9vFXsSglTJ81aPEzg0KSN3TDCm9EIzgctlJNAQC6y2ilJpRmcCrgeZvB7GolKLOWRiB78yAUC0oIN3c-HvNd-Y-bdfHntlT0zIdhn6cG6Ac2SbX968e66fjHWxgwCs-4tk5s"
                        />
                        <span className="text-sm font-bold text-on-surface dark:text-white">
                            المتابعة باستخدام Google
                        </span>
                    </button>
                </div>
                {canRegister && (
                    <p className="text-on-surface-variant text-sm">
                        ليس لديك حساب؟{' '}
                        <Link
                            className="font-bold text-primary hover:underline"
                            href="/register"
                        >
                            أنشئ حساباً جديداً
                        </Link>
                    </p>
                )}
            </div>
        </AuthLayout>
    );
}
