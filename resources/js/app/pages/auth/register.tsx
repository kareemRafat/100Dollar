import { Form, Head, Link } from '@inertiajs/react';
import AuthLayout from '@/app/layouts/auth/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { contact, terms } from '@/routes/app';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import PasswordInput from '@/components/password-input';
import InputError from '@/components/input-error';

import { Spinner } from '@/components/ui/spinner';

type Props = {
    canLogin: boolean;
};

export default function Register({ canLogin }: Props) {
    return (
        <AuthLayout>
            <Head title="تسجيل جديد" />

            <header className="mb-10 text-right">
                <h2 className="font-headline mb-2 text-3xl font-extrabold tracking-tight text-on-surface dark:text-white">
                    ابدأ رحلتك اليوم
                </h2>
                <p className="text-on-surface-variant">
                    انضم إلى مجتمع المبدعين وابدأ في مشاركة أفكارك مع العالم
                </p>
            </header>

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                className="space-y-6"
            >
                {({ processing, errors }) => (
                    <>
                        <input type="hidden" name="_auth_context" value="app" />

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-right block w-full">الاسم الكامل</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoFocus
                                    placeholder="محمد أحمد"
                                    className="h-12 text-right"
                                    dir="rtl"
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-right block w-full">البريد الإلكتروني</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="example@domain.com"
                                    className="h-12 text-right"
                                    dir="rtl"
                                />
                                <InputError message={errors.email} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                             <div className="space-y-2">
                                <Label htmlFor="phone" className="text-right block w-full">رقم الهاتف</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    placeholder="+962 7XXXXXXXX"
                                    className="h-12 text-right"
                                    dir="ltr"
                                />
                                <InputError message={errors.phone} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country" className="text-right block w-full">دولة الإقامة</Label>
                                <Input
                                    id="country"
                                    name="country"
                                    type="text"
                                    required
                                    placeholder="الأردن"
                                    className="h-12 text-right"
                                    dir="rtl"
                                />
                                <InputError message={errors.country} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nationality" className="text-right block w-full">الجنسية</Label>
                            <Input
                                id="nationality"
                                name="nationality"
                                type="text"
                                required
                                placeholder="أردني"
                                className="h-12 text-right"
                                dir="rtl"
                            />
                            <InputError message={errors.nationality} />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="password">كلمة المرور</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    className="h-12 text-right"
                                    dir="rtl"
                                />
                                <InputError message={errors.password} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">تأكيد كلمة المرور</Label>
                                <Input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="h-12 text-right"
                                    dir="rtl"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>
                        </div>

                        <div className="flex items-start justify-end gap-3">
                            <Label
                                className="text-on-surface-variant text-sm leading-relaxed cursor-pointer text-right"
                                htmlFor="terms"
                            >
                                أوافق على{' '}
                                <Link
                                    className="font-bold text-primary hover:underline"
                                    href={terms()}
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
                                الخاصة بالمنصة.
                            </Label>
                            <Checkbox id="terms" name="terms" required className="mt-1" />
                        </div>

                        <Button
                            className="h-12 w-full text-lg font-bold"
                            type="submit"
                            disabled={processing}
                        >
                            <span>إنشاء الحساب الآن</span>
                            {processing ? (
                                <Spinner className="size-5" />
                            ) : (
                                <span className="material-symbols-outlined text-xl">
                                    arrow_back
                                </span>
                            )}
                        </Button>
                    </>
                )}
            </Form>

            <div className="mt-8 flex flex-col items-center gap-6">
                <div className="flex w-full items-center gap-4">
                    <div className="bg-outline-variant/30 h-px flex-1" />
                    <span className="text-on-surface-variant text-xs font-medium">
                        أو سجل عبر
                    </span>
                    <div className="bg-outline-variant/30 h-px flex-1" />
                </div>
                <div className="w-full">
                    <Button
                        variant="outline"
                        className="h-12 w-full bg-surface-container-lowest font-bold dark:bg-surface-container-low"
                        type="button"
                    >
                        <img
                            alt="Google"
                            className="h-5 w-5"
                            src="https://www.google.com/favicon.ico"
                        />
                        <span>التسجيل باستخدام Google</span>
                    </Button>
                </div>
                {canLogin && (
                    <p className="text-on-surface-variant text-sm">
                        لديك حساب بالفعل؟{' '}
                        <Link
                            className="font-bold text-primary hover:underline"
                            href={login()}
                        >
                            تسجيل الدخول
                        </Link>
                    </p>
                )}
            </div>

            <footer className="text-on-surface-variant mx-auto mt-16 flex w-full max-w-xl items-center justify-between text-[10px] opacity-60">
                <span>© 2026 أفكار بـ 100 دولار. جميع الحقوق محفوظة.</span>
                <div className="flex gap-4">
                    <Link
                        className="transition-colors hover:text-primary"
                        href={contact()}
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
