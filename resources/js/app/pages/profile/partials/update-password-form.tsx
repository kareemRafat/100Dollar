import { useLang } from '@erag/lang-sync-inertia/react';
import { useForm, usePage } from '@inertiajs/react';
import { ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { useRef  } from 'react';
import type {SubmitEvent} from 'react';
import { updatePassword as updatePasswordAction } from '@/actions/App/Http/Controllers/App/ProfileController';
import { Button } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function UpdatePasswordForm() {
    const { locale } = usePage().props;
    const { __ } = useLang();
    const isRtl = locale === 'ar';
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, patch, errors, processing, recentlySuccessful, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(updatePasswordAction.url(), {
            preserveScroll: true,
            errorBag: 'updatePassword',
            onSuccess: () => {
                reset();
                toast.success(__('messages.profile.password_security'), __('messages.profile.update_password'));
            },
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
                <div className={cn(isRtl ? "text-right" : "text-left")}>
                    <h2 className="text-xl font-black text-secondary dark:text-white">
                        {__('messages.profile.password_security')}
                    </h2>
                    <p className="text-xs text-on-surface-variant/70">
                        {__('messages.profile.password_security_desc')}
                    </p>
                </div>
            </div>

            <form onSubmit={submit} className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm dark:border-white/5 dark:bg-card md:p-8">
                <div className="space-y-6">
                    <div className="space-y-2 max-w-md">
                        <Label htmlFor="current_password" className={cn("px-1 text-[11px] font-black uppercase tracking-wider text-on-surface-variant block", isRtl ? "text-right" : "text-left")}>
                            {__('messages.profile.current_password')}
                        </Label>
                        <Input
                            id="current_password"
                            ref={currentPasswordInput}
                            className={cn("h-11 rounded-xl bg-surface-container-low border-none focus-visible:ring-1 focus-visible:ring-primary", isRtl ? "text-right" : "text-left")}
                            type="password"
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="password" className={cn("px-1 text-[11px] font-black uppercase tracking-wider text-on-surface-variant block", isRtl ? "text-right" : "text-left")}>
                                {__('messages.profile.new_password')}
                            </Label>
                            <Input
                                id="password"
                                ref={passwordInput}
                                className={cn("h-11 rounded-xl bg-surface-container-low border-none focus-visible:ring-1 focus-visible:ring-primary", isRtl ? "text-right" : "text-left")}
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation" className={cn("px-1 text-[11px] font-black uppercase tracking-wider text-on-surface-variant block", isRtl ? "text-right" : "text-left")}>
                                {__('messages.profile.confirm_password')}
                            </Label>
                            <Input
                                id="password_confirmation"
                                className={cn("h-11 rounded-xl bg-surface-container-low border-none focus-visible:ring-1 focus-visible:ring-primary", isRtl ? "text-right" : "text-left")}
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className={cn("flex items-center gap-3 pt-4 border-t border-outline-variant/10 dark:border-white/5", isRtl ? "flex-row-reverse" : "flex-row")}>
                        <div className={cn("flex flex-1 items-center gap-3", isRtl ? "justify-start" : "justify-end")}>
                            {recentlySuccessful && (
                                <p className="text-xs font-bold text-primary animate-in fade-in">
                                    {__('messages.profile.update_password')} ✓
                                </p>
                            )}

                            {Object.keys(errors).length > 0 && typeof Object.values(errors)[0] === 'string' && (
                                <p className={cn(
                                    "text-xs font-bold text-error animate-in fade-in flex items-center gap-1.5 mt-0.5",
                                    isRtl ? "flex-row-reverse text-right" : "text-left"
                                )}>
                                    <AlertCircle className="size-3.5" />
                                    {Object.values(errors)[0]}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
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
                </div>
            </form>
        </div>
    );
}
