import { useLang } from '@erag/lang-sync-inertia/react';
import { Sponsor } from '@/types';

interface Props {
    sponsor?: Sponsor;
}

export default function SponsorBanner({ sponsor }: Props) {
    const { __ } = useLang();

    return (
        <div className="group relative flex items-center gap-6 overflow-hidden rounded-2xl bg-secondary-fixed p-6 md:col-span-4 h-full border border-on-secondary-fixed/5">
            {/* Decorative Background Blur */}
            <div className="absolute -inset-inline-start-4 -bottom-4 h-32 w-32 rounded-full bg-primary/20 blur-3xl transition-all group-hover:scale-150" />

            {/* Icon - Positioned at the start (Left in EN, Right in AR) */}
            <div className="relative z-10 hidden shrink-0 sm:flex w-24 h-24 items-center justify-center">
                <span className="material-symbols-outlined text-9xl text-on-secondary-fixed/20 transition-all group-hover:scale-110 group-hover:text-on-secondary-fixed/40 rtl:-scale-x-100">
                    handshake
                </span>
            </div>

            <div className="relative z-10 flex-1">
                <p className="mb-1 text-xs font-semibold text-on-secondary-fixed-variant">
                    {__('messages.home.today_sponsor')}
                </p>
                <h3 className="mb-4 text-xl font-bold text-on-secondary-fixed">
                    {sponsor ? sponsor.name : __('messages.home.sponsor_name_placeholder')}
                </h3>
                {sponsor ? (
                    <div className="flex h-12 w-32 items-center justify-center rounded border border-on-secondary-fixed/20 bg-on-secondary-fixed/10 backdrop-blur-sm overflow-hidden p-2">
                        <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                    </div>
                ) : (
                    <div className="flex h-10 w-32 items-center justify-center rounded border border-on-secondary-fixed/20 bg-on-secondary-fixed/10 backdrop-blur-sm">
                        <span className="font-bold text-on-secondary-fixed opacity-50 uppercase text-[10px] tracking-widest">
                            LOGO
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

