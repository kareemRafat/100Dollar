import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, usePage, router, WhenVisible } from '@inertiajs/react';
import { 
    Bell, 
    UserPlus, 
    Check, 
    Image as ImageIcon,
    Lightbulb,
    Megaphone,
    Clock,
    Users,
    Receipt
} from 'lucide-react';
import { useState, useRef, lazy, Suspense } from 'react';
import { Button } from '@/app/components/ui/button';
import { Skeleton } from '@/app/components/ui/skeleton';
import { toast } from '@/app/components/ui/toast';
import { useIdeaVote } from '@/app/hooks/use-idea-vote';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import ideasRoute from '@/routes/app/ideas';
import usersRoute from '@/routes/app/users';
import type { Idea, Paginated, Comment } from '@/types';

// Partials
import { CommentSection } from './partials/comment-section';
import { HeroSection } from './partials/hero-section';
import { OwnerCard } from './partials/owner-card';
import { SocialShare } from './partials/social-share';
import { VotingCard } from './partials/voting-card';

// Lazy load modal
const PinModal = lazy(() =>
    import('@/app/components/pin-modal').then((module) => ({
        default: module.PinModal,
    })),
);

interface Props {
    idea: Idea & { votes_count: number; comments_count: number };
    comments: Paginated<Comment>;
    isFollowingIdea: boolean;
    isFollowingOwner: boolean;
    votedIdeaId: number | null;
}

export default function IdeaShow({
    idea,
    comments,
    isFollowingIdea,
    isFollowingOwner,
    votedIdeaId,
}: Props) {
    const { __ } = useLang();
    const { auth, name: appName } = usePage().props as any;
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const commentsTopRef = useRef<HTMLDivElement>(null);

    const isOwner = auth.user?.id === idea.user_id;

    const {
        votesCount,
        isPinModalOpen,
        isAutoSending,
        isBlocked,
        remainingSeconds,
        handleVoteClick,
        handleVoteSuccess,
        setIsPinModalOpen,
    } = useIdeaVote(idea.id, idea.votes_count);

    const toggleFollowIdea = () => {
        if (!auth.user) {
            router.visit(`/login?redirect=${window.location.pathname}`);

            return;
        }

        router
            .optimistic((props: Props) => ({
                isFollowingIdea: !props.isFollowingIdea,
            }))
            .post(
                ideasRoute.follow(idea.id).url,
                {},
                {
                    preserveScroll: true,
                    showProgress: false,
                    only: [
                        'idea',
                        'isFollowingIdea',
                        'isFollowingOwner',
                        'auth',
                        'flash',
                        'errors',
                    ],
                    onSuccess: () => {
                        toast.success(
                            !isFollowingIdea
                                ? __('messages.archive.follow_idea_success')
                                : __('messages.archive.unfollow_idea_success'),
                        );
                    },
                },
            );
    };

    const toggleFollowOwner = () => {
        if (!auth.user) {
            router.visit(`/login?redirect=${window.location.pathname}`);

            return;
        }

        if (!idea.user_id || isOwner) {
            return;
        }

        router
            .optimistic((props: Props) => ({
                isFollowingOwner: !props.isFollowingOwner,
            }))
            .post(
                usersRoute.follow(idea.user_id).url,
                {},
                {
                    preserveScroll: true,
                    showProgress: false,
                    only: [
                        'idea',
                        'isFollowingIdea',
                        'isFollowingOwner',
                        'auth',
                        'flash',
                        'errors',
                    ],
                    onSuccess: () => {
                        toast.success(
                            !isFollowingOwner
                                ? __('messages.archive.follow_user_success')
                                : __('messages.archive.unfollow_user_success'),
                        );
                    },
                },
            );
    };

    if (!idea) {
        return null;
    }

    return (
        <>
            <Head>
                <title>{idea.title}</title>
                <meta
                    name="description"
                    content={idea.description?.substring(0, 160)}
                />

                {/* Open Graph / Facebook / WhatsApp */}
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content={appName as string} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:title" content={idea.title} />
                <meta
                    property="og:description"
                    content={idea.description?.substring(0, 160)}
                />
                {idea.image && (
                    <>
                        <meta property="og:image" content={idea.image} />
                        <meta property="og:image:secure_url" content={idea.image} />
                        <meta property="og:image:type" content="image/jpeg" />
                        <meta property="og:image:width" content="1200" />
                        <meta property="og:image:height" content="630" />
                    </>
                )}

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={window.location.href} />
                <meta name="twitter:title" content={idea.title} />
                <meta
                    name="twitter:description"
                    content={idea.description?.substring(0, 160)}
                />
                {idea.image && (
                    <meta name="twitter:image" content={idea.image} />
                )}
            </Head>

            <main className="pb-24">
                <HeroSection idea={{ ...idea, votes_count: votesCount }} />

                <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-6 lg:grid-cols-12">
                    {/* Sidebar */}
                    <aside className="order-1 space-y-6 lg:order-2 lg:col-span-4">
                        <VotingCard
                            idea={{ ...idea, votes_count: votesCount }}
                            onVoteClick={handleVoteClick}
                            isLoading={isAutoSending}
                            isBlocked={isBlocked}
                            isOwner={isOwner}
                            remainingSeconds={remainingSeconds}
                            isVoted={votedIdeaId === idea.id}
                        />

                        <OwnerCard idea={idea} />

                        {/* Follow Actions */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={toggleFollowIdea}
                                className={`group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border bg-surface-container-lowest p-4 shadow-sm transition-all ${isFollowingIdea ? 'border-transparent' : 'border-outline-variant/10 hover:border-primary'}`}
                            >
                                <div
                                    className={`rounded-lg p-2 transition-colors ${isFollowingIdea ? 'bg-primary text-on-primary' : 'border border-primary/20 bg-primary/5 text-primary group-hover:bg-primary group-hover:text-on-primary'}`}
                                >
                                    {isFollowingIdea ? (
                                        <Check className="h-5 w-5" />
                                    ) : (
                                        <Bell className="h-5 w-5" />
                                    )}
                                </div>
                                <span className="text-[10px] font-black tracking-wider text-on-surface uppercase">
                                    {isFollowingIdea
                                        ? __('messages.archive.following')
                                        : __('messages.archive.follow_idea')}
                                </span>
                            </button>
                            <button
                                onClick={toggleFollowOwner}
                                className={`group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border bg-surface-container-lowest p-4 shadow-sm transition-all ${isFollowingOwner ? 'border-transparent' : 'border-outline-variant/10 hover:border-primary'}`}
                            >
                                <div
                                    className={`rounded-lg p-2 transition-colors ${isFollowingOwner ? 'bg-primary text-on-primary' : 'border border-primary/20 bg-primary/5 text-primary group-hover:bg-primary group-hover:text-on-primary'}`}
                                >
                                    {isFollowingOwner ? (
                                        <Check className="h-5 w-5" />
                                    ) : (
                                        <UserPlus className="h-5 w-5" />
                                    )}
                                </div>
                                <span className="text-[10px] font-black tracking-wider text-on-surface uppercase">
                                    {isFollowingOwner
                                        ? __('messages.archive.following')
                                        : __('messages.archive.follow_owner')}
                                </span>
                            </button>
                        </div>

                        <SocialShare idea={idea} />
                    </aside>

                    {/* Main Content */}
                    <div className="order-2 space-y-12 lg:order-1 lg:col-span-8">
                        {/* About Section */}
                        <section className="arabic-dynamic-padding rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-8 lg:p-12">
                            <h2 className="mb-6 flex items-center gap-3 font-headline text-2xl font-bold text-on-surface">
                                <Lightbulb className="size-6 text-primary" />
                                {__('messages.idea_detail.about_idea')}
                            </h2>
                            <p className="mb-8 text-lg leading-relaxed whitespace-pre-wrap text-on-surface-variant">
                                {idea.description}
                            </p>
                            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-6">
                                    <h4 className="mb-4 flex items-center gap-2 font-headline font-bold text-on-surface">
                                        <Megaphone className="size-5 text-primary" />
                                        {__(
                                            'messages.submit_idea.marketing_channel_label',
                                        )}
                                    </h4>
                                    <div className="space-y-2">
                                        {Array.isArray(
                                            idea.marketing_channel,
                                        ) &&
                                        idea.marketing_channel.length > 0 ? (
                                            idea.marketing_channel.map(
                                                (channel: string) => (
                                                    <div
                                                        key={channel}
                                                        className="flex items-center gap-2 text-on-surface-variant"
                                                    >
                                                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                                                        {__(
                                                            `messages.submit_idea.channels.${channel}`,
                                                        )}
                                                    </div>
                                                ),
                                            )
                                        ) : (
                                            <div className="flex items-center gap-2 text-on-surface-variant">
                                                <span className="h-2 w-2 rounded-full bg-primary"></span>
                                                {idea.marketing_channel &&
                                                !Array.isArray(
                                                    idea.marketing_channel,
                                                )
                                                    ? __(
                                                          `messages.submit_idea.channels.${idea.marketing_channel}`,
                                                      )
                                                    : '---'}
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="mt-6 mb-4 flex items-center gap-2 font-headline font-bold text-on-surface">
                                        <Clock className="size-5 text-primary" />
                                        {__(
                                            'messages.submit_idea.implementation_time_label',
                                        )}
                                    </h4>
                                    <div className="flex items-center gap-2 text-on-surface-variant">
                                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                                        {idea.implementation_time
                                            ? __(
                                                  `messages.submit_idea.times.${idea.implementation_time}`,
                                              )
                                            : '---'}
                                    </div>
                                </div>
                                <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-6">
                                    <h4 className="mb-4 flex items-center gap-2 font-headline font-bold text-on-surface">
                                        <Users className="size-5 text-primary" />
                                        {__(
                                            'messages.submit_idea.target_audience_label',
                                        )}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {idea.target_audience &&
                                        idea.target_audience.length > 0 ? (
                                            idea.target_audience.map(
                                                (audience) => (
                                                    <div
                                                        key={audience}
                                                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                                                    >
                                                        {__(
                                                            `messages.submit_idea.audiences.${audience}`,
                                                        )}
                                                    </div>
                                                ),
                                            )
                                        ) : (
                                            <span className="text-sm text-on-surface-variant">
                                                ---
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <h3 className="mb-6 flex items-center gap-3 font-headline text-xl font-bold text-on-surface">
                                <Receipt className="size-6 text-primary" />
                                {__('messages.home.prize_label')} ({__('messages.home.one_hundred_dollars')}){' '}
                                {__('messages.idea_detail.prize_covers')}
                            </h3>
                            <div className="mb-8 space-y-4">
                                <div className="flex items-center justify-between rounded-lg border-r-4 border-primary bg-surface-container-low p-4">
                                    <span className="font-medium text-on-surface">
                                        {__(
                                            'messages.submit_idea.details_label',
                                        )}
                                    </span>
                                    <span className="font-bold text-primary">
                                        {__('messages.home.one_hundred_dollars')}
                                    </span>
                                </div>
                            </div>

                            {/* View Project Image Button */}
                            {idea.image && (
                                <div className="flex justify-end border-t border-outline-variant/10">
                                    <Button
                                        onClick={() =>
                                            setIsImageModalOpen(true)
                                        }
                                        className="h-12 gap-2 border border-y border-primary/20 bg-primary/10 px-6 text-sm font-black text-primary shadow-sm transition-all hover:bg-primary/20"
                                    >
                                        <ImageIcon className="h-4 w-4" />
                                        {__('messages.idea_detail.view_image')}
                                    </Button>
                                </div>
                            )}
                        </section>

                        <div ref={commentsTopRef} className="scroll-mt-32" />

                        <WhenVisible
                            data="comments"
                            fallback={<CommentSkeleton />}
                            buffer={300}
                        >
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

            {/* Image Modal */}
            <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
                <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] border-none bg-transparent p-0 shadow-none outline-none">
                    <DialogHeader className="hidden">
                        <DialogTitle>{idea.title}</DialogTitle>
                    </DialogHeader>
                    <div className="relative group">
                        <div className="overflow-hidden rounded-2xl bg-surface-container-low/50 backdrop-blur-sm flex justify-center items-center">
                            {idea.image && (
                                <img
                                    src={idea.image}
                                    alt={idea.title}
                                    className="block h-auto w-auto max-w-full max-h-[90vh] object-contain cursor-zoom-out"
                                    onClick={() => setIsImageModalOpen(false)}
                                />
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Suspense fallback={null}>
                {isPinModalOpen && (
                    <PinModal
                        isOpen={isPinModalOpen}
                        onClose={() => setIsPinModalOpen(false)}
                        onSuccess={handleVoteSuccess}
                        ideaId={idea.id}
                        initialEmail={auth.user?.email}
                    />
                )}
            </Suspense>
        </>
    );
}


function CommentSkeleton() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-8 w-12 rounded-full" />
            </div>
            <div className="overflow-hidden rounded-2xl border-x border-t-4 border-b border-outline-variant/20 border-primary bg-surface-container-lowest shadow-sm">
                <div className="space-y-8 p-6 md:p-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4">
                            <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
                            <div className="mt-1 flex-1 space-y-3">
                                <div className="flex items-center justify-between">
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
