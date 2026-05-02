import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, usePage, router, Deferred } from '@inertiajs/react';
import {
    Bell,
    UserPlus,
    Loader2,
    Check
} from 'lucide-react';
import { useState, useRef, lazy, Suspense } from 'react';
import AppLayout from '@/app/layouts/app-layout';
import type { Idea, User, Paginated } from '@/types';
import ideasRoute from '@/routes/app/ideas';
import usersRoute from '@/routes/app/users';
import { toast } from '@/app/components/ui/toast';

// Partials
import { HeroSection } from './partials/hero-section';
import { VotingCard } from './partials/voting-card';
import { SocialShare } from './partials/social-share';
import { CommentSection } from './partials/comment-section';

// Lazy load modal
const PinModal = lazy(() => import('@/app/components/pin-modal').then(module => ({ default: module.PinModal })));

interface Comment {
    id: number;
    user_id: number;
    idea_id: number;
    body: string;
    likes_count: number;
    created_at: string;
    user?: User;
}

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

        router.post(ideasRoute.follow(idea.id).url, {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(
                    isFollowingIdea 
                        ? __('messages.archive.unfollow_idea_success') 
                        : __('messages.archive.follow_idea_success')
                );
            }
        });
    };

    const toggleFollowOwner = () => {
        if (!auth.user || !idea.user_id) {
            router.visit(`/login?redirect=${window.location.pathname}`);
            return;
        }

        router.post(usersRoute.follow(idea.user_id).url, {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(
                    isFollowingOwner 
                        ? __('messages.archive.unfollow_user_success') 
                        : __('messages.archive.follow_user_success')
                );
            }
        });
    };

    if (!idea || !comments) {
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
                        <Deferred data={['isFollowingIdea', 'isFollowingOwner']} fallback={
                            <div className="grid grid-cols-2 gap-3 opacity-50 pointer-events-none">
                                <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/10">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                </div>
                                <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/10">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                </div>
                            </div>
                        }>
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
                        </Deferred>

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
                                        <span className="material-symbols-outlined text-primary">analytics</span>
                                        {__('messages.about.core_values_title')}
                                    </h4>
                                    <ul className="space-y-3 text-sm text-on-surface-variant">
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                            {__('messages.idea_detail.innovative_features')}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                            {__('messages.idea_detail.low_operational_costs')}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                            {__('messages.idea_detail.ease_of_implementation')}
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
                                    <h4 className="font-bold text-on-surface mb-4 flex items-center gap-2 font-headline">
                                        <span className="material-symbols-outlined text-primary">payments</span>
                                        {__('messages.idea_detail.profit_model')}
                                    </h4>
                                    <ul className="space-y-3 text-sm text-on-surface-variant">
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                            {__('messages.idea_detail.high_profit_margin')}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                            {__('messages.idea_detail.rapid_scalability')}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                            {__('messages.idea_detail.added_value_services')}
                                        </li>
                                    </ul>
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

                        <CommentSection 
                            idea={idea} 
                            comments={comments} 
                            auth={auth} 
                            commentsTopRef={commentsTopRef} 
                        />
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
