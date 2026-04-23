import { useLang } from '@erag/lang-sync-inertia/react';
import { useForm } from '@inertiajs/react';
import { Lock, ShieldCheck, User as UserIcon } from 'lucide-react';
import React from 'react';
import { update as updateProfile } from '@/actions/App/Http/Controllers/App/ProfileController';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

type Props = {
    user: {
        is_active: boolean;
        [key: string]: any;
    };
};

export default function ProtectionSettings({ user }: Props) {
    const { __ } = useLang();

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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-outline/10 text-outline">
                    <Lock className="size-5" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-secondary dark:text-white">
                        {__('messages.profile.protection_privacy')}
                    </h2>
                    <p className="text-xs text-on-surface-variant/70">
                        {__('messages.profile.hero_desc')}
                    </p>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5 shadow-sm transition-all hover:border-primary/20 dark:border-white/5 dark:bg-card">
                    <div className="flex items-center gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
                            <ShieldCheck className="size-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-on-surface dark:text-white">
                                {__('messages.profile.two_factor_title')}
                            </h4>
                            <p className="text-xs text-on-surface-variant/70">
                                {__('messages.profile.two_factor_desc')}
                            </p>
                        </div>
                    </div>
                    {/* Placeholder for Fortify 2FA - usually a separate multi-step process */}
                    <Switch
                        checked={false}
                        disabled
                    />
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5 shadow-sm transition-all hover:border-primary/20 dark:border-white/5 dark:bg-card">
                    <div className="flex items-center gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
                            <UserIcon className="size-6" />
                        </div>
                        <div>
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
                        onCheckedChange={(checked) => setData('is_active', checked)}
                    />
                </div>

                <div className="flex items-center justify-end gap-3 pt-8 border-t border-outline-variant/10 dark:border-white/5">
                    {recentlySuccessful && (
                        <p className="text-xs font-bold text-primary animate-in fade-in">
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
                        {processing && <Loader2 className="me-2 size-4 animate-spin" />}
                        {__('messages.profile.save_changes')}
                    </Button>
                </div>
            </form>
        </div>
    );
}
