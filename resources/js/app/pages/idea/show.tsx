import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link, usePage, useForm, router, InfiniteScroll } from '@inertiajs/react';
import AppLayout from '@/app/layouts/app-layout';
import { Idea, User, Paginated } from '@/types';
import { useState, FormEvent, useRef } from 'react';
import { PinModal } from '@/app/components/pin-modal';
import { 
    Bell,
    UserPlus,
    Send,
    Loader2
} from 'lucide-react';

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

    const { data, setData, post, processing, reset, errors } = useForm({
        body: '',
    });

    if (!idea || !comments) {
        return null;
    }
    
    // Calculate voting progress
    const voteGoal = 500;
    const votePercentage = Math.min(Math.round((idea.votes_count / voteGoal) * 100), 100);
    const circumference = 364.4; // Matching info22.html dasharray
    const strokeDashoffset = circumference - (votePercentage / 100) * circumference;

    const handleShare = (platform: string) => {
        const url = window.location.href;
        const text = `${__('messages.idea_detail.about_idea')}: ${idea.title}`;
        
        switch (platform) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
                break;
            case 'x':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                break;
        }
    };

    const submitComment = (e: FormEvent) => {
        e.preventDefault();
        
        if (!auth.user || !data.body.trim() || processing) return;

        post(`/ideas/${idea.id}/comments`, {
            preserveScroll: true,
            preserveState: false, 
            onSuccess: () => {
                reset('body');
                setTimeout(() => {
                    commentsTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 150);
            },
        });
    };

    return (
        <AppLayout>
            <Head>
                <title>{idea.title}</title>
                <meta name="description" content={idea.description.substring(0, 160)} />
                <meta property="og:title" content={idea.title} />
                <meta property="og:description" content={idea.description.substring(0, 160)} />
                {idea.image && <meta property="og:image" content={idea.image} />}
            </Head>

            <main className="pb-24">
                {/* Hero Section */}
                <section className="relative h-[400px] w-full overflow-hidden mb-12">
                    <div className="absolute inset-0 bg-cover bg-center" 
                        style={{ backgroundImage: `url('${idea.image || 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop'}')` }}>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                        <div className="bg-primary text-on-primary px-4 py-1 rounded-full text-xs font-bold mb-4 tracking-widest uppercase">
                            {idea.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight font-headline max-w-4xl tracking-tighter">
                            {idea.title}
                        </h1>
                        <div className="flex items-center gap-3 text-white/90 font-medium">
                            <span>{__('messages.idea_detail.idea_owner')}: {idea.user?.name}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            <span>{idea.city}، {idea.country}</span>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Sidebar */}
                    <aside className="lg:col-span-4 order-1 lg:order-2 space-y-6">
                        {/* Voting Card */}
                        <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-[0_32px_48px_-4px_rgba(26,28,27,0.05)]">
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle className="text-outline-variant/20" cx="64" cy="64" fill="transparent" r="58"
                                            stroke="currentColor" strokeWidth="8"></circle>
                                        <circle className="text-primary" cx="64" cy="64" fill="transparent" r="58"
                                            stroke="currentColor" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                                            strokeWidth="8" strokeLinecap="round"></circle>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-extrabold text-on-surface">{votePercentage}%</span>
                                        <span className="text-[10px] text-outline font-bold uppercase tracking-wider">{__('messages.home.vote_progress')}</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-on-surface mb-2 font-headline">{__('messages.home.vote_now')}</h3>
                                <p className="text-sm text-outline leading-relaxed">{__('messages.home.voting_chance_still')}</p>
                            </div>
                            <button
                                onClick={() => setIsPinModalOpen(true)}
                                className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-lg hover:bg-primary-container transition-all active:scale-[0.98] shadow-lg mb-4">
                                {__('messages.home.vote_now')}
                            </button>
                            <p className="text-[11px] text-center text-outline-variant font-medium">
                                {__('messages.my_ideas.unit_vote')}: {idea.votes_count.toLocaleString()}
                            </p>
                        </div>

                        {/* Follow Actions */}
                        <div className="grid grid-cols-2 gap-3">
                            <button 
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/10 shadow-sm transition-all group ${isFollowingIdea ? 'border-primary' : 'hover:border-primary'}`}
                            >
                                <div className={`p-2 rounded-lg transition-colors ${isFollowingIdea ? 'bg-primary text-on-primary' : 'bg-primary/5 text-primary group-hover:bg-primary group-hover:text-on-primary'}`}>
                                    <Bell className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-wider text-on-surface">{__('messages.archive.follow_idea')}</span>
                            </button>
                            <button 
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/10 shadow-sm transition-all group ${isFollowingOwner ? 'border-primary' : 'hover:border-primary'}`}
                            >
                                <div className={`p-2 rounded-lg transition-colors ${isFollowingOwner ? 'bg-primary text-on-primary' : 'bg-primary/5 text-primary group-hover:bg-primary group-hover:text-on-primary'}`}>
                                    <UserPlus className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-wider text-on-surface">{__('messages.archive.follow_owner')}</span>
                            </button>
                        </div>

                        {/* Social Share */}
                        <div className="bg-surface-container-low rounded-xl p-6">
                            <p className="text-sm font-bold text-on-surface mb-4 text-center font-headline">{__('messages.idea_detail.share_with_friends')}</p>
                            <div className="flex justify-between items-center gap-3">
                                <button
                                    onClick={() => handleShare('whatsapp')}
                                    className="flex-1 bg-surface-container-lowest p-3 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white">
                                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleShare('facebook')}
                                    className="flex-1 bg-surface-container-lowest p-3 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white">
                                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleShare('x')}
                                    className="flex-1 bg-surface-container-lowest p-3 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center text-on-surface hover:bg-on-surface hover:text-surface">
                                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleShare('copy')}
                                    className="flex-1 bg-surface-container-lowest p-3 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center text-on-surface hover:bg-on-surface hover:text-surface">
                                    <span className="material-symbols-outlined">content_copy</span>
                                </button>
                            </div>
                        </div>
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

                        {/* Engagement Section */}
                        <section className="space-y-8" id="comments">
                            <div className="flex items-center justify-between mb-8 scroll-mt-32" ref={commentsTopRef}>
                                <h2 className="text-2xl font-bold text-on-surface flex items-center gap-3 font-headline">
                                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
                                    {__('messages.comments.title')}
                                    <span className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full font-bold">
                                        {idea.comments_count}
                                    </span>
                                </h2>
                            </div>

                            <div className="bg-surface-container-lowest rounded-2xl border-t-4 border-primary border-x border-b border-outline-variant/20 shadow-sm overflow-hidden">
                                <div className="p-6 md:p-8 space-y-6">
                                    <InfiniteScroll 
                                        data="comments"
                                        manual
                                        preserveUrl
                                        next={({ loading, fetch, hasMore }) => (
                                            <div className="mt-8 flex justify-center">
                                                {hasMore && (
                                                    <button 
                                                        onClick={() => fetch()}
                                                        disabled={loading}
                                                        className="px-4 py-1.5 bg-surface-container-low rounded-lg text-primary text-xs font-bold hover:bg-primary hover:text-on-primary transition-all flex items-center gap-2 disabled:opacity-50 border border-primary/10 shadow-sm cursor-pointer"
                                                    >
                                                        {loading ? (
                                                            <Loader2 className="w-3 h-3 animate-spin" />
                                                        ) : (
                                                            <>
                                                                {__('messages.comments.show_more')} (5)
                                                                <span className="material-symbols-outlined text-sm">expand_more</span>
                                                            </>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    >
                                        {(comments?.data?.length ?? 0) > 0 ? (
                                            comments.data.map((comment, index) => (
                                                <div key={`${comment.id}-${index}`}>
                                                    <div className="group relative bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                                                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                                                            <div className="flex gap-4">
                                                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/10 bg-surface-container-high">
                                                                    {comment.user?.avatar ? (
                                                                        <img src={comment.user.avatar} alt={comment.user.name} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center font-bold text-on-surface-variant">
                                                                            {comment.user?.name?.charAt(0)}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <h4 className="font-bold text-on-surface">{comment.user?.name}</h4>
                                                                        {comment.user_id === idea.user_id && (
                                                                            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{__('messages.idea_detail.idea_owner')}</span>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-xs text-outline">
                                                                        <span>{comment.created_at ? new Date(comment.created_at).toLocaleDateString() : ''}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button className="flex items-center gap-2 text-outline hover:text-primary hover:bg-primary/5 px-4 py-2 rounded-full transition-all">
                                                                <span className="material-symbols-outlined text-lg">favorite</span>
                                                                <span className="text-sm font-bold">{comment.likes_count}</span>
                                                            </button>
                                                        </div>
                                                        <p className="text-on-surface text-lg leading-relaxed pr-0 md:pr-16 font-bold whitespace-pre-wrap">
                                                            {comment.body}
                                                        </p>
                                                    </div>
                                                    {index < (comments.data?.length ?? 0) - 1 && (
                                                        <div className="h-px bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent my-6"></div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-12 text-outline italic">{__('messages.comments.no_comments')}</div>
                                        )}
                                    </InfiniteScroll>
                                </div>

                                {/* Comment Input area */}
                                <div className="bg-surface-container p-6 md:p-8 border-t border-outline-variant/20">
                                    {auth.user ? (
                                        <form onSubmit={submitComment} className="flex gap-4">
                                            <div className="hidden sm:flex w-10 h-10 rounded-full bg-surface-container-high items-center justify-center border border-outline-variant/20 shrink-0 overflow-hidden">
                                                {auth.user.avatar ? (
                                                    <img src={auth.user.avatar} className="w-full h-full object-cover" alt={auth.user.name} />
                                                ) : (
                                                    <span className="font-bold text-primary">{auth.user.name?.charAt(0) || '?'}</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="relative">
                                                    <textarea 
                                                        value={data.body}
                                                        onChange={e => setData('body', e.target.value)}
                                                        className={`w-full bg-surface-container-lowest border rounded-xl p-4 text-lg font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary h-32 resize-none shadow-inner transition-all placeholder:text-outline/40 text-on-surface ${errors.body ? 'border-error' : 'border-outline-variant/30'}`}
                                                        placeholder={__('messages.comments.placeholder')}
                                                        disabled={processing}
                                                    ></textarea>
                                                    {errors.body && <div className="text-error text-xs mt-1">{errors.body}</div>}
                                                    <div className="absolute bottom-3 ltr:right-3 rtl:left-3 flex gap-2">
                                                        <button 
                                                            type="submit"
                                                            disabled={processing || !data.body.trim()}
                                                            className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold hover:bg-primary-container transition-all active:scale-95 shadow-lg flex items-center gap-2 disabled:opacity-50"
                                                        >
                                                            {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                                            {__('messages.comments.add_comment')}
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="text-[10px] text-outline mt-3 mr-2 italic">{__('messages.comments.rules_hint')}</p>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 text-center flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                                <span className="material-symbols-outlined text-3xl text-primary">lock</span>
                                            </div>
                                            <p className="text-on-surface text-lg font-bold">
                                                <Link 
                                                    href={`/login?redirect=${window.location.pathname}`} 
                                                    className="text-primary hover:underline transition-all"
                                                >
                                                    {__('messages.login.login_button')}
                                                </Link>
                                                {__('messages.comments.login_first')}
                                            </p>
                                            <p className="text-outline text-sm italic">{__('messages.comments.rules_hint')}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <PinModal 
                isOpen={isPinModalOpen} 
                onClose={() => setIsPinModalOpen(false)} 
                onSubmit={(pin) => {
                    console.log('Voting with pin:', pin);
                    setIsPinModalOpen(false);
                }}
                email={auth.user?.email || 'test@example.com'}
            />
        </AppLayout>
    );
}
