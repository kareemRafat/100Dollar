import { useLang } from '@erag/lang-sync-inertia/react';
import type { Sponsor } from '@/types';

interface Props {
    sponsor?: Sponsor;
}

export default function SponsorBanner({ sponsor }: Props) {
    const { __ } = useLang();

    return (
        <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-on-secondary-fixed/10 bg-secondary-fixed p-6 shadow-md transition-all duration-500 hover:border-on-secondary-fixed/20 hover:shadow-lg md:col-span-4">
            {/* Dynamic Background Pattern */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
                <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern
                            id="grid"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Content Section */}
            <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                {/* Top: Information */}
                <div>
                    <div className="mb-4 inline-flex items-center rounded-full border border-on-secondary-fixed/20 bg-on-secondary-fixed/10 px-3 py-1.5 text-[10px] font-black tracking-wider text-on-secondary-fixed uppercase backdrop-blur-md">
                        <span className="relative me-2 flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-on-secondary-fixed opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-on-secondary-fixed"></span>
                        </span>
                        {__('messages.home.today_sponsor')}
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-2xl leading-tight font-black tracking-tighter text-on-secondary-fixed transition-all group-hover:tracking-normal">
                            {sponsor
                                ? sponsor.name
                                : __('messages.home.sponsor_name_placeholder')}
                        </h3>
                        <div className="flex items-center gap-1.5 text-on-secondary-fixed/60">
                            <span className="text-[10px] font-bold tracking-widest uppercase">
                                {sponsor
                                    ? __('messages.sponsors.certified_partner')
                                    : 'Waiting for Sponsor'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-on-secondary-fixed/5 blur-[100px] transition-colors duration-700 group-hover:bg-on-secondary-fixed/10" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 -translate-x-1/2 translate-y-1/2 rounded-full bg-on-secondary-fixed/5 blur-[60px] transition-colors duration-700 group-hover:bg-on-secondary-fixed/10" />
        </div>
    );
}
