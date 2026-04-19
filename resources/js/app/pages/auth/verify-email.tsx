import { Form, Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/app/layouts/auth/auth-layout';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout>
            <Head title="تأكيد البريد الإلكتروني" />

            <div className="space-y-6 text-right">
                <header className="mb-10">
                    <h2 className="font-headline mb-2 text-3xl font-extrabold tracking-tight text-on-surface dark:text-white">
                        أكد بريدك الإلكتروني
                    </h2>
                    <p className="text-on-surface-variant">
                        يرجى تأكيد عنوان بريدك الإلكتروني لمتابعة استخدام حسابك والبدء في مشاركة أفكارك.
                    </p>
                </header>

                {status === 'verification-link-sent' && (
                    <div className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        تم إرسال رابط تأكيد جديد إلى بريدك الإلكتروني.
                    </div>
                )}

                <Form {...send.form()} className="space-y-4">
                    {({ processing }) => (
                        <>
                            <input
                                type="hidden"
                                name="_auth_context"
                                value="app"
                            />

                            <Button className="h-12 w-full text-lg font-bold" disabled={processing}>
                                <span>إعادة إرسال بريد التأكيد</span>
                                {processing ? (
                                    <Spinner className="size-5" />
                                ) : (
                                    <span className="material-symbols-outlined text-xl">
                                        mail
                                    </span>
                                )}
                            </Button>

                            <div className="flex justify-center">
                                <Link
                                    href={logout()}
                                    method="post"
                                    as="button"
                                    data={{ _auth_context: 'app' }}
                                    className="text-sm font-bold text-primary hover:underline"
                                >
                                    تسجيل الخروج
                                </Link>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AuthLayout>
    );
}
