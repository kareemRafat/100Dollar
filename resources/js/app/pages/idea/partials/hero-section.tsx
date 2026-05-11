import { useLang } from '@erag/lang-sync-inertia/react';
import { 
    Lightbulb, 
    User, 
    Globe, 
    MapPin,
    ShoppingBag,
    Home,
    Palette,
    Cpu,
    Leaf,
    GraduationCap,
    Heart,
    MoreHorizontal
} from 'lucide-react';
import React from 'react';
import type { Idea } from '@/types';

interface HeroSectionProps {
    idea: Idea;
}

const categoryIcons: Record<string, any> = {
    'shopping-bag': ShoppingBag,
    'home': Home,
    'palette': Palette,
    'cpu': Cpu,
    'leaf': Leaf,
    'graduation-cap': GraduationCap,
    'heart': Heart,
    'more-horizontal': MoreHorizontal,
};

export const HeroSection = React.memo(({ idea }: HeroSectionProps) => {
    const { __ } = useLang();

    const CategoryIcon = idea.category_icon ? (categoryIcons[idea.category_icon] || MoreHorizontal) : Lightbulb;

    return (
        <section className="relative flex h-[320px] items-center justify-center overflow-hidden md:h-[420px] mb-12">
            <div
                className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000')",
                }}
            >
                <div
                    className="hero-overlay absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(to bottom, rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.9))',
                    }}
                />
            </div>

            <div className="relative z-10 mx-auto px-8 text-center flex flex-col items-center">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/25 px-4 py-1.5 text-primary-fixed shadow-lg shadow-primary/20 backdrop-blur-sm">
                    <CategoryIcon className="w-3.5 h-3.5 text-yellow-400" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                        {idea.category}
                    </span>
                </div>

                <h1 className="mb-6 font-headline text-3xl leading-tight font-black text-white md:text-4xl max-w-3xl tracking-wide">
                    {idea?.title}
                </h1>

                <div className="flex flex-col gap-3 max-w-fit mx-auto">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <div className="flex items-center gap-2.5 bg-white/10 border border-white/20 px-4 py-2 rounded-xl backdrop-blur-md">
                            <User className="w-4 h-4 text-yellow-400" />
                            <span className="text-white/70 text-[13px] mt-0.5 font-medium uppercase tracking-wider">{__('messages.idea_detail.idea_owner')} : </span>
                            <span className="text-white font-semibold text-sm">
                                {idea?.user?.name}
                            </span>
                        </div>

                        <div className="flex items-center gap-2.5 bg-white/10 border border-white/20 px-4 py-2 rounded-xl backdrop-blur-md">
                            <Globe className="w-4 h-4 text-yellow-400" />
                            <span className="text-white font-semibold text-sm">
                                {idea?.country}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2.5 bg-white/10 border border-white/20 px-4 py-2 rounded-xl backdrop-blur-md w-full">
                        <MapPin className="w-4 h-4 text-yellow-400" />
                        <span className="text-white font-semibold text-sm">
                            {idea?.city}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
});

HeroSection.displayName = 'HeroSection';
