import { useLang } from '@erag/lang-sync-inertia/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AuthLayout from '@/app/layouts/auth/auth-layout';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    const { __ } = useLang();
    const { locale } = usePage().props;
    const [newPassword, setNewPassword] = useState('');

    const hasMinLength = newPassword.length >= 8;
    const hasSpecialChar = /[@#$!%*?&]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const strength = [hasMinLength, hasSpecialChar, hasNumber].filter(
        Boolean,
    ).length;
    
    const strengthLabel =
        strength === 3
            ? __('messages.reset_password.strength_strong')
            : strength === 2
              ? __('messages.reset_password.strength_medium')
              : strength === 1
                ? __('messages.reset_password.strength_weak')
                : '';
    const strengthColor =
        strength === 3
            ? 'bg-green-500'
            : strength === 2
              ? 'bg-primary'
              : 'bg-error';

    return (
        <AuthLayout>
            <Head title={__('messages.reset_password.hero_title')} />

            <header className="mb-12 text-start">
                <h1 className="font-headline mb-2 text-3xl font-extrabold tracking-tight text-on-surface dark:text-white">
                    {__('messages.reset_password.hero_title')}
                </h1>
                <p className="text-on-surface-variant text-lg">
                    {__('messages.reset_password.subtitle')}
                </p>
            </header>

            <Form
                {...update.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                className="space-y-8"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="new_password">{__('messages.reset_password.new_password_label')}</Label>
                            <PasswordInput
                                id="new_password"
                                name="password"
                                required
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                autoFocus
                                className="h-12 text-start"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="space-y-3 px-1">
                            <div className="flex items-center justify-between text-xs font-medium">
                                <span className="text-on-surface-variant">
                                    {__('messages.reset_password.strength_label')}
                                </span>
                                {strengthLabel && (
                                    <span
                                        className={`font-bold ${strength === 3 ? 'text-green-600' : 'text-primary'}`}
                                    >
                                        {strengthLabel}
                                    </span>
                                )}
                            </div>
                            <div className="bg-outline-variant/20 flex h-1.5 w-full gap-1 overflow-hidden rounded-full">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className={`h-full w-1/4 rounded-full transition-all ${i <= strength ? strengthColor : 'bg-outline-variant/30'}`}
                                    />
                                ))}
                            </div>
                            <ul className="text-on-surface-variant flex flex-wrap gap-x-4 gap-y-1 text-[11px] justify-start" dir="auto">
                                <li className="flex items-center gap-1">
                                    <span
                                        className={`material-symbols-outlined text-[14px] ${hasMinLength ? 'text-primary' : 'text-outline-variant'}`}
                                        style={
                                            hasMinLength
                                                ? {
                                                      fontVariationSettings:
                                                          "'FILL' 1",
                                                  }
                                                : undefined
                                        }
                                    >
                                        {hasMinLength
                                            ? 'check_circle'
                                            : 'radio_button_unchecked'}
                                    </span>
                                    {__('messages.reset_password.requirement_min_length')}
                                </li>
                                <li className="flex items-center gap-1">
                                    <span
                                        className={`material-symbols-outlined text-[14px] ${hasSpecialChar ? 'text-primary' : 'text-outline-variant'}`}
                                        style={
                                            hasSpecialChar
                                                ? {
                                                      fontVariationSettings:
                                                          "'FILL' 1",
                                                  }
                                                : undefined
                                        }
                                    >
                                        {hasSpecialChar
                                            ? 'check_circle'
                                            : 'radio_button_unchecked'}
                                    </span>
                                    {__('messages.reset_password.requirement_special_char')}
                                </li>
                                <li className="flex items-center gap-1">
                                    <span
                                        className={`material-symbols-outlined text-[14px] ${hasNumber ? 'text-primary' : 'text-outline-variant'}`}
                                        style={
                                            hasNumber
                                                ? {
                                                      fontVariationSettings:
                                                          "'FILL' 1",
                                                  }
                                                : undefined
                                        }
                                    >
                                        {hasNumber
                                            ? 'check_circle'
                                            : 'radio_button_unchecked'}
                                    </span>
                                    {__('messages.reset_password.requirement_numbers')}
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirm_password">{__('messages.reset_password.confirm_password_label')}</Label>
                            <Input
                                id="confirm_password"
                                name="password_confirmation"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="h-12 text-start"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <input type="hidden" name="_locale" value={locale as string} />
                        <input type="hidden" name="token" value={token} />
                        <input type="hidden" name="email" value={email} />

                        <Button
                            className="h-12 w-full text-lg font-bold"
                            type="submit"
                            disabled={processing}
                        >
                            <span>{__('messages.reset_password.update_button')}</span>
                            {processing && <Spinner className="size-5" />}
                        </Button>

                        <div className="mt-6 text-center">
                            <Link
                                className="flex items-center justify-center gap-2 font-bold text-primary transition-colors hover:underline"
                                href={login.url()}
                            >
                                <span className="material-symbols-outlined text-sm rtl:rotate-180">
                                    arrow_back
                                </span>
                                {__('messages.forgot_password.back_to_login')}
                            </Link>
                        </div>
                    </>
                )}
            </Form>

            <footer className="text-on-surface-variant mt-16 text-center text-[10px] opacity-60">
                <span>© {new Date().getFullYear()} {__('messages.ideas_100')}. {__('messages.footer.rights_reserved')}</span>
            </footer>
        </AuthLayout>
    );
}
