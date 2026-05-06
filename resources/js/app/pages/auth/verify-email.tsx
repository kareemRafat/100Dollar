import { useLang } from '@erag/lang-sync-inertia/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/app/components/ui/button';
import AuthLayout from '@/app/layouts/auth/auth-layout';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    const { __ } = useLang();
    const { locale } = usePage().props;

    return (
        <AuthLayout>
            <Head title={__('messages.verify_email.hero_title')} />

            <div className="space-y-6 text-start">
                <header className="mb-10">
                    <h2 className="font-headline mb-2 text-2xl font-extrabold tracking-tight text-on-surface dark:text-white">
                        {__('messages.verify_email.hero_title')}
                    </h2>
                    <p className="text-on-surface-variant">
                        {__('messages.verify_email.subtitle')}
                    </p>
                </header>

                {status === 'verification-link-sent' && (
                    <div className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {__('messages.verify_email.resent_link_sent')}
                    </div>
                )}

                <Form {...send.form()} className="space-y-4">
                    {({ processing }) => (
                        <>
                            <input type="hidden" name="_locale" value={locale as string} />

                            <Button className="h-12 w-full text-lg font-bold" disabled={processing}>
                                <span>{__('messages.verify_email.resend_button')}</span>
                                {processing ? (
                                    <Spinner className="size-4" />
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
                                    data={{
                                        _locale: locale,
                                    }}
                                    className="text-sm font-bold text-primary hover:underline"
                                >
                                    {__('messages.verify_email.logout')}
                                </Link>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AuthLayout>
    );
}
