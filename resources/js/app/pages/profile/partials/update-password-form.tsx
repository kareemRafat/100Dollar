import { useLang } from '@erag/lang-sync-inertia/react';
import { useForm } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
import React, { useRef } from 'react';
import { updatePassword as updatePasswordAction } from '@/actions/App/Http/Controllers/App/ProfileController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function UpdatePasswordForm() {
    const { __ } = useLang();
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, patch, errors, processing, recentlySuccessful, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(updatePasswordAction.url(), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary dark:bg-white/10 dark:text-white">
                    <ShieldCheck className="size-5" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-secondary dark:text-white">
                        {__('messages.profile.password_security')}
                    </h2>
                    <p className="text-xs text-on-surface-variant/70">
                        {__('messages.profile.password_security')}
                    </p>
                </div>
            </div>

            <form onSubmit={submit} className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm dark:border-white/5 dark:bg-card md:p-8">
                <div className="space-y-6">
                    <div className="space-y-2 max-w-md">
                        <Label htmlFor="current_password" className="px-1 text-[11px] font-black uppercase tracking-wider text-on-surface-variant">
                            {__('messages.profile.current_password')}
                        </Label>
                        <Input
                            id="current_password"
                            ref={currentPasswordInput}
                            className="h-11 rounded-xl bg-surface-container-low border-none focus-visible:ring-1 focus-visible:ring-primary"
                            type="password"
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            placeholder="••••••••"
                        />
                        {errors.current_password && <p className="mt-1 text-xs text-error">{errors.current_password}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="password" className="px-1 text-[11px] font-black uppercase tracking-wider text-on-surface-variant">
                                {__('messages.profile.new_password')}
                            </Label>
                            <Input
                                id="password"
                                ref={passwordInput}
                                className="h-11 rounded-xl bg-surface-container-low border-none focus-visible:ring-1 focus-visible:ring-primary"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="mt-1 text-xs text-error">{errors.password}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation" className="px-1 text-[11px] font-black uppercase tracking-wider text-on-surface-variant">
                                {__('messages.profile.confirm_password')}
                            </Label>
                            <Input
                                id="password_confirmation"
                                className="h-11 rounded-xl bg-surface-container-low border-none focus-visible:ring-1 focus-visible:ring-primary"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="••••••••"
                            />
                            {errors.password_confirmation && <p className="mt-1 text-xs text-error">{errors.password_confirmation}</p>}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/10 dark:border-white/5">
                        {recentlySuccessful && (
                            <p className="text-xs font-bold text-primary animate-in fade-in">
                                {__('messages.profile.update_password')} ✓
                            </p>
                        )}
                        <Button
                            variant="ghost"
                            className="rounded-xl font-bold"
                            type="button"
                            onClick={() => reset()}
                        >
                            {__('messages.profile.cancel')}
                        </Button>
                        <Button
                            disabled={processing}
                            className="h-11 w-full rounded-xl px-10 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 md:w-48"
                        >
                            {processing && <Loader2 className="me-2 size-4 animate-spin" />}
                            {__('messages.profile.update_password')}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
