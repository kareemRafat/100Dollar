import { useLang } from '@erag/lang-sync-inertia/react';
import { Form, usePage } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Check, Copy, ScanLine } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AlertError from '@/components/alert-error';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { Spinner } from '@/components/ui/spinner';
import { useAppearance } from '@/hooks/use-appearance';
import { useClipboard } from '@/hooks/use-clipboard';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { cn } from '@/lib/utils';
import { confirm } from '@/routes/two-factor';
import type { RouteDefinition, RouteFormDefinition, RouteQueryOptions } from '@/wayfinder';

function GridScanIcon() {
    return (
        <div className="mb-3 rounded-full border border-border bg-card p-0.5 shadow-sm">
            <div className="relative overflow-hidden rounded-full border border-border bg-muted p-2.5">
                <div className="absolute inset-0 grid grid-cols-5 opacity-50">
                    {Array.from({ length: 5 }, (_, i) => (
                        <div
                            key={`col-${i + 1}`}
                            className="border-r border-border last:border-r-0"
                        />
                    ))}
                </div>
                <div className="absolute inset-0 grid grid-rows-5 opacity-50">
                    {Array.from({ length: 5 }, (_, i) => (
                        <div
                            key={`row-${i + 1}`}
                            className="border-b border-border last:border-b-0"
                        />
                    ))}
                </div>
                <ScanLine className="relative z-20 size-6 text-foreground" />
            </div>
        </div>
    );
}

function TwoFactorSetupStep({
    qrCodeSvg,
    manualSetupKey,
    buttonText,
    onNextStep,
    errors,
    labels,
}: {
    qrCodeSvg: string | null;
    manualSetupKey: string | null;
    buttonText: string;
    onNextStep: () => void;
    errors: string[];
    labels?: {
        setup_manual?: string;
    };
}) {
    const { resolvedAppearance } = useAppearance();
    const [copiedText, copy] = useClipboard();
    const { __ } = useLang();
    const IconComponent = copiedText === manualSetupKey ? Check : Copy;

    return (
        <>
            {errors?.length ? (
                <AlertError errors={errors} />
            ) : (
                <>
                    <div className="mx-auto flex max-w-md overflow-hidden">
                        <div className="mx-auto aspect-square w-64 rounded-lg border border-border">
                            <div className="z-10 flex h-full w-full items-center justify-center p-5">
                                {qrCodeSvg ? (
                                    <div
                                        className="aspect-square w-full rounded-lg bg-white p-2 [&_svg]:size-full"
                                        dangerouslySetInnerHTML={{
                                            __html: qrCodeSvg,
                                        }}
                                        style={{
                                            filter:
                                                resolvedAppearance === 'dark'
                                                    ? 'invert(1) brightness(1.5)'
                                                    : undefined,
                                        }}
                                    />
                                ) : (
                                    <Spinner />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full gap-5">
                        <Button className="w-full" onClick={onNextStep}>
                            {buttonText}
                        </Button>
                    </div>

                    <div className="relative flex w-full items-center justify-center">
                        <div className="absolute inset-0 top-1/2 h-px w-full bg-border" />
                        <span className="relative bg-card px-2 py-1 text-xs font-bold text-on-surface-variant">
                            {labels?.setup_manual ?? __('messages.two_factor.setup_manual')}
                        </span>
                    </div>

                    <div className="flex w-full gap-2">
                        <div className="flex w-full items-stretch overflow-hidden rounded-xl border border-border">
                            {!manualSetupKey ? (
                                <div className="flex h-full w-full items-center justify-center bg-muted p-3">
                                    <Spinner />
                                </div>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        readOnly
                                        value={manualSetupKey}
                                        className="h-full w-full bg-background p-3 text-foreground outline-none text-center font-mono"
                                        dir="ltr"
                                    />
                                    <button
                                        onClick={() => copy(manualSetupKey)}
                                        className="border-l border-border px-3 hover:bg-muted"
                                    >
                                        <IconComponent className="w-4" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

function TwoFactorVerificationStep({
    onClose,
    onBack,
    confirmRoute,
    labels,
}: {
    onClose: () => void;
    onBack: () => void;
    confirmRoute?: ((options?: RouteQueryOptions) => RouteDefinition<'post'>) & {
        form: (options?: RouteQueryOptions) => RouteFormDefinition<'post'>;
    };
    labels?: {
        setup_back?: string;
        setup_confirm?: string;
    };
}) {
    const { __ } = useLang();
    const [code, setCode] = useState<string>('');
    const pinInputContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            pinInputContainerRef.current?.querySelector('input')?.focus();
        }, 0);
    }, []);

    return (
        <Form
            {...(confirmRoute ?? confirm).form()}
            onSuccess={() => onClose()}
            resetOnError
            resetOnSuccess
        >
            {({
                processing,
                errors,
            }: {
                processing: boolean;
                errors?: { confirmTwoFactorAuthentication?: { code?: string } };
            }) => (
                <>
                    <div
                        ref={pinInputContainerRef}
                        className="relative w-full space-y-3"
                    >
                        <div className="flex w-full flex-col items-center space-y-3 py-2" dir="ltr">
                            <InputOTP
                                id="otp"
                                name="code"
                                maxLength={OTP_MAX_LENGTH}
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
                            <InputError
                                message={
                                    errors?.confirmTwoFactorAuthentication?.code
                                }
                            />
                        </div>

                        <div className="flex w-full gap-5">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={onBack}
                                disabled={processing}
                            >
                                {labels?.setup_back ?? __('messages.two_factor.setup_back')}
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={
                                    processing || code.length < OTP_MAX_LENGTH
                                }
                            >
                                {labels?.setup_confirm ?? __('messages.two_factor.setup_confirm')}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </Form>
    );
}

type Props = {
    isOpen: boolean;
    onClose: () => void;
    requiresConfirmation: boolean;
    twoFactorEnabled: boolean;
    qrCodeSvg: string | null;
    manualSetupKey: string | null;
    clearSetupData: () => void;
    clearErrors: () => void;
    fetchSetupData: () => Promise<void>;
    errors: string[];
    confirmRoute?: ((options?: RouteQueryOptions) => RouteDefinition<'post'>) & {
        form: (options?: RouteQueryOptions) => RouteFormDefinition<'post'>;
    };
    labels?: {
        enabled_title?: string;
        enabled_desc?: string;
        verify_title?: string;
        verify_desc?: string;
        setup_title?: string;
        setup_desc?: string;
        button_close?: string;
        button_continue?: string;
        setup_manual?: string;
        setup_back?: string;
        setup_confirm?: string;
    };
};

export default function TwoFactorSetupModal({
    isOpen,
    onClose,
    requiresConfirmation,
    twoFactorEnabled,
    qrCodeSvg,
    manualSetupKey,
    clearSetupData,
    clearErrors,
    fetchSetupData,
    errors,
    confirmRoute,
    labels,
}: Props) {
    const { __ } = useLang();
    const { locale } = usePage().props;
    const isRtl = locale === 'ar';
    const [showVerificationStep, setShowVerificationStep] =
        useState<boolean>(false);

    const modalConfig = useMemo<{
        title: string;
        description: string;
        buttonText: string;
    }>(() => {
        if (twoFactorEnabled) {
            return {
                title: labels?.enabled_title ?? __('messages.two_factor.setup_enabled_title'),
                description: labels?.enabled_desc ?? __('messages.two_factor.setup_enabled_desc'),
                buttonText: labels?.button_close ?? __('messages.two_factor.setup_close'),
            };
        }

        if (showVerificationStep) {
            return {
                title: labels?.verify_title ?? __('messages.two_factor.setup_verify_title'),
                description: labels?.verify_desc ?? __('messages.two_factor.setup_verify_desc'),
                buttonText: labels?.button_continue ?? __('messages.two_factor.setup_continue'),
            };
        }

        return {
            title: labels?.setup_title ?? __('messages.two_factor.setup_title'),
            description: labels?.setup_desc ?? __('messages.two_factor.setup_desc'),
            buttonText: labels?.button_continue ?? __('messages.two_factor.setup_continue'),
        };
    }, [twoFactorEnabled, showVerificationStep, __, labels]);

    const resetModalState = useCallback(() => {
        setShowVerificationStep(false);
        clearErrors();
    }, [clearErrors]);

    const handleClose = useCallback(() => {
        resetModalState();
        clearSetupData();
        onClose();
    }, [clearSetupData, onClose, resetModalState]);

    const handleModalNextStep = useCallback(() => {
        if (twoFactorEnabled) {
            handleClose();

            return;
        }

        if (requiresConfirmation) {
            setShowVerificationStep(true);

            return;
        }

        handleClose();
    }, [requiresConfirmation, handleClose, twoFactorEnabled]);

    const fetchSetupDataRef = useRef(fetchSetupData);

    useEffect(() => {
        fetchSetupDataRef.current = fetchSetupData;
    }, [fetchSetupData]);

    useEffect(() => {
        if (isOpen) {
            fetchSetupDataRef.current();
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="flex items-center justify-center">
                    <GridScanIcon />
                    <DialogTitle className={cn(isRtl ? "text-right" : "text-left")}>
                        {modalConfig.title}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        {modalConfig.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center space-y-5">
                    {showVerificationStep ? (
                        <TwoFactorVerificationStep
                            onClose={handleClose}
                            onBack={() => setShowVerificationStep(false)}
                            confirmRoute={confirmRoute}
                            labels={labels}
                        />
                    ) : (
                        <TwoFactorSetupStep
                            qrCodeSvg={qrCodeSvg}
                            manualSetupKey={manualSetupKey}
                            buttonText={modalConfig.buttonText}
                            onNextStep={handleModalNextStep}
                            errors={errors}
                            labels={labels}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
