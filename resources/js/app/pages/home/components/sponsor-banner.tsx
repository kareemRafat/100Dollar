import { useLang } from '@erag/lang-sync-inertia/react';
import { Sparkles } from 'lucide-react';
import type { Sponsor } from '@/types';

interface Props {
    sponsor?: Sponsor;
}

export default function SponsorBanner({ sponsor }: Props) {
    const { __ } = useLang();

    const sponsorInitial = sponsor ? sponsor.name.trim().charAt(0) : '?';

    return (
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-secondary-fixed p-6 md:col-span-4 h-full border border-on-secondary-fixed/10 shadow-md transition-all duration-500 hover:shadow-lg hover:border-on-secondary-fixed/20">
            {/* Dynamic Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Content Section */}
            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                {/* Top: Information */}
                <div>
                    <div className="inline-flex items-center rounded-full bg-on-secondary-fixed/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-on-secondary-fixed backdrop-blur-md border border-on-secondary-fixed/20 mb-4">
                       <span className="relative flex h-2 w-2 me-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-on-secondary-fixed opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-on-secondary-fixed"></span>
                        </span>
                        {__('messages.home.today_sponsor')}
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-2xl font-black leading-tight text-on-secondary-fixed tracking-tighter transition-all group-hover:tracking-normal">
                            {sponsor ? sponsor.name : __('messages.home.sponsor_name_placeholder')}
                        </h3>
                        <div className="flex items-center gap-1.5 text-on-secondary-fixed/60">
                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                {sponsor ? __('messages.sponsors.certified_partner') : 'Waiting for Sponsor'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-64 w-64 rounded-full bg-on-secondary-fixed/5 blur-[100px] pointer-events-none group-hover:bg-on-secondary-fixed/10 transition-colors duration-700" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-on-secondary-fixed/5 blur-[60px] pointer-events-none group-hover:bg-on-secondary-fixed/10 transition-colors duration-700" />
        </div>
    );
}
