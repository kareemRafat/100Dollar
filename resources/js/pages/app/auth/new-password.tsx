import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AuthLayout from '@/layouts/app/auth/auth-layout';

type Props = {
    token: string;
    email: string;
};

export default function NewPassword({ token, email }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    const hasMinLength = newPassword.length >= 8;
    const hasSpecialChar = /[@#$!%*?&]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const strength = [hasMinLength, hasSpecialChar, hasNumber].filter(
        Boolean,
    ).length;
    const strengthLabel =
        strength === 3
            ? 'قوية'
            : strength === 2
              ? 'متوسطة'
              : strength === 1
                ? 'ضعيفة'
                : '';
    const strengthColor =
        strength === 3
            ? 'bg-green-500'
            : strength === 2
              ? 'bg-primary'
              : 'bg-error';

    return (
        <AuthLayout>
            <Head title="تعيين كلمة مرور جديدة" />

            <header className="mb-12 text-right">
                <h1 className="font-headline mb-2 text-3xl font-extrabold tracking-tight text-on-surface dark:text-white">
                    تعيين كلمة مرور جديدة
                </h1>
                <p className="text-on-surface-variant text-lg">
                    يرجى اختيار كلمة مرور قوية لحماية حسابك واستثماراتك القادمة.
                </p>
            </header>

            <Form
                action="/reset-password"
                method="post"
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
                className="space-y-8"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-2">
                            <label
                                className="font-label text-sm font-semibold text-on-surface dark:text-white"
                                htmlFor="new_password"
                            >
                                كلمة المرور الجديدة
                            </label>
                            <div className="relative">
                                <input
                                    className="ring-outline-variant placeholder:text-outline/40 w-full rounded-lg bg-surface-container-lowest dark:bg-surface-container-low dark:text-white dark:border-outline-variant/30"
                                    id="new_password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    autoFocus
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

                        <div className="space-y-3 px-1">
                            <div className="flex items-center justify-between text-xs font-medium">
                                <span className="text-on-surface-variant">
                                    قوة كلمة المرور
                                </span>
                                {strengthLabel && (
                                    <span
                                        className={`font-bold ${strength === 3 ? 'text-green-600' : 'text-primary'}`}
                                    >
                                        {strengthLabel}
                                    </span>
                                )}
                            </div>
                            <div className="bg-outline-variant/20 flex h-1.5 w-full gap-1 overflow-hidden rounded-full">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className={`h-full w-1/4 rounded-full transition-all ${i <= strength ? strengthColor : 'bg-outline-variant/30'}`}
                                    />
                                ))}
                            </div>
                            <ul className="text-on-surface-variant flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                                <li className="flex items-center gap-1">
                                    <span
                                        className={`material-symbols-outlined text-[14px] ${hasMinLength ? 'text-primary' : 'text-outline-variant'}`}
                                        style={
                                            hasMinLength
                                                ? {
                                                      fontVariationSettings:
                                                          "'FILL' 1",
                                                  }
                                                : undefined
                                        }
                                    >
                                        {hasMinLength
                                            ? 'check_circle'
                                            : 'radio_button_unchecked'}
                                    </span>
                                    8 أحرف على الأقل
                                </li>
                                <li className="flex items-center gap-1">
                                    <span
                                        className={`material-symbols-outlined text-[14px] ${hasSpecialChar ? 'text-primary' : 'text-outline-variant'}`}
                                        style={
                                            hasSpecialChar
                                                ? {
                                                      fontVariationSettings:
                                                          "'FILL' 1",
                                                  }
                                                : undefined
                                        }
                                    >
                                        {hasSpecialChar
                                            ? 'check_circle'
                                            : 'radio_button_unchecked'}
                                    </span>
                                    رمز خاص (@#$)
                                </li>
                                <li className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-outline-variant text-[14px]">
                                        radio_button_unchecked
                                    </span>
                                    أرقام
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <label
                                className="font-label text-sm font-semibold text-on-surface dark:text-white"
                                htmlFor="confirm_password"
                            >
                                تأكيد كلمة المرور
                            </label>
                            <div className="relative">
                                <input
                                    className="ring-outline-variant placeholder:text-outline/40 w-full rounded-lg bg-surface-container-lowest dark:bg-surface-container-low dark:text-white dark:border-outline-variant/30"
                                    id="confirm_password"
                                    name="password_confirmation"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                />
                                <span className="material-symbols-outlined text-on-surface-variant/40 absolute top-1/2 left-3 -translate-y-1/2">
                                    lock
                                </span>
                            </div>
                            {errors.password_confirmation && (
                                <p className="text-error text-sm">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        <input type="hidden" name="token" value={token} />
                        <input type="hidden" name="email" value={email} />

                        <button
                            className="font-headline flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 text-lg font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                            type="submit"
                            disabled={processing}
                        >
                            تحديث كلمة المرور
                        </button>

                        <div className="mt-6 text-center">
                            <Link
                                className="flex items-center justify-center gap-2 font-bold text-primary transition-colors hover:underline"
                                href="/login"
                            >
                                <span className="material-symbols-outlined text-sm">
                                    arrow_forward
                                </span>
                                العودة إلى تسجيل الدخول
                            </Link>
                        </div>
                    </>
                )}
            </Form>

            <footer className="text-on-surface-variant mt-16 text-center text-[10px] opacity-60">
                <span>© 2024 Golden Ledger Fintech. جميع الحقوق محفوظة.</span>
            </footer>
        </AuthLayout>
    );
}
