import { useLang } from '@erag/lang-sync-inertia/react';
import { Button } from '@/app/components/ui/button';

interface ApplyFormActionsProps {
    processing: boolean;
}

export function ApplyFormActions({ processing }: ApplyFormActionsProps) {
    const { __ } = useLang();

    return (
        <Button
            className="h-12 w-full rounded-xl text-lg font-bold shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] md:w-auto md:px-12"
            type="submit"
            disabled={processing}
        >
            {processing
                ? __('messages.common.processing')
                : __('messages.sponsors.become_sponsor_button')}
        </Button>
    );
}
