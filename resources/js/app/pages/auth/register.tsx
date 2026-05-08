import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import { CountrySelect } from '@/app/components/country-select';
import { Button } from '@/app/components/ui/button';
import AuthLayout from '@/app/layouts/auth/auth-layout';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { contact, terms } from '@/routes/app';
import { store } from '@/routes/register';

interface Country {
    id: number;
    name_en: string;
    name_ar: string;
    code: string;
}

type Props = {
    canLogin: boolean;
    countries: Country[];
};

export default function Register({ canLogin, countries }: Props) {
    const { __ } = useLang();
    const { locale } = usePage().props as any;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        country_id: '',
        nationality: '',
        password: '',
        password_confirmation: '',
        terms: false,
        _locale: locale,
    });

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(store.url(), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout maxWidth="max-w-4xl">
            <Head title={__('messages.register.hero_title')} />

            <header className="mb-8 text-start">
                <h2 className="mb-1.5 font-headline text-2xl font-extrabold tracking-tight text-on-surface md:text-3xl dark:text-white">
                    {__('messages.register.welcome_title')}
                </h2>
                <p className="text-sm text-on-surface-variant">
                    {__('messages.register.subtitle')}
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            {__('messages.register.full_name')}
                        </Label>

                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoFocus
                            placeholder={__(
                                'messages.register.full_name_placeholder',
                            )}
                            className="h-10 text-start text-sm"
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="block w-full text-xs">
                            {__('messages.login.email_label')}
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            placeholder="example@domain.com"
                            className="h-10 text-start text-sm"
                        />
                        <InputError message={errors.email} />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="phone" className="block w-full text-xs">
                        {__('messages.register.phone_label')}
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                        placeholder={__('messages.register.phone_placeholder')}
                        className="h-10 text-start text-sm"
                        dir="ltr"
                    />
                    <InputError message={errors.phone} />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <CountrySelect
                        value={data.country_id}
                        onValueChange={(value) => setData('country_id', value)}
                        countries={countries}
                        label={__('messages.register.country_residence')}
                        error={errors.country_id}
                        size="default"
                        triggerClassName="h-10 text-start text-sm"
                        required
                    />

                    <div className="space-y-1.5">
                        <Label
                            htmlFor="nationality"
                            className="block w-full text-xs"
                        >
                            {__('messages.register.nationality')}
                        </Label>
                        <Input
                            id="nationality"
                            name="nationality"
                            type="text"
                            value={data.nationality}
                            onChange={(e) =>
                                setData('nationality', e.target.value)
                            }
                            required
                            placeholder={__(
                                'messages.register.nationality_placeholder',
                            )}
                            className="h-10 text-start text-sm"
                        />
                        <InputError message={errors.nationality} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                        <Label
                            htmlFor="password"
                            className="block w-full text-xs"
                        >
                            {__('messages.login.password_label')}
                        </Label>
                        <PasswordInput
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            required
                            placeholder="••••••••"
                            className="h-10 text-start text-sm"
                        />
                        <InputError message={errors.password} />
                    </div>
                    <div className="space-y-1.5">
                        <Label
                            htmlFor="password_confirmation"
                            className="block w-full text-xs"
                        >
                            {__('messages.register.confirm_password')}
                        </Label>
                        <Input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                            placeholder="••••••••"
                            className="h-10 text-start text-sm"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-start gap-3">
                        <Checkbox
                            id="terms"
                            name="terms"
                            required
                            checked={data.terms}
                            onCheckedChange={(checked) =>
                                setData('terms', checked === true)
                            }
                            className="mt-0.5 h-4 w-4"
                        />
                        <Label
                            className="cursor-pointer text-start text-xs leading-relaxed text-on-surface-variant"
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
                    <InputError message={errors.terms} />
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
            </form>

            <div className="mt-6 flex flex-col items-center gap-5">
                <div className="flex w-full items-center gap-4">
                    <div className="h-px flex-1 bg-outline-variant/30" />
                    <span className="text-[10px] font-medium text-on-surface-variant">
                        {__('messages.login.or_continue_with')}
                    </span>
                    <div className="h-px flex-1 bg-outline-variant/30" />
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
                    <p className="text-xs text-on-surface-variant">
                        {__('messages.register.have_account')}{' '}
                        <Link
                            className="font-bold text-primary hover:underline"
                            href={login.url()}
                        >
                            {__('messages.login.login_button')}
                        </Link>
                    </p>
                )}
            </div>

            <footer className="mx-auto mt-12 flex w-full items-center justify-between text-[9px] text-on-surface-variant opacity-60">
                <span>
                    © {new Date().getFullYear()} {__('messages.ideas_100')}.{' '}
                    {__('messages.footer.rights_reserved')}
                </span>
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
