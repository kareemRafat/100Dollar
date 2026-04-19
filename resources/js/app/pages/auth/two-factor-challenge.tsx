import { Form, Head } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import AuthLayout from '@/app/layouts/auth/auth-layout';
import { store } from '@/routes/two-factor/login';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState(false);
    const [code, setCode] = useState('');

    const content = useMemo(() => {
        if (showRecoveryInput) {
            return {
                title: 'Recovery code',
                description:
                    'Use one of your recovery codes to finish signing in.',
                toggleText: 'Use an authentication code instead',
            };
        }

        return {
            title: 'Authentication code',
            description:
                'Enter the code from your authenticator application.',
            toggleText: 'Use a recovery code instead',
        };
    }, [showRecoveryInput]);

    return (
        <AuthLayout>
            <Head title="Two-factor authentication" />

            <div className="space-y-6">
                <div className="space-y-2 text-right">
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

                            {showRecoveryInput ? (
                                <div className="space-y-2">
                                    <Input
                                        name="recovery_code"
                                        type="text"
                                        placeholder="Enter recovery code"
                                        autoFocus={showRecoveryInput}
                                        required
                                    />
                                    <InputError
                                        message={errors.recovery_code}
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-3 text-center">
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
                                Continue
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
