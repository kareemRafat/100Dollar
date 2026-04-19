type Props = {
    name: string;
    idea: string;
    avatarUrl?: string;
    badge: string;
    prize?: string;
};

export function WinnerCard({
    name,
    idea,
    avatarUrl,
    badge,
    prize = '100$',
}: Props) {
    return (
        <div className="group relative w-80 flex-shrink-0 snap-start overflow-hidden rounded-3xl border border-primary/10 bg-surface-container-lowest p-8 shadow-lg transition-all duration-500 hover:shadow-2xl dark:bg-card">
            <div className="absolute top-0 start-0 h-1 w-full bg-gradient-to-l from-primary to-transparent" />
            <div className="relative mx-auto mb-6 h-32 w-32">
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20" />
                {avatarUrl ? (
                    <img
                        className="relative z-10 h-full w-full rounded-full border-4 border-surface-container-lowest object-cover shadow-xl dark:border-card"
                        src={avatarUrl}
                        alt={name}
                    />
                ) : (
                    <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full border-4 border-surface-container-lowest bg-primary/10 shadow-xl dark:border-card">
                        <span className="text-2xl font-bold text-primary">
                            {name[0]}
                        </span>
                    </div>
                )}
                <div className="absolute -end-2 -bottom-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border-4 border-surface-container-lowest bg-primary text-on-primary dark:border-card">
                    <span className="material-symbols-outlined text-xl">
                        emoji_events
                    </span>
                </div>
            </div>
            <div className="text-center">
                <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {badge}
                </div>
                <h4 className="mb-2 font-headline text-xl font-bold text-on-surface dark:text-white transition-colors group-hover:text-primary">
                    {name}
                </h4>
                <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-on-surface-variant">
                    {idea}
                </p>
                <div className="flex items-center justify-between border-t border-outline-variant/10 pt-6">
                    <span className="text-xs font-bold tracking-wider text-on-surface-variant uppercase">
                        الجائزة
                    </span>
                    <span className="font-headline text-2xl font-black text-primary">
                        {prize}
                    </span>
                </div>
            </div>
        </div>
    );
}
