import { useLang } from '@erag/lang-sync-inertia/react';
import { AlertTriangle } from 'lucide-react';

interface RejectionNoticeProps {
    show: boolean;
    reason?: string | null;
}

export function RejectionNotice({ show, reason }: RejectionNoticeProps) {
    const { __ } = useLang();

    if (!show) {
        return null;
    }

    return (
        <div className="lg:col-span-12">
            <div className="rounded-3xl border border-red-200 bg-red-50/30 p-6 dark:border-red-900/30 dark:bg-red-950/10">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-headline text-lg font-black text-red-950 dark:text-red-50">
                            {__('messages.idea_detail.rejection_notice')}
                        </h3>
                        <p className="text-base leading-relaxed text-red-900/80 dark:text-red-200/80">
                            {reason ||
                                __('messages.idea_detail.no_reason_provided')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
