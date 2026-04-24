import { useLang } from '@erag/lang-sync-inertia/react';
import { Form, Head, usePage } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useMemo, useState } from 'react';
import AuthLayout from '@/app/layouts/auth/auth-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { login as store } from '@/routes/two-factor';
import { cn } from '@/lib/utils';

export default function TwoFactorChallenge() {
    const { locale } = usePage().props;
    const { __ } = useLang();
    const [showRecoveryInput, setShowRecoveryInput] = useState(false);
    const [code, setCode] = useState('');
    const isRtl = locale === 'ar';

    const content = useMemo(() => {
        if (showRecoveryInput) {
            return {
                title: __('messages.two_factor_challenge.recovery_code_title'),
                description: __('messages.two_factor_challenge.recovery_code_description'),
                toggleText: __('messages.two_factor_challenge.toggle_auth_code'),
                placeholder: __('messages.two_factor_challenge.recovery_code_placeholder'),
            };
        }

        return {
            title: __('messages.two_factor_challenge.title'),
            description: __('messages.two_factor_challenge.description'),
            toggleText: __('messages.two_factor_challenge.toggle_recovery_code'),
            placeholder: '••••••',
        };
    }, [showRecoveryInput, __]);

    return (
        <AuthLayout>
            <Head title={__('messages.two_factor_challenge.title')} />

            <div className="space-y-6">
                <div className={cn("space-y-2", isRtl ? "text-right" : "text-left")}>
                    <h1 className="text-2xl font-bold text-on-surface dark:text-white">
                        {content.title}
                    </h1>
                    <p className="text-sm text-on-surface-variant">
                        {content.description}
                    </p>
                </div>

                <Form
                    {...store.form()}
                    className="space-y-4"
                    resetOnError
                    resetOnSuccess={!showRecoveryInput}
                >
                    {({ errors, processing, clearErrors }) => (
                        <>
                            <input
                                type="hidden"
                                name="_auth_context"
                                value="app"
                            />
                            <input
                                type="hidden"
                                name="_locale"
                                value={locale as string}
                            />

                            {showRecoveryInput ? (
                                <div className="space-y-2">
                                    <Input
                                        name="recovery_code"
                                        type="text"
                                        placeholder={content.placeholder}
                                        autoFocus={showRecoveryInput}
                                        required
                                        className={cn(isRtl ? "text-right" : "text-left")}
                                    />
                                    <InputError
                                        message={errors.recovery_code}
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-3 text-center" dir="ltr">
                                    <InputOTP
                                        name="code"
                                        maxLength={OTP_MAX_LENGTH}
                                        value={code}
                                        onChange={setCode}
                                        disabled={processing}
                                        pattern={REGEXP_ONLY_DIGITS}
                                    >
                                        <InputOTPGroup>
                                            {Array.from(
                                                { length: OTP_MAX_LENGTH },
                                                (_, index) => (
                                                    <InputOTPSlot
                                                        key={index}
                                                        index={index}
                                                    />
                                                ),
                                            )}
                                        </InputOTPGroup>
                                    </InputOTP>
                                    <InputError message={errors.code} />
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={processing}>
                                {__('messages.two_factor_challenge.continue_button')}
                            </Button>

                            <button
                                type="button"
                                className="w-full text-sm text-primary underline underline-offset-4"
                                onClick={() => {
                                    setShowRecoveryInput((current) => ! current);
                                    clearErrors();
                                    setCode('');
                                }}
                            >
                                {content.toggleText}
                            </button>
                        </>
                    )}
                </Form>
            </div>
        </AuthLayout>
    );
}
