import { useHttp } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import { qrCode, recoveryCodes, secretKey } from '@/routes/two-factor';

export type UseTwoFactorAuthReturn = {
    qrCodeSvg: string | null;
    manualSetupKey: string | null;
    recoveryCodesList: string[];
    hasSetupData: boolean;
    loading: boolean;
    errors: string[];
    clearErrors: () => void;
    clearSetupData: () => void;
    clearTwoFactorAuthData: () => void;
    fetchQrCode: () => Promise<void>;
    fetchSetupKey: () => Promise<void>;
    fetchSetupData: () => Promise<void>;
    fetchRecoveryCodes: () => Promise<void>;
};

export const OTP_MAX_LENGTH = 6;

export const useTwoFactorAuth = (context?: { _auth_context?: string; _locale?: string }): UseTwoFactorAuthReturn => {
    const { submit } = useHttp();

    const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null);
    const [manualSetupKey, setManualSetupKey] = useState<string | null>(null);
    const [recoveryCodesList, setRecoveryCodesList] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const hasSetupData = qrCodeSvg !== null && manualSetupKey !== null;

    const clearErrors = useCallback((): void => {
        setErrors([]);
    }, []);

    const clearSetupData = useCallback((): void => {
        setManualSetupKey(null);
        setQrCodeSvg(null);
        setErrors([]);
    }, []);

    const clearTwoFactorAuthData = useCallback((): void => {
        setManualSetupKey(null);
        setQrCodeSvg(null);
        setErrors([]);
        setRecoveryCodesList([]);
    }, []);

    const fetchQrCode = useCallback(async (): Promise<void> => {
        try {
            const { svg } = (await submit(qrCode({ query: context }))) as {
                svg: string;
                url: string;
            };

            if (svg) {
                setQrCodeSvg(svg);
            }
        } catch (error) {
            setErrors((prev) => {
                if (prev.includes('Failed to fetch QR code')) return prev;
                return [...prev, 'Failed to fetch QR code'];
            });
            setQrCodeSvg(null);
        }
    }, [submit, context]);

    const fetchSetupKey = useCallback(async (): Promise<void> => {
        try {
            const { secretKey: key } = (await submit(secretKey({ query: context }))) as {
                secretKey: string;
            };

            if (key) {
                setManualSetupKey(key);
            }
        } catch (error) {
            setErrors((prev) => {
                if (prev.includes('Failed to fetch a setup key')) return prev;
                return [...prev, 'Failed to fetch a setup key'];
            });
            setManualSetupKey(null);
        }
    }, [submit, context]);

    const fetchRecoveryCodes = useCallback(async (): Promise<void> => {
        try {
            setErrors([]);
            const codes = (await submit(recoveryCodes({ query: context }))) as string[];
            setRecoveryCodesList(codes);
        } catch {
            setErrors((prev) => [...prev, 'Failed to fetch recovery codes']);
            setRecoveryCodesList([]);
        }
    }, [submit, context]);

    const fetchSetupData = useCallback(
        async (retryCount = 0): Promise<void> => {
            if (loading) return;

            try {
                setLoading(true);
                setErrors([]);
                await Promise.all([fetchQrCode(), fetchSetupKey()]);
            } catch {
                if (retryCount < 2) {
                    setLoading(false);

                    return fetchSetupData(retryCount + 1);
                }

                setQrCodeSvg(null);
                setManualSetupKey(null);
            } finally {
                setLoading(false);
            }
        },
        [fetchQrCode, fetchSetupKey, loading],
    );

    return {
        qrCodeSvg,
        manualSetupKey,
        recoveryCodesList,
        hasSetupData,
        loading,
        errors,
        clearErrors,
        clearSetupData,
        clearTwoFactorAuthData,
        fetchQrCode,
        fetchSetupKey,
        fetchSetupData,
        fetchRecoveryCodes,
    };
};
