import { Skeleton } from '@/app/components/ui/skeleton';

export default function PreviousWinnersSkeleton() {
    return (
        <section className="mx-auto mb-20 max-w-7xl px-6">
            <div className="mb-10 flex flex-col items-end justify-between gap-4 border-s-4 border-primary ps-6 md:flex-row">
                <div className="w-full max-w-md">
                    <Skeleton className="mb-2 h-10 w-48" />
                    <Skeleton className="h-6 w-full" />
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                    <Skeleton className="h-6 w-32" />
                </div>
            </div>

            <div className="flex gap-6 overflow-hidden pb-10">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="w-72 flex-shrink-0 rounded-3xl border border-primary/10 bg-surface-container-lowest p-6 shadow-lg dark:bg-card"
                    >
                        <div className="mx-auto mb-6 h-24 w-24 animate-pulse rounded-full bg-surface-container-high" />
                        <div className="flex flex-col items-center">
                            <Skeleton className="mb-4 h-4 w-20 rounded-full" />
                            <Skeleton className="mb-2 h-6 w-32" />
                            <Skeleton className="mb-8 h-12 w-full" />
                            <div className="flex w-full justify-between border-t border-outline-variant/10 pt-4">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-6 w-12" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
