import { useLang } from '@erag/lang-sync-inertia/react';
import { useForm, usePage } from '@inertiajs/react';
import { Camera, Loader2, User as UserIcon } from 'lucide-react';
import React, { memo } from 'react';
import { update as updateProfile } from '@/actions/App/Http/Controllers/App/ProfileController';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { toast } from '@/app/components/ui/toast';

type Props = {
    user: {
        name: string;
        email: string;
        phone?: string;
        bio?: string;
        avatar?: string;
    };
};

function ProfileInformationForm({ user }: Props) {
    const { locale } = usePage().props;
    const { __ } = useLang();
    const isRtl = locale === 'ar';
    const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        _method: 'patch',
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        bio: user.bio || '',
        avatar: null as File | null,
    });

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('avatar', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(updateProfile.url(), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                toast.success(__('messages.profile.personal_info'), __('messages.profile.save_changes'));
            },
        });
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={cn("mb-8 flex items-center gap-3", isRtl ? "flex-row" : "flex-row")}>
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <UserIcon className="size-5" />
                </div>
                <div className={cn(isRtl ? "text-right" : "text-left")}>
                    <h2 className="text-xl font-black text-secondary dark:text-white">
                        {__('messages.profile.personal_info')}
                    </h2>
                    <p className="text-xs text-on-surface-variant/70">
                        {__('messages.profile.hero_desc')}
                    </p>
                </div>
            </div>

            <form onSubmit={submit} className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm dark:border-white/5 dark:bg-card md:p-8">
                <div className={cn("flex flex-col gap-10 lg:flex-row", isRtl && "lg:flex-row-reverse")}>
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center gap-4 lg:w-48">
                        <div className="group relative">
                            <Avatar className="size-32 border-4 border-surface-container-low shadow-xl">
                                <AvatarImage src={avatarPreview || user.avatar} alt={user.name} />
                                <AvatarFallback className="bg-primary text-2xl font-black text-white">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-secondary/40 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                                <Camera className="size-8 text-white" />
                                <input className="hidden" type="file" onChange={handleAvatarChange} accept="image/*" />
                            </label>
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-bold text-on-surface dark:text-white">
                                {__('messages.profile.account_image')}
                            </p>
                            <p className="mt-1 text-[10px] text-on-surface-variant/60">
                                {__('messages.profile.image_hint')}
                            </p>
                            {errors.avatar && <p className="mt-1 text-[10px] text-error">{errors.avatar}</p>}
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="flex-1 space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name" className={cn("px-1 text-[11px] font-black uppercase tracking-wider text-on-surface-variant block", isRtl ? "text-right" : "text-left")}>
                                    {__('messages.profile.full_name')}
                                </Label>
                                <Input
                                    id="name"
                                    className={cn("h-11 rounded-xl bg-surface-container-low border-none focus-visible:ring-1 focus-visible:ring-primary", isRtl ? "text-right" : "text-left")}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className={cn("mt-1 text-xs text-error", isRtl ? "text-right" : "text-left")}>{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className={cn("px-1 text-[11px] font-black uppercase tracking-wider text-on-surface-variant block", isRtl ? "text-right" : "text-left")}>
                                    {__('messages.profile.email')}
                                </Label>
                                <Input
                                    id="email"
                                    className={cn("h-11 rounded-xl bg-surface-container-low border-none focus-visible:ring-1 focus-visible:ring-primary", isRtl ? "text-right" : "text-left")}
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <p className={cn("mt-1 text-xs text-error", isRtl ? "text-right" : "text-left")}>{errors.email}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className={cn("px-1 text-[11px] font-black uppercase tracking-wider text-on-surface-variant block", isRtl ? "text-right" : "text-left")}>
                                {__('messages.profile.phone')}
                            </Label>
                            <Input
                                id="phone"
                                className={cn(
                                    "h-11 rounded-xl bg-surface-container-low border-none focus-visible:ring-1 focus-visible:ring-primary",
                                    "text-left"
                                )}
                                dir="ltr"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="+966 50 123 4567"
                            />
                            {errors.phone && <p className={cn("mt-1 text-xs text-error", isRtl ? "text-right" : "text-left")}>{errors.phone}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio" className={cn("px-1 text-[11px] font-black uppercase tracking-wider text-on-surface-variant block", isRtl ? "text-right" : "text-left")}>
                                {__('messages.profile.bio')}
                            </Label>
                            <textarea
                                id="bio"
                                className={cn(
                                    "min-h-24 w-full rounded-xl border-none bg-surface-container-low p-3 text-sm transition-all focus:ring-1 focus:ring-primary dark:bg-surface-container-low dark:text-white",
                                    isRtl ? "text-right" : "text-left"
                                )}
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                placeholder={__('messages.profile.bio_placeholder')}
                            />
                            {errors.bio && <p className={cn("mt-1 text-xs text-error", isRtl ? "text-right" : "text-left")}>{errors.bio}</p>}
                        </div>

                        <div className={cn("flex items-center gap-3 pt-4 border-t border-outline-variant/10 dark:border-white/5", isRtl ? "justify-start flex-row-reverse" : "justify-end")}>
                            {recentlySuccessful && (
                                <p className="text-xs font-bold text-primary animate-in fade-in">
                                    {__('messages.profile.save_changes')} ✓
                                </p>
                            )}
                            <Button
                                variant="ghost"
                                className="rounded-xl font-bold"
                                type="button"
                                onClick={() => {
                                    setData({
                                        _method: 'patch',
                                        name: user.name,
                                        email: user.email,
                                        phone: user.phone || '',
                                        bio: user.bio || '',
                                        avatar: null,
                                    });
                                    setAvatarPreview(null);
                                }}
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
                    </div>
                </div>
            </form>
        </div>
    );
}

export default memo(ProfileInformationForm);