import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link, router } from '@inertiajs/react';
import {
    Lightbulb,
    Vote as VoteIcon,
    Search,
    Pencil,
    Trash2,
    PlusCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import AppLayout from '@/app/layouts/app-layout';
import { Input } from '@/components/ui/input';

import app from '@/routes/app';

interface Idea {
    id: number;
    title: string;
    category: string;
    status: 'pending' | 'approved' | 'winner' | 'rejected';
    date: string;
    votes_count: number;
    target_votes: number;
    progress: number;
    funded: boolean;
}

interface FilterProps {
    search?: string;
    status?: string;
}

interface Stat {
    label: string;
    value: string;
    unit: string;
    icon: string;
}

export default function MyIdeas({
    ideas,
    filters,
    stats,
}: {
    ideas: { data: Idea[] };
    filters: FilterProps;
    stats: Stat[];
}) {
    const { __ } = useLang();
    const [search, setSearch] = useState(filters.search || '');

    const iconMap: Record<string, any> = {
        lightbulb: Lightbulb,
        vote: VoteIcon,
        emoji_events: 'emoji_events',
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return __('messages.my_ideas.filter_pending');
            case 'approved':
                return __('messages.my_ideas.filter_approved');
            case 'winner':
                return __('messages.my_ideas.filter_winner') + ' 🏆';
            case 'rejected':
                return __('messages.my_ideas.filter_rejected') || 'Rejected';
            default:
                return status;
        }
    };

    const handleFilter = (status: string | null) => {
        router.get(
            app.ideas.index.url({
                query: {
                    ...filters,
                    status: status || undefined,
                },
            }),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(
                    app.ideas.index.url({
                        query: {
                            ...filters,
                            search: search || undefined,
                        },
                    }),
                    {},
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                    },
                );
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <AppLayout activeRoute="/my-ideas">
            <Head title="أفكاري" />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative flex h-[280px] items-center justify-center overflow-hidden bg-[#0F172A] md:h-[350px]">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
                    </div>
                    <div className="relative z-10 text-center">
                        <h1 className="mb-5 font-headline text-2xl font-extrabold tracking-tight text-white md:text-4xl">
                            {__('messages.my_ideas.hero_title')}
                        </h1>
                        <p className="mx-auto max-w-2xl px-6 font-body text-[15px] text-white/80 md:text-base">
                            {__('messages.my_ideas.hero_desc')}
                        </p>
                    </div>
                </section>

                {/* Main Content Area */}
                <div className="relative z-20 mx-auto -mt-12 max-w-7xl px-8 pb-16">
                    {/* Stats Row */}
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
                                            {typeof Icon === 'string' ? (
                                                <span className="material-symbols-outlined text-2xl">
                                                    {Icon}
                                                </span>
                                            ) : (
                                                <Icon size={24} />
                                            )}
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

                    {/* Filter & Search Section */}
                    <div className="mb-8 flex flex-col items-center justify-between gap-6 rounded-2xl bg-surface-container-low p-5 md:flex-row dark:bg-surface-container-high">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute end-3 top-1/2 size-4 -translate-y-1/2 text-on-surface-variant/60" />
                            <Input
                                type="search"
                                className="h-10 border-none bg-surface-container-lowest ps-4 pe-10 text-sm focus-visible:ring-1 focus-visible:ring-primary dark:bg-surface-container-low dark:text-white"
                                placeholder={__('messages.my_ideas.search_placeholder')}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="no-scrollbar flex w-full gap-3 overflow-x-auto pb-2 md:w-auto md:pb-0">
                            <Button
                                className="h-10 rounded-full px-6 text-xs font-black"
                                variant={
                                    !filters.status ? 'default' : 'secondary'
                                }
                                onClick={() => handleFilter(null)}
                            >
                                {__('messages.my_ideas.filter_all')}
                            </Button>
                            <Button
                                className="h-10 rounded-full px-6 text-xs font-black"
                                variant={
                                    filters.status === 'pending'
                                        ? 'default'
                                        : 'secondary'
                                }
                                onClick={() => handleFilter('pending')}
                            >
                                {__('messages.my_ideas.filter_pending')}
                            </Button>
                            <Button
                                className="h-10 rounded-full px-6 text-xs font-black"
                                variant={
                                    filters.status === 'approved'
                                        ? 'default'
                                        : 'secondary'
                                }
                                onClick={() => handleFilter('approved')}
                            >
                                {__('messages.my_ideas.filter_approved')}
                            </Button>
                            <Button
                                className="h-10 rounded-full px-6 text-xs font-black"
                                variant={
                                    filters.status === 'winner'
                                        ? 'default'
                                        : 'secondary'
                                }
                                onClick={() => handleFilter('winner')}
                            >
                                {__('messages.my_ideas.filter_winner')}
                            </Button>
                        </div>
                    </div>

                    {/* Ideas Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {ideas.data.map((idea) => (
                            <div
                                key={idea.id}
                                className={`group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:shadow-2xl ${
                                    idea.status === 'winner'
                                        ? 'relative overflow-hidden border-2 border-primary/30 bg-surface-container-lowest shadow-lg dark:bg-card'
                                        : 'border-outline-variant/10 bg-surface-container-lowest dark:bg-card'
                                }`}
                            >
                                {idea.status === 'winner' && (
                                    <div className="absolute start-0 top-0 h-32 w-32 -translate-x-16 -translate-y-16 rotate-45 bg-primary/10"></div>
                                )}
                                <div className="relative z-10 mb-4 flex items-start justify-between">
                                    <span
                                        className={`rounded-lg px-2.5 py-1 text-xs font-black tracking-widest uppercase ${
                                            idea.status === 'winner'
                                                ? 'bg-primary/10 text-primary'
                                                : 'bg-surface-container-highest text-on-surface-variant dark:bg-white/10 dark:text-white/60'
                                        }`}
                                    >
                                        {idea.category}
                                    </span>
                                    <div className="flex gap-3 opacity-0 transition-opacity group-hover:opacity-100">
                                        {idea.status === 'winner' ? (
                                            <>
                                                <span className="material-symbols-outlined cursor-pointer text-xl text-on-surface-variant transition-colors hover:text-primary">
                                                    edit
                                                </span>
                                                <span className="material-symbols-outlined cursor-pointer text-xl text-on-surface-variant transition-colors hover:text-red-500">
                                                    delete
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href={app.ideas.index.url()}
                                                >
                                                    {' '}
                                                    {/* Placeholder for edit */}
                                                    <Pencil className="size-5 cursor-pointer text-on-surface-variant transition-colors hover:text-primary" />
                                                </Link>
                                                <Trash2 className="size-5 cursor-pointer text-on-surface-variant transition-colors hover:text-red-500" />
                                            </>
                                        )}
                                    </div>
                                </div>
                                <Link
                                    href={app.ideas.show.url(idea.id)}
                                    className="group block"
                                >
                                    <h3 className="mb-3 text-lg leading-tight font-black text-on-surface transition-colors group-hover:text-primary dark:text-white">
                                        {idea.title}
                                    </h3>
                                </Link>
                                <div className="relative z-10 mb-5 flex items-center gap-2">
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black tracking-tight uppercase ${
                                            idea.status === 'pending'
                                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                : idea.status === 'approved'
                                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                  : idea.status === 'rejected'
                                                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                    : 'bg-primary-fixed text-on-primary-fixed-variant'
                                        }`}
                                    >
                                        {(idea.status === 'pending' ||
                                            idea.status === 'approved' ||
                                            idea.status === 'rejected') && (
                                            <span
                                                className={`me-2 h-1.5 w-1.5 rounded-full ${
                                                    idea.status === 'pending'
                                                        ? 'bg-amber-500'
                                                        : idea.status ===
                                                            'approved'
                                                          ? 'bg-green-500'
                                                          : 'bg-red-500'
                                                }`}
                                            ></span>
                                        )}
                                        {getStatusLabel(idea.status)}
                                    </span>
                                    <span className="ms-auto text-xs font-bold text-on-surface-variant dark:text-slate-400">
                                        {idea.date}
                                    </span>
                                </div>
                                <div className="relative z-10 mt-auto">
                                    <div className="mb-2 flex items-end justify-between">
                                        <span className="text-xs font-black tracking-wider text-on-surface-variant uppercase dark:text-slate-400">
                                            {idea.status === 'winner'
                                                ? __(
                                                      'messages.my_ideas.final_votes',
                                                  )
                                                : __(
                                                      'messages.my_ideas.current_votes',
                                                  )}
                                        </span>
                                        <span className="text-sm font-black text-primary">
                                            {idea.votes_count.toLocaleString()}
                                            {idea.target_votes &&
                                                ` / ${idea.target_votes}`}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high dark:bg-white/10">
                                        <div
                                            className="h-full bg-gradient-to-l from-primary to-primary-container transition-all duration-1000"
                                            style={{
                                                width: `${idea.progress}%`,
                                            }}
                                        ></div>
                                    </div>
                                    {idea.funded && (
                                        <div className="mt-4 flex items-center justify-center gap-2 border-t border-outline-variant/10 pt-3 text-xs font-black tracking-widest text-primary uppercase">
                                            <span className="material-symbols-outlined text-sm">
                                                workspace_premium
                                            </span>
                                            {__(
                                                'messages.my_ideas.funded_success',
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Add New Idea Placeholder */}
                        <Link
                            href={app.ideas.create.url()}
                            className="group flex h-full min-h-[250px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-outline-variant/30 bg-surface/30 p-6 transition-all hover:border-primary/50 hover:bg-primary/5"
                        >
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-fixed group-hover:text-primary dark:bg-white/10">
                                <PlusCircle className="size-8" />
                            </div>
                            <h3 className="text-lg font-black text-on-surface-variant transition-colors group-hover:text-primary dark:text-slate-400">
                                {__('messages.my_ideas.share_new_idea')}
                            </h3>
                            <p className="mt-2 px-6 text-center text-xs leading-relaxed font-bold text-on-surface-variant/60 dark:text-slate-400/60">
                                {__('messages.my_ideas.share_new_idea_desc')}
                            </p>
                        </Link>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
