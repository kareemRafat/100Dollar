import { useLang } from '@erag/lang-sync-inertia/react';
import { InfiniteScroll, Link, useForm, router } from '@inertiajs/react';
import { Loader2, Send } from 'lucide-react';
import React from 'react';
import type {SubmitEvent} from 'react';
import { Button } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/toast';
import type { Idea, User, Paginated, Comment } from '@/types';

interface CommentSectionProps {
    idea: Idea & { comments_count: number };
    comments: Paginated<Comment>;
    auth: { user: User | null };
    commentsTopRef: React.RefObject<HTMLDivElement | null>;
}

export const CommentSection = ({ idea, comments, auth, commentsTopRef }: CommentSectionProps) => {
    const { __ } = useLang();
    const [expandedComments, setExpandedComments] = React.useState<Record<number, boolean>>({});

    const toggleExpand = (id: number) => {
        setExpandedComments(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const { data, setData, post, processing, reset, errors } = useForm({
        body: '',
    });

    const submitComment = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!auth.user || !data.body.trim() || processing) {
            return;
        }

        post(`/ideas/${idea.id}/comments`, {
            preserveScroll: true,
            onSuccess: () => {
                reset('body');
                toast.success(__('messages.comments.comment_success'));
                setTimeout(() => {
                    commentsTopRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            },
        });
    };

    const toggleLike = (comment: Comment) => {
        if (!auth.user) {
            router.visit(`/login?redirect=${window.location.pathname}`);

            return;
        }

        router.optimistic((props: any) => ({
            comments: {
                ...props.comments,
                data: props.comments.data.map((c: Comment) =>
                    c.id === comment.id
                        ? {
                            ...c,
                            likes_count: c.is_liked ? c.likes_count - 1 : c.likes_count + 1,
                            is_liked: !c.is_liked
                        }
                        : c
                )
            }
        })).post(`/comments/${comment.id}/like`, {}, {
            preserveScroll: true,
            showProgress: false,
            only: ['idea', 'isFollowingIdea', 'isFollowingOwner', 'auth', 'flash', 'errors'],
        });
    };

    return (
        <section className="space-y-8" id="comments">
            <div className="flex items-center justify-between mb-8">
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
                        key={`comments-list-${idea.comments_count}`}
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
                                <div key={comment.id}>
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
                                                        <h4 className="font-semibold text-on-surface">{comment.user?.name}</h4>
                                                        {comment.user_id === idea.user_id && (
                                                            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{__('messages.idea_detail.idea_owner')}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-outline">
                                                        <span>{comment.created_at ? new Date(comment.created_at).toLocaleDateString() : ''}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => toggleLike(comment)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer ${comment.is_liked ? 'bg-primary text-on-primary shadow-sm' : 'text-outline hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20'}`}
                                            >
                                                <span className={`material-symbols-outlined text-lg ${comment.is_liked ? 'fill-1' : ''}`} style={{ fontVariationSettings: comment.is_liked ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                                                <span className="text-sm font-bold">{comment.likes_count}</span>
                                            </button>
                                        </div>
                                        <div className="text-on-surface text-base leading-relaxed pr-0 md:pr-16 font-bold whitespace-pre-wrap">
                                            {comment.body.length > 200 && !expandedComments[comment.id] ? (
                                                <>
                                                    {comment.body.substring(0, 200)}...
                                                    <button
                                                        onClick={() => toggleExpand(comment.id)}
                                                        className="text-primary hover:underline ml-1 cursor-pointer font-black inline-flex items-center gap-0.5"
                                                    >
                                                        {__('messages.ui.read_more')}
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    {comment.body}
                                                    {comment.body.length > 200 && (
                                                        <button
                                                            onClick={() => toggleExpand(comment.id)}
                                                            className="text-primary hover:underline ml-1 cursor-pointer font-black inline-flex items-center gap-0.5"
                                                        >
                                                            {__('messages.ui.read_less')}
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {index < (comments.data?.length ?? 0) - 1 && (
                                        <div className="h-px bg-gradient-to-r from-transparent via-outline-variant/60 to-transparent my-2"></div>
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
                                <textarea
                                    value={data.body}
                                    onChange={e => setData('body', e.target.value)}
                                    className={`w-full bg-surface-container-lowest border rounded-xl p-4 text-lg font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary h-32 resize-none shadow-inner transition-all placeholder:text-outline/40 text-on-surface ${errors.body ? 'border-error' : 'border-outline-variant/30'}`}
                                    placeholder={__('messages.comments.placeholder')}
                                    disabled={processing}
                                ></textarea>
                                {errors.body && <div className="text-error text-xs mt-1">{errors.body}</div>}

                                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <p className="text-sm text-outline font-bold mr-2">{__('messages.comments.rules_hint')}</p>
                                    <Button
                                        type="submit"
                                        disabled={processing || !data.body.trim()}
                                        className="px-8 py-7 rounded-xl shadow-lg w-full sm:w-auto"
                                    >
                                        {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                        {__('messages.comments.add_comment')}
                                    </Button>
                                </div>
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
    );
};
