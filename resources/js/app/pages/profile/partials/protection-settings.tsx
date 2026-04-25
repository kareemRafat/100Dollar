import { useLang } from '@erag/lang-sync-inertia/react';
import { useForm, Form, usePage } from '@inertiajs/react';
import { Lock, ShieldCheck, User as UserIcon, Loader2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { update as updateProfile } from '@/actions/App/Http/Controllers/App/ProfileController';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import { cn } from '@/lib/utils';
import { disable, enable } from '@/routes/two-factor';

type Props = {
    user: {
        is_active: boolean;
        [key: string]: any;
    };
    canManageTwoFactor?: boolean;
    twoFactorEnabled?: boolean;
    requiresConfirmation?: boolean;
};

export default function ProtectionSettings({
    user,
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
        clearSetupData,
        clearErrors,
        clearTwoFactorAuthData,
        fetchSetupData,
        recoveryCodesList,
        fetchRecoveryCodes,
        errors,
    } = useTwoFactorAuth({ _auth_context: 'app', _locale: locale as string });

    const [showSetupModal, setShowSetupModal] = useState<boolean>(false);
    const prevTwoFactorEnabled = useRef(twoFactorEnabled);

    useEffect(() => {
        if (prevTwoFactorEnabled.current && !twoFactorEnabled) {
            clearTwoFactorAuthData();
        }

        prevTwoFactorEnabled.current = twoFactorEnabled;
    }, [twoFactorEnabled, clearTwoFactorAuthData]);

    const { data, setData, patch, processing, recentlySuccessful } = useForm({
        is_active: user.is_active,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(updateProfile.url(), {
            preserveScroll: true,
        });
    };

    return (
        <div className="animate-in duration-500 fade-in slide-in-from-bottom-4">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-outline/10 text-outline">
                    <Lock className="size-5" />
                </div>
                <div className={cn(isRtl ? 'text-right' : 'text-left')}>
                    <h2 className="text-xl font-black text-secondary dark:text-white">
                        {__('messages.profile.protection_privacy')}
                    </h2>
                    <p className="text-xs text-on-surface-variant/70">
                        {__('messages.profile.hero_desc')}
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
                                <div
                                    className={cn(
                                        isRtl ? 'text-right' : 'text-left',
                                    )}
                                >
                                    <h4 className="font-bold text-on-surface dark:text-white">
                                        {__(
                                            'messages.profile.two_factor_title',
                                        )}
                                    </h4>
                                    <p className="max-w-md text-xs text-on-surface-variant/70">
                                        {twoFactorEnabled
                                            ? isRtl
                                                ? 'سيُطلب منك إدخال رمز PIN آمن وعشوائي أثناء تسجيل الدخول، والذي يمكنك الحصول عليه من تطبيق يدعم TOTP على هاتفك.'
                                                : 'You will be asked to enter a secure, random PIN during login, which you can get from a TOTP-supported app on your phone.'
                                            : __(
                                                  'messages.profile.two_factor_desc',
                                              )}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full sm:w-auto">
                                {twoFactorEnabled ? (
                                    <Form {...disable.form({ query: { _auth_context: 'app', _locale: locale as string } })}>
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
                                                {isRtl ? 'تعطيل' : 'Disable'}
                                            </Button>
                                        )}
                                    </Form>
                                ) : (
                                    <div className="w-full sm:w-auto">
                                        {hasSetupData ? (
                                            <Button
                                                size="sm"
                                                className="w-full rounded-xl font-bold sm:w-auto"
                                                onClick={() =>
                                                    setShowSetupModal(true)
                                                }
                                            >
                                                {isRtl
                                                    ? 'متابعة الإعداد'
                                                    : 'Continue Setup'}
                                            </Button>
                                        ) : (
                                            <Form
                                                {...enable.form({ query: { _auth_context: 'app', _locale: locale as string } })}
                                                onSuccess={() =>
                                                    setTimeout(
                                                        () =>
                                                            setShowSetupModal(
                                                                true,
                                                            ),
                                                        0,
                                                    )
                                                }
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
                                                        {isRtl
                                                            ? 'تمكين'
                                                            : 'Enable'}
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

                <form onSubmit={submit} className="space-y-4">
                    <div className="flex items-center justify-between rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5 shadow-sm transition-all hover:border-primary/20 dark:border-white/5 dark:bg-card">
                        <div className="flex items-center gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
                                <UserIcon className="size-6" />
                            </div>
                            <div
                                className={cn(
                                    isRtl ? 'text-right' : 'text-left',
                                )}
                            >
                                <h4 className="font-bold text-on-surface dark:text-white">
                                    {__('messages.profile.visibility_title')}
                                </h4>
                                <p className="text-xs text-on-surface-variant/70">
                                    {__('messages.profile.visibility_desc')}
                                </p>
                            </div>
                        </div>
                        <Switch
                            checked={data.is_active}
                            onCheckedChange={(checked) =>
                                setData('is_active', checked)
                            }
                        />
                    </div>

                    <div
                        className={cn(
                            'flex items-center gap-3 border-t border-outline-variant/10 pt-8 dark:border-white/5',
                            isRtl ? 'justify-start' : 'justify-end',
                        )}
                    >
                        {recentlySuccessful && (
                            <p className="animate-in text-xs font-bold text-primary fade-in">
                                {__('messages.profile.save_changes')} ✓
                            </p>
                        )}
                        <Button
                            variant="ghost"
                            className="rounded-xl font-bold"
                            type="button"
                            onClick={() => setData('is_active', user.is_active)}
                        >
                            {__('messages.profile.cancel')}
                        </Button>
                        <Button
                            disabled={processing}
                            className="h-11 w-full rounded-xl px-10 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 md:w-48"
                        >
                            {processing && (
                                <Loader2 className="me-2 size-4 animate-spin" />
                            )}
                            {__('messages.profile.save_changes')}
                        </Button>
                    </div>
                </form>
            </div>

            <TwoFactorSetupModal
                isOpen={showSetupModal}
                onClose={() => setShowSetupModal(false)}
                requiresConfirmation={requiresConfirmation}
                twoFactorEnabled={twoFactorEnabled}
                qrCodeSvg={qrCodeSvg}
                manualSetupKey={manualSetupKey}
                clearSetupData={clearSetupData}
                clearErrors={clearErrors}
                fetchSetupData={fetchSetupData}
                errors={errors}
            />
        </div>
    );
}
