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
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 shadow-sm space-y-5">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h4 className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest mb-0.5">
                        {__('messages.idea_detail.idea_owner')}
                    </h4>
                    <p className="text-on-surface font-bold text-lg leading-none">
                        {idea?.user?.name}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4 border-t border-outline-variant/5">
                <div className="flex items-center gap-3 group">
                    <div className="p-2 rounded-lg bg-surface-container-low group-hover:bg-primary/5 transition-colors">
                        <Globe className="w-4 h-4 text-primary/70" />
                    </div>
                    <div>
                        <p className="text-[9px] text-on-surface-variant/60 font-bold uppercase tracking-tighter mb-0.5">
                            {__('messages.submit_idea.country_label')}
                        </p>
                        <p className="text-on-surface font-bold text-sm">
                            {idea?.country}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 group">
                    <div className="p-2 rounded-lg bg-surface-container-low group-hover:bg-primary/5 transition-colors">
                        <MapPin className="w-4 h-4 text-primary/70" />
                    </div>
                    <div>
                        <p className="text-[9px] text-on-surface-variant/60 font-bold uppercase tracking-tighter mb-0.5">
                            {__('messages.submit_idea.city_label')}
                        </p>
                        <p className="text-on-surface font-bold text-sm">
                            {idea?.city}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
