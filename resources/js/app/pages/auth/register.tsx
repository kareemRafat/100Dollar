import { Form, Head, Link } from '@inertiajs/react';
import AuthLayout from '@/app/layouts/auth/auth-layout';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { contact, terms } from '@/routes/app';
import { store } from '@/routes/register';
import { useLang } from '@erag/lang-sync-inertia/react';

type Props = {
    canLogin: boolean;
};

export default function Register({ canLogin }: Props) {
    const { __ } = useLang();

    return (
        <AuthLayout>
            <Head title={__('messages.register.hero_title')} />

            <header className="mb-10 text-right">
                <h2 className="font-headline mb-2 text-3xl font-extrabold tracking-tight text-on-surface dark:text-white">
                    {__('messages.register.welcome_title')}
                </h2>
                <p className="text-on-surface-variant">
                    {__('messages.register.subtitle')}
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
                                <Label htmlFor="name" className="text-right block w-full">{__('messages.register.full_name')}</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoFocus
                                    placeholder={__('messages.register.full_name_placeholder')}
                                    className="h-12 text-right"
                                    dir="rtl"
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-right block w-full">{__('messages.login.email_label')}</Label>
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
                                <Label htmlFor="phone" className="text-right block w-full">{__('messages.register.phone_label')}</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    placeholder={__('messages.register.phone_placeholder')}
                                    className="h-12 text-right"
                                    dir="ltr"
                                />
                                <InputError message={errors.phone} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country" className="text-right block w-full">{__('messages.register.country_residence')}</Label>
                                <Input
                                    id="country"
                                    name="country"
                                    type="text"
                                    required
                                    placeholder={__('messages.register.country_placeholder')}
                                    className="h-12 text-right"
                                    dir="rtl"
                                />
                                <InputError message={errors.country} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nationality" className="text-right block w-full">{__('messages.register.nationality')}</Label>
                            <Input
                                id="nationality"
                                name="nationality"
                                type="text"
                                required
                                placeholder={__('messages.register.nationality_placeholder')}
                                className="h-12 text-right"
                                dir="rtl"
                            />
                            <InputError message={errors.nationality} />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="password">{__('messages.login.password_label')}</Label>
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
                                <Label htmlFor="password_confirmation">{__('messages.register.confirm_password')}</Label>
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
                                {__('messages.register.agree_terms')}{' '}
                                <Link
                                    className="font-bold text-primary hover:underline"
                                    href={terms()}
                                >
                                    {__('messages.register.terms_of_service')}
                                </Link>{' '}
                                {__('messages.register.and')}{' '}
                                <Link
                                    className="font-bold text-primary hover:underline"
                                    href="#"
                                >
                                    {__('messages.register.privacy_policy')}
                                </Link>{' '}
                                .
                            </Label>
                            <Checkbox id="terms" name="terms" required className="mt-1" />
                        </div>

                        <Button
                            className="h-12 w-full text-lg font-bold"
                            type="submit"
                            disabled={processing}
                        >
                            <span>{__('messages.register.submit_button')}</span>
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
                {canLogin && (
                    <p className="text-on-surface-variant text-sm">
                        {__('messages.register.have_account')}{' '}
                        <Link
                            className="font-bold text-primary hover:underline"
                            href={login()}
                        >
                            {__('messages.login.login_button')}
                        </Link>
                    </p>
                )}
            </div>

            <footer className="text-on-surface-variant mx-auto mt-16 flex w-full max-w-xl items-center justify-between text-[10px] opacity-60">
                <span>© {new Date().getFullYear()} {__('messages.ideas_100')}. {__('messages.footer.rights_reserved')}</span>
                <div className="flex gap-4">
                    <Link
                        className="transition-colors hover:text-primary"
                        href={contact()}
                    >
                        {__('messages.footer.support')}
                    </Link>
                    <Link
                        className="transition-colors hover:text-primary"
                        href="#"
                    >
                        {__('messages.footer.privacy')}
                    </Link>
                </div>
            </footer>
        </AuthLayout>
    );
}
