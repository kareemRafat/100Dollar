import { useLang } from '@erag/lang-sync-inertia/react';
import { User, Globe, MapPin } from 'lucide-react';
import React from 'react';
import type { Idea } from '@/types';

interface OwnerCardProps {
    idea: Idea;
}

export const OwnerCard = ({ idea }: OwnerCardProps) => {
    const { __ } = useLang();

    return (
        <div className="space-y-5 rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h4 className="mb-0.5 text-[10px] font-black tracking-widest text-on-surface-variant uppercase">
                        {__('messages.idea_detail.idea_owner')}
                    </h4>
                    <p className="text-lg leading-none font-bold text-on-surface">
                        {idea?.user?.name}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-outline-variant/5 pt-4">
                <div className="group flex items-center gap-3">
                    <div className="rounded-lg bg-surface-container-low p-2 transition-colors group-hover:bg-primary/5">
                        <Globe className="h-4 w-4 text-primary/70" />
                    </div>
                    <div>
                        <p className="mb-0.5 text-[9px] font-bold tracking-tighter text-on-surface-variant/60 uppercase">
                            {__('messages.submit_idea.country_label')}
                        </p>
                        <p className="text-sm font-bold text-on-surface">
                            {idea?.country}
                        </p>
                    </div>
                </div>

                <div className="group flex items-center gap-3">
                    <div className="rounded-lg bg-surface-container-low p-2 transition-colors group-hover:bg-primary/5">
                        <MapPin className="h-4 w-4 text-primary/70" />
                    </div>
                    <div>
                        <p className="mb-0.5 text-[9px] font-bold tracking-tighter text-on-surface-variant/60 uppercase">
                            {__('messages.submit_idea.city_label')}
                        </p>
                        <p className="text-sm font-bold text-on-surface">
                            {idea?.city}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
