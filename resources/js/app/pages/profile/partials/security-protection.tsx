import { useLang } from '@erag/lang-sync-inertia/react';
import { Form, usePage } from '@inertiajs/react';
import { Lock, ShieldCheck, Loader2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { Button } from '@/app/components/ui/button';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import { cn } from '@/lib/utils';
import { disable, enable } from '@/routes/two-factor';
import { toast } from '@/app/components/ui/toast';

type Props = {
    canManageTwoFactor?: boolean;
    twoFactorEnabled?: boolean;
    requiresConfirmation?: boolean;
};

export default function SecurityAndProtection({
    canManageTwoFactor = false,
    twoFactorEnabled = false,
    requiresConfirmation = false,
}: Props) {
    const { props } = usePage();
    const { locale } = props;
    const { __ } = useLang();
    const isRtl = locale === 'ar';

    const {
        qrCodeSvg,
        hasSetupData,
        manualSetupKey,
        clearErrors,
        clearTwoFactorAuthData,
        fetchSetupData,
        recoveryCodesList,
        fetchRecoveryCodes,
        errors,
    } = useTwoFactorAuth({ _locale: locale as string });

    const [showSetupModal, setShowSetupModal] = useState<boolean>(false);
    const prevTwoFactorEnabled = useRef(twoFactorEnabled);

    useEffect(() => {
        if (prevTwoFactorEnabled.current && !twoFactorEnabled) {
            clearTwoFactorAuthData();
            toast.success(__('messages.profile.protection_settings'), 'Two-factor authentication disabled.');
        }

        if (!prevTwoFactorEnabled.current && twoFactorEnabled) {
            toast.success(__('messages.profile.protection_settings'), 'Two-factor authentication enabled successfully.');
        }

        prevTwoFactorEnabled.current = twoFactorEnabled;
    }, [twoFactorEnabled, clearTwoFactorAuthData]);

    return (
        <div className="animate-in duration-500 fade-in slide-in-from-bottom-4">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-outline/10 text-outline">
                    <Lock className="size-5" />
                </div>
                <div className={cn(isRtl ? 'text-right' : 'text-left')}>
                    <h2 className="text-xl font-black text-secondary dark:text-white">
                        {__('messages.profile.security_protection')}
                    </h2>
                    <p className="text-xs text-on-surface-variant/70">
                        {__('messages.profile.security_privacy')}
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {canManageTwoFactor && (
                    <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5 shadow-sm transition-all hover:border-primary/20 dark:border-white/5 dark:bg-card">
                        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                            <div className="flex items-start gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
                                    <ShieldCheck className="size-6" />
                                </div>
                                <div className={cn(isRtl ? 'text-right' : 'text-left')}>
                                    <h4 className="font-bold text-on-surface dark:text-white">
                                        {__('messages.profile.two_factor_title')}
                                    </h4>
                                    <p className="max-w-md text-xs text-on-surface-variant/70">
                                        {twoFactorEnabled
                                            ? 'You will be asked to enter a secure, random PIN during login, which you can get from a TOTP-supported app on your phone.'
                                            : __('messages.profile.two_factor_desc')}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full sm:w-auto">
                                {twoFactorEnabled ? (
                                    <Form 
                                        {...disable.form({ query: { _locale: locale as string } })}
                                        onError={() => toast.error(__('messages.profile.security_protection'), 'Failed to disable two-factor authentication.')}
                                    >
                                        {({ processing }) => (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                type="submit"
                                                disabled={processing}
                                                className="w-full rounded-xl font-bold sm:w-auto"
                                            >
                                                {processing && (
                                                    <Loader2 className="me-2 size-4 animate-spin" />
                                                )}
                                                {__('messages.profile.2fa_disable')}
                                            </Button>
                                        )}
                                    </Form>
                                ) : (
                                    <div className="w-full sm:w-auto">
                                        {hasSetupData ? (
                                            <Button
                                                size="sm"
                                                className="w-full rounded-xl font-bold sm:w-auto"
                                                onClick={() => setShowSetupModal(true)}
                                            >
                                                {__('messages.two_factor.setup_continue')}
                                            </Button>
                                        ) : (
                                            <Form
                                                {...enable.form({ query: { _locale: locale as string } })}
                                                onSuccess={() => setTimeout(() => setShowSetupModal(true), 0)}
                                                onError={() => toast.error(__('messages.profile.security_protection'), 'Failed to enable two-factor authentication.')}
                                            >
                                                {({ processing }) => (
                                                    <Button
                                                        size="sm"
                                                        className="w-full rounded-xl font-bold sm:w-auto"
                                                        type="submit"
                                                        disabled={processing}
                                                    >
                                                        {processing && (
                                                            <Loader2 className="me-2 size-4 animate-spin" />
                                                        )}
                                                        {__('messages.profile.2fa_enable')}
                                                    </Button>
                                                )}
                                            </Form>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {twoFactorEnabled && (
                            <div className="mt-4 border-t border-outline-variant/10 pt-4 dark:border-white/5">
                                <TwoFactorRecoveryCodes
                                    recoveryCodesList={recoveryCodesList}
                                    fetchRecoveryCodes={fetchRecoveryCodes}
                                    errors={errors}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            <TwoFactorSetupModal
                isOpen={showSetupModal}
                onClose={() => setShowSetupModal(false)}
                requiresConfirmation={requiresConfirmation}
                twoFactorEnabled={twoFactorEnabled}
                qrCodeSvg={qrCodeSvg}
                manualSetupKey={manualSetupKey}
                clearErrors={clearErrors}
                fetchSetupData={fetchSetupData}
                errors={errors}
            />
        </div>
    );
}
