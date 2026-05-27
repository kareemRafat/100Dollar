import {
    Lightbulb,
    Vote as VoteIcon,
    Trophy,
} from 'lucide-react';

interface Stat {
    label: string;
    value: string;
    unit: string;
    icon: string;
}

interface StatsCardsProps {
    stats: Stat[];
}

const iconMap: Record<string, any> = {
    lightbulb: Lightbulb,
    vote: VoteIcon,
    emoji_events: Trophy,
};

export function StatsCards({ stats }: StatsCardsProps) {
    return (
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {stats.map((stat) => {
                const Icon = iconMap[stat.icon];

                return (
                    <div
                        key={stat.label}
                        className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-xl shadow-black/5 dark:bg-surface-container-low"
                    >
                        <div className="absolute -top-2 -right-2 h-20 w-20 rounded-full bg-primary/5 blur-xl transition-colors group-hover:bg-primary/10"></div>
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Icon size={24} />
                            </div>
                            <span className="text-xs font-black tracking-wider text-on-surface-variant uppercase dark:text-slate-400">
                                {stat.label}
                            </span>
                        </div>
                        <div className="relative z-10 mt-2 flex items-baseline gap-2">
                            <span className="text-3xl font-black tracking-tight text-on-surface dark:text-white">
                                {stat.value}
                            </span>
                            <span className="text-xs font-bold text-on-surface-variant dark:text-slate-400">
                                {stat.unit}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
