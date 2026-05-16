import { useLang } from '@erag/lang-sync-inertia/react';
import { Form, Head, usePage } from '@inertiajs/react';
import { Button } from '@/app/components/ui/button';
import AuthLayout from '@/app/layouts/auth/auth-layout';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    const { locale } = usePage().props;
    const { __ } = useLang();
    const isRtl = locale === 'ar';

    return (
        <AuthLayout>
            <Head title={__('messages.confirm_password.hero_title')} />

            <div
                className={cn(
                    'mb-6 text-sm text-on-surface-variant',
                    isRtl ? 'text-right' : 'text-left',
                )}
            >
                {__('messages.confirm_password.subtitle')}
            </div>

            <Form action={store()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <div className="space-y-6">
                        <input
                            type="hidden"
                            name="_locale"
                            value={locale as string}
                        />

                        <div className="grid gap-2">
                            <Label
                                htmlFor="password"
                                className={cn(
                                    'block px-1 text-[11px] font-black tracking-wider text-on-surface-variant uppercase',
                                    isRtl ? 'text-right' : 'text-left',
                                )}
                            >
                                {__('messages.confirm_password.password_label')}
                            </Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                autoFocus
                                className={cn(
                                    'h-12',
                                    isRtl ? 'text-right' : 'text-left',
                                )}
                            />

                            <InputError
                                message={errors.password}
                                className={isRtl ? 'text-right' : 'text-left'}
                            />
                        </div>

                        <Button
                            className="h-12 w-full text-lg font-bold"
                            disabled={processing}
                            data-test="app-confirm-password-button"
                        >
                            {processing ? (
                                <Spinner className="size-5" />
                            ) : (
                                <span>
                                    {__(
                                        'messages.confirm_password.confirm_button',
                                    )}
                                </span>
                            )}
                        </Button>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
