import { useLang } from '@erag/lang-sync-inertia/react';
import { usePage } from '@inertiajs/react';
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
    MoreHorizontal,
} from 'lucide-react';
import React from 'react';
import type { Idea } from '@/types';

interface HeroSectionProps {
    idea: Idea;
}

const categoryIcons: Record<string, any> = {
    'shopping-bag': ShoppingBag,
    home: Home,
    palette: Palette,
    cpu: Cpu,
    leaf: Leaf,
    'graduation-cap': GraduationCap,
    heart: Heart,
    'more-horizontal': MoreHorizontal,
};

export const HeroSection = React.memo(({ idea }: HeroSectionProps) => {
    const { __ } = useLang();
    const { locale } = usePage().props as any;
    const isRtl = locale === 'ar';

    const CategoryIcon = idea.category_icon
        ? categoryIcons[idea.category_icon] || MoreHorizontal
        : Lightbulb;

    return (
        <section className="relative mb-12 flex h-[320px] items-center justify-center overflow-hidden md:h-[420px]">
            <div
                className="absolute inset-0 z-0 bg-cover bg-fixed bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000')",
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

            <div className="relative z-10 mx-auto flex flex-col items-center px-8 text-center">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/25 px-4 py-1.5 text-primary-fixed shadow-lg shadow-primary/20 backdrop-blur-sm">
                    <CategoryIcon className="h-3.5 w-3.5 text-yellow-400" />
                    <span className="text-[11px] font-black tracking-[0.2em] uppercase">
                        {typeof idea.category === 'object'
                            ? isRtl
                                ? idea.category.name_ar
                                : idea.category.name_en
                            : idea.category}
                    </span>
                </div>

                <h1 className="mb-6 max-w-3xl font-headline text-3xl leading-tight font-black tracking-wide text-white md:text-4xl">
                    {idea?.title}
                </h1>

                <div className="mx-auto flex max-w-fit flex-col gap-3">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <div className="flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                            <User className="h-4 w-4 text-yellow-400" />
                            <span className="mt-0.5 text-[13px] font-medium tracking-wider text-white/70 uppercase">
                                {__('messages.idea_detail.idea_owner')} :{' '}
                            </span>
                            <span className="text-sm font-semibold text-white">
                                {idea?.user?.name}
                            </span>
                        </div>

                        <div className="flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                            <Globe className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm font-semibold text-white">
                                {idea?.country}
                            </span>
                        </div>
                    </div>

                    <div className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                        <MapPin className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm font-semibold text-white">
                            {idea?.city}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
});

HeroSection.displayName = 'HeroSection';
