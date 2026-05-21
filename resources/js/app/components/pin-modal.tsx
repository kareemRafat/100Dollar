import { useLang } from '@erag/lang-sync-inertia/react';
import { useHttp, router } from '@inertiajs/react';
import { Loader2, Mail, ShieldCheck, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent, ChangeEvent } from 'react';
import { Button } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/toast';
import voteRoute from '@/routes/app/ideas/vote';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    ideaId: number;
    initialEmail?: string;
    onSuccess?: (votesCount: number) => void;
};

type Step = 'email' | 'otp';

export function PinModal({
    isOpen,
    onClose,
    ideaId,
    initialEmail,
    onSuccess,
}: Props) {
    const { __ } = useLang();
    const [step, setStep] = useState<Step>(initialEmail ? 'otp' : 'email');
    const [resendTimer, setResendTimer] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const { data, setData, post, processing, errors, clearErrors } = useHttp({
        email: initialEmail || '',
        otp: '',
    });

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [resendTimer]);

    if (!isOpen) {
        return null;
    }

    const handleSendOtp = (targetEmail?: string) => {
        const emailToSend = targetEmail || data.email;

        if (!emailToSend || !/^\S+@\S+\.\S+$/.test(emailToSend)) {
            toast.error(
                __('validation.email', {
                    attribute: __('messages.vote_pin.email_label'),
                }),
            );

            return;
        }

        clearErrors();
        post(voteRoute.sendOtp.url(ideaId), {
            onSuccess: (response: any) => {
                toast.success(response.message);
                setStep('otp');
                setResendTimer(60);
            },
            onError: (errs: any) => {
                if (!errs.email) {
                    toast.error(errs.message || __('messages.common.error'));
                }
            },
            onHttpException: (response: any) => {
                if (response.status === 429) {
                    router.reload({ only: ['vote_block'] });
                }

                let message = __('messages.common.error');

                try {
                    const data =
                        typeof response.data === 'string'
                            ? JSON.parse(response.data)
                            : response.data;

                    message = data?.message || message;

                    if (message.includes(':time')) {
                        // The server response usually has the time, but if it doesn't, we show a generic "10 minutes"
                        message = message.replace(
                            ':time',
                            '10 ' +
                                __('messages.vote_pin.resend')
                                    .split('(')[0]
                                    .trim()
                                    .includes('دقيقة')
                                ? 'دقائق'
                                : 'minutes',
                        );
                    }
                } catch {
                    if (
                        typeof response.data === 'string' &&
                        response.data.trim()
                    ) {
                        message = response.data;
                    }
                }

                toast.error(message);
            },
        });
    };

    const handleVerifyOtp = () => {
        if (data.otp.length !== 6) {
            return;
        }

        clearErrors();
        post(voteRoute.verify.url(ideaId), {
            onSuccess: (response: any) => {
                toast.success(response.message);

                if (onSuccess) {
                    onSuccess(response.votes_count);
                }

                handleClose();
            },
            onError: (errs: any) => {
                if (!errs.otp) {
                    toast.error(errs.message || __('messages.common.error'));
                }
            },
            onHttpException: (response: any) => {
                if (response.status === 429) {
                    router.reload({ only: ['vote_block'] });
                }

                let message = __('messages.common.error');

                try {
                    const data =
                        typeof response.data === 'string'
                            ? JSON.parse(response.data)
                            : response.data;

                    message = data?.message || message;

                    if (message.includes(':time')) {
                        // The server response usually has the time, but if it doesn't, we show a generic "10 minutes"
                        message = message.replace(
                            ':time',
                            '10 ' +
                                __('messages.vote_pin.resend')
                                    .split('(')[0]
                                    .trim()
                                    .includes('دقيقة')
                                ? 'دقائق'
                                : 'minutes',
                        );
                    }
                } catch {
                    if (
                        typeof response.data === 'string' &&
                        response.data.trim()
                    ) {
                        message = response.data;
                    }
                }

                toast.error(message);
            },
        });
    };

    function handleChange(index: number, e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.slice(-1);

        if (!/^\d*$/.test(value)) {
            return;
        }

        const newOtp = data.otp.split('');
        newOtp[index] = value;
        setData('otp', newOtp.join(''));

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Backspace' && !data.otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === 'Enter' && data.otp.length === 6) {
            handleVerifyOtp();
        }
    }

    function handleClose() {
        setData('otp', '');
        clearErrors();
        setStep(initialEmail ? 'otp' : 'email');
        onClose();
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-deep-navy/10 p-4 backdrop-blur-sm sm:p-6 dark:bg-deep-navy/40"
            onClick={handleClose}
        >
            <div
                className="relative flex w-full max-w-[440px] flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl sm:p-12 dark:border-gray-800 dark:bg-gray-900"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-6 right-6 text-gray-400 transition-colors hover:text-deep-navy dark:text-gray-500 dark:hover:text-gray-100"
                    onClick={handleClose}
                    type="button"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="mb-8 rounded-full border border-primary/10 bg-primary/5 p-5 text-primary">
                    {step === 'email' ? (
                        <Mail className="h-10 w-10" />
                    ) : (
                        <ShieldCheck className="h-10 w-10" />
                    )}
                </div>

                <div className="w-full">
                    {step === 'email' ? (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="mb-3 font-headline text-2xl font-bold text-deep-navy dark:text-gray-100">
                                    {__('messages.vote_pin.email_title')}
                                </h2>
                                <p className="px-4 font-body text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                    {__('messages.vote_pin.email_desc')}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-deep-navy dark:text-gray-300">
                                    {__('messages.vote_pin.email_label')}
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    placeholder={__(
                                        'messages.vote_pin.email_placeholder',
                                    )}
                                    className={`w-full rounded-xl border-gray-200 bg-gray-50 p-4 text-deep-navy transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 ${errors.email ? 'border-red-500 ring-red-500/20' : ''}`}
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && handleSendOtp()
                                    }
                                />
                                {errors.email && (
                                    <p className="text-xs font-bold text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <Button
                                className="h-14 w-full rounded-xl text-lg font-bold shadow-lg"
                                onClick={() => handleSendOtp()}
                                disabled={processing}
                            >
                                {processing ? (
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                ) : null}
                                {__('messages.vote_pin.send_code')}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="mb-3 font-headline text-2xl font-bold text-deep-navy dark:text-gray-100">
                                    {__('messages.vote_pin.title')}
                                </h2>
                                <p className="px-4 font-body text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                    {__('messages.vote_pin.desc')}
                                    <br />
                                    <span className="font-semibold text-primary">
                                        {data.email}
                                    </span>
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div
                                    className="flex justify-center gap-2 sm:gap-3"
                                    dir="ltr"
                                >
                                    {Array(6)
                                        .fill('')
                                        .map((_, i) => (
                                            <input
                                                key={i}
                                                autoFocus={i === 0}
                                                ref={(el) => {
                                                    inputRefs.current[i] = el;
                                                }}
                                                className={`h-14 w-10 rounded-xl border-gray-200 bg-gray-50 text-center text-2xl font-bold text-deep-navy transition-all placeholder:text-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:h-16 sm:w-12 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-600 ${errors.otp ? 'border-red-500 ring-red-500/20' : ''}`}
                                                maxLength={1}
                                                placeholder="-"
                                                type="text"
                                                inputMode="numeric"
                                                value={data.otp[i] || ''}
                                                onChange={(e) =>
                                                    handleChange(i, e)
                                                }
                                                onKeyDown={(e) =>
                                                    handleKeyDown(i, e)
                                                }
                                            />
                                        ))}
                                </div>
                                {errors.otp && (
                                    <p className="text-center text-xs font-bold text-red-500">
                                        {errors.otp}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-4">
                                <Button
                                    className="h-14 w-full rounded-xl text-lg font-bold shadow-lg"
                                    onClick={handleVerifyOtp}
                                    disabled={
                                        processing || data.otp.length !== 6
                                    }
                                >
                                    {processing ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : null}
                                    {__('messages.vote_pin.confirm')}
                                </Button>

                                <div className="flex flex-col items-center gap-4">
                                    <button
                                        className="text-sm font-bold text-primary transition-all hover:text-primary/80 disabled:opacity-50 disabled:hover:text-primary"
                                        type="button"
                                        onClick={() => handleSendOtp()}
                                        disabled={processing || resendTimer > 0}
                                    >
                                        {resendTimer > 0
                                            ? `${__('messages.vote_pin.resend')} (${resendTimer}s)`
                                            : __('messages.vote_pin.resend')}
                                    </button>

                                    {!initialEmail && (
                                        <button
                                            className="text-xs font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                            onClick={() => {
                                                setStep('email');
                                                clearErrors();
                                            }}
                                            disabled={processing}
                                        >
                                            {__(
                                                'messages.vote_pin.change_email',
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
