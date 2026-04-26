import { Head, useForm } from '@inertiajs/react';
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
import { cn } from '@/lib/utils';
import { store } from '@/routes/admin/two-factor';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        code: '',
        recovery_code: '',
    });

    const authConfigContent = useMemo<{
        title: string;
        description: string;
        toggleText: string;
        placeholder: string;
    }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'رمز الاسترداد',
                description:
                    'يرجى تأكيد الوصول إلى حسابك عن طريق إدخال أحد رموز استرداد الطوارئ الخاصة بك.',
                toggleText: 'استخدام رمز مصادقة بدلاً من ذلك',
                placeholder: 'أدخل رمز الاسترداد هنا',
            };
        }

        return {
            title: 'المصادقة الثنائية',
            description:
                'يرجى تأكيد الوصول إلى حسابك عن طريق إدخال رمز المصادقة المقدم من تطبيق المصادقة الخاص بك.',
            toggleText: 'استخدام رمز استرداد بدلاً من ذلك',
            placeholder: '••••••',
        };
    }, [showRecoveryInput]);

    const toggleRecoveryMode = (): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setData({
            ...data,
            code: '',
            recovery_code: '',
        });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url(), {
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
        <div dir="rtl">
            <Head title="المصادقة الثنائية" />

            <div className="space-y-6">
                <div className="space-y-2 text-right">
                    <h1 className="text-2xl font-bold">
                        {authConfigContent.title}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {authConfigContent.description}
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    {showRecoveryInput ? (
                        <>
                            <Input
                                name="recovery_code"
                                type="text"
                                placeholder={authConfigContent.placeholder}
                                value={data.recovery_code}
                                onChange={(e) => setData('recovery_code', e.target.value)}
                                autoFocus={showRecoveryInput}
                                required
                                className="text-right"
                            />
                            <InputError
                                message={errors.recovery_code}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center space-y-3 text-center" dir="ltr">
                            <div className="flex w-full items-center justify-center">
                                <InputOTP
                                    name="code"
                                    maxLength={OTP_MAX_LENGTH}
                                    value={data.code}
                                    onChange={(value) => setData('code', value)}
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
                            </div>
                            <div dir="rtl" className="w-full">
                                <InputError message={errors.code} />
                            </div>
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        متابعة
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                        <button
                            type="button"
                            className="cursor-pointer text-primary underline underline-offset-4 transition-colors duration-300 ease-out hover:text-primary/80"
                            onClick={toggleRecoveryMode}
                        >
                            {authConfigContent.toggleText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
