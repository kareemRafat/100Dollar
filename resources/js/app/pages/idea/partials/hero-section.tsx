import { useLang } from '@erag/lang-sync-inertia/react';
import React from 'react';
import type { Idea } from '@/types';

interface HeroSectionProps {
    idea: Idea;
}

export const HeroSection = React.memo(({ idea }: HeroSectionProps) => {
    const { __ } = useLang();

    return (
        <section className="relative h-[400px] w-full overflow-hidden mb-12">
            <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${idea.image || 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop'}')` }}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <div className="bg-primary text-on-primary px-4 py-1 rounded-full text-xs font-bold mb-4 tracking-widest uppercase">
                    {idea.category}
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight font-headline max-w-4xl tracking-tighter">
                    {idea?.title}
                </h1>
                <div className="flex items-center gap-3 text-white/90 font-medium">
                    <span>{__('messages.idea_detail.idea_owner')}: {idea?.user?.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span>{idea?.city}، {idea?.country}</span>
                </div>
            </div>
        </section>
    );
});

HeroSection.displayName = 'HeroSection';
