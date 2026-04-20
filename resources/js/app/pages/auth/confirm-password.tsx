import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/app/layouts/auth/auth-layout';
import { store } from '@/routes/password/confirm';
import { useLang } from '@erag/lang-sync-inertia/react';

export default function ConfirmPassword() {
    const { __ } = useLang();

    return (
        <AuthLayout>
            <Head title={__('messages.confirm_password.hero_title')} />

            <div className="mb-4 text-sm text-on-surface-variant">
                {__('messages.confirm_password.subtitle')}
            </div>

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <div className="space-y-6">
                        <input type="hidden" name="_auth_context" value="app" />

                        <div className="grid gap-2">
                            <Label htmlFor="password">{__('messages.confirm_password.password_label')}</Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                autoFocus
                                className="h-12 text-start"
                            />

                            <InputError message={errors.password} />
                        </div>

                        <Button
                            className="w-full h-12 text-lg font-bold"
                            disabled={processing}
                            data-test="app-confirm-password-button"
                        >
                            {processing ? (
                                <Spinner className="size-5" />
                            ) : (
                                <span>{__('messages.confirm_password.confirm_button')}</span>
                            )}
                        </Button>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
