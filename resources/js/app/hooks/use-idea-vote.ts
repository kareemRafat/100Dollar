import { useLang } from '@erag/lang-sync-inertia/react';
import { usePage, useHttp, router } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/app/components/ui/toast';
import { formatDuration } from '@/lib/utils';
import voteRoute from '@/routes/app/ideas/vote';

export function useIdeaVote(ideaId: number, initialVotesCount: number) {
    const { __, locale } = useLang();
    const { auth, vote_block } = usePage().props as any;

    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const [votesCount, setVotesCount] = useState(initialVotesCount);
    const [isAutoSending, setIsAutoSending] = useState(false);

    // Local timer for the block countdown
    const [remainingSeconds, setRemainingSeconds] = useState(vote_block?.available_in || 0);

    // Sync local timer with server-side block status when it changes
    useEffect(() => {
        if (vote_block?.available_in > 0) {
            setRemainingSeconds(vote_block.available_in);
        } else {
            setRemainingSeconds(0);
        }
    }, [vote_block?.available_in]);

    // Timer logic
    useEffect(() => {
        if (remainingSeconds <= 0) {
return;
}

        const timer = setInterval(() => {
            setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [remainingSeconds > 0]);

    const { post: sendOtp } = useHttp({
        email: auth.user?.email || '',
    });

    const handleVoteSuccess = useCallback((newCount: number) => {
        setVotesCount(newCount);
        setRemainingSeconds(0);
        router.reload({ only: ['vote_block', 'votedIdeaId'] });
    }, []);
    const handleVoteClick = useCallback(() => {
        if (remainingSeconds > 0) {
            const timeStr = formatDuration(remainingSeconds, locale);
            const message = __('messages.common.too_many_attempts', { time: timeStr })
                .replace(':time', timeStr); // Manual fallback if helper fails

            toast.error(message);

            return;
        }

        if (auth.user) {
            setIsAutoSending(true);
            sendOtp(voteRoute.sendOtp.url(ideaId), {
                data: { email: auth.user.email },
                onSuccess: (response: any) => {
                    toast.success(response.message);
                    setIsPinModalOpen(true);
                },
                onError: (errors: any) => {
                    toast.error(errors.message || __('messages.common.error'));
                },
                onHttpException: (response: any) => {
                    if (response.status === 429) {
                        router.reload({ only: ['vote_block'] });
                    }

                    let message = __('messages.common.error');

                    try {
                        const data = typeof response.data === 'string'
                            ? JSON.parse(response.data)
                            : response.data;
                        message = data?.message || message;

                        // Handle possible :time placeholder from server
                        if (message.includes(':time') && vote_block?.available_in) {
                            message = message.replace(':time', formatDuration(vote_block.available_in, locale));
                        }
                    } catch {
                        // ...
                    }

                    toast.error(message);
                },
                onFinish: () => {
                    setIsAutoSending(false);
                }
            });
        } else {
            setIsPinModalOpen(true);
        }
    }, [remainingSeconds, locale, auth.user, ideaId, sendOtp, __, vote_block?.available_in]);

    return {
        votesCount,
        isPinModalOpen,
        isAutoSending,
        isBlocked: remainingSeconds > 0,
        remainingSeconds,
        handleVoteClick,
        handleVoteSuccess,
        setIsPinModalOpen
    };
}
