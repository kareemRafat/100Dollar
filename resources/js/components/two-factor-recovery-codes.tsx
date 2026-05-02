import { useLang } from '@erag/lang-sync-inertia/react';
import { Form, usePage } from '@inertiajs/react';
import { Check, Copy, Eye, EyeOff, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import AlertError from '@/components/alert-error';
import { Button } from '@/components/ui/button';
import { useClipboard } from '@/hooks/use-clipboard';
import { cn } from '@/lib/utils';
import { regenerateRecoveryCodes } from '@/routes/two-factor';
import type { RouteDefinition, RouteFormDefinition, RouteQueryOptions } from '@/wayfinder';
import { toast } from '@/app/components/ui/toast';

type Props = {
    recoveryCodesList: string[];
    fetchRecoveryCodes: () => Promise<void>;
    errors: string[];
    regenerateRoute?: ((options?: RouteQueryOptions) => RouteDefinition<'post'>) & {
        form: (options?: RouteQueryOptions) => RouteFormDefinition<'post'>;
    };
    labels?: {
        view_codes?: string;
        hide_codes?: string;
        regenerate_codes?: string;
        recovery_codes_warning?: string;
    };
};

export default function TwoFactorRecoveryCodes({
    recoveryCodesList,
    fetchRecoveryCodes,
    errors,
    regenerateRoute,
    labels,
}: Props) {
    const { __ } = useLang();
    const { locale } = usePage().props;
    const isRtl = locale === 'ar';
    const [showRecoveryCodes, setShowRecoveryCodes] = useState<boolean>(false);
    const [copiedText, copy] = useClipboard();

    const handleShowRecoveryCodes = async () => {
        if (!showRecoveryCodes && recoveryCodesList.length === 0) {
            await fetchRecoveryCodes();
        }

        setShowRecoveryCodes(!showRecoveryCodes);
    };

    return (
        <div className="flex w-full flex-col items-start justify-start space-y-4">
            <div className={cn("flex w-full items-center gap-3", isRtl ? "justify-start flex-row-reverse" : "justify-start")}>
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl font-bold"
                    onClick={handleShowRecoveryCodes}
                >
                    {showRecoveryCodes ? (
                        <>
                            <EyeOff className="size-4" />
                            {labels?.hide_codes ?? __('messages.two_factor.hide_codes')}
                        </>
                    ) : (
                        <>
                            <Eye className="size-4" />
                            {labels?.view_codes ?? __('messages.two_factor.view_codes')}
                        </>
                    )}
                </Button>

                <Form
                    {...(regenerateRoute ?? regenerateRecoveryCodes).form()}
                    onSuccess={() => {
                        fetchRecoveryCodes();
                        toast.success(__('messages.two_factor.recovery_codes_title'), __('messages.two_factor.recovery_codes_regenerated'));
                    }}
                >
                    {({ processing }) => (
                        <Button
                            variant="ghost"
                            size="sm"
                            type="submit"
                            disabled={processing}
                            className="rounded-xl font-bold"
                        >
                            <RefreshCcw
                                className={cn('size-4', {
                                    'animate-spin': processing,
                                })}
                            />
                            {labels?.regenerate_codes ?? __('messages.two_factor.regenerate_codes')}
                        </Button>
                    )}
                </Form>
            </div>

            {showRecoveryCodes && (
                <div className="w-full space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className={cn("text-xs text-on-surface-variant/70", isRtl ? "text-right" : "text-left")}>
                        {labels?.recovery_codes_warning ?? __('messages.two_factor.recovery_codes_warning')}
                    </p>

                    {errors?.length > 0 && <AlertError errors={errors} />}

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {recoveryCodesList.map((code) => {
                            const isCopied = copiedText === code;
                            const IconComponent = isCopied ? Check : Copy;

                            return (
                                <div
                                    key={code}
                                    className="group relative flex items-center justify-between rounded-xl border border-outline-variant/10 bg-surface-container-low p-3 transition-all hover:border-primary/30"
                                >
                                    <code className="font-mono text-sm font-bold text-on-surface">
                                        {code}
                                    </code>
                                    <button
                                        onClick={() => copy(code)}
                                        className={cn(
                                            'rounded-lg p-1.5 transition-colors',
                                            isCopied
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-on-surface-variant/40 hover:bg-primary/5 hover:text-primary'
                                        )}
                                    >
                                        <IconComponent className="size-3.5" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
