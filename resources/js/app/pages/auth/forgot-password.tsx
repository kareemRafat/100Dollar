import { useLang } from '@erag/lang-sync-inertia/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import AuthLayout from '@/app/layouts/auth/auth-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { contact } from '@/routes/app';
import { email } from '@/routes/password';

type Props = {
    status?: string;
};

export default function ForgotPassword({ status }: Props) {
    const { __ } = useLang();
    const { locale } = usePage().props;

    return (
        <AuthLayout>
            <Head title={__('messages.forgot_password.hero_title')} />

            <header className="mb-10 text-start">
                <Link
                    className="group text-on-surface-variant mb-4 inline-flex items-center gap-2 transition-colors duration-200 hover:text-primary"
                    href={login.url()}
                >
                    <span className="material-symbols-outlined text-sm rtl:rotate-180">
                        arrow_back
                    </span>
                    <span className="text-sm font-bold">
                        {__('messages.forgot_password.back_to_login')}
                    </span>
                </Link>
                <h1 className="font-headline mb-2 text-3xl font-extrabold tracking-tight text-on-surface dark:text-white">
                    {__('messages.forgot_password.hero_title')}
                </h1>
                <p className="text-on-surface-variant">
                    {__('messages.forgot_password.subtitle')}
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
                        <input type="hidden" name="_locale" value={locale as string} />

                        <div className="space-y-2">
                            <Label htmlFor="email" className="block w-full">{__('messages.login.email_label')}</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="example@domain.com"
                                required
                                type="email"
                                autoFocus
                                className="h-12 text-start"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <Button
                            className="h-12 w-full text-lg font-bold group"
                            type="submit"
                            disabled={processing}
                        >
                            <span>{__('messages.forgot_password.send_link')}</span>
                            {processing ? (
                                <Spinner className="size-5" />
                            ) : (
                                <span className="material-symbols-outlined text-xl transition-transform rtl:rotate-180 group-hover:-translate-x-1 ltr:group-hover:translate-x-1">
                                    send
                                </span>
                            )}
                        </Button>
                    </>
                )}
            </Form>

            <div className="mt-12 text-center">
                <p className="text-on-surface-variant text-sm">
                    {__('messages.forgot_password.problem_contact_support')}{' '}
                    <Link
                        className="font-bold text-primary underline decoration-2 underline-offset-4 hover:underline"
                        href={contact()}
                    >
                        {__('messages.forgot_password.contact_support')}
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
