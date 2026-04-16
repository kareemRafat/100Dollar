import { Form, Head, Link } from '@inertiajs/react';
import AuthLayout from '@/layouts/app/auth/auth-layout';

type Props = {
    status?: string;
};

export default function ResetPassword({ status }: Props) {
    return (
        <AuthLayout>
            <Head title="استعادة كلمة المرور" />

            <header className="mb-10 text-right">
                <Link
                    className="group text-outline mb-4 inline-flex items-center gap-2 transition-colors duration-200 hover:text-primary"
                    href="/login"
                >
                    <span className="text-sm font-bold">
                        العودة لتسجيل الدخول
                    </span>
                    <span className="material-symbols-outlined text-sm">
                        arrow_back
                    </span>
                </Link>
                <h1 className="font-headline mb-2 text-3xl font-extrabold tracking-tight text-on-surface dark:text-white">
                    استعادة كلمة المرور
                </h1>
                <p className="text-on-surface-variant">
                    أدخل بريدك الإلكتروني لإرسال رابط الاستعادة
                </p>
            </header>

            {status && (
                <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    {status}
                </div>
            )}

            <Form action="/forgot-password" method="post" className="space-y-6">
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-2">
                            <label
                                className="font-label text-sm font-semibold text-on-surface dark:text-white"
                                htmlFor="email"
                            >
                                البريد الإلكتروني
                            </label>
                            <div className="relative">
                                <input
                                    className="ring-outline-variant w-full rounded-lg bg-surface-container-lowest dark:bg-surface-container-low dark:text-white dark:border-outline-variant/30"
                                    id="email"
                                    name="email"
                                    placeholder="example@ledger.com"
                                    required
                                    type="email"
                                    autoFocus
                                />
                            </div>
                            {errors.email && (
                                <p className="text-error text-sm">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <button
                            className="group font-headline flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                            type="submit"
                            disabled={processing}
                        >
                            <span>إرسال الرابط</span>
                            <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">
                                send
                            </span>
                        </button>
                    </>
                )}
            </Form>

            <div className="mt-12 text-center">
                <p className="text-on-surface-variant text-sm">
                    تواجه مشكلة؟{' '}
                    <Link
                        className="font-bold text-primary underline decoration-2 underline-offset-4 hover:underline"
                        href="/contact"
                    >
                        تواصل مع الدعم الفني
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
