import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, usePage, useForm } from '@inertiajs/react';
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
import { cn } from '@/lib/utils';

export default function TwoFactorChallenge() {
    const { locale } = usePage().props;
    const { __ } = useLang();
    const [showRecoveryInput, setShowRecoveryInput] = useState(false);
    const isRtl = locale === 'ar';

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        code: '',
        recovery_code: '',
        _auth_context: 'app',
        _locale: locale as string,
    });

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

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/two-factor-challenge', {
            onFinish: () => {
                if (!showRecoveryInput) {
                    reset('code');
                } else {
                    reset('recovery_code');
                }
            },
        });
    };

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

                <form onSubmit={submit} className="space-y-4">
                    {showRecoveryInput ? (
                        <div className="space-y-2">
                            <Input
                                name="recovery_code"
                                type="text"
                                placeholder={content.placeholder}
                                value={data.recovery_code}
                                onChange={(e) => setData('recovery_code', e.target.value)}
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
                                value={data.code}
                                onChange={(val) => setData('code', val)}
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
                            setData({
                                ...data,
                                code: '',
                                recovery_code: '',
                            });
                        }}
                    >
                        {content.toggleText}
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
}

