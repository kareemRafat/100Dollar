import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, usePage, useForm } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useEffect, useMemo, useState } from 'react';
import type { SubmitEvent } from 'react';
import { Button } from '@/app/components/ui/button';
import AuthLayout from '@/app/layouts/auth/auth-layout';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { cn } from '@/lib/utils';

export default function TwoFactorChallenge() {
    const { locale, flash } = usePage().props as {
        locale: string;
        flash?: { message?: string; retry_after?: number | null };
    };
    const { __ } = useLang();
    const [showRecoveryInput, setShowRecoveryInput] = useState(false);
    const [retryAfter, setRetryAfter] = useState<number>(
        Number(flash?.retry_after ?? 0),
    );
    const isRtl = locale === 'ar';
    const isBlocked = retryAfter > 0;
    const waitButtonText =
        locale === 'ar'
            ? `حاول مرة أخرى بعد ${retryAfter} ثانية`
            : `Try again in ${retryAfter} seconds`;

    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            code: '',
            recovery_code: '',
            _locale: locale as string,
        });

    const content = useMemo(() => {
        if (showRecoveryInput) {
            return {
                title: __('messages.two_factor_challenge.recovery_code_title'),
                description: __(
                    'messages.two_factor_challenge.recovery_code_description',
                ),
                toggleText: __(
                    'messages.two_factor_challenge.toggle_auth_code',
                ),
                placeholder: __(
                    'messages.two_factor_challenge.recovery_code_placeholder',
                ),
            };
        }

        return {
            title: __('messages.two_factor_challenge.title'),
            description: __('messages.two_factor_challenge.description'),
            toggleText: __(
                'messages.two_factor_challenge.toggle_recovery_code',
            ),
            placeholder: '••••••',
        };
    }, [showRecoveryInput, __]);

    useEffect(() => {
        setRetryAfter(Number(flash?.retry_after ?? 0));
    }, [flash?.retry_after]);

    useEffect(() => {
        if (retryAfter <= 0) {
            return;
        }

        const timer = window.setInterval(() => {
            setRetryAfter((current) => (current > 0 ? current - 1 : 0));
        }, 1000);

        return () => window.clearInterval(timer);
    }, [retryAfter]);

    const submit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/two-factor-challenge', {
            onStart: () => {
                if (!showRecoveryInput) {
                    reset('code');
                } else {
                    reset('recovery_code');
                }
            },
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
                <div
                    className={cn(
                        'space-y-2',
                        isRtl ? 'text-right' : 'text-left',
                    )}
                >
                    <h1 className="text-2xl font-bold text-on-surface dark:text-white">
                        {content.title}
                    </h1>
                    <p className="text-sm text-on-surface-variant">
                        {content.description}
                    </p>
                </div>

                {flash?.message ? (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                        {flash.message}
                    </div>
                ) : null}

                <form onSubmit={submit} className="space-y-4">
                    {showRecoveryInput ? (
                        <div className="space-y-2">
                            <Input
                                name="recovery_code"
                                type="text"
                                placeholder={content.placeholder}
                                value={data.recovery_code}
                                onChange={(e) =>
                                    setData('recovery_code', e.target.value)
                                }
                                autoFocus={showRecoveryInput}
                                required
                                disabled={processing || isBlocked}
                                className={cn(
                                    isRtl ? 'text-right' : 'text-left',
                                )}
                            />
                            <InputError message={errors.recovery_code} />
                        </div>
                    ) : (
                        <div
                            className="flex flex-col items-center justify-center space-y-3 text-center"
                            dir="ltr"
                        >
                            <InputOTP
                                name="code"
                                maxLength={OTP_MAX_LENGTH}
                                value={data.code}
                                onChange={(val) => setData('code', val)}
                                disabled={processing || isBlocked}
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

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing || isBlocked}
                    >
                        {isBlocked
                            ? waitButtonText
                            : __(
                                  'messages.two_factor_challenge.continue_button',
                              )}
                    </Button>

                    <button
                        type="button"
                        className="w-full text-sm text-primary underline underline-offset-4 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={processing || isBlocked}
                        onClick={() => {
                            setShowRecoveryInput((current) => !current);
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
