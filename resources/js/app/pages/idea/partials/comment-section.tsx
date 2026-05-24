import { useLang } from '@erag/lang-sync-inertia/react';
import { InfiniteScroll, Link, useForm, router } from '@inertiajs/react';
import {
    Loader2,
    Send,
    MessageSquare,
    ChevronDown,
    Heart,
    Lock,
} from 'lucide-react';
import React from 'react';
import type { SubmitEvent } from 'react';
import { Button } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/toast';
import { cn } from '@/lib/utils';
import commentsRoute from '@/routes/app/comments';
import { login as loginRoute } from '@/routes/index';
import type { Idea, User, Paginated, Comment } from '@/types';

interface CommentSectionProps {
    idea: Idea & { comments_count: number };
    comments: Paginated<Comment>;
    auth: { user: User | null };
    commentsTopRef: React.RefObject<HTMLDivElement | null>;
}

export const CommentSection = ({
    idea,
    comments,
    auth,
    commentsTopRef,
}: CommentSectionProps) => {
    const { __ } = useLang();
    const [expandedComments, setExpandedComments] = React.useState<
        Record<number, boolean>
    >({});

    const toggleExpand = (id: number) => {
        setExpandedComments((prev) => ({
            ...prev,
            [id]: !prev[id],
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

        post(commentsRoute.store(idea.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                reset('body');
                toast.success(__('messages.comments.comment_success'));
                setTimeout(() => {
                    commentsTopRef.current?.scrollIntoView({
                        behavior: 'smooth',
                    });
                }, 100);
            },
        });
    };

    const toggleLike = (comment: Comment) => {
        if (!auth.user || comment.is_deleted) {
            if (!auth.user) {
                router.visit(
                    loginRoute.url({
                        query: { redirect: window.location.pathname },
                    }),
                );
            }

            return;
        }

        router
            .optimistic((props: any) => ({
                comments: {
                    ...props.comments,
                    data: props.comments.data.map((c: Comment) =>
                        c.id === comment.id
                            ? {
                                  ...c,
                                  likes_count: c.is_liked
                                      ? c.likes_count - 1
                                      : c.likes_count + 1,
                                  is_liked: !c.is_liked,
                              }
                            : c,
                    ),
                },
            }))
            .post(
                commentsRoute.like(comment.id).url,
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
                },
            );
    };

    return (
        <section className="space-y-8" id="comments">
            <div className="mb-8 flex items-center justify-between">
                <h2 className="flex items-center gap-3 font-headline text-2xl font-bold text-on-surface">
                    <MessageSquare className="size-6 fill-primary/20 text-primary" />
                    {__('messages.comments.title')}
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                        {idea.comments_count}
                    </span>
                </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border-x border-t-4 border-b border-outline-variant/20 border-primary bg-surface-container-lowest shadow-sm">
                <div className="space-y-6 p-6 md:p-8">
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
                                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-primary/10 bg-surface-container-low px-4 py-1.5 text-xs font-bold text-primary shadow-sm transition-all hover:bg-primary hover:text-on-primary disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                        ) : (
                                            <>
                                                {__(
                                                    'messages.comments.show_more',
                                                )}{' '}
                                                (5)
                                                <ChevronDown className="size-4" />
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
                                    <div
                                        className={cn(
                                            'group relative rounded-xl border p-6 transition-all duration-300',
                                            comment.is_deleted
                                                ? 'border-outline-variant/5 bg-surface-container-low/40 opacity-80'
                                                : 'border-outline-variant/10 bg-surface-container-low hover:border-primary/30 hover:shadow-md',
                                        )}
                                    >
                                        <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row">
                                            <div className="flex gap-4">
                                                <div
                                                    className={cn(
                                                        'h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 bg-surface-container-high',
                                                        comment.is_deleted
                                                            ? 'border-outline-variant/10 grayscale-[0.8]'
                                                            : 'border-primary/10',
                                                    )}
                                                >
                                                    {comment.user?.avatar ? (
                                                        <img
                                                            src={
                                                                comment.user
                                                                    .avatar
                                                            }
                                                            alt={
                                                                comment.user
                                                                    .name
                                                            }
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center font-bold text-on-surface-variant">
                                                            {comment.user?.name?.charAt(
                                                                0,
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="mb-1 flex items-center gap-2">
                                                        <h4
                                                            className={cn(
                                                                'font-semibold',
                                                                comment.is_deleted
                                                                    ? 'text-outline opacity-70'
                                                                    : 'text-on-surface',
                                                            )}
                                                        >
                                                            {comment.user?.name}
                                                        </h4>
                                                        {comment.user_id ===
                                                            idea.user_id &&
                                                            !comment.is_deleted && (
                                                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                                                                    {__(
                                                                        'messages.idea_detail.idea_owner',
                                                                    )}
                                                                </span>
                                                            )}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-outline opacity-60">
                                                        <span>
                                                            {comment.created_at
                                                                ? new Date(
                                                                      comment.created_at,
                                                                  ).toLocaleDateString()
                                                                : ''}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {!comment.is_deleted && (
                                                <button
                                                    onClick={() =>
                                                        toggleLike(comment)
                                                    }
                                                    className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 transition-all ${comment.is_liked ? 'bg-primary text-on-primary shadow-sm' : 'border border-transparent text-outline hover:border-primary/20 hover:bg-primary/5 hover:text-primary'}`}
                                                >
                                                    <Heart
                                                        className={`size-4 ${comment.is_liked ? 'fill-current' : ''}`}
                                                    />
                                                    <span className="text-sm font-bold">
                                                        {comment.likes_count}
                                                    </span>
                                                </button>
                                            )}
                                        </div>
                                        <div
                                            className={cn(
                                                'pr-0 text-base leading-relaxed whitespace-pre-wrap md:pr-16',
                                                comment.is_deleted
                                                    ? 'font-medium text-outline italic'
                                                    : 'font-bold text-on-surface',
                                            )}
                                        >
                                            {comment.body.length > 200 &&
                                            !expandedComments[comment.id] &&
                                            !comment.is_deleted ? (
                                                <>
                                                    {comment.body.substring(
                                                        0,
                                                        200,
                                                    )}
                                                    ...
                                                    <button
                                                        onClick={() =>
                                                            toggleExpand(
                                                                comment.id,
                                                            )
                                                        }
                                                        className="ml-1 inline-flex cursor-pointer items-center gap-0.5 font-black text-primary hover:underline"
                                                    >
                                                        {__(
                                                            'messages.ui.read_more',
                                                        )}
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    {comment.body}
                                                    {comment.body.length >
                                                        200 &&
                                                        !comment.is_deleted && (
                                                            <button
                                                                onClick={() =>
                                                                    toggleExpand(
                                                                        comment.id,
                                                                    )
                                                                }
                                                                className="ml-1 inline-flex cursor-pointer items-center gap-0.5 font-black text-primary hover:underline"
                                                            >
                                                                {__(
                                                                    'messages.ui.read_less',
                                                                )}
                                                            </button>
                                                        )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {index <
                                        (comments.data?.length ?? 0) - 1 && (
                                        <div className="my-2 h-px bg-gradient-to-r from-transparent via-outline-variant/60 to-transparent"></div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center text-outline italic">
                                {__('messages.comments.no_comments')}
                            </div>
                        )}
                    </InfiniteScroll>
                </div>

                {/* Comment Input area */}
                <div className="border-t border-outline-variant/20 bg-surface-container p-6 md:p-8">
                    {auth.user ? (
                        <form onSubmit={submitComment} className="flex gap-4">
                            <div className="hidden h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-outline-variant/20 bg-surface-container-high sm:flex">
                                {auth.user.avatar ? (
                                    <img
                                        src={auth.user.avatar}
                                        className="h-full w-full object-cover"
                                        alt={auth.user.name}
                                    />
                                ) : (
                                    <span className="font-bold text-primary">
                                        {auth.user.name?.charAt(0) || '?'}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1">
                                <textarea
                                    value={data.body}
                                    onChange={(e) =>
                                        setData('body', e.target.value)
                                    }
                                    className={`h-32 w-full resize-none rounded-xl border bg-surface-container-lowest p-4 text-lg font-bold text-on-surface shadow-inner transition-all placeholder:text-outline/40 focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.body ? 'border-error' : 'border-outline-variant/30'}`}
                                    placeholder={__(
                                        'messages.comments.placeholder',
                                    )}
                                    disabled={processing}
                                ></textarea>
                                {errors.body && (
                                    <div className="mt-1 text-xs text-error">
                                        {errors.body}
                                    </div>
                                )}

                                <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                                    <p className="mr-2 text-sm font-bold text-outline">
                                        {__('messages.comments.rules_hint')}
                                    </p>
                                    <Button
                                        type="submit"
                                        disabled={
                                            processing || !data.body.trim()
                                        }
                                        className="w-full rounded-xl px-8 py-7 shadow-lg sm:w-auto"
                                    >
                                        {processing ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Send className="h-4 w-4" />
                                        )}
                                        {__('messages.comments.add_comment')}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="flex flex-col items-center gap-4 rounded-xl border border-outline-variant/10 bg-surface-container-low p-8 text-center">
                            <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                <Lock className="size-8 text-primary" />
                            </div>
                            <p className="text-lg font-bold text-on-surface">
                                <Link
                                    href={loginRoute.url({
                                        query: {
                                            redirect: window.location.pathname,
                                        },
                                    })}
                                    className="text-primary transition-all hover:underline"
                                >
                                    {__('messages.login.login_button')}
                                </Link>
                                {__('messages.comments.login_first')}
                            </p>
                            <p className="text-sm text-outline italic">
                                {__('messages.comments.rules_hint')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
