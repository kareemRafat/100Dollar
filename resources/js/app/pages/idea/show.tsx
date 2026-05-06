import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, usePage, router, WhenVisible } from '@inertiajs/react';
import {
    Bell,
    UserPlus,
    Check
} from 'lucide-react';
import { useState, useRef, lazy, Suspense } from 'react';
import { Skeleton } from '@/app/components/ui/skeleton';
import { toast } from '@/app/components/ui/toast';
import AppLayout from '@/app/layouts/app-layout';
import ideasRoute from '@/routes/app/ideas';
import usersRoute from '@/routes/app/users';
import type { Idea, Paginated, Comment } from '@/types';

// Partials
import { CommentSection } from './partials/comment-section';
import { HeroSection } from './partials/hero-section';
import { SocialShare } from './partials/social-share';
import { VotingCard } from './partials/voting-card';

// Lazy load modal
const PinModal = lazy(() => import('@/app/components/pin-modal').then(module => ({ default: module.PinModal })));

interface Props {
    idea: Idea & { votes_count: number, comments_count: number };
    comments: Paginated<Comment>;
    isFollowingIdea: boolean;
    isFollowingOwner: boolean;
}

export default function IdeaShow({ idea, comments, isFollowingIdea, isFollowingOwner }: Props) {
    const { __ } = useLang();
    const { auth } = usePage().props as any;
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const commentsTopRef = useRef<HTMLDivElement>(null);

    const toggleFollowIdea = () => {
        if (!auth.user) {
            router.visit(`/login?redirect=${window.location.pathname}`);

            return;
        }

        router.optimistic((props: Props) => ({
            isFollowingIdea: !props.isFollowingIdea
        })).post(ideasRoute.follow(idea.id).url, {}, {
            preserveScroll: true,
            showProgress: false,
            only: ['idea', 'isFollowingIdea', 'isFollowingOwner', 'auth', 'flash', 'errors'],
            onSuccess: () => {
                toast.success(
                    !isFollowingIdea
                        ? __('messages.archive.follow_idea_success')
                        : __('messages.archive.unfollow_idea_success')
                );
            },
        });
    };

    const toggleFollowOwner = () => {
        if (!auth.user || !idea.user_id) {
            router.visit(`/login?redirect=${window.location.pathname}`);

            return;
        }

        router.optimistic((props: Props) => ({
            isFollowingOwner: !props.isFollowingOwner
        })).post(usersRoute.follow(idea.user_id).url, {}, {
            preserveScroll: true,
            showProgress: false,
            only: ['idea', 'isFollowingIdea', 'isFollowingOwner', 'auth', 'flash', 'errors'],
            onSuccess: () => {
                toast.success(
                    !isFollowingOwner
                        ? __('messages.archive.follow_user_success')
                        : __('messages.archive.unfollow_user_success')
                );
            },
        });
    };

    if (!idea) {
        return null;
    }

    return (
        <AppLayout>
            <Head>
                <title>{idea.title}</title>
                <meta name="description" content={idea.description?.substring(0, 160)} />
                <meta property="og:title" content={idea.title} />
                <meta property="og:description" content={idea.description?.substring(0, 160)} />
                {idea.image && <meta property="og:image" content={idea.image} />}
            </Head>

            <main className="pb-24">
                <HeroSection idea={idea} />

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Sidebar */}
                    <aside className="lg:col-span-4 order-1 lg:order-2 space-y-6">
                        <VotingCard idea={idea} onVoteClick={() => setIsPinModalOpen(true)} />

                        {/* Follow Actions */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={toggleFollowIdea}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-surface-container-lowest shadow-sm transition-all group cursor-pointer border ${isFollowingIdea ? 'border-transparent' : 'border-outline-variant/10 hover:border-primary'}`}
                            >
                                <div className={`p-2 rounded-lg transition-colors ${isFollowingIdea ? 'bg-primary text-on-primary' : 'bg-primary/5 text-primary group-hover:bg-primary group-hover:text-on-primary border border-primary/20'}`}>
                                    {isFollowingIdea ? <Check className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-wider text-on-surface">
                                    {isFollowingIdea ? __('messages.archive.following') : __('messages.archive.follow_idea')}
                                </span>
                            </button>
                            <button
                                onClick={toggleFollowOwner}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-surface-container-lowest shadow-sm transition-all group cursor-pointer border ${isFollowingOwner ? 'border-transparent' : 'border-outline-variant/10 hover:border-primary'}`}
                            >
                                <div className={`p-2 rounded-lg transition-colors ${isFollowingOwner ? 'bg-primary text-on-primary' : 'bg-primary/5 text-primary group-hover:bg-primary group-hover:text-on-primary border border-primary/20'}`}>
                                    {isFollowingOwner ? <Check className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-wider text-on-surface">
                                    {isFollowingOwner ? __('messages.archive.following') : __('messages.archive.follow_owner')}
                                </span>
                            </button>
                        </div>

                        <SocialShare idea={idea} />
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-8 order-2 lg:order-1 space-y-12">
                        {/* About Section */}
                        <section className="bg-surface-container-lowest p-8 lg:p-12 rounded-xl border border-outline-variant/10 arabic-dynamic-padding">
                            <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3 font-headline">
                                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                                {__('messages.idea_detail.about_idea')}
                            </h2>
                            <p className="text-on-surface-variant leading-relaxed mb-8 text-lg whitespace-pre-wrap">
                                {idea.description}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
                                    <h4 className="font-bold text-on-surface mb-4 flex items-center gap-2 font-headline">
                                        <span className="material-symbols-outlined text-primary">campaign</span>
                                        {__('messages.submit_idea.marketing_channel_label')}
                                    </h4>
                                    <div className="flex items-center gap-2 text-on-surface-variant">
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        {idea.marketing_channel ? __(`messages.submit_idea.channels.${idea.marketing_channel}`) : '---'}
                                    </div>
                                    <h4 className="font-bold text-on-surface mt-6 mb-4 flex items-center gap-2 font-headline">
                                        <span className="material-symbols-outlined text-primary">schedule</span>
                                        {__('messages.submit_idea.implementation_time_label')}
                                    </h4>
                                    <div className="flex items-center gap-2 text-on-surface-variant">
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        {idea.implementation_time ? __(`messages.submit_idea.times.${idea.implementation_time}`) : '---'}
                                    </div>
                                </div>
                                <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
                                    <h4 className="font-bold text-on-surface mb-4 flex items-center gap-2 font-headline">
                                        <span className="material-symbols-outlined text-primary">groups</span>
                                        {__('messages.submit_idea.target_audience_label')}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {idea.target_audience && idea.target_audience.length > 0 ? (
                                            idea.target_audience.map((audience) => (
                                                <div key={audience} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold border border-primary/20">
                                                    {__(`messages.submit_idea.audiences.${audience}`)}
                                                </div>
                                            ))
                                        ) : (
                                            <span className="text-on-surface-variant text-sm">---</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-3 font-headline">
                                <span className="material-symbols-outlined text-primary">receipt_long</span>
                                {__('messages.home.prize_label')} (100 دولار) {__('messages.idea_detail.prize_covers')}
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border-r-4 border-primary">
                                    <span className="font-medium text-on-surface">{__('messages.submit_idea.details_label')}</span>
                                    <span className="font-bold text-primary">100 دولار</span>
                                </div>
                            </div>
                        </section>

                        <div ref={commentsTopRef} className="scroll-mt-32" />

                        <WhenVisible data="comments" fallback={<CommentSkeleton />} buffer={300}>
                            {comments && (
                                <CommentSection
                                    idea={idea}
                                    comments={comments}
                                    auth={auth}
                                    commentsTopRef={commentsTopRef}
                                />
                            )}
                        </WhenVisible>
                    </div>
                </div>
            </main>

            {isPinModalOpen && (
                <Suspense fallback={null}>
                    <PinModal
                        isOpen={isPinModalOpen}
                        onClose={() => setIsPinModalOpen(false)}
                        onSubmit={(pin) => {
                            console.log('Voting with pin:', pin);
                            setIsPinModalOpen(false);
                        }}
                        email={auth.user?.email || 'test@example.com'}
                    />
                </Suspense>
            )}
        </AppLayout>
    );
}

function CommentSkeleton() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-8 w-12 rounded-full" />
            </div>
            <div className="bg-surface-container-lowest rounded-2xl border-t-4 border-primary border-x border-b border-outline-variant/20 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 space-y-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4">
                            <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                            <div className="flex-1 space-y-3 mt-1">
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-8 w-16 rounded-full" />
                                </div>
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-20 w-full rounded-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
