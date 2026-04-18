import { Form, Head, Link } from '@inertiajs/react';
import AuthLayout from '@/layouts/app/auth/auth-layout';
import { login } from '@/routes';
import { contact } from '@/routes/app';
import { email } from '@/routes/password';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';

type Props = {
    status?: string;
};

export default function ForgotPassword({ status }: Props) {
    return (
        <AuthLayout>
            <Head title="استعادة كلمة المرور" />

            <header className="mb-10 text-right">
                <Link
                    className="group text-on-surface-variant mb-4 inline-flex items-center gap-2 transition-colors duration-200 hover:text-primary"
                    href={login()}
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
                <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {status}
                </div>
            )}

            <Form {...email.form()} className="space-y-6">
                {({ processing, errors }) => (
                    <>
                        <input type="hidden" name="_auth_context" value="app" />

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-right block w-full">البريد الإلكتروني</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="example@domain.com"
                                required
                                type="email"
                                autoFocus
                                className="h-12 text-right"
                                dir="rtl"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <Button
                            className="h-12 w-full text-lg font-bold group"
                            type="submit"
                            disabled={processing}
                        >
                            <span>إرسال الرابط</span>
                            {processing ? (
                                <Spinner className="size-5" />
                            ) : (
                                <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">
                                    send
                                </span>
                            )}
                        </Button>
                    </>
                )}
            </Form>

            <div className="mt-12 text-center">
                <p className="text-on-surface-variant text-sm">
                    تواجه مشكلة؟{' '}
                    <Link
                        className="font-bold text-primary underline decoration-2 underline-offset-4 hover:underline"
                        href={contact()}
                    >
                        تواصل مع الدعم الفني
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
