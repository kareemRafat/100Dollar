import { useLang } from '@erag/lang-sync-inertia/react';
import { Link, usePage } from '@inertiajs/react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { WinnerCard } from '@/app/components/winner-card';
import type { Idea } from '@/types';

interface Props {
    winners: Idea[];
}

export default function PreviousWinners({ winners = [] }: Props) {
    const { __ } = useLang();
    const { locale } = usePage().props;
    const isRtl = locale === 'ar';

    const winnersArray = (Array.isArray(winners) ? winners : Object.values(winners || {})) as Idea[];

    const [emblaRef, emblaApi] = useEmblaCarousel({
        direction: isRtl ? 'rtl' : 'ltr',
        align: 'start',
        containScroll: 'trimSnaps',
    });

    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback((emblaApi: any) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) {
            return;
        }

        onSelect(emblaApi);
        emblaApi.on('reInit', onSelect);
        emblaApi.on('select', onSelect);
    }, [emblaApi, onSelect]);

    if (winnersArray.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto mb-20 max-w-7xl px-6">
            <div className="mb-10 flex flex-col items-end justify-between gap-4 border-s-4 border-primary ps-6 md:flex-row">
                <div>
                    <h2 className="font-headline text-3xl font-black text-on-surface md:text-4xl dark:text-white">
                        {__('messages.ui.hall_of_fame')}
                    </h2>
                    <p className="mt-2 text-base text-on-surface-variant dark:text-on-surface-variant">
                        {__('messages.ui.hall_of_fame_desc')}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={scrollPrev}
                            disabled={prevBtnDisabled}
                            className="h-10 w-10 rounded-full bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary"
                        >
                            <span className="material-symbols-outlined">
                                {isRtl ? 'chevron_right' : 'chevron_left'}
                            </span>
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={scrollNext}
                            disabled={nextBtnDisabled}
                            className="h-10 w-10 rounded-full bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary"
                        >
                            <span className="material-symbols-outlined">
                                {isRtl ? 'chevron_left' : 'chevron_right'}
                            </span>
                        </Button>
                    </div>
                    <Link
                        className="group flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-container"
                        href="/archive"
                    >
                        {__('messages.ui.browse_full_archive')}
                        <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">
                            {isRtl ? 'arrow_back' : 'arrow_forward'}
                        </span>
                    </Link>
                </div>
            </div>

            <div className="overflow-hidden cursor-grab active:cursor-grabbing select-none touch-pan-y" ref={emblaRef}>
                <div className="flex items-stretch gap-6 pb-10 select-none">
                    {winnersArray.map((winner, index) => (
                        <div key={`${winner.id}-${index}`} className="min-w-0 flex-[0_0_auto] select-none flex">
                            <WinnerCard 
                                name={winner.user?.name || __('messages.home.anonymous')} 
                                idea={winner.title} 
                                badge={winner.winner_announced_at 
                                    ? new Intl.DateTimeFormat(locale as string, { weekday: 'long' }).format(new Date(winner.winner_announced_at))
                                    : ''} 
                            />
                        </div>
                    ))}
                    <div className="min-w-0 flex-[0_0_auto] flex">
                        <Link
                            href="/archive"
                            className="group flex w-72 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-outline-variant/30 bg-surface-container-low p-6 text-center transition-colors hover:border-primary/50"
                        >
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-high transition-colors group-hover:bg-primary/10 dark:bg-surface-container-high">
                                <span className="material-symbols-outlined text-4xl text-on-surface-variant transition-colors group-hover:text-primary">
                                    history
                                </span>
                            </div>
                            <p className="font-headline text-lg font-bold text-on-surface dark:text-white">
                                {__('messages.ui.full_archive')}
                            </p>
                            <p className="mt-2 text-xs text-on-surface-variant dark:text-on-surface-variant">
                                {__('messages.ui.full_archive_desc')}
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
