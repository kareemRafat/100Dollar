import { useLang } from '@erag/lang-sync-inertia/react';
import { Link } from '@inertiajs/react';
import { 
    ShoppingBag, 
    Home, 
    Palette, 
    Cpu, 
    Leaf, 
    GraduationCap, 
    Heart, 
    MoreHorizontal 
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';

type Props = {
    id: number;
    category: string;
    categoryIcon?: string;
    budget: string;
    title: string;
    description: string;
    authorName: string;
    authorAvatar?: string;
    authorInitial?: string;
    timeAgo: string;
    votes: number;
    voteProgress: number;
    onVote?: () => void;
    isWinner?: boolean;
    imageUrl?: string;
    date?: string;
    variant?: 'home' | 'archive';
};

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

export function IdeaCard({
    id,
    category,
    categoryIcon,
    budget,
    title,
    description,
    authorName,
    authorAvatar,
    authorInitial,
    timeAgo,
    votes,
    voteProgress,
    onVote,
    isWinner,
    imageUrl,
    date,
    variant = 'home',
}: Props) {
    const { __ } = useLang();
    
    const Icon = categoryIcon ? (categoryIcons[categoryIcon] || MoreHorizontal) : null;

    if (variant === 'archive') {
        return (
            <Link 
                href={`/ideas/${id}`}
                prefetch
                className="group flex flex-col overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-sm transition-all duration-300 hover:shadow-md dark:bg-card"
            >
                {imageUrl && (
                    <div className="relative h-40 overflow-hidden sm:h-48">
                        <img
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            src={imageUrl}
                            alt={title}
                        />
                        {isWinner && (
                            <div className="absolute inset-inline-end-3 top-3 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-on-primary shadow-lg sm:inset-inline-end-4 sm:top-4">
                                <span>🏆 {__('messages.archive.winner_status')}</span>
                            </div>
                        )}
                    </div>
                )}
                <div className="flex flex-1 flex-col p-5 sm:p-8">
                    <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-2">
                            {Icon && <Icon className="size-3.5 text-primary" />}
                            <span className="text-xs font-bold tracking-widest text-primary uppercase">
                                {category}
                            </span>
                        </div>
                        {date && (
                            <span className="text-xs text-outline">{date}</span>
                        )}
                    </div>
                    <h3 className="mb-3 font-headline text-xl leading-snug font-bold text-on-surface dark:text-white">
                        {title}
                    </h3>
                    <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-on-surface-variant">
                        {description}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-outline-variant/10 pt-6">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-secondary-container text-xs font-bold text-on-secondary-container">
                                {authorAvatar ? (
                                    <img
                                        className="h-full w-full object-cover"
                                        src={authorAvatar}
                                        alt={authorName}
                                    />
                                ) : (
                                    authorInitial || authorName[0]
                                )}
                            </div>
                            <span className="text-xs font-medium dark:text-on-surface-variant">
                                {authorName}
                            </span>
                        </div>
                        <span className="text-lg font-bold text-primary">
                            {budget}
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link 
            href={`/ideas/${id}`}
            prefetch
            className="group flex h-full flex-col rounded-3xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm transition-all hover:shadow-xl dark:bg-card"
        >
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-2 rounded-md bg-primary-fixed px-3 py-1">
                    {Icon && <Icon className="size-3.5 text-on-primary-fixed" />}
                    <span className="text-xs font-bold text-on-primary-fixed">
                        {category}
                    </span>
                </div>
                <div className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-base">
                        payments
                    </span>
                    <span className="text-sm font-bold">{budget}</span>
                </div>
            </div>
            <h3 className="mb-3 font-headline text-xl leading-snug font-bold text-on-surface dark:text-white">
                {title}
            </h3>
            <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-on-surface-variant">
                {description}
            </p>
            <div className="mt-auto">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-secondary-fixed-dim dark:bg-secondary-container">
                        {authorAvatar ? (
                            <img
                                className="h-full w-full object-cover"
                                src={authorAvatar}
                                alt={authorName}
                            />
                        ) : (
                            <span className="text-xs font-bold text-on-surface dark:text-white">
                                {authorInitial || authorName[0]}
                            </span>
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-on-surface dark:text-white">
                            {authorName}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                            {timeAgo}
                        </p>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="mb-2 flex items-end justify-between">
                        <span className="text-xs font-bold text-on-surface-variant">
                            {__('messages.home.vote_progress')}
                        </span>
                        <span className="text-base font-bold text-primary">
                            {votes} {__('messages.my_ideas.unit_vote')}
                        </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-outline-variant/20 dark:bg-outline-variant/40">
                        <div
                            className="h-full rounded-full bg-gradient-to-inline-end from-primary to-primary-container"
                            style={{ width: `${voteProgress}%` }}
                        />
                    </div>
                </div>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onVote?.();
                    }}
                    variant="secondary"
                    className="w-full rounded-xl py-6 group-hover:bg-primary/90 group-hover:text-on-primary"
                >
                    <span className="material-symbols-outlined text-xl">thumb_up</span>
                    <span>{__('messages.home.vote_now')}</span>
                </Button>
            </div>
        </Link>
    );
}
