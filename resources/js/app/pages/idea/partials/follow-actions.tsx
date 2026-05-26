import { useLang } from '@erag/lang-sync-inertia/react';
import { router, usePage } from '@inertiajs/react';
import { Bell, Check, UserPlus } from 'lucide-react';
import { toast } from '@/app/components/ui/toast';
import ideasRoute from '@/routes/app/ideas';
import usersRoute from '@/routes/app/users';
import { login as loginRoute } from '@/routes/index';

interface FollowActionsProps {
    isFollowingIdea: boolean;
    isFollowingOwner: boolean;
    ideaId: number;
    ownerUserId: number;
}

export function FollowActions({
    isFollowingIdea,
    isFollowingOwner,
    ideaId,
    ownerUserId,
}: FollowActionsProps) {
    const { __ } = useLang();
    const { auth } = usePage().props as any;

    const isOwner = auth.user?.id === ownerUserId;

    if (isOwner) {
        return null;
    }

    const toggleFollowIdea = () => {
        if (!auth.user) {
            router.visit(
                loginRoute.url({
                    query: { redirect: window.location.pathname },
                }),
            );

            return;
        }

        router
            .optimistic(() => ({
                isFollowingIdea: !isFollowingIdea,
            }))
            .post(
                ideasRoute.follow(ideaId).url,
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
            router.visit(
                loginRoute.url({
                    query: { redirect: window.location.pathname },
                }),
            );

            return;
        }

        if (!ownerUserId || isOwner) {
            return;
        }

        router
            .optimistic(() => ({
                isFollowingOwner: !isFollowingOwner,
            }))
            .post(
                usersRoute.follow(ownerUserId).url,
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

    return (
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
    );
}
