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
        <AuthLayout maxWidth="max-w-4xl">
            <Head title={__('messages.register.hero_title')} />

            <header className="mb-8 text-start">
                <h2 className="font-headline mb-1.5 text-2xl font-extrabold tracking-tight text-on-surface dark:text-white md:text-3xl">
                    {__('messages.register.welcome_title')}
                </h2>
                <p className="text-on-surface-variant text-sm">
                    {__('messages.register.subtitle')}
                </p>
            </header>

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                className="space-y-5"
            >
                {({ processing, errors }) => (
                    <>
                        <input type="hidden" name="_auth_context" value="app" />

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label htmlFor="name" className="block w-full text-xs">{__('messages.register.full_name')}</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoFocus
                                    placeholder={__('messages.register.full_name_placeholder')}
                                    className="h-10 text-start text-sm"
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="block w-full text-xs">{__('messages.login.email_label')}</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="example@domain.com"
                                    className="h-10 text-start text-sm"
                                />
                                <InputError message={errors.email} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                             <div className="space-y-1.5">
                                <Label htmlFor="phone" className="block w-full text-xs">{__('messages.register.phone_label')}</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    placeholder={__('messages.register.phone_placeholder')}
                                    className="h-10 text-start text-sm"
                                    dir="ltr"
                                />
                                <InputError message={errors.phone} />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="country" className="block w-full text-xs">{__('messages.register.country_residence')}</Label>
                                <Input
                                    id="country"
                                    name="country"
                                    type="text"
                                    required
                                    placeholder={__('messages.register.country_placeholder')}
                                    className="h-10 text-start text-sm"
                                />
                                <InputError message={errors.country} />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="nationality" className="block w-full text-xs">{__('messages.register.nationality')}</Label>
                            <Input
                                id="nationality"
                                name="nationality"
                                type="text"
                                required
                                placeholder={__('messages.register.nationality_placeholder')}
                                className="h-10 text-start text-sm"
                            />
                            <InputError message={errors.nationality} />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label htmlFor="password">{__('messages.login.password_label')}</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    className="h-10 text-start text-sm"
                                />
                                <InputError message={errors.password} />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="password_confirmation" className="text-xs">{__('messages.register.confirm_password')}</Label>
                                <Input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="h-10 text-start text-sm"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>
                        </div>

                        <div className="flex items-start justify-start gap-3">
                            <Checkbox id="terms" name="terms" required className="mt-0.5 h-4 w-4" />
                            <Label
                                className="text-on-surface-variant text-xs leading-relaxed cursor-pointer text-start"
                                htmlFor="terms"
                            >
                                {__('messages.register.agree_terms')}{' '}
                                <Link
                                    className="font-bold text-primary hover:underline"
                                    href={terms()}
                                >
                                    {__('messages.register.terms_of_service')}
                                </Link>{' '}
                            </Label>
                        </div>

                        <Button
                            className="h-10 w-full text-base font-bold"
                            type="submit"
                            disabled={processing}
                        >
                            <span>{__('messages.register.submit_button')}</span>
                            {processing ? (
                                <Spinner className="size-4" />
                            ) : (
                                <span className="material-symbols-outlined text-lg rtl:rotate-180">
                                    arrow_forward
                                </span>
                            )}
                        </Button>
                    </>
                )}
            </Form>

            <div className="mt-6 flex flex-col items-center gap-5">
                <div className="flex w-full items-center gap-4">
                    <div className="bg-outline-variant/30 h-px flex-1" />
                    <span className="text-on-surface-variant text-[10px] font-medium">
                        {__('messages.login.or_continue_with')}
                    </span>
                    <div className="bg-outline-variant/30 h-px flex-1" />
                </div>
                <div className="w-full">
                    <Button
                        variant="outline"
                        className="h-10 w-full bg-surface-container-lowest text-sm font-bold dark:bg-surface-container-low"
                        type="button"
                    >
                        <img
                            alt="Google"
                            className="h-4 w-4"
                            src="https://www.google.com/favicon.ico"
                        />
                        <span>{__('messages.login.google_login')}</span>
                    </Button>
                </div>
                {canLogin && (
                    <p className="text-on-surface-variant text-xs">
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

            <footer className="text-on-surface-variant mx-auto mt-12 flex w-full items-center justify-between text-[9px] opacity-60">
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
