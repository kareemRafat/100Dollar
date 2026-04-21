import { useLang } from '@erag/lang-sync-inertia/react';
import { Form, Head, Link } from '@inertiajs/react';
import AuthLayout from '@/app/layouts/auth/auth-layout';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';


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
    const { __ } = useLang();

    return (
        <AuthLayout>
            <Head title={__('messages.login.hero_title')} />

            <header className="mb-10 text-start">
                <h2 className="font-headline mb-2 text-3xl font-extrabold tracking-tight text-on-surface dark:text-white">
                    {__('messages.login.welcome_back')}
                </h2>
                <p className="text-on-surface-variant">
                    {__('messages.login.subtitle')}
                </p>
            </header>

            {status && (
                <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {status}
                </div>
            )}

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="space-y-6"
            >
                {({ processing, errors }) => (
                    <>
                        <input type="hidden" name="_auth_context" value="app" />
                        <input type="hidden" name="_locale" value={window.location.pathname.split('/')[1]} />

                        <div className="space-y-2">
                            <Label htmlFor="email" className="block w-full">{__('messages.login.email_label')}</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoFocus
                                placeholder="example@domain.com"
                                className="h-12 text-start"
                                tabIndex={1}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">{__('messages.login.password_label')}</Label>
                                {canResetPassword && (
                                    <Link
                                        className="text-xs font-bold text-primary hover:underline"
                                        href={request()}
                                    >
                                        {__('messages.login.forgot_password')}
                                    </Link>
                                )}
                            </div>
                            <PasswordInput
                                id="password"
                                name="password"
                                required
                                placeholder="••••••••"
                                className="h-12 text-start"
                                tabIndex={2}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center justify-start gap-3">
                            <Checkbox id="remember-me" name="remember" />
                            <Label
                                className="text-on-surface-variant cursor-pointer text-sm font-normal"
                                htmlFor="remember-me"
                            >
                                {__('messages.login.remember_me')}
                            </Label>
                        </div>

                        <Button
                            className="h-12 w-full text-lg font-bold"
                            type="submit"
                            disabled={processing}
                        >
                            <span>{__('messages.login.login_button')}</span>
                            {processing ? (
                                <Spinner className="size-5" />
                            ) : (
                                <span className="material-symbols-outlined text-xl">
                                    login
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
                        {__('messages.login.or_continue_with')}
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
                        <span>{__('messages.login.google_login')}</span>
                    </Button>
                </div>
                {canRegister && (
                    <p className="text-on-surface-variant text-sm">
                        {__('messages.login.no_account')}{' '}
                        <Link
                            className="font-bold text-primary hover:underline"
                            href={register()}
                        >
                            {__('messages.login.create_account')}
                        </Link>
                    </p>
                )}
            </div>
        </AuthLayout>
    );
}
