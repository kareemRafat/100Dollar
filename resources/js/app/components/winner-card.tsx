import { useLang } from '@erag/lang-sync-inertia/react';
import { Link } from '@inertiajs/react';
import { Trophy } from 'lucide-react';

type Props = {
    id: number;
    name: string;
    idea: string;
    avatarUrl?: string;
    badge: string;
    prize?: string;
};

export function WinnerCard({
    id,
    name,
    idea,
    avatarUrl,
    badge,
    prize = '100$',
}: Props) {
    const { __ } = useLang();

    return (
        <Link
            href={`/ideas/${id}`}
            prefetch
            className="group relative flex h-full w-72 flex-shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-primary/10 bg-surface-container-lowest p-6 shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-card"
        >
            <div className="bg-gradient-to-inline-end absolute start-0 top-0 h-1 w-full from-primary to-transparent" />
            <div className="relative mx-auto mb-6 h-24 w-24">
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20" />
                {avatarUrl ? (
                    <img
                        className="relative z-10 h-full w-full rounded-full border-4 border-surface-container-lowest object-cover shadow-xl dark:border-card"
                        src={avatarUrl}
                        alt={name}
                    />
                ) : (
                    <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full border-4 border-surface-container-lowest bg-primary/10 shadow-xl dark:border-card">
                        <span className="text-xl font-bold text-primary">
                            {name[0]}
                        </span>
                    </div>
                )}
                <div className="absolute -end-1 -bottom-1 z-20 flex h-8 w-8 items-center justify-center rounded-full border-4 border-surface-container-lowest bg-primary text-on-primary dark:border-card">
                    <Trophy className="size-4" />
                </div>
            </div>
            <div className="flex flex-1 flex-col text-center">
                <div className="mb-4 inline-block self-center rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary uppercase">
                    {badge}
                </div>
                <h4 className="mb-2 font-headline text-lg font-bold text-on-surface transition-colors group-hover:text-primary dark:text-white">
                    {name}
                </h4>
                <p className="mb-8 line-clamp-3 px-2 text-sm leading-relaxed text-on-surface-variant">
                    {idea}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-outline-variant/10 pt-4">
                    <span className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
                        {__('messages.home.prize_label')}
                    </span>
                    <span className="font-headline text-xl font-black text-primary">
                        {prize}
                    </span>
                </div>
            </div>
        </Link>
    );
}
