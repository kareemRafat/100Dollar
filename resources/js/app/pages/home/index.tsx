import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, WhenVisible, usePage } from '@inertiajs/react';
import { memo } from 'react';
import type { Idea, Sponsor, Paginated } from '@/types';
import DayTabs from './components/day-tabs';
import Hero from './components/hero';
import IdeaList from './components/idea-list';
import PreviousWinners from './components/previous-winners';
import PreviousWinnersSkeleton from './components/previous-winners-skeleton';
import SponsorBanner from './components/sponsor-banner';
import VotingCountdown from './components/voting-countdown';

interface Props {
    ideas: Paginated<Idea>;
    sponsor?: Sponsor;
    previousWinners: Idea[] | null;
    currentDay: number;
    secondsUntilEnd: number;
    weekDays: { id: number; name: string }[];
    votedIdeaId: number | null;
}

const MemoizedHero = memo(Hero);
const MemoizedVotingCountdown = memo(VotingCountdown);
const MemoizedPreviousWinners = memo(PreviousWinners);
const MemoizedSponsorBanner = memo(SponsorBanner);

export default function Home({
    ideas,
    sponsor,
    previousWinners,
    currentDay,
    secondsUntilEnd,
    weekDays,
    votedIdeaId,
}: Props) {
    const { __ } = useLang();
    const { auth } = usePage().props as any;

    return (
        <>
            <Head title={__('messages.welcome')} />

            <MemoizedHero auth={auth} />

            <section className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-12">
                <MemoizedSponsorBanner sponsor={sponsor} />
                <MemoizedVotingCountdown secondsUntilEnd={secondsUntilEnd} />
            </section>

            <DayTabs weekDays={weekDays} currentDay={currentDay} />

            <IdeaList ideas={ideas} votedIdeaId={votedIdeaId} />

            <WhenVisible data="previousWinners" fallback={<PreviousWinnersSkeleton />} buffer={300}>
                {previousWinners && <MemoizedPreviousWinners winners={previousWinners} />}
            </WhenVisible>
        </>
    );
}
