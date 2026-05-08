import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type {  SubmitEvent } from 'react';
import { Button } from '@/app/components/ui/button';
import AuthLayout from '@/app/layouts/auth/auth-layout';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
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
    const { locale } = usePage().props;
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get('redirect');

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        _locale: locale,
        redirect: redirectPath,
    });

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(store.url(), {
            onFinish: () => reset('password'),
        });
    };

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

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email" className="block w-full">{__('messages.login.email_label')}</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
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
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        placeholder="••••••••"
                        className="h-12 text-start"
                        tabIndex={2}
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center justify-start gap-3">
                    <Checkbox
                        id="remember-me"
                        name="remember"
                        checked={data.remember}
                        onCheckedChange={(checked) => setData('remember', checked === true)}
                    />
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
            </form>

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
                            href={register.url()}
                        >
                            {__('messages.login.create_account')}
                        </Link>
                    </p>
                )}
            </div>
        </AuthLayout>
    );
}
